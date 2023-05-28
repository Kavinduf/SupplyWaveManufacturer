import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { Button, Image } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppContext } from "../context/appContext";
import { db } from "../firebase";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  getDoc,
  count,
  getCountFromServer,
} from "firebase/firestore";

const HomeManufacturer = ({ navigation }) => {
  const { logout, user } = useAppContext();

  navigation.addListener("focus", () => {
    getStats();
  });

  if (!user) {
    return null;
  }

  const [stats, setStats] = React.useState({
    pending: 0,
    shipped: 0,
    delivered: 0,
    toShip: 0,
    activeProducts: 0,
    inactiveProducts: 0,
    rejectedProducts: 0,
  });

  const onLogoutClicked = async () => {
    await logout();
    navigation.navigate("Login");
  };

  const getStats = async () => {
    const q = query(
      collection(db, "orders"),
      where("brandId", "==", user.uid),
      where("status", "==", "pending")
    );
    const pendingCount = (await getCountFromServer(q)).data().count;
    const q2 = query(
      collection(db, "packages"),
      where("brandId", "==", user.uid),
      where("status", "==", "shipped")
    );
    const shippedCount = (await getCountFromServer(q2)).data().count;
    const q3 = query(
      collection(db, "packages"),
      where("brandId", "==", user.uid),
      where("status", "==", "delivered")
    );
    const deliveredCount = (await getCountFromServer(q3)).data().count;
    const q4 = query(
      collection(db, "packages"),
      where("brandId", "==", user.uid),
      where("status", "==", "toShip")
    );
    const toShipCount = (await getCountFromServer(q4)).data().count;

    const q5 = query(
      collection(db, "products"),
      where("manufacturerId", "==", user.uid),
      where("status", "==", "active")
    );
    const activeProducts = (await getCountFromServer(q5)).data().count;
    const q6 = query(
      collection(db, "products"),
      where("manufacturerId", "==", user.uid),
      where("status", "==", "inactive")
    );
    const inactiveProducts = (await getCountFromServer(q6)).data().count;

    setStats({
      pending: pendingCount,
      shipped: shippedCount,
      delivered: deliveredCount,
      toShip: toShipCount,
      activeProducts: activeProducts,
      inactiveProducts: inactiveProducts,
    });
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Top View start */}

        <View style={styles.TopView}>
          <Pressable
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("BrandDetails")}
          >
            {user.image && (
              <Image
                source={{
                  uri: user.image,
                }}
                style={styles.image}
              />
            )}
            {!user.image && (
              <Image
                source={require("../assets/login-png.png")}
                style={styles.image}
              />
            )}
            <Text style={{ fontSize: 18, fontWeight: "600", width: 210 }}>
              {user.shopName}
            </Text>
            <AntDesign
              name="right"
              size={19}
              color="#2A8B00"
              style={{ paddingEnd: 5 }}
            />
          </Pressable>
        </View>

        {/* Top View end */}

        {/* Orders start */}

        <View style={styles.bottomView}>
          <Pressable onPress={() => navigation.navigate("Orders")}>
            {/* Orders top start */}

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 17, fontWeight: "600", width: 210 }}>
                Orders
              </Text>
              <AntDesign name="right" size={19} color="#2A8B00" />
            </View>
            {/* Orders top start */}

            <View
              style={{
                marginTop: 30,
              }}
            >
              <View style={{ paddingEnd: 10, paddingStart: 5 }}>
                {/* Orders Middle start */}

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 20, fontWeight: "300", marginStart: 20 }}
                  >
                    {stats.pending}
                  </Text>
                  <View style={styles.ordersLine}></View>
                  <Text style={styles.ordersText}>{stats.toShip}</Text>
                  <View style={styles.ordersLine}></View>
                  <Text style={styles.ordersText}>{stats.shipped}</Text>
                  <View style={styles.ordersLine}></View>
                  <Text
                    style={{ fontSize: 20, fontWeight: "300", marginEnd: 20 }}
                  >
                    {stats.delivered}
                  </Text>
                </View>
                {/* Orders Middle end */}
                {/* Orders bottom start */}

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                    marginBottom: 10,
                  }}
                >
                  <Pressable style={styles.ordersPressable}>
                    <Text
                      style={{
                        fontSize: 11,
                        marginEnd: 2,
                        marginStart: 5,
                        color: "grey",
                      }}
                    >
                      Pending
                    </Text>
                    <AntDesign
                      name="right"
                      size={9}
                      color="grey"
                      style={{ marginEnd: 28 }}
                    />
                  </Pressable>
                  <Pressable style={styles.ordersPressable}>
                    <Text style={styles.ordersPressableText}>To Ship</Text>
                    <AntDesign
                      name="right"
                      size={9}
                      color="grey"
                      style={{ marginEnd: 31 }}
                    />
                  </Pressable>
                  <Pressable style={styles.ordersPressable}>
                    <Text style={styles.ordersPressableText}>Shipped</Text>
                    <AntDesign
                      name="right"
                      size={9}
                      color="grey"
                      style={{ marginEnd: 20 }}
                    />
                  </Pressable>
                  <Pressable style={styles.ordersPressable}>
                    <Text style={styles.ordersPressableText}>Completed</Text>
                    <AntDesign name="right" size={9} color="grey" />
                  </Pressable>
                </View>

                {/* Orders bottom end */}
              </View>
            </View>
          </Pressable>
        </View>

        {/* Orders end */}

        {/* Products start */}

        <View style={styles.bottomView}>
          {/* Products top start */}

          <Pressable onPress={() => navigation.navigate("Products")}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 17, fontWeight: "600", width: 210 }}>
                Products
              </Text>
              <AntDesign name="right" size={19} color="#2A8B00" />
            </View>

            {/* Products top end */}

            <View
              style={{
                marginTop: 30,
              }}
            >
              <View style={{ paddingEnd: 10, paddingStart: 5 }}>
                {/* Products middle start */}

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 20, fontWeight: "300", marginStart: 25 }}
                  >
                    {stats.activeProducts}
                  </Text>
                  <View style={styles.ordersLine}></View>
                  <Text style={styles.ordersText}>
                    {stats.inactiveProducts}
                  </Text>
                  <View style={styles.ordersLine}></View>
                  <Text
                    style={{ fontSize: 20, fontWeight: "300", marginEnd: 28 }}
                  >
                    0
                  </Text>
                </View>

                {/* Products middle end*/}

                {/* Products Bottom start*/}

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                    marginBottom: 10,
                  }}
                >
                  <Pressable
                    style={styles.ordersPressable}
                    onPress={() => navigation.navigate("Products")}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        marginEnd: 10,
                        marginStart: 15,
                        color: "grey",
                      }}
                    >
                      Active
                    </Text>
                    <AntDesign
                      name="right"
                      size={9}
                      color="grey"
                      style={{ marginEnd: 30 }}
                    />
                  </Pressable>
                  <Pressable
                    style={styles.ordersPressable}
                    onPress={() => navigation.navigate("Products")}
                  >
                    <Text style={styles.ordersPressableText}>Inactive</Text>
                    <AntDesign
                      name="right"
                      size={9}
                      color="grey"
                      style={{ marginEnd: 31 }}
                    />
                  </Pressable>
                  <Pressable
                    style={styles.ordersPressable}
                    onPress={() =>
                      navigation.navigate("Products", {
                        screen: "Inactive(0)",
                      })
                    }
                  >
                    <Text style={styles.ordersPressableText}>Rejected</Text>
                    <AntDesign name="right" size={9} color="grey" />
                  </Pressable>
                </View>

                {/* Products Bottom end*/}
              </View>
            </View>
          </Pressable>
        </View>

        {/* products end */}

        {/* Store Management start */}

        <View style={styles.bottomView}>
          <Text style={{ fontSize: 17, fontWeight: "600" }}>
            Store Management
          </Text>

          {/* Pressable add products start          */}

          <Pressable
            style={styles.storePressableTop}
            onPress={() => navigation.navigate("AddProduct")}
          >
            <AntDesign name="pluscircleo" size={24} color="#2A8B00" />
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text style={styles.storeText}>Add products </Text>
              {/* <Text style={styles.storeText}> </Text> */}
            </View>
          </Pressable>

          {/* Pressable add products end        */}

          <View style={styles.storeView}>
            {/* Pressable products start          */}

            <Pressable
              style={styles.storePressable}
              onPress={() => navigation.navigate("Products")}
            >
              <SimpleLineIcons name="handbag" size={24} color="#2A8B00" />
              <View style={{ alignItems: "center", marginTop: 10 }}>
                <Text style={styles.storeText}> Products</Text>
              </View>
            </Pressable>

            {/* Pressable  products end        */}
            {/* Pressable Orders start          */}

            <Pressable
              style={styles.storePressable}
              onPress={() => navigation.navigate("Orders")}
            >
              <Ionicons name="clipboard-outline" size={24} color="#2A8B00" />
              <View style={{ alignItems: "center", marginTop: 10 }}>
                <Text style={styles.storeText}> Orders</Text>
              </View>
            </Pressable>

            {/* Pressable orders end        */}
            {/* Request Catergory Start        */}

            {/* <Pressable
              style={styles.storePressable}
              onPress={() => navigation.navigate("Orders")}
            >
              <MaterialCommunityIcons
                name="filter-variant-plus"
                size={28}
                color="#2A8B00"
              />
              <View style={{ alignItems: "center" }}>
                <Text style={styles.storeText}> Request Catergory</Text>
              </View>
            </Pressable> */}

            {/* Request Catergory end        */}
          </View>
        </View>
        <Button
          type="solid"
          color={"green"}
          title={"Logout"}
          containerStyle={{
            margin: 15,
          }}
          radius={5}
          raised
          onPress={onLogoutClicked}
        />
      </ScrollView>
      {/* Store Management end */}
    </SafeAreaView>
  );
};

export default HomeManufacturer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "#F5F5F5",
  },
  TopView: {
    justifyContent: "space-between",
    padding: 10,
    marginTop: 10,
    marginHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  bottomView: {
    justifyContent: "space-between",
    padding: 15,
    marginHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 1,
  },
  ordersText: {
    fontSize: 20,
    fontWeight: "300",
  },
  ordersLine: {
    backgroundColor: "#d6d6d6",
    height: 35,
    width: 1.5,
    marginStart: 5,
  },
  ordersPressable: {
    flexDirection: "row",
    alignItems: "center",
  },
  ordersPressableText: {
    fontSize: 11,
    marginEnd: 2,
    color: "grey",
  },
  // storeBottomView: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   padding: 15,
  //   marginHorizontal: 15,
  //   backgroundColor: "#FFF",
  //   borderRadius: 10,
  //   marginTop: 15,
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 1,
  //     height: 1,
  //   },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 2.5,
  //   elevation: 1,
  // },
  storeView: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
  storeText: {
    fontSize: 14,
    fontWeight: "500",
  },
  storePressableTop: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 1,
    marginTop: 20,
  },
  storePressable: {
    width: 155,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 1,
  },
});
