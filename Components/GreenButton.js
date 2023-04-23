import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";

const GreenButton = ({ onClick, title }) => {
  return (
    <Button
      color={"#BDE4B8"}
      radius={7}
      raised
      onPress={onClick}
      title={title}
      titleStyle={{ color: "#000000", fontWeight: "bold", fontSize: 17 }}
      buttonStyle={{ height: 50 }}
    />
  );
};

export default GreenButton;

const styles = StyleSheet.create({});
