import { StyleSheet, Text, View, StatusBar, Pressable } from "react-native";
import React, { memo } from "react";
import { Image, CheckBox } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";

const OrderItemCardToShip = ({
  id,
  numOfOrders,
  navigation,
  orders,
  selected,
  setSelectedOrders,
  status,
  delivery,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.TopView}
        onPress={() =>
          navigation.navigate("PackageDetails", {
            package: {
              id,
              numOfOrders,
              orders,
              status,
              delivery,
            },
          })
        }
      >
        <View>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text style={styles.textLeft}>Package Number: </Text>
            <Text style={styles.textRight}>{id}</Text>
          </View>
          {/* <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text style={styles.textLeft}>Time: </Text>
            <Text style={styles.textRight}>
              {Date} {Time}
            </Text>
          </View> */}
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text style={styles.textLeft}>Orders in package: </Text>
            <Text style={styles.textRight}>{numOfOrders}</Text>
          </View>
        </View>
        {/* {selected !== null && (
          <View style={{ marginEnd: 5 }}>
            {selected && (
              <Ionicons
                name='radio-button-on'
                size={25}
                color='#2A8B00'
                style={{ alignSelf: 'center' }}
                onPress={() =>
                  setSelectedOrders((prev) =>
                    prev.filter((item) => item !== id)
                  )
                }
              />
            )}
            {!selected && (
              <Ionicons
                name='radio-button-off'
                size={25}
                color='#2A8B00'
                style={{ alignSelf: 'center' }}
                onPress={() => setSelectedOrders((prev) => [...prev, id])}
              />
            )}
          </View>
        )} */}
      </Pressable>
    </View>
  );
};

export default memo(OrderItemCardToShip);

const styles = StyleSheet.create({
  TopView: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    marginHorizontal: 10,
    paddingBottom: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    marginTop: 10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 1,
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
