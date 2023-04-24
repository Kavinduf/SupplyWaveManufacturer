import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";

const OrderDetails = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.TopView}>
        <View>
          <Text style={styles.heading}>Order Information</Text>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text>Order ID: </Text>
            <Text></Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 5,
    backgroundColor: "#F5F5F5",
  },
  TopView: {
    padding: 10,
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
  heading: {
    fontWeight: "500",
    fontSize: 15,
  },
});
