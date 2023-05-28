import { useContext, createContext, useReducer, useState } from 'react';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import reducer from './reducer';
import { auth, db, storage } from '../firebase';
import { Alert, Linking } from 'react-native';
import { SET_USER, UPDATE_USER } from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const AppContext = createContext();

const useAppContext = () => {
  return useContext(AppContext);
};

const initialState = {
  user: null,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const register = async (user, image) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      let url = '';
      if (image) {
        url = await uploadImage(image, userCredential.user.uid);
      }
      const docRef = await setDoc(
        doc(db, 'manufacturers', userCredential.user.uid),
        {
          shopName: user.shopName,
          email: user.email,
          address: user.address,
          uid: userCredential.user.uid,
          mobileNumber: user.mobileNumber,
          image: url,
        }
      );
      dispatch({
        type: SET_USER,
        payload: {
          shopName: user.shopName,
          email: user.email,
          address: user.address,
          mobileNumber: user.mobileNumber,
          uid: userCredential.user.uid,
          image: url,
        },
      });
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  const login = async (user) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      const userData = await getDoc(
        doc(db, 'manufacturers', userCredential.user.uid)
      );

      if (!userData.exists()) {
        Alert.alert('Error', 'User not found');
        return;
      }

      await AsyncStorage.setItem('user', JSON.stringify(userData.data()));
      dispatch({ type: SET_USER, payload: userData.data() });
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  const autoLogin = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    if (user) {
      dispatch({ type: SET_USER, payload: user });
    }
  };

  const logout = async () => {
    auth.signOut();
    await AsyncStorage.removeItem('user');
    dispatch({ type: SET_USER, payload: null });
  };

  const uploadImage = async (image, fileName) => {
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `images/${fileName}`);
    await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const updateUser = async (user, image) => {
    try {
      let url = '';
      if (image) {
        url = await uploadImage(image, user.uid);
      }

      const userJson = {
        ...user,
      };
      if (image) {
        userJson.image = url;
      }

      const docRef = await updateDoc(doc(db, 'manufacturers', user.uid), {
        ...userJson,
      });

      dispatch({
        type: UPDATE_USER,
        payload: {
          ...userJson,
        },
      });
      await AsyncStorage.setItem(
        'user',
        JSON.stringify({
          ...state.user,
          ...userJson,
        })
      );
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  const openMap = async (address) => {
    try {
      const destination = encodeURIComponent(`${address}`);
      const provider = Platform.OS === 'ios' ? 'apple' : 'google';
      const link = `http://maps.${'google'}.com/?daddr=${destination}`;
      const supported = await Linking.canOpenURL(link);

      if (supported) Linking.openURL(link);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        autoLogin,
        register,
        logout,
        login,
        updateUser,
        uploadImage,
        openMap,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useAppContext };
