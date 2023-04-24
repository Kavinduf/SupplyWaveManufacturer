import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import GreenButton from "../Components/GreenButton";
import OrderDetailsItemCard from "../Components/OrderDetailsItemCard";

const OrderDetails = () => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.TopView}>
            <View>
              {/* Order Information start */}

              <Text style={styles.heading}>Order Information</Text>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={styles.textLeft}>Order ID: </Text>
                <Text>15131231513</Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 2 }}>
                <Text style={styles.textLeft}>Order Date: </Text>
                <Text>03/02/2022 20.30</Text>
              </View>

              {/* Order Information end */}
              <View style={styles.line}></View>
              {/* Customer information start */}

              <Text style={styles.heading}>Customer Information</Text>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={styles.textLeft}>Customer: </Text>
                <Text>John Doe</Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 2 }}>
                <Text style={styles.textLeft}>Mobile Number: </Text>
                <Text>0762536489</Text>
              </View>

              {/* Customer information end */}
              <View style={styles.line}></View>
              {/* Payment information start */}

              <Text style={styles.heading}>Payment Information</Text>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={styles.textLeft}>Payment method: </Text>
                <Text>Credit Card</Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 2 }}>
                <Text style={styles.textLeft}>Total price: </Text>
                <Text>35000.00</Text>
              </View>

              {/* Payment information end */}
              <View style={styles.line}></View>
              {/* Delivery information start */}

              <Text style={styles.heading}>Delivery Information</Text>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={styles.textLeft}>Shop name: </Text>
                <Text>Elisha super store</Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 2 }}>
                <Text style={styles.textLeft}>Address: </Text>
                <View>
                  <Text style={{ width: 260 }}>
                    9/3, Canon Jacob Mendis Mawatha, Idama, Moratuwa
                  </Text>
                  <Text>Western</Text>
                  <Text>Moratuwa</Text>
                </View>
              </View>

              {/* Delivery information end */}
            </View>
          </View>

          {/* Order items start */}

          <View style={styles.bottomView}>
            <Text style={styles.headingOrder}>Order items</Text>
            <View style={styles.divider}></View>
            <View>
              <OrderDetailsItemCard
                title={"maliban"}
                pieces={10}
                unitPrice={1500}
                quantity={10}
                total={15000}
              />
              <OrderDetailsItemCard
                title={"maliban"}
                pieces={10}
                unitPrice={1500}
                quantity={10}
                total={15000}
              />
            </View>
            <View style={styles.viewTotal}>
              <Text style={styles.total}>Total</Text>
              <Text style={styles.total}>35000.00</Text>
            </View>
          </View>

          {/* Order items end */}
        </ScrollView>
      </SafeAreaView>
      <View style={styles.button}>
        <GreenButton title={"Accept Order"} />
      </View>
    </View>
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
    fontWeight: "600",
    fontSize: 15,
    // color: "#999999",
  },
  textLeft: {
    color: "gray",
    fontWeight: "500",
  },
  line: {
    backgroundColor: "#dfdfdf",
    height: 1,
    marginBottom: 10,
    marginTop: 10,
  },
  bottomView: {
    marginTop: 10,
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
  headingOrder: {
    fontWeight: "700",
    fontSize: 17,
    // color: "#999999",
  },
  total: {
    fontWeight: "700",
    fontSize: 16,
    // color: "#999999",
  },
  viewTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  button: {
    padding: 20,
    backgroundColor: "#FFF",
    paddingBottom: 30,
  },
  divider: {
    borderWidth: 1,
    borderColor: "#f2f2f2",
    marginBottom: 5,
    marginTop: 10,
  },
});
