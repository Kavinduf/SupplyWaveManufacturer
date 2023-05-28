import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeManufacturer from './screens/HomeManufacturer';
import Products from './screens/Products';
import Orders from './screens/Orders';
import OrderDetails from './screens/OrderDetails';
import PackageDetails from './screens/PackageDetails';
import AddProduct from './screens/AddProduct';
import MobileVerification from './screens/MobileVerification';
import EnterDetailsManufacturer from './screens/EnterDetailsManufacturer';
import MobileRegister from './screens/MobileRegister';
import { AppProvider } from './context/appContext';
import Login from './screens/Login';
import OrderTracking from './screens/OrderTracking';
import OrderDelivery from './screens/OrderDelivery';
import OrderDeliveryDriver from './screens/OrderDeliveryDriver';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EditProfileManufacturer from './screens/EditProfileManufacturer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BrandDetails from './screens/BrandDetails';
import Profile from './screens/Profile';

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const StackNavigator = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Login'
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='HomeManufacturer' component={TabNavigator} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen
            name='MobileVerification'
            component={MobileVerification}
          />
          <Stack.Screen
            name='EnterDetailsManufacturer'
            component={EnterDetailsManufacturer}
          />
          <Stack.Screen name='MobileRegister' component={MobileRegister} />
          <Stack.Screen
            name='Products'
            component={Products}
            options={{
              headerShown: true,
              title: 'All products',
            }}
          />
          <Stack.Screen
            name='BrandDetails'
            component={BrandDetails}
            options={{
              headerShown: true,
              title: 'Brand Details',
            }}
          />
          <Stack.Screen
            name='OrderDelivery'
            component={OrderDelivery}
            options={{
              headerShown: true,
              title: 'Order Tracking',
            }}
          />
          <Stack.Screen
            name='OrderDeliveryDriver'
            component={OrderDeliveryDriver}
            options={{
              headerShown: true,
              title: 'Order Tracking',
            }}
          />
          <Stack.Screen
            name='OrderTracking'
            component={OrderTracking}
            options={{
              headerShown: true,
              title: 'Order Tracking',
            }}
          />
          <Stack.Screen
            name='Orders'
            component={Orders}
            options={{
              headerShown: true,
              title: 'All orders',
            }}
          />
          <Stack.Screen
            name='AddProduct'
            component={AddProduct}
            options={{
              headerShown: true,
              title: 'Add Product',
            }}
          />
          <Stack.Screen
            name='PackageDetails'
            component={PackageDetails}
            options={{
              headerShown: true,
              title: 'Package Details',
            }}
          />
          <Stack.Screen
            name='OrderDetails'
            component={OrderDetails}
            options={{
              headerShown: true,
              title: 'Order Details',
            }}
          />
          <Stack.Screen
            name='EditProfile'
            component={EditProfileManufacturer}
            options={{
              headerShown: true,
              title: 'Edit Profile',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  const TabNavigator = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={HomeManufacturer}
          options={{
            tabBarActiveTintColor: '#2A8B00',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='home' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name='Profile'
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name='account'
                color={color}
                size={size}
              />
            ),
            title: 'Profile',
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <View style={styles.container}>
      <AppProvider>
        <StatusBar style='dark' />
        <StackNavigator />
      </AppProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
