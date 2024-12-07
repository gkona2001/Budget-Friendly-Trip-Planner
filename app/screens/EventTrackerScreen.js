import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatusBar from '../components/StatusBar';

const dummyEvents = [
  {
    id: '1',
    name: 'Art Institute of Chicago',
    location: '140E Morgan St, Chicago',
    date: 'Dec 12, 2024',
    cost: 'FREE',
    image: 'https://via.placeholder.com/150',
    coordinates: { lat: 41.8796, lng: -87.6237 },
  },
  {
    id: '2',
    name: 'Harry Styles: Dawn',
    location: 'Millennium Park, Chicago',
    date: 'Dec 13, 2024',
    cost: '$400.00',
    image: 'https://via.placeholder.com/150',
    coordinates: { lat: 41.8826, lng: -87.6226 },
  },
  {
    id: '3',
    name: 'Harry Styles: Dawn',
    location: 'Millennium Park, Chicago',
    date: 'Dec 13, 2024',
    cost: '$400.00',
    image: 'https://via.placeholder.com/150',
    coordinates: { lat: 41.8826, lng: -87.6226 },
  }
];

const EventTrackerScreen = () => {
  const navigation = useNavigation();

  const handleEventClick = (event) => {
    navigation.navigate('EventDetails', { event });
  };

  return (
    <View style={styles.container}>
        <StatusBar />
        <Header />
      <Text style={styles.title}>Find Events Near You</Text>
      <FlatList
        data={dummyEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.eventCard}
            onPress={() => handleEventClick(item)}
          >
            <Image source={{ uri: item.image }} style={styles.eventImage} />
            <View style={styles.eventInfo}>
              <Text style={styles.eventName}>{item.name}</Text>
              <Text style={styles.eventLocation}>📍 {item.location}</Text>
              <Text style={styles.eventDate}>📅 {item.date}</Text>
              <Text style={styles.eventCost}>💵 {item.cost}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  eventCard: {
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  eventImage: {
    width: 100,
    height: 100,
  },
  eventInfo: {
    flex: 1,
    padding: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventLocation: {
    fontSize: 14,
    color: '#666',
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
  },
  eventCost: {
    fontSize: 16,
    color: '#e63946',
    fontWeight: 'bold',
  },
});

export default EventTrackerScreen;
