import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import COLORS from '../../Assets/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Controlers = () => {
  return (
    <View style={{paddingVertical: 28, paddingHorizontal: 15}}>
      <View style={{width: '80%'}}>
        <Text
          style={{
            color: COLORS.secondaryLightText,
            fontSize: 14,
            fontWeight: '500',
          }}>
          Internal Medicine • Linda Crawford, JD
        </Text>
        <Text
          style={{
            color: COLORS.secondaryLightText,
            fontSize: 18,
            fontWeight: '600',
          }}>
          Risk Management for Medical Practitioners
        </Text>
      </View>

      <View
        style={{
          marginVertical: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={styles.iconcontainer}>
          <Icon name={'skip-previous'} color={COLORS.primary} size={20} />
        </View>
        <View style={styles.iconcontainer}>
          <Icon name={'replay-5'} color={COLORS.primary} size={20} />
        </View>
        <View style={styles.iconcontainer}>
          <Icon name={'forward-5'} color={COLORS.primary} size={20} />
        </View>
        <View style={styles.iconcontainer}>
          <Icon name={'skip-next'} color={COLORS.primary} size={20} />
        </View>
        <View style={styles.volumeBox}>
          <Icon name={'volume-up'} color={COLORS.primary} size={20} />
          <View
            style={{
              backgroundColor: COLORS.primary,
              height: 3,
              width: '70%',
            }}></View>
        </View>
      </View>

      <View style={styles.seekContainer}>
        <Text>7:42</Text>

        <View style={styles.seekBar}>
          <View style={styles.seekBarFull}></View>
        </View>
        <Text>7:42</Text>
      </View>
    </View>
  );
};

export default Controlers;

const styles = StyleSheet.create({
  iconcontainer: {padding: 10, borderWidth: 1, width: 40, height: 40},
  volumeBox: {
    padding: 10,
    borderWidth: 1,
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  seekContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  seekBar: {
    height: 3,
    width: '70%',
    backgroundColor: COLORS.secondaryLight,
  },
  seekBarFull: {
    height: 3,
    width: '40%',
    backgroundColor: COLORS.primary,
  },
});
