import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProductItemCard from "../Components/ProductItemCard";

// Pending screen start

function PendingScreen() {
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

// Pending screen end

// ToShip screen start

function ToShipScreen() {
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

// ToShip screen end

// Shipped screen start

function ShippedScreen() {
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

// Shipped screen end

// Completed screen start

function CompletedScreen() {
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

// Completed screen end

const Tab = createMaterialTopTabNavigator();

const Orders = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 14,
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
        <Tab.Screen name="Pending (0)" component={PendingScreen} />
        <Tab.Screen name="To Ship  (0)" component={ToShipScreen} />
        <Tab.Screen name="Shipped (0)" component={ShippedScreen} />
        <Tab.Screen name="Completed (0)" component={CompletedScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 15,
    backgroundColor: "#F5F5F5",
  },
});
