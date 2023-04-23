import { StyleSheet, Text, View, StatusBar, Pressable } from "react-native";
import React from "react";
import { Image } from "@rneui/themed";
import { Icon, color } from "@rneui/base";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

const ProductItemCard = ({ title, pieces, unitPrice }) => {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 10 }}>
        <View style={styles.TopView}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../assets/login-png.png")}
              style={{
                width: 80,
                height: 80,
              }}
            />
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
                <Text style={styles.textDescriptionRight}>
                  {unitPrice} LKR{" "}
                </Text>
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
            <Pressable>
              <Text style={styles.textBottom}>Edit Price</Text>
            </Pressable>
            <View style={styles.line}></View>
            <Pressable>
              <Text style={styles.textBottom}>Deactivate</Text>
            </Pressable>
            <View style={styles.line}></View>
            <Pressable>
              <AntDesign name="edit" size={21} color={"#2A8B00"} />
            </Pressable>
            <View style={styles.line}></View>
            <Pressable>
              <AntDesign
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

export default ProductItemCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 15,
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
