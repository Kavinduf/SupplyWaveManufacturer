import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OrderItemCard from "../Components/OrderItemCard";
import OrderItemCardToShip from "../Components/OrderItemCardToShip";
import GreenButton from "../Components/GreenButton";
import PackageCard from "../Components/PackageCard";
import { db } from "../firebase";
import { MaterialIcons } from "@expo/vector-icons";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { Dialog } from "@rneui/themed";
import { FlatList } from "react-native";
import { useAppContext } from "../context/appContext";

// Pending screen start

const getOrders = async (status, user) => {
  const q = query(
    collection(db, "orders"),
    where("brandId", "==", user.uid),
    where("status", "==", status)
  );
  const querySnapshot = await getDocs(q);
  const orders = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return orders;
};

function PendingScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAppContext();

  const getPendingOrders = async () => {
    setIsLoading(true);
    const orders = await getOrders("pending", user);
    setOrders(orders);
    setIsLoading(false);
  };

  useEffect(() => {
    getPendingOrders();
    navigation.addListener("focus", () => {
      getPendingOrders();
    });
  }, []);

  return (
    <View style={styles.Subcontainer}>
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
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderItemCard
            navigation={navigation}
            {...item}
            // OrderDetails={"OrderDetails"}
          />
        )}
      />
    </View>
  );
}

// Pending screen end
// Accepted screen start

function AcceptedScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mappedOrdersByCity, setMappedOrdersByCity] = useState({});
  const [filterByCity, setFilterByCity] = useState(false);

  const { user } = useAppContext();

  const [selectedOrders, setSelectedOrders] = useState([]);

  const getAcceptedOrders = async () => {
    setIsLoading(true);
    const orders = await getOrders("accepted", user);
    let mappedOrdersByCity = {};

    orders.forEach((order) => {
      if (mappedOrdersByCity[order.deliverStore.city]) {
        mappedOrdersByCity[order.deliverStore.city].push(order);
      } else {
        mappedOrdersByCity[order.deliverStore.city] = [order];
      }
    });
    setMappedOrdersByCity(mappedOrdersByCity);
    // console.log(mappedOrdersByCity);
    setOrders(orders);
    setIsLoading(false);
  };

  useEffect(() => {
    getAcceptedOrders();
    navigation.addListener("focus", () => {
      getAcceptedOrders();
    });
  }, []);

  const onClickReadyToDeliver = async () => {
    setIsLoading(true);
    const ordersData = orders.filter((order) =>
      selectedOrders.includes(order.id)
    );
    await addDoc(collection(db, "packages"), {
      orders: ordersData,
      status: "toShip",
      numOfOrders: selectedOrders.length,
      brandId: user.uid,
      brandName: user.shopName,
      brandAddress: user.address,
      brandEmail: user.email,
      brandPhone: user.mobileNumber,
      createdAt: new Date(),
    });
    for (let i = 0; i < selectedOrders.length; i++) {
      const docRef = doc(db, "orders", selectedOrders[i]);
      await updateDoc(docRef, {
        status: "toShip",
        toShipDate: new Date(),
      });
    }
    setIsLoading(false);
    setSelectedOrders([]);
    getAcceptedOrders();
  };

  return (
    <View style={styles.Subcontainer}>
      <Dialog
        isVisible={isLoading}
        overlayStyle={{
          width: 90,
          height: 90,
        }}
      >
        <Dialog.Loading />
      </Dialog>
      {!filterByCity && (
        <Pressable
          onPress={() => setFilterByCity(true)}
          style={{ flexDirection: "row", gap: -5, marginHorizontal: 15 }}
        >
          <Text style={styles.filterText}>Filter By City </Text>
          <MaterialIcons name="navigate-next" size={30} />
        </Pressable>
      )}
      {filterByCity && (
        <Pressable
          onPress={() => setFilterByCity(false)}
          style={{ flexDirection: "row", gap: -5, marginHorizontal: 15 }}
        >
          <Text style={styles.filterText}>Filter By Order Time </Text>
          <MaterialIcons name="navigate-next" size={30} />
        </Pressable>
      )}
      {/* <View style={{ flexDirection: 'row', gap: -5 }}>
        <Text style={styles.filterText}>Filter By Order Time </Text>
        <MaterialIcons name='navigate-next' size={30} />
      </View> */}
      {filterByCity && (
        <FlatList
          data={Object.keys(mappedOrdersByCity)}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => {
            // console.log(item);
            return (
              <View style={{ marginVertical: 10 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginHorizontal: 15,
                  }}
                >
                  {item}
                </Text>
                {
                  <FlatList
                    data={mappedOrdersByCity[item]}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                      return (
                        <OrderItemCardToShip
                          navigation={navigation}
                          {...item}
                          selected={selectedOrders.includes(item.id)}
                          setSelectedOrders={setSelectedOrders}
                          // OrderDetails={"OrderDetails"}
                        />
                      );
                    }}
                  />
                }
              </View>
            );
          }}
        />
      )}
      {!filterByCity && (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <OrderItemCardToShip
                navigation={navigation}
                {...item}
                selected={selectedOrders.includes(item.id)}
                setSelectedOrders={setSelectedOrders}
                // OrderDetails={"OrderDetails"}
              />
            );
          }}
        />
      )}
      {selectedOrders.length > 0 && (
        <View style={{ marginHorizontal: 15, marginBottom: 10, marginTop: 15 }}>
          <GreenButton
            title={"Ready to deliver"}
            onClick={onClickReadyToDeliver}
          />
        </View>
      )}
    </View>
  );
}

// Accepted screen end

// ToShip screen start

function ToShipScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedOrders, setSelectedOrders] = useState([]);

  const { user } = useAppContext();

  const getToShipOrders = async () => {
    setIsLoading(true);
    const q = query(
      collection(db, "packages"),
      where("brandId", "==", user.uid),
      where("status", "==", "toShip")
    );
    const orders = await getDocs(q);
    const ordersData = orders.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOrders(ordersData);
    setIsLoading(false);
  };

  useEffect(() => {
    getToShipOrders();
    navigation.addListener("focus", () => {
      getToShipOrders();
    });
  }, []);

  // const onClickShipped = async () => {
  //   setIsLoading(true);

  //   for (let i = 0; i < orders.length; i++) {
  //     if (selectedOrders.includes(orders[i].id)) {
  //       for (let j = 0; j < orders[i].orders.length; j++) {
  //         const docRef = doc(db, 'orders', orders[i].orders[j].id);
  //         await updateDoc(docRef, {
  //           status: 'shipped',
  //         });
  //       }
  //     }
  //   }

  // for (let i = 0; i < selectedOrders.length; i++) {
  //   const docRef = doc(db, 'packages', selectedOrders[i]);
  //   await updateDoc(docRef, {
  //     status: 'shipped',
  //     shippedAt: new Date(),
  //   });
  // }
  //   setIsLoading(false);
  //   setSelectedOrders([]);
  //   getToShipOrders();
  // };

  return (
    <View style={styles.Subcontainer}>
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
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <PackageCard
              {...item}
              navigation={navigation}
              setSelectedOrders={setSelectedOrders}
              selected={null}
              // OrderDetails={"OrderDetails"}
            />
          );
        }}
      />
      {/* <ScrollView>
        <PackageCard
          PackageNumber={124234235}
          Orders={5}
          navigation={navigation}
          // OrderDetails={"OrderDetails"}
        />
      </ScrollView> */}
      {/* {selectedOrders.length > 0 && (
        <View style={{ marginHorizontal: 15, marginBottom: 10, marginTop: 15 }}>
          <GreenButton title={'Shipped'} onClick={onClickShipped} />
        </View>
      )} */}
    </View>
  );
}

// ToShip screen end

// Shipped screen start

function ShippedScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedOrders, setSelectedOrders] = useState([]);

  const { user } = useAppContext();

  const getShippedOrders = async () => {
    setIsLoading(true);
    const q = query(
      collection(db, "packages"),
      where("brandId", "==", user.uid),
      where("status", "==", "shipped")
    );
    const orders = await getDocs(q);
    const ordersData = orders.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOrders(ordersData);
    setIsLoading(false);
  };

  useEffect(() => {
    getShippedOrders();
    navigation.addListener("focus", () => {
      getShippedOrders();
    });
  }, []);

  const onClickDelivered = async () => {
    setIsLoading(true);
    for (let i = 0; i < orders.length; i++) {
      if (selectedOrders.includes(orders[i].id)) {
        for (let j = 0; j < orders[i].orders.length; j++) {
          const docRef = doc(db, "orders", orders[i].orders[j].id);
          await updateDoc(docRef, {
            status: "delivered",
            deliveredAt: new Date(),
          });
        }
      }
    }
    for (let i = 0; i < selectedOrders.length; i++) {
      const docRef = doc(db, "packages", selectedOrders[i]);
      await updateDoc(docRef, {
        status: "delivered",
        deliveredAt: new Date(),
      });
    }
    setIsLoading(false);
    setSelectedOrders([]);
    getShippedOrders();
  };

  return (
    <View style={styles.Subcontainer}>
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
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <PackageCard
              {...item}
              navigation={navigation}
              setSelectedOrders={setSelectedOrders}
              selected={selectedOrders.includes(item.id)}
              // OrderDetails={"OrderDetails"}
            />
          );
        }}
      />
      {selectedOrders.length > 0 && (
        <View style={{ marginHorizontal: 15, marginBottom: 10, marginTop: 15 }}>
          <GreenButton title={"Delivered"} onClick={onClickDelivered} />
        </View>
      )}
    </View>
  );
}

// Shipped screen end

// Completed screen start

function CompletedScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAppContext();

  const getDeliveredOrders = async () => {
    setIsLoading(true);
    const q = query(
      collection(db, "packages"),
      where("brandId", "==", user.uid),
      where("status", "==", "delivered")
    );
    const orders = await getDocs(q);
    const ordersData = orders.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOrders(ordersData);
    setIsLoading(false);
  };

  useEffect(() => {
    getDeliveredOrders();
    navigation.addListener("focus", () => {
      getDeliveredOrders();
    });
  }, []);

  return (
    <View style={styles.Subcontainer}>
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
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <PackageCard {...item} navigation={navigation} selected={null} />
          );
        }}
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
        <Tab.Screen
          name="Pending"
          component={PendingScreen}
          options={{
            title: "Pending",
          }}
        />
        <Tab.Screen name="Accepted" component={AcceptedScreen} />
        <Tab.Screen name="To Ship" component={ToShipScreen} />
        <Tab.Screen name="Shipped" component={ShippedScreen} />

        <Tab.Screen name="Completed" component={CompletedScreen} />
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
  filterText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
