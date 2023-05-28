import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";

const GreenButtonDeliver = ({ onClick, title }) => {
  return (
    <Button
      color={"#FFD984"}
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

export default GreenButtonDeliver;

const styles = StyleSheet.create({});
