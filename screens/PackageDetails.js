import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useRef } from "react";
import OrderItemCard from "../Components/OrderItemCard";
import { FlatList } from "react-native";
import GreenButton from "../Components/GreenButton";
import AddToDeliveryBottomSheet from "../Components/PackageDetails/AddToDeliveryBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  doc,
} from "firebase/firestore";

const PackageOrders = ({ PackageNumber, Orders, navigation, route }) => {
  const addToDeliveryBottomSheetRef = useRef(null);

  const [packageData, setPackageData] = React.useState(route.params.package);

  useEffect(() => {
    let unsubscribe;
    const ref = doc(db, "packages", route.params.package.id);
    unsubscribe = onSnapshot(ref, (doc) => {
      setPackageData({ id: doc.id, ...doc.data() });
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <>
      <Pressable
        style={styles.container}
        onPress={() => {
          addToDeliveryBottomSheetRef.current?.close();
        }}
      >
        <View style={styles.TopView}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLeft}>Package Number: </Text>
            <Text style={styles.textRight}>{packageData.id}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textLeft}>Orders in package: </Text>
            <Text style={styles.textRight}>{packageData.numOfOrders}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            {/* package deliver by */}
            {packageData.delivery && packageData.status !== "toShip" && (
              <Text
                style={[
                  styles.textLeft,
                  {
                    marginTop: 10,
                    color: "#000",
                    fontWeight: "bold",
                    fontSize: 16,
                  },
                ]}
              >
                {/* package delivery by text  */}
                {packageData.delivery.deliveryBy === "driver"
                  ? "Delivery by driver"
                  : "Delivery by yourself"}
              </Text>
            )}
          </View>
        </View>
        <FlatList
          data={packageData.orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <OrderItemCard
              {...item}
              navigation={navigation}
              // OrderDetails={"OrderDetails"}
            />
          )}
        />
        {/* //add to shipping button */}
        {packageData.status === "toShip" && (
          <View
            style={{
              margin: 10,
            }}
          >
            <GreenButton
              title={"Add to shipping"}
              onClick={() => {
                addToDeliveryBottomSheetRef.current?.expand();
              }}
            />
          </View>
        )}
        {/* Order Tracking button */}
        {packageData.delivery && packageData.status !== "toShip" && (
          <View
            style={{
              margin: 10,
            }}
          >
            <GreenButton
              title={"Order Tracking"}
              onClick={() => {
                if (packageData.delivery.deliveryBy === "driver") {
                  navigation.navigate("OrderDeliveryDriver", {
                    package: packageData,
                  });
                  return;
                }
                navigation.navigate("OrderDelivery", {
                  package: packageData,
                });
              }}
            />
          </View>
        )}
      </Pressable>
      <AddToDeliveryBottomSheet
        bottomSheetRef={addToDeliveryBottomSheetRef}
        data={packageData}
      />
    </>
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
