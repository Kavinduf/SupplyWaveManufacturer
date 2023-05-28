import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TextInput,
  Alert,
  ScrollView,
  Pressable,
} from 'react-native';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import React, { useState } from 'react';
// import DropDown from "../Components/DropDown";
import GreenButton from '../Components/GreenButton';
import { KeyboardAvoidingView } from 'react-native';
import { Dialog, Image } from '@rneui/themed';
import { useAppContext } from '../context/appContext';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';

const EnterDetailsRetailer = ({ navigation, route }) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    mobileNumber: route.params.mobileNumber,
  });

  const pickImage = async ({ navigation }) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });
    if (!result.canceled) {
      const file = result.assets[0].uri;
      const fileName = file.split('/').pop();
      const fileType = 'image/' + fileName.split('.').pop();
      setImage({ type: fileType, uri: file, name: fileName });
    }
  };

  const [image, setImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAppContext();

  const onRegister = async () => {
    if (
      state.shopName === '' ||
      state.email === '' ||
      state.address === '' ||
      state.password === '' ||
      state.mobileNumber === ''
    ) {
      Alert.alert('Please fill all the fields');
      return;
    }
    try {
      setIsLoading(true);
      await register(
        {
          shopName: state.shopName,
          email: state.email,
          nic: state.nic,
          address: state.address,
          password: state.password,
          mobileNumber: state.mobileNumber,
        },
        image
      );
      setIsLoading(false);
      navigation.navigate('HomeManufacturer');
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <Dialog
          isVisible={isLoading}
          overlayStyle={{
            width: 90,
            height: 90,
          }}
        >
          <Dialog.Loading />
        </Dialog>
        <KeyboardAvoidingView
          behavior='position'
          style={{ flex: 1, padding: 20 }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              alignSelf: 'center',
              marginBottom: 20,
            }}
          >
            Get Started
          </Text>
          <View style={{ alignSelf: 'center' }}>
            {image && <Image style={styles.image} source={image} />}
            {!image && (
              <Image
                style={styles.image}
                source={require('../assets/login-png.png')}
              />
            )}

            <Pressable style={styles.editImage} onPress={pickImage}>
              <Text style={styles.editImageText}>Edit image</Text>
              <Feather name='edit-3' size={16} color='black' />
            </Pressable>
          </View>
          <View style={styles.textInput}>
            <TextInput
              editable
              value={state.shopName}
              onChangeText={(text) =>
                setState({
                  ...state,
                  shopName: text,
                })
              }
              textContentType='name'
              selectionColor='#2A8B00'
              placeholder='Shop Name*'
              placeholderTextColor='gray'
              // numberOfLines={4}
              // value={value}
              style={{ padding: 10 }}
            />
          </View>

          <View style={styles.textInput}>
            <TextInput
              editable
              numberOfLines={4}
              value={state.address}
              onChangeText={(text) =>
                setState({
                  ...state,
                  address: text,
                })
              }
              textContentType='name'
              selectionColor='#2A8B00'
              placeholder='Address*'
              placeholderTextColor='gray'
              // numberOfLines={4}
              // value={value}
              style={{ padding: 10 }}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              editable
              value={state.email}
              onChangeText={(text) =>
                setState({
                  ...state,
                  email: text,
                })
              }
              textContentType='emailAddress'
              selectionColor='#2A8B00'
              placeholder='Email*'
              placeholderTextColor='gray'
              // numberOfLines={4}
              // value={value}
              style={{ padding: 10 }}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              editable
              value={state.password}
              onChangeText={(text) =>
                setState({
                  ...state,
                  password: text,
                })
              }
              textContentType='password'
              secureTextEntry={true}
              selectionColor='#2A8B00'
              placeholder='Password*'
              placeholderTextColor='gray'
              // numberOfLines={4}
              // value={value}
              style={{ padding: 10 }}
            />
          </View>
          <View style={styles.button}>
            <GreenButton title={'Register'} onClick={onRegister} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EnterDetailsRetailer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 15,
    backgroundColor: '#F5F5F5',
  },
  TopView: {
    flex: 1,

    justifyContent: 'space-between',
    padding: 15,
    marginHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    marginTop: 15,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  textInput: {
    // backgroundColor: value,
    borderColor: '#bcbcbc',
    borderWidth: 1,
    padding: 5,
    marginTop: 15,
    borderRadius: 5,
  },
  button: {
    marginHorizontal: 15,
    marginTop: 40,
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  editImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  editImageText: { fontSize: 15, fontWeight: '500', marginEnd: 3 },
});
