import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PlanTripScreen = () => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalBudget, setTotalBudget] = useState('');
  const [transportation, setTransportation] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [activities, setActivities] = useState('');

  const navigation = useNavigation();

  const handleSubmit = () => {
    console.log('Submit button pressed');
  
    if (!destination || !startDate || !endDate || !totalBudget || !transportation || !accommodation || !activities) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
  
    console.log('All fields are valid');
    console.log('Navigating with data:', {
      destination,
      startDate,
      endDate,
      totalBudget,
      transportation: parseFloat(transportation),
      accommodation: parseFloat(accommodation),
      activities: parseFloat(activities),
    });
  
    navigation.navigate('BudgetOverview', {
      destination,
      startDate,
      endDate,
      totalBudget,
      transportation: parseFloat(transportation),
      accommodation: parseFloat(accommodation),
      activities: parseFloat(activities),
    });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plan Your Trip</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Destination"
        value={destination}
        onChangeText={(text) => setDestination(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Start Date (YYYY-MM-DD)"
        value={startDate}
        onChangeText={(text) => setStartDate(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter End Date (YYYY-MM-DD)"
        value={endDate}
        onChangeText={(text) => setEndDate(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Total Budget in USD"
        value={totalBudget}
        onChangeText={(text) => setTotalBudget(text)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Transportation"
        value={transportation}
        onChangeText={(text) => setTransportation(text)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Accommodation"
        value={accommodation}
        onChangeText={(text) => setAccommodation(text)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Activities"
        value={activities}
        onChangeText={(text) => setActivities(text)}
        keyboardType="numeric"
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default PlanTripScreen;
