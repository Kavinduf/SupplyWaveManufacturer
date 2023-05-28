import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import GreenButton from '../Components/GreenButton';
import OrderDetailsItemCard from '../Components/OrderDetailsItemCard';
import moment from 'moment';
import { db } from '../firebase';
import { updateDoc, doc } from 'firebase/firestore';
import { Dialog } from '@rneui/themed';

const OrderDetails = ({ route, navigation }) => {
  const { order } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const onAcceptOrder = async () => {
    setIsLoading(true);
    const orderRef = doc(db, 'orders', order.id);
    await updateDoc(orderRef, {
      status: 'accepted',
      acceptedAt: new Date(),
    });
    setIsLoading(false);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Dialog
          isVisible={isLoading}
          overlayStyle={{
            width: 90,
            height: 90,
          }}
        >
          <Dialog.Loading />
        </Dialog>
        <ScrollView style={styles.TopView}>
          {/* Order Information start */}

          <Text style={styles.heading}>Order Information</Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={styles.textLeft}>Order ID: </Text>
            <Text>{order.id}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 2 }}>
            <Text style={styles.textLeft}>Order Date: </Text>
            <Text>{moment(order.createdAt)?.format('DD/MM/YYYY, hh:mm')}</Text>
          </View>

          {/* Order Information end */}
          {/* <View style={styles.line}></View> */}
          {/* Customer information start */}

          {/* <Text style={styles.heading}>Customer Information</Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={styles.textLeft}>Shop Name: </Text>
            <Text>{order.deliverStore?.shopName}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 2 }}>
            <Text style={styles.textLeft}>Mobile Number: </Text>
            <Text>{order.deliverStore?.mobileNumber}</Text>
          </View> */}

          {/* Customer information end */}
          <View style={styles.line}></View>
          {/* Payment information start */}

          <Text style={styles.heading}>Payment Information</Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={styles.textLeft}>Payment method: </Text>
            <Text>Credit Card</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 2 }}>
            <Text style={styles.textLeft}>Total price: </Text>
            <Text>{order.total}</Text>
          </View>

          {/* Payment information end */}
          <View style={styles.line}></View>
          {/* Delivery information start */}

          <Text style={styles.heading}>Delivery Information</Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={styles.textLeft}>Shop name: </Text>
            <Text>{order.deliverStore?.shopName}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={styles.textLeft}>Mobile Number: </Text>
            <Text>{order.deliverStore?.mobileNumber}</Text>
          </View>
          <View
            style={{ flexDirection: 'row', marginTop: 2, marginBottom: 20 }}
          >
            <Text style={styles.textLeft}>Address: </Text>
            <View>
              <Text style={{ width: 260 }}>{order.deliverStore?.address}</Text>
            </View>
          </View>

          {/* Delivery information end */}

          {/* Order items start */}
        </ScrollView>
        <View style={styles.bottomView}>
          <Text style={styles.headingOrder}>Order items</Text>
          <View style={styles.divider}></View>
          <FlatList
            keyExtractor={(item, index) => index}
            data={order.items}
            renderItem={({ item }) => (
              <OrderDetailsItemCard
                title={item.title}
                pieces={item.pieces}
                unitPrice={item.price}
                quantity={item.qty}
                total={item.price * item.qty}
              />
            )}
          />
          {/* <View>
              <OrderDetailsItemCard
                title={'maliban'}
                pieces={10}
                unitPrice={1500}
                quantity={10}
                total={15000}
              />
              <OrderDetailsItemCard
                title={'maliban'}
                pieces={10}
                unitPrice={1500}
                quantity={10}
                total={15000}
              />
            </View> */}
          <View style={styles.viewTotal}>
            <Text style={styles.total}>Total</Text>
            <Text style={styles.total}>LKR {order.total}</Text>
          </View>
        </View>

        {/* Order items end */}
      </SafeAreaView>
      {order.status === 'pending' && (
        <View style={styles.button}>
          <GreenButton title={'Accept Order'} onClick={onAcceptOrder} />
        </View>
      )}
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 5,
    backgroundColor: '#F5F5F5',
  },
  TopView: {
    padding: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 1,
  },
  heading: {
    fontWeight: '600',
    fontSize: 15,
    // color: "#999999",
  },
  textLeft: {
    color: 'gray',
    fontWeight: '500',
  },
  line: {
    backgroundColor: '#dfdfdf',
    height: 1,
    marginBottom: 10,
    marginTop: 10,
  },
  bottomView: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 1,
  },
  headingOrder: {
    fontWeight: '700',
    fontSize: 17,
    // color: "#999999",
  },
  total: {
    fontWeight: '700',
    fontSize: 16,
    // color: "#999999",
  },
  viewTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  button: {
    padding: 20,
    backgroundColor: '#FFF',
    paddingBottom: 30,
  },
  divider: {
    borderWidth: 1,
    borderColor: '#f2f2f2',
    marginBottom: 5,
    marginTop: 10,
  },
});
