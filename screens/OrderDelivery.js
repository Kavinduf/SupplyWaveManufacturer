import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import GreenButtonDeliver from "../Components/GreenButtonDeliver";
import GreenButton from "../Components/GreenButton";
import GreenButtonPickup from "../Components/GreenButtonPickup";
import moment from "moment";
import OrderCard from "../Components/OrderDelivery/OrderCard";

import { db } from "../firebase";
import {
  onSnapshot,
  doc,
  getDocs,
  collection,
  getDoc,
  query,
  updateDoc,
} from "firebase/firestore";
import { Button } from "@rneui/themed";

const OrderDetails = ({ route, navigation }) => {
  const { orders } = route.params.package;
  const [packageData, setPackageData] = useState(route.params.package);

  const [ordersArray, setOrdersArray] = useState(orders);
  const [status, setStatus] = useState("completed");

  useEffect(() => {
    let unsubscribe;
    const fetchOrders = async () => {
      const snapshot = doc(db, "packages", route.params.package.id);
      unsubscribe = onSnapshot(snapshot, (snapshot) => {
        setStatus(snapshot.data().status);
        const ordersNew = snapshot.data().orders;
        console.log("data");
        setOrdersArray(ordersNew);
      });
    };
    fetchOrders();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      console.log("component destroyed");
    };
  }, []);

  useEffect(() => {
    let completed = true;
    ordersArray.forEach(async (order) => {
      //check order on the package whether it is delivered
      if (order.status === "delivered") {
        //get order from orders collection
        const docRef = doc(db, "orders", order.id);
        const data = (await getDoc(docRef)).data();
        if (data.status !== "delivered") {
          console.log("not delivered order");
          await updateDoc(docRef, {
            status: "delivered",
            deliveredAt: new Date(),
          });
        }
      }
      if (order.status !== "delivered") {
        completed = false;
        setStatus("waiting");
      }
    });

    const makePackageComplete = async () => {
      if (completed) {
        if (packageData.status !== "delivered") {
          console.log("not delivered");
          await updateDoc(doc(db, "packages", route.params.package.id), {
            status: "delivered",
            deliveredAt: new Date(),
          });
        }
      }
    };

    makePackageComplete();
  }, [ordersArray]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.TopView}>
          {/* Pickup start */}

          {/* {Time and date start} */}

          <View style={styles.TopsubView}>
            <View style={styles.bottomRow}>
              <Feather
                name="clock"
                size={20}
                color="#5b5b5b"
                style={{ marginStart: 5 }}
              />
              <Text style={styles.bottomTextRight}>
                {moment(orders[0].createdAt.seconds * 1000).format(
                  "DD/MM/YYYY (hh:mm A)"
                )}
              </Text>
            </View>
            {/* {Time and date end} */}
            {/* Package id start */}
            <View style={styles.bottomRow}>
              <FontAwesome5
                name="hashtag"
                size={18}
                color="#5b5b5b"
                style={{ marginStart: 5 }}
              />
              <Text style={styles.bottomTextRight}>
                {route.params.package.id}
              </Text>
            </View>

            {/* Package id end */}
          </View>
          <FlatList
            data={ordersArray}
            ItemSeparatorComponent={() => {
              return (
                <View style={{ height: 1, backgroundColor: "#E5E5E5" }}></View>
              );
            }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <OrderCard item={item} packageId={route.params.package.id} />
            )}
          />
        </View>
      </View>
      {/* <View style={styles.bottomView}>
        <View style={styles.bottomRow}>
          <Text style={styles.bottomTextLeft}>Delivery Price: </Text>
          <Text style={styles.bottomTextRight}>
            LKR {route.params.package?.delivery?.price}
          </Text>
        </View>
      </View> */}
      {status === "waiting" && (
        <Text
          style={{
            fontSize: 20,
            marginTop: 20,
            textAlign: "center",
            color: "#5b5b5b",
            fontWeight: "bold",
          }}
        >
          Waiting to complete...
        </Text>
      )}
      {status === "delivered" && (
        <Text
          style={{
            fontSize: 20,
            marginTop: 20,
            textAlign: "center",
            color: "#5b5b5b",
            fontWeight: "bold",
          }}
        >
          Completed
        </Text>
      )}
      {/* <View style={styles.button}>
        <Button title={'Delivered'} />
      </View> */}
    </SafeAreaView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  TopView: {
    backgroundColor: "#FFF",
    // marginHorizontal: 15,
    // borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 1,
    marginTop: 10,
  },
  TopsubView: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    paddingBottom: 10,
  },
  TopSecondView: {
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  pickupView: {
    backgroundColor: "#BDE4B8",
    padding: 4,
    borderRadius: 5,
    marginStart: 5,
    marginBottom: 5,
  },
  DropView: {
    backgroundColor: "#FFD984",
    padding: 4,
    borderRadius: 5,
    marginStart: 8,
    marginBottom: 5,
  },
  orderId: {
    backgroundColor: "#FFD984",
    padding: 4,
    borderRadius: 5,
    marginStart: 10,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    backgroundColor: "#eeeeee",
    height: 2,
    marginTop: 5,
  },
  bottomView: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: "#BDE4B8",
    // borderBottomStartRadius: 10,
    // borderBottomEndRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 1,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 5,
  },
  bottomTextRight: {
    fontSize: 15,
    marginStart: 7,
    fontWeight: "600",
  },
  bottomTextLeft: {
    fontSize: 15,
    color: "#5b5b5b",
    fontWeight: "500",
    marginStart: 3,
  },
  button: {
    marginTop: "auto",
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  Subbutton: {
    paddingHorizontal: 25,
    width: 250,
    alignSelf: "center",
    marginVertical: 10,
  },
});
