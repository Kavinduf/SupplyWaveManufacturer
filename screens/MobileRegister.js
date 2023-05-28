import React, { Component } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Button, Input } from "@rneui/themed";
import { Image } from "@rneui/themed";
import { Icon } from "@rneui/themed";
import { color } from "@rneui/base";
import { KeyboardAvoidingView } from "react-native";
import GreenButton from "../Components/GreenButton";

export default function MobileRegister({ navigation }) {
  const [value, setValue] = React.useState("");

  return (
    <SafeAreaView style={styles.container}>
      {/* header section start */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        keyboardVerticalOffset={100}
      >
        <Text onPress={() => navigation.navigate("Register")}>Back</Text>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 25, fontWeight: "bold", marginTop: 70 }}>
            Continue With Phone
          </Text>
          {/* <Text style={{ color: "#737373", marginTop: 15 }}>
            We will send One Time Password
          </Text>
          <Text style={{ color: "#737373", marginTop: 5 }}>
            to this phone number
          </Text> */}

          {/* header section end */}

          {/* Image & Input fields start */}

          <Image
            source={require("../assets/MobileRegister-image.png")}
            style={{
              width: 250,
              height: 250,
              marginTop: 20,
            }}
          />

          <Text style={{ color: "#737373", marginTop: 5 }}>
            Enter your phone number
          </Text>

          <Input
            textContentType="telephoneNumber"
            maxLength={10}
            textAlign="center"
            selectionColor="#2A8B00"
            keyboardType="phone-pad"
            placeholder="0761234567"
            value={value}
            onChangeText={(text) => setValue(text)}
            style={{ marginTop: 10, fontSize: 15 }}
          />

          {/* Image & Input fields end */}

          {/* button start*/}
          <GreenButton
            onClick={() => {
              navigation.navigate("EnterDetailsManufacturer", {
                mobileNumber: value,
              });
            }}
            title={"Continue"}
          />
          {/* button end*/}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 30,
    // alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: 20,
    fontSize: 30,
  },
});
