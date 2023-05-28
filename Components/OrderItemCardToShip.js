import { StyleSheet, Text, View, StatusBar, Pressable } from 'react-native';
import React, { memo } from 'react';
import { Image, CheckBox } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

const OrderItemCardToShip = ({
  id,
  createdAt,
  total,
  items,
  navigation,
  status,
  selected,
  setSelectedOrders,
  deliverStore,
  userId,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.TopView}
        onPress={() =>
          navigation.navigate('OrderDetails', {
            order: {
              id,
              createdAt: Object.values(createdAt)[0] * 1000,
              total,
              items,
              status,
              deliverStore: deliverStore,
              userId: userId,
            },
          })
        }
      >
        <View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={styles.textLeft}>Order Number: </Text>
            <Text style={styles.textRight}>{id}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={styles.textLeft}>Time: </Text>
            <Text style={styles.textRight}>
              {moment(Object.values(createdAt)[0] * 1000)?.format(
                'DD/MM/YYYY, hh:mm'
              )}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={styles.textLeft}>Total price:</Text>
            <Text style={styles.textRight}>LKR {total}.00</Text>
          </View>
        </View>
        <View style={{ marginEnd: 5 }}>
          {selected && (
            <Ionicons
              name='radio-button-on'
              size={25}
              color='#2A8B00'
              style={{ alignSelf: 'center' }}
              onPress={() =>
                setSelectedOrders((prev) => prev.filter((item) => item !== id))
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
      </Pressable>
    </View>
  );
};

export default memo(OrderItemCardToShip);

const styles = StyleSheet.create({
  TopView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
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
    fontWeight: '500',
    color: 'gray',
  },
  textRight: {
    fontSize: 15,
    fontWeight: '500',
  },
});
