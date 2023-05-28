import React from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Input } from "@rneui/themed";
import { Image } from "@rneui/themed";

import { KeyboardAvoidingView } from "react-native";
import GreenButton from "../Components/GreenButton";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";

export default function Login({ navigation }) {
  const { login, autoLogin, user } = useAppContext();
  useEffect(() => {
    console.log("user", user);
    if (user) {
      navigation.navigate("HomeManufacturer");
    }
  }, [user]);

  useEffect(() => {
    autoLogin();
  }, []);

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    if (state.email === "" || state.password === "") {
      alert("Please enter email and password");
      return;
    }
    try {
      await login({ email: state.email, password: state.password });
    } catch (error) {
      alert(error.message);
    }
  };

  // useEffect(() => {
  //   const user = auth.currentUser;
  //   if (user) {
  //     console.log('user is signed in');
  //     navigation.navigate('HomeManufacturer');
  //   }
  // }, []);
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/login-png.png")}
            style={{
              width: 200,
              height: 200,
              marginBottom: 50,
            }}
          />
        </View>

        {/* input fields */}

        <Text style={styles.LableAlign}>Email</Text>
        <View style={{ flexDirection: "row" }}>
          <Input
            textContentType="emailAddress"
            selectionColor="#2A8B00"
            keyboardType="email-address"
            placeholder="john@gmail.com"
            value={state.email}
            onChangeText={(text) => setState({ ...state, email: text })}
            // rightIcon={{
            //   type: "feather",
            //   name: "check",
            //   size: 18,
            // }}
            style={{ fontSize: 15 }}
          />
        </View>

        <Text style={styles.LableAlign}>Password</Text>
        <View style={{ flexDirection: "row" }}>
          <Input
            textContentType="password"
            selectionColor="#2A8B00"
            value={state.password}
            onChangeText={(text) => setState({ ...state, password: text })}
            placeholder="••••••••••"
            secureTextEntry={true}
            // rightIcon={{
            //   type: "feather",
            //   name: "eye-off",
            //   size: 18,
            // }}
            style={{ fontSize: 15 }}
          />
        </View>

        <Text
          style={{
            alignItems: "center",
            marginTop: 0,
            marginBottom: 10,
            marginEnd: 10,
            alignSelf: "flex-end",
            color: "#2A8B00",
          }}
        >
          Forgot?
        </Text>

        {/* button */}

        <View style={{ marginTop: 10, marginEnd: 10, marginStart: 10 }}>
          <GreenButton onClick={onLogin} title={"SIGN IN"} />
        </View>

        {/* Text below button */}

        <View style={{ flexDirection: "row", marginTop: 40 }}>
          <Text style={{ alignSelf: "flex-start", marginStart: 15 }}>
            Don't Have Account?
          </Text>
          <Text
            onPress={() => navigation.navigate("MobileRegister")}
            style={{
              marginLeft: 115,
              fontWeight: "bold",
              marginEnd: 10,
              color: "#2A8B00",
            }}
          >
            Sign Up
          </Text>
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
    justifyContent: "center",
    marginHorizontal: 20,
    fontSize: 30,
  },

  LableAlign: {
    marginStart: 10,
    color: "#737373",
  },

  //   BtnLogin
  // {
  //   borderRadius: 10,
  //   backgroundColor: "#FFCC59",
  //   Margin: 20,
  // }
});
