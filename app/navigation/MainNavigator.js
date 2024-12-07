import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import EventTrackerScreen from '../screens/EventTrackerScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import StatusBar from '../components/StatusBar';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="EventTracker" component={EventTrackerScreen} options={{ title: 'Events' }} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ title: 'Event Details' }} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
