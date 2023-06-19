import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {scale} from '../../responsive';

import COLORS from '../../Assets/Colors';
import Browser from '../../Screens/Browser';
import Home from '../../Screens/Home';
import Playlist from '../../Screens/Playlist';
import VideoPlayerScreen from '../../Screens/VideoPlayerScreen';
Icon.loadFont();
const BottomTab = createBottomTabNavigator();
function MyTabBar({state, descriptors, navigation}) {
  const scrollY = new Animated.Value(0);

  const navigation2 = useNavigation();
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const animateTab = index => {
    Animated.spring(tabOffsetValue, {
      toValue: getWidth() * index,
      useNativeDriver: true,
    }).start();
  };
  const [showTab, setShowTab] = React.useState(true);
  useEffect(() => {
    animateTab(state.index);
  }, [state.index]);
  useEffect(() => {
    const Subs = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Subs.remove();
    };
  }, []);
  const _keyboardDidShow = () => {
    setShowTab(false);
    scrollY.setValue(-100);
  };
  const _keyboardDidHide = () => {
    setShowTab(true);
    scrollY.setValue(0);
  };
  return (
    <>
      {showTab && (
        <>
          <VideoPlayerScreen />
          <Animated.View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              marginBottom: Platform.OS == 'ios' ? 20 : 0,
              backgroundColor: COLORS.white,
              height: 90,
              borderTopWidth: 1,
              borderTopColor: 'gray',
            }}>
            <Animated.View
              style={{
                width: getWidth() - scale(40),
                height: 3,
                backgroundColor: COLORS.primary,
                position: 'absolute',
                bottom: 10,
                // Horizontal Padding = 20...
                left: scale(30),
                borderRadius: 30,
                transform: [{translateX: tabOffsetValue}],
              }}
            />
            {state.routes.map((route, index) => {
              const {options} = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;
              const isFocused = state.index === index;
              const onPress = () => {
                animateTab(index);
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!isFocused && !event.defaultPrevented) {
                  navigation2.navigate({name: route.name, merge: true});
                  if (route.name === 'Listing') {
                    navigation2.navigate('Listing', {
                      screen: 'Trip',
                    });
                  }
                }
              };
              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };
              return (
                <TouchableOpacity
                  key={label}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? {selected: true} : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={() => onPress()}
                  onLongPress={() => onLongPress()}
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 10,
                  }}>
                  <View>{isFocused ? options.iconInActive : options.icon}</View>
                  <View style={{marginTop: 10}}>
                    <Text
                      style={{
                        color: isFocused ? COLORS.primary : 'gray',
                        fontSize: 14,
                        fontWeight: '500',
                      }}>
                      {label}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        </>
      )}
    </>
  );
}
function getWidth() {
  let width = Dimensions.get('screen').width;
  width = width - scale(20);
  return width / 4;
}
const BottomTabs = () => {
  return (
    <>
      <BottomTab.Navigator
        tabBar={tabsProps => <MyTabBar {...tabsProps} />}
        screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}
        options={{tabBarHideOnKeyboard: true}}
        initialRouteName="Home">
        <BottomTab.Screen
          name="Home"
          options={{
            tabBarHideOnKeyboard: true,
            icon: <Icon name={'home'} color={'gray'} size={25} />,
            iconInActive: (
              <Icon name={'home'} color={COLORS.primary} size={25} />
            ),
          }}
          component={Home}
        />
        <BottomTab.Screen
          name="Browser"
          options={{
            icon: <Icon name={'earth'} color={'gray'} size={25} />,
            iconInActive: (
              <Icon name={'earth'} color={COLORS.primary} size={25} />
            ),
          }}
          component={Browser}
        />
        <BottomTab.Screen
          name="Playlist"
          options={{
            icon: <Icon name={'play'} color={'gray'} size={25} />,
            iconInActive: (
              <Icon name={'play'} color={COLORS.primary} size={25} />
            ),
          }}
          component={Playlist}
        />
        <BottomTab.Screen
          name="My Credits"
          options={{
            tabBarHideOnKeyboard: true,
            icon: <Icon name={'wallet'} color={'gray'} size={25} />,
            iconInActive: (
              <Icon name={'wallet'} color={COLORS.primary} size={25} />
            ),
          }}
          component={Playlist}
        />
      </BottomTab.Navigator>
    </>
  );
};
export default BottomTabs;
