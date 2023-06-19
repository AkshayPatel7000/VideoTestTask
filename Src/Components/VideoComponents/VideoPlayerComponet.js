import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import CustomVideoPlayer from './CustomVideoPlayer';

export const VideoPlayerComponet = props => {
  const {theme} = props;
  const [screenState, setScreenState] = useState({
    fullScreen: false,
    Width_Layout: '',
    Height_Layout: '',
    potraitMode: true,
  });

  useEffect(() => {
    Orientation.unlockAllOrientations();
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  useEffect(() => {
    if (screenState.Width_Layout != '') {
      detectOrientation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenState.Width_Layout]);

  useEffect(() => {
    let {fullScreen, potraitMode} = screenState;
    !fullScreen ? Orientation.lockToPortrait() : Orientation.lockToLandscape();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenState.fullScreen]);

  const changeState = values => {
    setScreenState(prevState => {
      return {
        ...prevState,
        ...values,
      };
    });
  };

  const detectOrientation = () => {
    if (screenState.Width_Layout > screenState.Height_Layout) {
      // Write code here, which you want to execute on Landscape Mode.
      changeState({fullScreen: true, potraitMode: false});
    } else {
      // Write code here, which you want to execute on Portrait Mode.
      // changeState({fullScreen: false, potraitMode: true});
    }
  };

  const modalScreenView = () => {
    return (
      <View style={styles.ModalContainer}>
        <View style={styles.ModalBox}>
          <View style={styles.VideoPlayerContainer}>{videoPlayerView()}</View>
        </View>
      </View>
    );
  };

  const videoPlayerView = () => {
    const {fullScreen} = screenState;
    return (
      <CustomVideoPlayer
        source={{
          uri: props?.url,
        }}
        playInBackground
        playWhenInactive
        disableBack
        disableVolume={true}
        resizeMode="contain"
        isFullscreen={fullScreen}
        disableFullscreen={false}
        toggleResizeModeOnFullscreen={false}
        tapAnywhereToPause={true}
        onEnterFullscreen={() => {
          // props.toggleModal({isVisible: !props.isVisible, data: null});
          changeState({fullScreen: !fullScreen, potraitMode: true});
        }}
        onExitFullscreen={() => {
          changeState({fullScreen: !fullScreen, potraitMode: true});
        }}
      />
    );
  };

  return (
    <>
      {screenState?.fullScreen ? (
        <Modal
          animationType={'fade'}
          supportedOrientations={['portrait', 'landscape']}
          statusBarTranslucent
          focusable={false}
          visible={screenState?.fullScreen}>
          <View
            style={styles.ModalWrapper}
            onLayout={event => {
              const {layout} = event.nativeEvent;
              changeState({
                Width_Layout: layout.width,
                Height_Layout: layout.height,
              });
            }}>
            {videoPlayerView()}
          </View>
        </Modal>
      ) : (
        <>{modalScreenView()}</>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  ModalOutsideContainer: {
    // flex: 1,
  },
  ModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ModalWrapper: {
    flex: 1,
    // borderWidth: 1,
  },
  ModalBox: {
    // height: 250,
    // borderWidth: 1,
  },
  VideoPlayerContainer: {
    width: '100%',
    height: '100%',
  },
});
