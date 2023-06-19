import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AppStack from './AppStack/AppStack';

const Stack = createNativeStackNavigator();

export default Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode={false}
        animationEnabled={true}
        screenOptions={{
          headerShown: false,
        }}>
        {AppStack(Stack)}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
