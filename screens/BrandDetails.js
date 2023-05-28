import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Pressable,
  FlatList,
  TextInput,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "@rneui/base";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import ItemCard from "../Components/ItemCard";
import { db } from "../firebase";
import {
  getDocs,
  doc,
  collection,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { Dialog, Input, Button, Icon } from "@rneui/themed";
import { useAppContext } from "../context/appContext";

const BrandDetails = ({ route }) => {
  const [items, setItems] = useState([]);

  const { addToCart, user } = useAppContext();

  useEffect(() => {
    const fetchItems = async () => {
      const q = query(
        collection(db, "products"),
        where("manufacturerId", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);
      const items = [];
      for (let i = 0; i < querySnapshot.docs.length; i++) {
        const doc = querySnapshot.docs[i];
        items.push({
          ...doc.data(),
          id: doc.id,
          manufacturer: {
            id: user.id,
            shopName: user.shopName,
          },
        });
      }

      setItems(items);
    };
    fetchItems();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.TopView}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {!user.image && (
            <Image
              style={{ height: 100, width: 100 }}
              source={require("../assets/login-png.png")}
            />
          )}
          {user.image && (
            <Image
              style={{ height: 100, width: 100, borderRadius: 15 }}
              source={{
                uri: user.image,
              }}
            />
          )}

          <View style={{ marginStart: 20 }}>
            <Text style={{ fontSize: 23, fontWeight: "600", width: 225 }}>
              {user.shopName}
            </Text>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                gap: -5,
                marginHorizontal: -5,
              }}
            >
              <Ionicons name="location-sharp" size={20} color="#2A8B00" />

              <View style={styles.pickupView}>
                <Text style={{ fontWeight: "500", width: 220 }}>
                  {user.address}
                </Text>
              </View>
            </View>
            <Pressable
              style={{
                gap: 5,
                flexDirection: "row",
                marginTop: 5,
              }}
            >
              <Icon
                type="feather"
                name="phone-call"
                size={15}
                color="#2A8B00"
              />
              <Text
                style={{
                  fontSize: 15,
                }}
              >
                {user.mobileNumber}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          marginStart: 15,
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        All Products
      </Text>
      <View>
        <FlatList
          data={items}
          ListFooterComponent={<View style={{ height: 100 }} />}
          ListFooterComponentStyle={{ marginBottom: 100 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ItemCard {...item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default BrandDetails;

const styles = StyleSheet.create({
  TopView: {
    justifyContent: "space-between",
    padding: 10,
    marginTop: 10,
    paddingHorizontal: 15,
    backgroundColor: "#BDE4B8",
    // borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 1,
    // borderColor: '#2A8B00',
    // borderWidth: 2,
    // borderStyle: 'dotted',
    marginHorizontal: 15,
    borderRadius: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    marginTop: 15,
  },
  pickupView: {
    // backgroundColor: "#BDE4B8",
    padding: 1,
    borderRadius: 5,
    marginStart: 5,
    marginBottom: 5,
  },
});
