import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";

const PackageOrders = () => {
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
};

export default PackageOrders;

const styles = StyleSheet.create({});
