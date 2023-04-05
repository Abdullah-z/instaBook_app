import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Articles, Components, Home, Profile, Register, Pro} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';
import Comments from '../screens/Comments';
import Saved from '../screens/Saved';
import Test from '../screens/Test';

const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator
      screenOptions={screenOptions.stack}
      initialRouteName={'Register'}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: t('navigation.home')}}
      />

      <Stack.Screen
        name="Components"
        component={Components}
        options={screenOptions.components}
      />

      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{title: t('navigation.articles')}}
      />

      <Stack.Screen name="Pro" component={Pro} options={screenOptions.pro} />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Saved"
        component={Saved}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Test"
        component={Test}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};
