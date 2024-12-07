import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BudgetOverviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { destination, startDate, endDate, totalBudget, transportation, accommodation, activities } = route.params;

  const transportOptions = [
    { type: 'Bus', cost: Math.min(50, transportation) },
    { type: 'Train', cost: Math.min(100, transportation) },
    { type: 'Car Rental', cost: Math.min(150, transportation) },
    { type: 'Flight', cost: Math.min(300, transportation) },
  ].filter(option => option.cost <= transportation);

  const accommodationOptions = [
    { type: 'Hostel', cost: Math.min(50, accommodation) },
    { type: 'Budget Hotel', cost: Math.min(100, accommodation) },
    { type: 'Mid-range Hotel', cost: Math.min(200, accommodation) },
    { type: 'Luxury Hotel', cost: Math.min(400, accommodation) },
  ].filter(option => option.cost <= accommodation);

  const activityOptions = [
    { activity: 'Local Tour', cost: Math.min(50, activities) },
    { activity: 'Museum Visit', cost: Math.min(30, activities) },
    { activity: 'Outdoor Adventure', cost: Math.min(100, activities) },
    { activity: 'Concert', cost: Math.min(150, activities) },
  ].filter(option => option.cost <= activities);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget Overview for {destination}</Text>
      <Text style={styles.subTitle}>Travel Dates: {startDate} to {endDate}</Text>

      <Text style={styles.sectionTitle}>Transportation Options:</Text>
      <FlatList
        data={transportOptions}
        keyExtractor={(item, index) => `transport-${index}`}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>{item.type} - ${item.cost}</Text>
        )}
      />

      <Text style={styles.sectionTitle}>Accommodation Options:</Text>
      <FlatList
        data={accommodationOptions}
        keyExtractor={(item, index) => `accommodation-${index}`}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>{item.type} - ${item.cost}</Text>
        )}
      />

      <Text style={styles.sectionTitle}>Activity Options:</Text>
      <FlatList
        data={activityOptions}
        keyExtractor={(item, index) => `activity-${index}`}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>{item.activity} - ${item.cost}</Text>
        )}
      />

      <Button title="Edit Trip" onPress={() => navigation.navigate('PlanTrip')} />
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
    marginBottom: 10,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    marginVertical: 5,
    color: '#444',
  },
});

export default BudgetOverviewScreen;
