import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EventDetailsScreen = ({ route, navigation }) => {
  const { event } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{event.title}</Text>
      </View>
      <Image source={{ uri: event.image }} style={styles.image} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <TouchableOpacity style={styles.directionButton}>
        <Text style={styles.directionText}>Get Directions</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  directionButton: {
    backgroundColor: '#4B4BF9',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  directionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EventDetailsScreen;
