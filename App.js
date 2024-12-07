import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/screens/HomeScreen';
import PlanTripScreen from './app/screens/PlanTripScreen';
import EventTrackerScreen from './app/screens/EventTrackerScreen';
import EventDetailsScreen from './app/screens/EventDetailsScreen';
import TripDetailsScreen from './app/screens/TripDetailsScreen';
import EventRecommendationsScreen from './app/screens/TripDetailsScreen';
import DealsPage from './app/screens/DealsPage';
import MapsPage from './app/screens/MapsPage';
import EventInfoScreen from './app/screens/EventInfoScreen';
import MyEventsPage from './app/screens/MyEventsPage';
import FlightSearchResults from './app/screens/FlightSearchResults';
import FlightDetails from './app/screens/FlightDetails';
import HeaderWithOnlyName from './app/components/Headerwithonlyname';
import FiltersPage from './app/screens/FiltersPage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import EventDetailsPage from './app/screens/EventDetailsPage';
import DirectionsPage from './app/screens/DirectionsPage';
import Footerforbase from './app/components/Footerforbase';

const Stack = createStackNavigator();


const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Hide the default headers for all screens */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PlanTrip" component={PlanTripScreen} />
        <Stack.Screen name="EventTracker" component={EventTrackerScreen} />
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
        <Stack.Screen name="TripDetails" component={TripDetailsScreen} />
        <Stack.Screen name="EventRecommendations" component={EventRecommendationsScreen} />
        <Stack.Screen name="Deals" component={DealsPage} />
        <Stack.Screen name="Maps" component={MapsPage} />
        <Stack.Screen name="EventInfo" component={EventInfoScreen} />
        <Stack.Screen name="MyEvents" component={MyEventsPage} />
        <Stack.Screen name="FlightSearchResults" component={FlightSearchResults} />
        <Stack.Screen name="FlightDetails" component={FlightDetails} />
        <Stack.Screen name="Headeronlyname" component={HeaderWithOnlyName} />
        <Stack.Screen name="FiltersPage" component={FiltersPage} />
        <Stack.Screen name="EventDetailsPage" component={EventDetailsPage} />
        <Stack.Screen name="Directions" component={DirectionsPage} />
        <Stack.Screen name="Footerforbase" component={Footerforbase} />


      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
