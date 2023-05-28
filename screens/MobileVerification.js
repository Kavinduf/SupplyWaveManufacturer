import React, { Component } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Button, Input } from '@rneui/themed';
import { Image } from '@rneui/themed';
import { Icon } from '@rneui/themed';
import { color } from '@rneui/base';

import { KeyboardAvoidingView } from 'react-native';
import GreenButton from '../Components/GreenButton';

export default function MobileVerification({ navigation, route }) {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      >
        {/* header section start */}

        <Text onPress={() => navigation.navigate('MobileRegister')}>Back</Text>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 70 }}>
            Verify Mobile Number
          </Text>
          <Text style={{ color: '#737373', marginTop: 15 }}>
            We send a verification code to
          </Text>
          <Text style={{ color: '#000000', marginTop: 5, fontWeight: 'bold' }}>
            0763622407
          </Text>
          <Text style={{ color: '#737373', marginTop: 5 }}>
            Enter the Code below
          </Text>

          {/* header section end */}

          {/* Image start */}

          <Image
            source={require('../assets/MobileVerification-image.png')}
            style={{
              width: 240,
              height: 240,
              marginTop: 20,
            }}
          />
          {/* Image  end */}

          {/* otp input field start */}

          <Input
            textContentType='telephoneNumber'
            maxLength={10}
            textAlign='center'
            selectionColor='#2A8B00'
            keyboardType='phone-pad'
            placeholder='OTP Here CHANGE THE  BOTTOM BORDER'
            style={{
              marginTop: 20,
              fontSize: 15,
              borderColor: '#000000',
              borderWidth: 2,
              borderBottomWidth: 2,
              borderRadius: 7,
            }}
          />

          {/* otp input field end */}

          {/* button start*/}

          <View
            style={{
              marginTop: 20,
              marginEnd: 10,
              marginStart: 10,
            }}
          >
            <GreenButton
              onClick={() => {
                navigation.navigate('EnterDetailsManufacturer', {
                  mobileNumber: route.params.mobileNumber,
                });
              }}
              title={'VERIFY & CONTINUE'}
            />
          </View>

          {/* button end*/}

          {/* Resend Code start */}
          <View style={{ flexDirection: 'row', marginTop: 40 }}>
            <Text style={{ alignSelf: 'center' }}>Didn't Receive Code?</Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#2A8B00',
                marginStart: 10,
              }}
            >
              Resend Code
            </Text>
          </View>

          {/* Resend code end */}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 30,
    // alignItems: "center",
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    fontSize: 30,
  },
});
