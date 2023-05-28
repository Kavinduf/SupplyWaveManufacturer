import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Dialog, Image } from "@rneui/themed";
import {
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
  Fontisto,
  Ionicons,
  FontAwesome,
  SimpleLineIcons,
} from "@expo/vector-icons";

import { useAppContext } from "../context/appContext";

const Profile = ({ navigation }) => {
  const { logout, user } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const onLogout = async () => {
    setIsLoading(true);
    await logout();
    setIsLoading(false);
    navigation.navigate("Login");
    return;
  };

  if (!user) return <View></View>;

  return (
    <SafeAreaView styles={styles.container}>
      <Dialog
        isVisible={isLoading}
        sty
        overlayStyle={{
          width: 90,
          height: 90,
        }}
      >
        <Dialog.Loading />
      </Dialog>
      <View style={styles.TopView}>
        <View
          style={{
            justifyContent: "flex-end",
            alignSelf: "flex-start",
            paddingStart: 10,
            paddingTop: 10,
            width: 220,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            {user?.shopName}
          </Text>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 15,
              color: "grey",
              marginTop: 5,
            }}
          >
            {user?.mobileNumber}
          </Text>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 15,
              color: "grey",
              marginTop: 5,
            }}
          >
            {user?.email}
          </Text>
          {/* <View
              style={{
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "500" }}>Ratings</Text>
              <View style={{ alignSelf: "center", marginStart: 3, marginEnd: 3 }}>
                <FontAwesome5
                  name="grip-lines-vertical"
                  size={13}
                  color="black"
                />
              </View>
              <View style={{ alignSelf: "center", flexDirection: "row" }}>
                <AntDesign name="star" size={15} color="#2A8B00" />
                <AntDesign name="star" size={15} color="#2A8B00" />
                <AntDesign name="star" size={15} color="#2A8B00" />
                <AntDesign name="staro" size={15} color="#2A8B00" />
                <AntDesign name="staro" size={15} color="#2A8B00" />
              </View>
            </View> */}
        </View>
        <View></View>
        <View>
          {/* {!user?.image && ( */}
          {!user?.image && (
            <Image
              style={{ width: 100, height: 100 }}
              source={require("../assets/login-png.png")}
            />
          )}
          {user?.image && (
            <Image
              style={{ width: 100, height: 100, borderRadius: 10 }}
              source={{
                uri: user?.image,
              }}
            />
          )}
          {/* )}
          {user?.image && ( */}
          {/* <Image
              style={{ width: 100, height: 100, borderRadius: 50 }}
              source={{
                uri: user?.image,
              }}
            />
          )} */}
        </View>
      </View>
      <View style={styles.bottomView}>
        <Pressable
          style={{ flexDirection: "row", paddingStart: 5, marginTop: 15 }}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <MaterialCommunityIcons name="account-edit" size={24} color="black" />
          <Text style={styles.text}>Profile</Text>
        </Pressable>
        <Pressable
          style={{ flexDirection: "row", paddingStart: 9, marginTop: 40 }}
          onPress={() => navigation.navigate("Orders")}
        >
          <FontAwesome5 name="clipboard-list" size={20} color="black" />
          <Text
            style={{
              fontWeight: "600",
              fontSize: 16,
              alignSelf: "center",
              marginStart: 22,
            }}
          >
            Orders
          </Text>
        </Pressable>
        <Pressable
          style={{ flexDirection: "row", paddingStart: 9, marginTop: 40 }}
          onPress={() => navigation.navigate("Products")}
        >
          <SimpleLineIcons name="handbag" size={20} color="black" />
          <Text
            style={{
              fontWeight: "600",
              fontSize: 16,
              alignSelf: "center",
              marginStart: 22,
            }}
          >
            Products
          </Text>
        </Pressable>

        {/* <View style={{ flexDirection: 'row', paddingStart: 8, marginTop: 40 }}>
          <Ionicons name='ios-settings-sharp' size={20} color='black' />
          <Text style={styles.text}>Settings</Text>
        </View> */}
      </View>
      <Pressable style={styles.logout} onPress={onLogout}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons name="logout" size={22} color="#2A8B00" />
          <Text
            style={{
              fontWeight: "600",
              fontSize: 16,
              alignSelf: "center",
              marginStart: 5,
              color: "#2A8B00",
            }}
          >
            Logout
          </Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: "black",
  },
  TopView: {
    marginTop: StatusBar.currentHeight || 30,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginHorizontal: 10,
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
  bottomView: {
    justifyContent: "space-between",
    padding: 10,
    marginHorizontal: 10,
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
    marginTop: 15,
    paddingBottom: 20,
  },
  logout: {
    justifyContent: "space-between",
    padding: 10,
    marginHorizontal: 10,
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
    paddingBottom: 20,
    marginTop: 15,
  },
  text: {
    fontWeight: "600",
    fontSize: 16,
    alignSelf: "center",
    marginStart: 20,
  },
});
