import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const EventRecommendationsScreen = ({ route }) => {
  const { destination, numPeople, startDate, endDate, budget, category, numChildren } = route.params;

  const events = [
    { id: '1', name: 'Art Festival', cost: 30, location: 'Downtown', category: 'family' },
    { id: '2', name: 'Music Concert', cost: 50, location: 'City Center', category: 'backpackers' },
    { id: '3', name: 'Food Carnival', cost: 20, location: 'Main Street', category: 'family' },
  ];

  const filteredEvents = events.filter(event => event.cost <= budget && event.category === category);

  return (
    <View style={styles.container}>
      <Header title="Recommended Events" />
      <Text style={styles.title}>Events in {destination}</Text>

      <FlatList
        data={filteredEvents}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <Text style={styles.eventName}>{item.name}</Text>
            <Text style={styles.eventDetails}>
              Location: {item.location} | Cost: ${item.cost}
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Get Directions</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventDetails: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4B4BF9',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EventRecommendationsScreen;
