import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import { Button, Card, Image } from '@rneui/themed';
import { Icon } from '@rneui/base';
import { Feather } from '@expo/vector-icons';
import { useAppContext } from '../context/appContext';

const ItemCard = ({
  productName,
  pricePerUnit,
  brand,
  registerPage,
  piecesInUnit,
  image,
  weight,
  id,
  manufacturer,
  navigation,
}) => {
  if (!pricePerUnit) {
    return null;
  }
  // console.log(manufacturer);
  return (
    // <Card wrapperStyle={styles.cardWrapper} containerStyle={styles.container}>
    <Pressable style={styles.container}>
      <View style={styles.cardWrapper}>
        {/* {registerPage && <Text>Register Page true</Text>} */}

        {!image && (
          <Image
            source={require('../assets/login-png.png')}
            style={{
              width: 100,
              height: 100,
            }}
          />
        )}
        {image && (
          <Image
            source={{
              uri: image,
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 10,
            }}
          />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>{productName}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textDescriptionLeft}>Pieces :</Text>
            <Text style={styles.textDescriptionRight}>{piecesInUnit}</Text>
          </View>
          {manufacturer && (
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textDescriptionLeft}>Brand :</Text>
              <Text style={styles.textDescriptionRight}>
                {manufacturer.shopName}
              </Text>
            </View>
          )}

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View style={{ justifyContent: 'flex-end' }}>
              <Text style={styles.textPrice}>LKR {pricePerUnit}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default memo(ItemCard);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 1,
    marginBottom: 15,
  },
  // TopView: {
  //   backgroundColor: "#FFF",
  //   // marginHorizontal: 15,
  //   // borderRadius: 10,
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 1,
  //     height: 1,
  //   },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 2.5,
  //   elevation: 1,
  //   marginTop: 10,
  // },
  cardWrapper: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
  },
  textContainer: {
    justifyContent: 'center',
    width: 205,
    marginEnd: 15,
  },
  textTitle: {
    fontWeight: '600',
    fontSize: 14,
  },
  textDescriptionLeft: {
    fontWeight: '400',
    paddingStart: 1,
    fontSize: 13,
  },
  textDescriptionRight: {
    fontWeight: '500',
    color: 'gray',
    paddingStart: 5,
    fontSize: 13,
  },
  textPrice: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10,
  },
});
