import { Pressable, StyleSheet, Text, View } from "react-native";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Button } from "@rneui/themed";
import { db } from "../../firebase";
import { updateDoc, doc, collection, getDoc } from "firebase/firestore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const AddToDeliveryBottomSheet = ({ bottomSheetRef, data }) => {
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const [deliveryPrice, setDeliveryPrice] = useState("");
  const [addPackageToDelivery, setAddPackageToDelivery] = useState(false);
  const keyboardRef = useRef(null);

  const handleChanges = useCallback((index) => {
    setAddPackageToDelivery(false);
  }, []);

  const deliverByYourself = useCallback(async () => {
    if (deliveryPrice === "" && addPackageToDelivery) {
      alert("Please enter delivery price");
      return;
    }
    const packageRef = doc(db, "packages", data.id);
    await updateDoc(packageRef, {
      status: "shipped",
      shippedAt: new Date(),
      delivery: {
        deliveryBy: "manufacturer",
      },
    });
    const orders = await (await getDoc(packageRef)).data().orders;
    orders.forEach(async (element) => {
      await updateDoc(doc(db, "orders", element.id), {
        status: "shipped",
        shippedAt: new Date(),
      });
    });
    bottomSheetRef?.current.snapToIndex(-1);
    bottomSheetRef.current?.close();
    keyboardRef?.current?.blur();
  }, [deliveryPrice]);

  const onClickAddToDelivery = useCallback(async () => {
    setAddPackageToDelivery(true);
  }, []);

  const addToDelivery = useCallback(async () => {
    if (deliveryPrice === "") {
      alert("Please enter delivery price");
      return;
    }
    const packageRef = doc(db, "packages", data.id);
    await updateDoc(packageRef, {
      status: "shipped",
      shippedAt: new Date(),
      delivery: {
        price: +deliveryPrice,
        deliveryBy: "driver",
        driver: null,
      },
    });
    const orders = await (await getDoc(packageRef)).data().orders;
    orders.forEach(async (element) => {
      await updateDoc(doc(db, "orders", element.id), {
        status: "shipped",
        shippedAt: new Date(),
      });
    });
    bottomSheetRef?.current.snapToIndex(-1);
    bottomSheetRef.current?.close();
    keyboardRef?.current?.blur();
  }, [deliveryPrice]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleChanges}
      enablePanDownToClose
    >
      <Pressable
        style={styles.contentContainer}
        onPress={() => {
          keyboardRef?.current?.blur();
          bottomSheetRef?.current.snapToIndex(1);
        }}
      >
        {/* //when clicked on add package to delivery button view this */}
        {addPackageToDelivery && (
          <View style={styles.priceContainer}>
            <MaterialIcons
              name="arrow-back"
              size={30}
              suppressHighlighting={true}
              onPress={() => setAddPackageToDelivery(false)}
            />
            <BottomSheetTextInput
              ref={keyboardRef}
              keyboardType="numeric"
              value={deliveryPrice}
              onChangeText={(text) => setDeliveryPrice(text)}
              placeholder="Enter delivery price (LKR)"
              style={{
                fontSize: 18,
                textAlign: "center",
              }}
            />
            <Button
              title={"Add package to delivery"}
              onPress={addToDelivery}
              color={"black"}
              containerStyle={{ alignSelf: "center" }}
              radius={5}
              raised
            />
          </View>
        )}

        {/* //initial buttons on this bottomsheet */}
        {!addPackageToDelivery && (
          <View style={styles.buttonContainer}>
            <Button
              title={"Add package to delivery"}
              onPress={onClickAddToDelivery}
              color={"white"}
              titleStyle={{ color: "black" }}
              radius={5}
              raised
            />
            <Button
              title={"Deliver by yourself"}
              onPress={deliverByYourself}
              radius={5}
              raised
              color={"black"}
            />
          </View>
        )}
      </Pressable>
    </BottomSheet>
  );
};

export default memo(AddToDeliveryBottomSheet);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // marginTop: 20,
  },
  buttonContainer: {
    // marginTop: 20,
    // flexDirection: 'row',
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  priceContainer: {
    flex: 1,
    padding: 24,
    gap: 10,
  },
});
