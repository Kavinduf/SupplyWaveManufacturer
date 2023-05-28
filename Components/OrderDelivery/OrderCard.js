import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';
import GreenButtonDeliver from '../GreenButtonDeliver';
import GreenButtonPickup from '../GreenButtonPickup';
import {
  doc,
  updateDoc,
  query,
  where,
  collection,
  getDocs,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const OrderCard = ({ item, packageId }) => {
  const color = item.status === 'accepted' ? '#BDE4B8' : '#FFD984';

  const openMap = async () => {
    const destination = encodeURIComponent(`${item.deliverStore.address}`);
    const provider = Platform.OS === 'ios' ? 'apple' : 'google';
    const link = `http://maps.${provider}.com/?daddr=${destination}`;

    try {
      const supported = await Linking.canOpenURL(link);

      if (supported) Linking.openURL(link);
    } catch (error) {
      console.log(error);
    }
  };

  const onPick = async () => {
    const q = query(doc(db, 'packages', packageId));

    const querySnapshot = await getDoc(q);
    const orders = querySnapshot.data().orders;
    const newOrders = orders.map((order) => {
      if (order.id === item.id) {
        return {
          ...order,
          status: 'picked',
        };
      }
      return order;
    });
    await updateDoc(doc(db, 'packages', packageId), {
      orders: newOrders,
    });
  };

  const onDeliver = async () => {
    const q = query(doc(db, 'packages', packageId));

    const querySnapshot = await getDoc(q);
    const orders = querySnapshot.data().orders;
    const newOrders = orders.map((order) => {
      if (order.id === item.id) {
        return {
          ...order,
          status: 'delivered',
        };
      }
      return order;
    });
    await updateDoc(doc(db, 'packages', packageId), {
      orders: newOrders,
    });
  };

  return (
    <View style={styles.TopSecondView}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <Feather name='box' size={20} color={color} />

          <View
            style={[
              styles.DropView,
              {
                backgroundColor: color,
              },
            ]}
          >
            <Text style={{ fontWeight: '500' }}>Drop</Text>
          </View>
          <View
            style={[
              styles.orderId,
              {
                backgroundColor: color,
              },
            ]}
          >
            <FontAwesome5 name='hashtag' size={13} color='black' />
            <Text style={{ marginStart: 5 }}>{item.id}</Text>
          </View>
        </View>
        <Pressable onPress={openMap}>
          <FontAwesome5 name='paper-plane' size={20} color={color} />
        </Pressable>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {/* <View style={{ width: 30 }}></View> */}

        <View style={{ paddingHorizontal: 30 }}>
          <Text style={{ fontWeight: '600' }}>
            {item.deliverStore.shopName}
          </Text>
          <Text>{item.deliverStore.address}</Text>
          <Text style={{ fontWeight: '600' }}>
            {item.deliverStore.mobileNumber}
          </Text>
        </View>
      </View>
      {item.status === 'accepted' && (
        <View style={styles.Subbutton}>
          <GreenButtonPickup title={'Set as Picked'} onClick={onPick} />
        </View>
      )}
      {item.status === 'picked' && (
        <View style={styles.Subbutton}>
          <GreenButtonDeliver title={'Set as Delivered'} onClick={onDeliver} />
        </View>
      )}
      {item.status === 'delivered' && (
        <View style={styles.Subbutton}>
          <MaterialIcons name='check-circle' size={20} color={'green'} />
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'green',
            }}
          >
            Done
          </Text>
        </View>
      )}
    </View>
  );
};

export default memo(OrderCard);

const styles = StyleSheet.create({
  TopsubView: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    paddingBottom: 10,
  },
  TopSecondView: {
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  pickupView: {
    backgroundColor: '#BDE4B8',
    padding: 4,
    borderRadius: 5,
    marginStart: 5,
    marginBottom: 5,
  },
  DropView: {
    backgroundColor: '#FFD984',
    padding: 4,
    borderRadius: 5,
    marginStart: 8,
    marginBottom: 5,
  },
  orderId: {
    backgroundColor: '#FFD984',
    padding: 4,
    borderRadius: 5,
    marginStart: 10,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    backgroundColor: '#eeeeee',
    height: 2,
    marginTop: 5,
  },
  bottomView: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: '#BDE4B8',
    // borderBottomStartRadius: 10,
    // borderBottomEndRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 1,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 5,
  },
  bottomTextRight: {
    fontSize: 15,
    marginStart: 7,
    fontWeight: '600',
  },
  bottomTextLeft: {
    fontSize: 15,
    color: '#5b5b5b',
    fontWeight: '500',
    marginStart: 3,
  },
  button: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  Subbutton: {
    paddingHorizontal: 25,
    // width: 250,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'center',
    marginVertical: 10,
  },
});
