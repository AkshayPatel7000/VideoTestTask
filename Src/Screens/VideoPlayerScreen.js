import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, Platform, StyleSheet} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import COLORS from '../Assets/Colors';
import Controlers from '../Components/Controlers/Controlers';
import Header from '../Components/Header/Header';
import MiniPlayer from '../Components/MiniPlayer/MiniPlayer';
import {VideoPlayerComponet} from '../Components/VideoComponents/VideoPlayerComponet';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
const VideoPlayerScreen = ({onClose}) => {
  const {width, height: screenHeight} = Dimensions.get('window');
  Icon.loadFont();
  const translation = useRef(new Animated.Value(0)).current;
  const startAnimation = () => {
    Animated.timing(translation, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  const EndAnimation = () => {
    Animated.timing(translation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {}, []);

  const translateYInterpolate = translation.interpolate({
    inputRange: [0, 300],
    outputRange: [-screenHeight * 0.0011, screenHeight * 0.61],
    extrapolate: 'clamp',
  });
  const IOStranslateYInterpolate = translation.interpolate({
    inputRange: [0, 300],
    outputRange: [0, screenHeight * 0.68],
    extrapolate: 'clamp',
  });
  const opacityInterpolate = translation.interpolate({
    inputRange: [0, 100],
    outputRange: [50, 0],
  });
  const VideoContainerHInterpolate = translation.interpolate({
    inputRange: [0, 100],
    outputRange: ['100%', '30%'],
  });
  const IOSVideoContainerHInterpolate = translation.interpolate({
    inputRange: [0, 100],
    outputRange: ['100%', '30%'],
  });

  const vhight = translation.interpolate({
    inputRange: [0, 100],
    outputRange: ['30%', '100%'],
  });
  const vWIDTH = translation.interpolate({
    inputRange: [0, 100],
    outputRange: ['100%', '30%'],
  });
  const MVideoContainer = translation.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '70%'],
  });
  const MOpacityVideoContainer = translation.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
  });
  const mainStylesAndroid = {
    backgroundColor: COLORS.white,
    height: VideoContainerHInterpolate,
    transform: [
      {
        translateY: translateYInterpolate,
      },
    ],
  };
  const mainStylesIOS = {
    backgroundColor: COLORS.white,
    height: IOSVideoContainerHInterpolate,
    transform: [
      {
        translateY: IOStranslateYInterpolate,
      },
    ],
  };
  const videoPlayerStyles = {
    height: vhight,
    width: vWIDTH,
    flexDirection: 'row',
    width: '100%',
  };
  const mContainer = {
    width: MVideoContainer,
    opacity: MOpacityVideoContainer,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  };
  const stylesControls = {
    opacity: opacityInterpolate,
    backgroundColor: COLORS.secondary,
  };
  return (
    <SafeAreaView>
      <PanGestureHandler
        onEnded={e => {
          EndAnimation();
        }}>
        <Animated.View
          style={Platform.OS === 'ios' ? mainStylesIOS : mainStylesAndroid}>
          <Animated.View
            style={[{height: opacityInterpolate, opacity: opacityInterpolate}]}>
            <Header onClose={startAnimation} />
          </Animated.View>

          <Animated.View style={videoPlayerStyles}>
            <VideoPlayerComponet
              url={
                'https://cdn.videvo.net/videvo_files/video/premium/video0398/large_watermarked/902-1_902-2673-PD2_preview.mp4'
              }
            />
            <Animated.View style={mContainer}>
              <MiniPlayer />
            </Animated.View>
          </Animated.View>

          <Animated.View style={stylesControls}>
            <Controlers />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};

export default VideoPlayerScreen;

const styles = StyleSheet.create({
  main: {
    height: Dimensions.get('window').height - 50,
  },
  imageStyles: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderWidth: 1,
  },
});
