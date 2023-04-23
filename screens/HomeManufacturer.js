import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Pressable,
} from "react-native";
import React from "react";
import { Image } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";

const HomeManufacturer = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top View start */}

      <View style={styles.TopView}>
        <Pressable
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/login-png.png")}
            style={styles.image}
          />
          <Text style={{ fontSize: 18, fontWeight: "600", width: 210 }}>
            Maliban Pvt Ltd
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
                  0
                </Text>
                <View style={styles.ordersLine}></View>
                <Text style={styles.ordersText}>0</Text>
                <View style={styles.ordersLine}></View>
                <Text style={styles.ordersText}>0</Text>
                <View style={styles.ordersLine}></View>
                <Text
                  style={{ fontSize: 20, fontWeight: "300", marginEnd: 20 }}
                >
                  0
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
                  0
                </Text>
                <View style={styles.ordersLine}></View>
                <Text style={styles.ordersText}>0</Text>
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
    </SafeAreaView>
  );
};

export default HomeManufacturer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 15,
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
});
