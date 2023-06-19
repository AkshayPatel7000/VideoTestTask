import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../Assets/Colors';

const MiniPlayer = () => {
  return (
    <>
      <View style={styles.textContainer}>
        <Text style={styles.heading1}>
          Risk Management for Medical Practitioners
        </Text>
        <Text style={styles.heading2}>
          Internal Medicine • Linda Crawford, JD
        </Text>
      </View>
      <View>
        <Icon name={'play-circle-fill'} size={30} color={COLORS.primary} />
      </View>
    </>
  );
};

export default MiniPlayer;

const styles = StyleSheet.create({
  textContainer: {
    width: '80%',
    justifyContent: 'space-between',
    height: '100%',
  },
  heading1: {
    color: COLORS.secondaryLightText,
    fontSize: 14,
    fontWeight: '600',
  },
  heading2: {
    color: COLORS.secondaryLightText,
    fontSize: 12,
    fontWeight: '500',
  },
});
