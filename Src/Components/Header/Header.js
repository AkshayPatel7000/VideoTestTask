import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import COLORS from '../../Assets/Colors';

const Header = ({onClose}) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.secondary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Switch />
        <Text style={{color: COLORS.secondaryLight}}>
          Autoplay next in playlist
        </Text>
      </View>
      <TouchableOpacity onPress={onClose}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '700',
            color: COLORS.secondaryLightText,
          }}>
          MINIMIZE
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
