import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import OrderItemCard from "../Components/OrderItemCard";

const PackageOrders = ({ PackageNumber, Orders }) => {
  return (
    <View style={styles.container}>
      <View style={styles.TopView}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLeft}>Package Number: </Text>
          <Text style={styles.textRight}>515113</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textLeft}>Orders in package: </Text>
          <Text style={styles.textRight}>5</Text>
        </View>
      </View>
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
};

export default PackageOrders;

const styles = StyleSheet.create({
  TopView: {
    alignItems: "center",
    padding: 10,
    paddingBottom: 15,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 1,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 5,
    backgroundColor: "#F5F5F5",
  },
  textLeft: {
    fontSize: 15,
    fontWeight: "500",
    color: "gray",
  },
  textRight: {
    fontSize: 15,
    fontWeight: "500",
  },
});
