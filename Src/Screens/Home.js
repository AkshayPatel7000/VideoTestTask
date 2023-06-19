import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import VideoPlayerScreen from './VideoPlayerScreen';
import Thumb from '../Assets/img/thumb.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Home = () => {
  return (
    <SafeAreaView style={styles.main}>
      <Text>Press on video to play/pause</Text>
      <Text>Press MINIMIZE to MINIMIZE player</Text>
      <Text>Swipe up on minimized player to make fill screen</Text>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  imageStyles: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderWidth: 1,
  },
  main: {flex: 1},
});
