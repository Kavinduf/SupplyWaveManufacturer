import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OrderItemCard from "../Components/OrderItemCard";
import OrderItemCardToShip from "../Components/OrderItemCardToShip";
import GreenButton from "../Components/GreenButton";
import PackageCard from "../Components/PackageCard";

// Pending screen start

function PendingScreen({}) {
  return (
    <View style={styles.Subcontainer}>
      <ScrollView>
        <OrderItemCard
          OrderNumber={234762354}
          Time={20.09}
          Date={"12 / 05 / 2020"}
          Total={15000}
          // OrderDetails={"OrderDetails"}
        />
      </ScrollView>
    </View>
  );
}

// Pending screen end
// Accepted screen start

function AcceptedScreen({}) {
  return (
    <View style={styles.Subcontainer}>
      <ScrollView>
        <OrderItemCardToShip
          OrderNumber={234762354}
          Time={20.09}
          Date={"12 / 05 / 2020"}
          Total={15000}
          // OrderDetails={"OrderDetails"}
        />
      </ScrollView>
      <View style={{ marginHorizontal: 15, marginBottom: 10, marginTop: 15 }}>
        <GreenButton title={"Ready to deliver"} />
      </View>
    </View>
  );
}

// Accepted screen end

// ToShip screen start

function ToShipScreen() {
  return (
    <View style={styles.Subcontainer}>
      <ScrollView>
        <PackageCard
          PackageNumber={124234235}
          Orders={5}
          // OrderDetails={"OrderDetails"}
        />
      </ScrollView>
      <View style={{ marginHorizontal: 15, marginBottom: 10, marginTop: 15 }}>
        <GreenButton title={"Deliver"} />
      </View>
    </View>
  );
}

// ToShip screen end

// Shipped screen start

function ShippedScreen() {
  return (
    <View style={styles.Subcontainer}>
      <ScrollView>
        <OrderItemCard
          OrderNumber={234762354}
          Time={20.09}
          Date={"12 / 05 / 2020"}
          Total={15000}
          // OrderDetails={"OrderDetails"}
        />
      </ScrollView>
    </View>
  );
}

// Shipped screen end

// Completed screen start

function CompletedScreen() {
  return (
    <View style={styles.Subcontainer}>
      <OrderItemCard
        OrderNumber={234762354}
        Time={20.09}
        Date={"12 / 05 / 2020"}
        Total={15000}
        // OrderDetails={"OrderDetails"}
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
            fontSize: 12,
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
        <Tab.Screen name="Accepted  (0)" component={AcceptedScreen} />
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
  Subcontainer: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 15,
    backgroundColor: "#F5F5F5",
    marginTop: 15,
  },
});
