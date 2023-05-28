import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProductItemCard from "../Components/ProductItemCard";
import { Image } from "@rneui/base";

import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Dialog } from "@rneui/themed";
import { useAppContext } from "../context/appContext";

// active screen start

function ActiveScreen({ navigation }) {
  const { user } = useAppContext();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    setIsLoading(true);
    const q = query(
      collection(db, "products"),
      where("status", "==", "active"),
      where("manufacturerId", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(products);
    setIsLoading(false);
  };
  useEffect(() => {
    getProducts();
    navigation.addListener("focus", () => {
      getProducts();
    });
  }, []);

  return (
    <View style={styles.container}>
      <Dialog
        isVisible={isLoading}
        overlayStyle={{
          width: 90,
          height: 90,
        }}
      >
        <Dialog.Loading />
      </Dialog>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductItemCard
            title={item.productName}
            unitPrice={item.pricePerUnit}
            stock={item.stock}
            pieces={item.piecesInUnit}
            image={item.image}
            status={item.status}
            weight={item.weight}
            id={item.id}
            setIsLoading={setIsLoading}
            getProducts={getProducts}
            navigation={navigation}
            category={item.category}
            subCategory={item.subCategory}
          />
        )}
      />
    </View>
  );
}

// active screen end

// Out od stock Screen start

function InactiveScreen({ navigation }) {
  const { user } = useAppContext();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    setIsLoading(true);
    const q = query(
      collection(db, "products"),
      where("status", "==", "inactive"),
      where("manufacturerId", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(products);
    setIsLoading(false);
  };
  useEffect(() => {
    getProducts();
    navigation.addListener("focus", () => {
      getProducts();
    });
  }, []);
  return (
    <View style={styles.container}>
      <Dialog
        isVisible={isLoading}
        overlayStyle={{
          width: 90,
          height: 90,
        }}
      >
        <Dialog.Loading />
      </Dialog>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductItemCard
            title={item.productName}
            unitPrice={item.pricePerUnit}
            stock={item.stock}
            pieces={item.piecesInUnit}
            image={item.image}
            status={item.status}
            id={item.id}
            setIsLoading={setIsLoading}
            getProducts={getProducts}
            navigation={navigation}
            category={item.category}
            subCategory={item.subCategory}
          />
        )}
      />
    </View>
  );
}

// Out od stock Screen end

// // rejected screen start

// function RejectedScreen() {
//   const { user } = useAppContext();
//   return (
//     <View style={styles.container}>
//       <ProductItemCard
//         title={'Maliban 100g (12pc)'}
//         Pieces={15}
//         unitPrice={1500}
//         stock={50}
//         pieces={15}
//       />
//     </View>
//   );
// }

// // rejected screen end

const Tab = createMaterialTopTabNavigator();
const Products = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 15,
            color: "black",
            fontWeight: "500",
            textTransform: "capitalize",
          },
          tabBarStyle: { backgroundColor: "#F5F5F5" },
          tabBarIndicatorStyle: {
            backgroundColor: "#2A8B00",
            height: 3,
            borderRadius: 50,
          },
        }}
      >
        <Tab.Screen name="Active" component={ActiveScreen} />
        <Tab.Screen name="Inactive" component={InactiveScreen} />
        {/* <Tab.Screen name='Rejected' component={RejectedScreen} /> */}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 15,
    backgroundColor: "#F5F5F5",
  },
});
