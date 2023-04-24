import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import GreenButton from "../Components/GreenButton";

const AddProduct = () => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.TopView}>
            <View style={styles.imageBorder}>
              <FontAwesome name="image" size={24} color="#2A8B00" />
              <Text style={styles.imageBorderText}>Image</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.inputText}>Product Name</Text>
              <View style={styles.textInput}>
                <TextInput
                  editable
                  // value={state.shopName}
                  // onChangeText={(text) =>
                  //   setState({
                  //     ...state,
                  //     shopName: text,
                  //   })
                  // }
                  textContentType="name"
                  selectionColor="#2A8B00"
                  placeholder="Ex.Maliban Cream Crackers 100g (12pc)"
                  placeholderTextColor="gray"
                  // numberOfLines={4}
                  // value={value}
                  style={{ padding: 10 }}
                />
              </View>
              <Text style={styles.inputText}>Category</Text>
              <View style={styles.textInputCategory}>
                <Text style={styles.textInputCategoryPlaceholder}>
                  Select category
                </Text>
                <AntDesign name="right" size={19} color="#2A8B00" />
              </View>
              <Text style={styles.inputText}>Sub category</Text>
              <View style={styles.textInputCategory}>
                <Text style={styles.textInputCategoryPlaceholder}>
                  Select sub category
                </Text>
                <AntDesign name="right" size={19} color="#2A8B00" />
              </View>
              <Text style={styles.inputText}>Pieces in a unit</Text>
              <View style={styles.textInput}>
                <TextInput
                  editable
                  // value={state.shopName}
                  // onChangeText={(text) =>
                  //   setState({
                  //     ...state,
                  //     shopName: text,
                  //   })
                  // }
                  keyboardType="number-pad"
                  selectionColor="#2A8B00"
                  placeholder=""
                  placeholderTextColor="gray"
                  // numberOfLines={4}
                  // value={value}
                  style={{ padding: 10 }}
                />
              </View>
              <Text style={styles.inputText}>Price per unit</Text>
              <View style={styles.textInput}>
                <TextInput
                  editable
                  // value={state.shopName}
                  // onChangeText={(text) =>
                  //   setState({
                  //     ...state,
                  //     shopName: text,
                  //   })
                  // }
                  keyboardType="number-pad"
                  selectionColor="#2A8B00"
                  placeholder=""
                  placeholderTextColor="gray"
                  // numberOfLines={4}
                  // value={value}
                  style={{ padding: 10 }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <View style={styles.button}>
        <GreenButton title={"Add"} />
      </View>
    </View>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  TopView: {
    padding: 15,
    paddingBottom: 15,
    backgroundColor: "#FFF",
    marginHorizontal: 15,
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
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 15,
    backgroundColor: "#F5F5F5",
  },
  imageBorder: {
    width: 100,
    height: 100,
    borderColor: "#2A8B00",
    borderStyle: "dashed",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBorderText: {
    fontSize: 11,
    marginEnd: 2,
    color: "grey",
    marginTop: 10,
  },
  inputText: {
    marginTop: 15,
    fontWeight: "500",
  },
  textInput: {
    // backgroundColor: value,
    borderColor: "#bcbcbc",
    borderWidth: 1,
    padding: 5,
    marginTop: 10,
    borderRadius: 5,
  },
  textInputCategory: {
    // backgroundColor: value,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#bcbcbc",
    borderWidth: 1,
    padding: 5,
    marginTop: 10,
    borderRadius: 5,
    height: 50,
  },
  textInputCategoryPlaceholder: {
    fontWeight: "500",
    color: "gray",
  },
  button: {
    padding: 20,
    backgroundColor: "#FFF",
    paddingBottom: 30,
  },
});
