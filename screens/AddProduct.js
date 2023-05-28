import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import GreenButton from '../Components/GreenButton';

import { db } from '../firebase';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
} from 'firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dialog, Image } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage } from '../firebase';
import { useAppContext } from '../context/appContext';

const AddProduct = ({ navigation, route }) => {
  const { user } = useAppContext();
  const [categoriesData, setCategoriesData] = useState([]);

  const [openCategories, setOpenCategories] = useState(false);
  const [openSubCategories, setOpenSubCategories] = useState(false);
  const [valueCategories, setValueCategories] = useState(null);
  const [valueSubCategories, setValueSubCategories] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [categories, setCategories] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]);
  const [subCategories, setSubCategories] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]);

  useEffect(() => {
    const getCategories = async () => {
      const querySnapshot = await getDocs(collection(db, 'categories'));
      const categories = [];
      const categoriesData = [];
      querySnapshot.forEach((doc) => {
        categoriesData.push({
          ...doc.data(),
        });
        categories.push({
          label: Object.keys(doc.data()),
          value: Object.keys(doc.data()),
        });
      });
      // console.log(categories);
      setCategoriesData(categoriesData);
      setCategories(categories);
    };
    getCategories();
  }, []);

  useEffect(() => {
    if (!valueCategories || !categoriesData) {
      return;
    }

    // console.log(valueCategories);
    // console.log(Object.keys(categoriesData[0])[0]);
    const subCategories = categoriesData.find(
      (category) => valueCategories[0] === Object.keys(category)[0]
    );

    //snacks : [1,2,3,45]

    const subCategoriesFilter = Object.values(subCategories)[0].map(
      (subCategory) => {
        return {
          label: subCategory,
          value: subCategory,
        };
      }
    );

    // console.log('ff', subCategoriesFilter);

    // console.log('ff', Object.values(subCategories)[0]);

    setSubCategories(subCategoriesFilter);

    // const subCategory = categoriesData.find();
  }, [valueCategories]);

  const [state, setState] = useState({
    productName: route.params?.product?.productName || '',
    piecesInUnit: route.params?.product?.piecesInUnit || '',
    pricePerUnit: route.params?.product?.pricePerUnit || '',
    weight: route.params?.product?.weight || '',
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.5,
    });

    if (!result.canceled) {
      const file = result.assets[0].uri;
      const fileName = file.split('/').pop();
      const fileType = 'image/' + fileName.split('.').pop();
      setImage({ type: fileType, uri: file, name: fileName });
    }
  };

  const uploadImage = async (image, fileName) => {
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `images/products/${fileName}`);
    await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const onAdd = async () => {
    if (!image) return alert('Please select an image');
    if (!state.productName) return alert('Please enter product name');
    if (!state.piecesInUnit) return alert('Please enter pieces in unit');
    if (!state.pricePerUnit) return alert('Please enter price per unit');
    if (!valueCategories) return alert('Please select a category');
    if (!valueSubCategories) return alert('Please select a sub category');
    setIsLoading(true);
    try {
      const url = await uploadImage(image, image.name);
      const docRef = await addDoc(collection(db, 'products'), {
        productName: state.productName,
        piecesInUnit: state.piecesInUnit,
        pricePerUnit: state.pricePerUnit,
        category: valueCategories[0],
        subCategory: valueSubCategories,
        weight: state.weight,
        image: url,
        manufacturerId: user.uid,
        status: 'active',
      });
      console.log('Document written with ID: ', docRef.id);
      setIsLoading(false);
      navigation.goBack();
    } catch (e) {
      console.error('Error adding document: ', e);
      setIsLoading(false);
    }
  };

  const onUpdate = async () => {
    if (!state.productName) return alert('Please enter product name');
    if (!state.piecesInUnit) return alert('Please enter pieces in unit');
    if (!state.pricePerUnit) return alert('Please enter price per unit');
    if (!valueCategories) return alert('Please select a category');
    if (!valueSubCategories) return alert('Please select a sub category');
    setIsLoading(true);
    try {
      let url = route?.params?.product?.image;
      if (image) {
        url = await uploadImage(image, image.name);
      }
      const docRef = await updateDoc(
        doc(db, 'products', route.params.product.id),
        {
          productName: state.productName,
          piecesInUnit: state.piecesInUnit,
          pricePerUnit: state.pricePerUnit,
          category: valueCategories[0],
          subCategory: valueSubCategories[0],
          weight: state.weight,
          image: url,
        }
      );
      setIsLoading(false);
      navigation.goBack();
    } catch (e) {
      console.error('Error adding document: ', e);
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Dialog
          isVisible={isLoading}
          overlayStyle={{
            width: 90,
            height: 90,
          }}
        >
          <Dialog.Loading />
        </Dialog>
        <ScrollView>
          <KeyboardAvoidingView
            style={styles.TopView}
            behavior={Platform.OS === 'ios' && 'position'}
            keyboardVerticalOffset={Platform.OS === 'ios' && 100}
          >
            {route?.params?.product?.image && !image && (
              <Image
                onPress={pickImage}
                source={{
                  uri: route?.params?.product?.image,
                }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                }}
              />
            )}
            {image && (
              <Image
                onPress={pickImage}
                source={{
                  uri: image.uri,
                }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                }}
              />
            )}

            {!image && !route?.params?.product?.image && (
              <Pressable style={styles.imageBorder} onPress={pickImage}>
                <FontAwesome name='image' size={24} color='#2A8B00' />
                <Text style={styles.imageBorderText}>Image</Text>
              </Pressable>
            )}
            <View style={{ marginTop: 10 }}>
              <Text style={styles.inputText}>Product Name</Text>
              <View style={styles.textInput}>
                <TextInput
                  editable
                  value={state.productName}
                  onChangeText={(text) =>
                    setState({
                      ...state,
                      productName: text,
                    })
                  }
                  textContentType='name'
                  selectionColor='#2A8B00'
                  placeholder='Ex.Maliban Cream Crackers 100g (12pc)'
                  placeholderTextColor='gray'
                  // numberOfLines={4}
                  // value={value}
                  style={{ padding: 10 }}
                />
              </View>
              <Text style={styles.inputText}>Category</Text>
              <View
                style={[
                  styles.textInputCategory,
                  {
                    zIndex: 10,
                    padding: 0,
                    borderWidth: 0,
                  },
                ]}
              >
                <DropDownPicker
                  listMode='SCROLLVIEW'
                  open={openCategories}
                  value={valueCategories}
                  items={categories}
                  setOpen={setOpenCategories}
                  setValue={setValueCategories}
                  setItems={setCategories}
                />
                {/* <Text style={styles.textInputCategoryPlaceholder}>
                  Select category
                </Text> */}
                {/* <AntDesign name='right' size={19} color='#2A8B00' /> */}
              </View>
              <Text style={styles.inputText}>Sub category</Text>
              <View
                style={[
                  styles.textInputCategory,
                  {
                    zIndex: 9,
                    padding: 0,
                    borderWidth: 0,
                  },
                ]}
              >
                {/* <Text style={styles.textInputCategoryPlaceholder}>
                  Select sub category
                </Text>
                <AntDesign name='right' size={19} color='#2A8B00' /> */}
                <DropDownPicker
                  listMode='SCROLLVIEW'
                  open={openSubCategories}
                  value={valueSubCategories}
                  items={subCategories}
                  setOpen={setOpenSubCategories}
                  setValue={setValueSubCategories}
                  setItems={setSubCategories}
                />
              </View>
              <Text style={styles.inputText}>Pieces in a unit</Text>
              <View style={styles.textInput}>
                <TextInput
                  editable
                  value={state.piecesInUnit}
                  onChangeText={(text) =>
                    setState({
                      ...state,
                      piecesInUnit: text,
                    })
                  }
                  keyboardType='number-pad'
                  selectionColor='#2A8B00'
                  placeholder=''
                  placeholderTextColor='gray'
                  style={{ padding: 10 }}
                />
              </View>
              <Text style={styles.inputText}>Price per unit (LKR)</Text>
              <View style={styles.textInput}>
                <TextInput
                  editable
                  value={state.pricePerUnit}
                  onChangeText={(text) =>
                    setState({
                      ...state,
                      pricePerUnit: text,
                    })
                  }
                  keyboardType='number-pad'
                  selectionColor='#2A8B00'
                  placeholder=''
                  placeholderTextColor='gray'
                  style={{ padding: 10 }}
                />
              </View>
              <Text style={styles.inputText}>Weight (Kg)</Text>
              <View style={styles.textInput}>
                <TextInput
                  editable
                  value={state.weight}
                  onChangeText={(text) =>
                    setState({
                      ...state,
                      weight: text,
                    })
                  }
                  keyboardType='number-pad'
                  selectionColor='#2A8B00'
                  placeholder=''
                  placeholderTextColor='gray'
                  style={{ padding: 10 }}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>

      {!route?.params?.product && (
        <View style={styles.button}>
          <GreenButton title={'Add'} onClick={onAdd} />
        </View>
      )}
      {route?.params?.product && (
        <View style={styles.button}>
          <GreenButton title={'Update'} onClick={onUpdate} />
        </View>
      )}
    </View>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  TopView: {
    padding: 15,
    paddingBottom: 15,
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 1,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 15,
    backgroundColor: '#F5F5F5',
  },
  imageBorder: {
    width: 100,
    height: 100,
    borderColor: '#2A8B00',
    borderStyle: 'dashed',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBorderText: {
    fontSize: 11,
    marginEnd: 2,
    color: 'grey',
    marginTop: 10,
  },
  inputText: {
    marginTop: 15,
    fontWeight: '500',
  },
  textInput: {
    // backgroundColor: value,
    borderColor: '#bcbcbc',
    borderWidth: 1,
    padding: 5,
    marginTop: 10,
    borderRadius: 5,
  },
  textInputCategory: {
    // backgroundColor: value,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#bcbcbc',
    borderWidth: 1,
    padding: 5,
    marginTop: 10,
    borderRadius: 5,
    height: 50,
  },
  textInputCategoryPlaceholder: {
    fontWeight: '500',
    color: 'gray',
  },
  button: {
    padding: 20,
    backgroundColor: '#FFF',
    paddingBottom: 30,
  },
});
