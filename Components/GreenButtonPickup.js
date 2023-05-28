import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";

const GreenButtonPickup = ({ onClick, title }) => {
  return (
    <Button
      color={"#BDE4B8"}
      radius={7}
      raised
      onPress={onClick}
      title={title}
      titleStyle={{
        color: "#000000",
        fontWeight: "bold",
        fontSize: 15,
      }}
      buttonStyle={{ height: 35 }}
    />
  );
};

export default GreenButtonPickup;

const styles = StyleSheet.create({});
