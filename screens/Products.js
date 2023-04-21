import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProductItemCard from "../Components/ProductItemCard";
import { Image } from "@rneui/base";

// active screen start

function ActiveScreen() {
  return (
    <View style={styles.container}>
      <ProductItemCard
        title={"Maliban 100g (12pc)"}
        Pieces={15}
        unitPrice={1500}
        stock={50}
        pieces={15}
      />
    </View>
  );
}

// active screen end

// Out od stock Screen start

function InactiveScreen() {
  return (
    <View style={styles.container}>
      <ProductItemCard
        title={"Maliban 100g (12pc)"}
        Pieces={15}
        unitPrice={1500}
        stock={50}
        pieces={15}
      />
    </View>
  );
}

// Out od stock Screen end

// rejected screen start

function RejectedScreen() {
  return (
    <View style={styles.container}>
      <ProductItemCard
        title={"Maliban 100g (12pc)"}
        Pieces={15}
        unitPrice={1500}
        stock={50}
        pieces={15}
      />
    </View>
  );
}

// rejected screen end

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
        <Tab.Screen name="Active(0)" component={ActiveScreen} />
        <Tab.Screen name="Inactive(0)" component={InactiveScreen} />
        <Tab.Screen name="Rejected(0)" component={RejectedScreen} />
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
