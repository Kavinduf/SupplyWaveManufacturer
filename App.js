import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeManufacturer from "./screens/HomeManufacturer";
import Products from "./screens/Products";
import Orders from "./screens/Orders";

export default function App() {
  const Stack = createNativeStackNavigator();

  const StackNavigator = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeManufacturer"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="HomeManufacturer" component={HomeManufacturer} />
          <Stack.Screen
            name="Products"
            component={Products}
            options={{
              headerShown: true,
              title: "All products",
            }}
          />
          <Stack.Screen
            name="Orders"
            component={Orders}
            options={{
              headerShown: true,
              title: "All orders",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  return (
    <View style={styles.container}>
      <StackNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
