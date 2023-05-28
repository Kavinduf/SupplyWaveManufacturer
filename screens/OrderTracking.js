import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { Image } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";

const OrderTracking = () => {
  const [selectedStep, setSelectedStep] = useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.TopView}>
        {/* <View style={{ flexDirection: "row", padding: 5 }}>
          <Text
            style={{ fontSize: 17, fontWeight: "500", alignSelf: "flex-end" }}
          >
            Estimated delivery by
          </Text>
          <Text
            style={{
              fontSize: 19,
              fontWeight: "700",
              alignContent: "flex-end",
              marginLeft: 10,
              color: "#2A8B00",
            }}
          >
            May 12
          </Text>
        </View>
        <View style={styles.statusBarView}>
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: 15,
              backgroundColor: selectedStep > 0 ? "#2A8B00" : "#f2f2f2",
              //   borderColor: "#2A8B00",
              //   borderWidth: 5,
            }}
          ></View>
          <View
            style={{
              height: 6,
              width: 80,
              backgroundColor: selectedStep > 1 ? "#2A8B00" : "#f2f2f2",
            }}
          ></View>
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: 15,
              backgroundColor: selectedStep > 1 ? "#2A8B00" : "#f2f2f2",
              //   borderColor: "#2A8B00",
              //   borderWidth: 5,
            }}
          ></View>
          <View
            style={{
              height: 6,
              width: 80,
              backgroundColor: selectedStep > 2 ? "#2A8B00" : "#f2f2f2",
            }}
          ></View>
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: 15,
              backgroundColor: selectedStep > 2 ? "#2A8B00" : "#f2f2f2",
              //   borderColor: "#2A8B00",
              //   borderWidth: 5,
            }}
          ></View>
          <View
            style={{
              height: 6,
              width: 80,
              backgroundColor: selectedStep > 3 ? "#2A8B00" : "#f2f2f2",
            }}
          ></View>
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: 15,
              backgroundColor: selectedStep > 3 ? "#2A8B00" : "#f2f2f2",
              //   borderColor: "#2A8B00",
              //   borderWidth: 5,
            }}
          ></View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 2,
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ width: 93, fontSize: 12, fontWeight: "600" }}>
              Order
            </Text>
            <Text style={{ width: 93, fontSize: 12, fontWeight: "600" }}>
              accepted
            </Text>
          </View>
          <Text style={{ width: 93, fontSize: 12, fontWeight: "600" }}>
            Ready for dispatch
          </Text>
          <Text style={{ width: 93, fontSize: 12, fontWeight: "600" }}>
            Dispatched
          </Text>
          <Text style={{ width: 93, fontSize: 12, fontWeight: "600" }}>
            Delivered
          </Text>
        </View>
      </View>
      <View style={styles.BottomView}>
        <View style={{ flexDirection: "row" }}>
          <FontAwesome5 name="map-marker-alt" size={20} color="#2A8B00" />
          <Text style={{ marginStart: 10 }}>
            9/3, Canon Jacob Mendis Mawatha, Idama, Moratuwa
          </Text>
        </View> */}

        {/* Bottom delivery discription start*/}
        <Text
          style={{
            fontSize: 17,
            fontWeight: "600",
            alignSelf: "flex-start",
            marginStart: 5,
            marginTop: 5,
          }}
        >
          Delivery Status
        </Text>

        {/* {1 start} */}

        <View style={{ flexDirection: "row", marginTop: 30 }}>
          {/* {circle start} */}
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 15,
              backgroundColor: selectedStep > 3 ? "#2A8B00" : "#f2f2f2",
              //   borderColor: "#2A8B00",
              //   borderWidth: 5,
            }}
          ></View>

          {/* circle end */}

          <View style={{ justifyContent: "flex-end" }}>
            <Text style={{ marginStart: 10 }}>Package delivery completed</Text>
            <View style={{ flexDirection: "row", marginStart: 10 }}>
              <Text style={{ color: "gray" }}>2023-04-17 </Text>
              <Text style={{ color: "gray", marginStart: 10 }}>20.03</Text>
            </View>
          </View>
        </View>

        {/* 1 end */}

        {/* {3 start} */}

        <View style={{ flexDirection: "row", marginTop: 30 }}>
          {/* {circle start} */}
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 15,
              backgroundColor: selectedStep > 2 ? "#2A8B00" : "#f2f2f2",
              //   borderColor: "#2A8B00",
              //   borderWidth: 5,
            }}
          ></View>

          {/* circle end */}

          <View style={{ justifyContent: "flex-end" }}>
            <Text style={{ marginStart: 10 }}>Order delivered to</Text>
            <View style={{ flexDirection: "row", marginStart: 10 }}>
              <Text style={{ color: "gray" }}>2023-04-17 </Text>
              <Text style={{ color: "gray", marginStart: 10 }}>20.03</Text>
            </View>
            <View style={{ flexDirection: "row", marginStart: 10 }}>
              <Text style={{ color: "gray" }}>Order ID:</Text>
              <Text style={{ color: "gray", marginStart: 10 }}>238749283</Text>
            </View>
            <View style={{ flexDirection: "row", marginStart: 10 }}>
              <Text style={{ color: "gray" }}>Shop name: </Text>
              <Text style={{ color: "gray", marginStart: 10 }}>
                Elisha super store
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginStart: 10, width: 240 }}>
              <Text style={{ color: "gray" }}>Address: </Text>
              <Text style={{ color: "gray", marginStart: 10 }}>
                9/3, Canon Jacob Mendis Mawatha Idama, Moratuwa
              </Text>
            </View>
          </View>
        </View>

        {/* 3 end */}

        {/* {3 start} */}

        <View style={{ flexDirection: "row", marginTop: 30 }}>
          {/* {circle start} */}
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 15,
              backgroundColor: selectedStep > 1 ? "#2A8B00" : "#f2f2f2",
              //   borderColor: "#2A8B00",
              //   borderWidth: 5,
            }}
          ></View>

          {/* circle end */}

          <View style={{ justifyContent: "flex-end" }}>
            <Text style={{ marginStart: 10 }}>Order delivered to</Text>
            <View style={{ flexDirection: "row", marginStart: 10 }}>
              <Text style={{ color: "gray" }}>2023-04-17 </Text>
              <Text style={{ color: "gray", marginStart: 10 }}>20.03</Text>
            </View>
            <View style={{ flexDirection: "row", marginStart: 10 }}>
              <Text style={{ color: "gray" }}>Order ID:</Text>
              <Text style={{ color: "gray", marginStart: 10 }}>238749283</Text>
            </View>
            <View style={{ flexDirection: "row", marginStart: 10 }}>
              <Text style={{ color: "gray" }}>Shop name: </Text>
              <Text style={{ color: "gray", marginStart: 10 }}>
                Elisha super store
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginStart: 10, width: 240 }}>
              <Text style={{ color: "gray" }}>Address: </Text>
              <Text style={{ color: "gray", marginStart: 10 }}>
                9/3, Canon Jacob Mendis Mawatha Idama, Moratuwa
              </Text>
            </View>
          </View>
        </View>

        {/* 3 end */}

        {/* {4 start} */}

        <View style={{ flexDirection: "row", marginTop: 30 }}>
          {/* {circle start} */}
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 15,
              backgroundColor: selectedStep > 0 ? "#2A8B00" : "#f2f2f2",
              //   borderColor: "#2A8B00",
              //   borderWidth: 5,
            }}
          ></View>

          {/* circle end */}

          <View style={{ justifyContent: "flex-end" }}>
            <Text style={{ marginStart: 10 }}>Order dispatched</Text>
            <View style={{ flexDirection: "row", marginStart: 10 }}>
              <Text style={{ color: "gray" }}>2023-04-17 </Text>
              <Text style={{ color: "gray", marginStart: 10 }}>20.03</Text>
            </View>
            <View style={{ flexDirection: "row", marginStart: 10 }}>
              <Text style={{ color: "gray" }}>Driver ID:</Text>
              <Text style={{ color: "gray", marginStart: 10 }}> 263476324</Text>
            </View>
          </View>
        </View>

        {/* 4 end */}
      </View>
      {/* Bottom delivery discription end*/}

      {/* change the following button in order to change the bar */}
      <TouchableOpacity
        style={{ height: 50, width: 50, backgroundColor: "black" }}
        onPress={() => {
          setSelectedStep(selectedStep + 1);
        }}
      ></TouchableOpacity>
    </SafeAreaView>
  );
};

export default OrderTracking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 15,
    backgroundColor: "#F5F5F5",
  },
  TopView: {
    justifyContent: "space-between",
    padding: 10,
    marginHorizontal: 10,
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
    paddingBottom: 20,
  },
  BottomView: {
    justifyContent: "space-between",
    padding: 15,
    marginHorizontal: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 1,
    paddingBottom: 20,
    paddingTop: 20,
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 15,
    backgroundColor: "#FFF",
    borderColor: "#2A8B00",
    borderWidth: 5,
  },
  bar: {
    height: 6,
    width: 80,
    backgroundColor: "#2A8B00",
  },
  statusBarView: {
    flexDirection: "row",
    paddingHorizontal: 5,
    alignItems: "center",
    marginTop: 30,
    justifyContent: "center",
  },
});
