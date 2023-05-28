import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  Alert,
} from "react-native";
import React, { memo } from "react";
import { Image } from "@rneui/themed";
import { Icon, color } from "@rneui/base";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

import { db } from "../firebase";
import { collection, updateDoc, doc, deleteDoc } from "firebase/firestore";

const ProductItemCard = ({
  title,
  pieces,
  unitPrice,
  status,
  image,
  id,
  weight,
  category,
  subCategory,
  setIsLoading,
  getProducts,
  navigation,
}) => {
  const onDeactivateClicked = async () => {
    setIsLoading(true);
    await updateDoc(doc(db, "products", id), {
      status: "inactive",
    });
    setIsLoading(false);
    getProducts();
  };

  const onActivateClicked = async () => {
    setIsLoading(true);
    await updateDoc(doc(db, "products", id), {
      status: "active",
    });
    setIsLoading(false);
    getProducts();
  };

  const onEditClicked = () => {
    navigation.navigate("AddProduct", {
      product: {
        productName: title,
        piecesInUnit: pieces,
        pricePerUnit: unitPrice,
        category,
        weight,
        subCategory,
        image,
        id,
      },
    });
  };

  const deleteProduct = async () => {
    setIsLoading(true);
    await deleteDoc(doc(db, "products", id));
    setIsLoading(false);
    getProducts();
  };

  const onDeleteClicked = async () => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteProduct(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 5 }}>
        <View style={styles.TopView}>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {!image && (
              <Image
                source={require("../assets/login-png.png")}
                style={{
                  width: 80,
                  height: 80,
                }}
              />
            )}
            {image && (
              <Image
                source={{
                  uri: image,
                }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 10,
                }}
              />
            )}
            <View style={{ paddingStart: 2, marginBottom: 5 }}>
              <Text style={styles.textTitle}>{title}</Text>

              {/* title end */}
              {/* Description start */}
              {/* <View style={{ flexDirection: "row" }}>
                <Text style={styles.textDescriptionLeft}>Stock :</Text>
                <Text style={styles.textDescriptionRight}>{stock}</Text>
              </View> */}
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.textDescriptionLeft}>
                  Pieces in a unit :
                </Text>
                <Text style={styles.textDescriptionRight}>{pieces}</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={styles.textDescriptionLeft}>Unit price :</Text>
                <Text style={styles.textDescriptionRight}>LKR {unitPrice}</Text>
              </View>
              {/* Description end*/}
            </View>
          </View>
          <View
            style={{ backgroundColor: "#d6d6d6", width: 320, height: 2 }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              justifyContent: "space-between",
              marginHorizontal: 10,
            }}
          >
            <Pressable
              style={{ flexDirection: "row", gap: 5 }}
              onPress={onEditClicked}
            >
              <AntDesign name="edit" size={21} color={"#2A8B00"} />
              <Text style={styles.textBottom}>Edit</Text>
            </Pressable>
            <View style={styles.line}></View>
            {status === "active" && (
              <Pressable onPress={onDeactivateClicked}>
                <Text style={styles.textBottom}>Deactivate</Text>
              </Pressable>
            )}
            {status === "inactive" && (
              <Pressable onPress={onActivateClicked}>
                <Text style={styles.textBottom}>Activate</Text>
              </Pressable>
            )}
            <View style={styles.line}></View>
            {/* <Pressable>
              <AntDesign name='edit' size={21} color={'#2A8B00'} />
            </Pressable> */}
            {/* <View style={styles.line}></View> */}
            <Pressable>
              <AntDesign
                onPress={onDeleteClicked}
                name="delete"
                size={21}
                color={"#2A8B00"}
                style={{ marginEnd: 5 }}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(ProductItemCard);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
  },
  TopView: {
    justifyContent: "space-between",
    padding: 10,
    marginHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    marginTop: 10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 1,
  },
  viewImage: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  textTitle: {
    fontWeight: "600",
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 16,
    width: 245,
  },
  textDescriptionLeft: {
    fontWeight: "500",
    fontSize: 15,
    paddingBottom: 3,
    color: "gray",
  },
  textDescriptionRight: {
    fontWeight: "500",
    paddingStart: 5,
    fontSize: 15,
    paddingBottom: 3,
  },
  textPrice: {
    fontSize: 15,
    fontWeight: "600",
    marginLeft: "auto",
  },
  textBottom: {
    fontSize: 17,
    fontWeight: "600",
    color: "#2A8B00",
  },
  line: {
    width: 2,
    height: 20,
    backgroundColor: "#d6d6d6",
  },
});
