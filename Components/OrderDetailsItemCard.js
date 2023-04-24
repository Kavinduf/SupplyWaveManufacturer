import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

const OrderDetailsItemCard = ({
  title,
  pieces,
  unitPrice,
  quantity,
  total,
}) => {
  return (
    <View>
      <View>
        <Text style={styles.title}>
          {title} ({pieces}pc)
        </Text>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textDescriptionLeft}>Unit price :</Text>
          <Text style={styles.textDescriptionRight}>LKR {unitPrice}</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.textDescriptionLeft}>quantity :</Text>
          <Text style={styles.textDescriptionRight}> {quantity}</Text>
          {/* empty views to allign start */}
          <View></View>
          <View></View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ fontWeight: "500" }}>LKR {total}</Text>
          </View>
        </View>
        <View style={styles.divider}></View>
      </View>
    </View>
  );
};

export default OrderDetailsItemCard;

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: "600",
    // marginBottom: 5,
  },
  textDescriptionLeft: {
    fontWeight: "400",
    fontSize: 13,
  },
  textDescriptionRight: {
    fontWeight: "500",
    color: "gray",
    paddingStart: 5,
    fontSize: 13,
    marginEnd: 150,
  },
  divider: {
    borderWidth: 1,
    borderColor: "#f2f2f2",
    marginBottom: 5,
    marginTop: 5,
  },
});
