import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Dialog, Image, Input } from "@rneui/themed";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import GreenButton from "../Components/GreenButton";
import { useAppContext } from "../context/appContext";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

const EditProfileManufacturer = ({ navigation }) => {
  const { user, updateUser } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    if (!result.canceled) {
      const file = result.assets[0].uri;
      const fileName = file.split("/").pop();
      const fileType = "image/" + fileName.split(".").pop();
      setImage({ type: fileType, uri: file, name: fileName });
    }
  };

  const [state, setState] = useState({
    mobileNumber: user?.mobileNumber,
    shopName: user?.shopName,
    address: user?.address,
    uid: user?.uid,
    email: user?.email,
  });

  const onUpdate = async () => {
    setIsLoading(true);
    await updateUser(state, image);
    setIsLoading(false);
    navigation.navigate("Home");
  };

  return (
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
        <View style={styles.TopView}>
          {/* <Text style={styles.heading}>Account Info</Text> */}
          <View style={{ alignSelf: "center" }}>
            {image && <Image style={styles.image} source={image} />}
            {!image && !user?.image && (
              <Image
                style={styles.image}
                source={require("../assets/login-png.png")}
              />
            )}
            {!image && user?.image && (
              <Image
                style={styles.image}
                source={{
                  uri: user?.image,
                }}
              />
            )}
            <Pressable style={styles.editImage} onPress={pickImage}>
              <Text style={styles.editImageText}>Edit image</Text>
              <Feather name="edit-3" size={16} color="black" />
            </Pressable>
          </View>
          <Text style={styles.basic}>Basic Info</Text>
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
              textContentType="name"
              selectionColor="#2A8B00"
              placeholder="Shop Name*"
              placeholderTextColor="gray"
              // numberOfLines={4}
              // value={value}
              style={{ padding: 10 }}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              editable
              value={state.mobileNumber}
              onChangeText={(text) =>
                setState({
                  ...state,
                  mobileNumber: text,
                })
              }
              textContentType="telephoneNumber"
              selectionColor="#2A8B00"
              keyboardType="phone-pad"
              placeholder="Mobile number*"
              placeholderTextColor="gray"
              // numberOfLines={4}
              maxLength={10}
              // value={value}
              style={{ padding: 10 }}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              editable
              value={state.address}
              onChangeText={(text) =>
                setState({
                  ...state,
                  address: text,
                })
              }
              textContentType="addressCityAndState"
              selectionColor="#2A8B00"
              placeholder="Address*"
              placeholderTextColor="gray"
              // numberOfLines={4}
              // maxLength={13}
              // value={value}
              style={{ padding: 10 }}
            />
          </View>
        </View>
        <View style={styles.button}>
          <GreenButton
            onClick={onUpdate}
            title={"Save"}
            containerStyle={{
              marginBottom: 30,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileManufacturer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 15,
    backgroundColor: "#F5F5F5",
  },
  TopView: {
    justifyContent: "space-between",
    padding: 15,
    paddingBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    padding: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  editImage: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  editImageText: { fontSize: 15, fontWeight: "500", marginEnd: 3 },
  text: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    paddingLeft: 10,
  },
  basic: {
    fontSize: 19,
    padding: 10,
    fontWeight: "700",
    marginTop: 10,
  },
  changePassword: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 1,
  },
  ChangePasswordText: {
    fontSize: 16,
    fontWeight: "500",
    paddingLeft: 10,
  },
  button: {
    marginHorizontal: 15,
    marginBottom: 15,
    marginTop: 30,
  },
  textInput: {
    // backgroundColor: value,
    borderColor: "#bcbcbc",
    borderWidth: 1,
    padding: 5,
    marginTop: 15,
    borderRadius: 10,
  },
});
