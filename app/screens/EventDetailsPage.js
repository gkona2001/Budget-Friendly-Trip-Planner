import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StatusBar from '../components/StatusBar';

const EventDetailsPage = ({ route, navigation }) => {
  const { event } = route.params;
  const [isSaved, setIsSaved] = useState(false);
  const [toastOpacity] = useState(new Animated.Value(0));

  const showToast = () => {
    Animated.sequence([
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(toastOpacity, {
        toValue: 0,
        duration: 300,
        delay: 2000, // Toast will be visible for 2 seconds
        useNativeDriver: true,
      }),
    ]).start();
  };

  const saveEvent = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      showToast();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <StatusBar />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{event.title}</Text>
      </View>

      {/* Image Section */}
      <Image source={{ uri: event.image }} style={styles.image} />

      {/* Event Details */}
      <Text style={styles.date}>{event.date}</Text>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <Text style={styles.price}>
        <Text style={styles.boldText}>Price:</Text> {event.price}
      </Text>

      {/* Basic Text Description */}
      <Text style={styles.basicDescription}>
        {event.description} This event offers an amazing opportunity to interact with like-minded individuals. Whether you're looking for networking, fun, or learning experiences, this event caters to all. Join us for a memorable experience!
      </Text>

      {/* Organizer Section */}
      <View style={styles.organizer}>
        <Text style={styles.organizerName}>UIC Flames</Text>
        <Text style={styles.organizerFollowers}>12.2k followers</Text>
      </View>

      {/* Additional Details */}
      <View style={styles.detailsRow}>
        <Ionicons name="location-outline" size={20} color="#666" />
        <Text style={styles.detailText}>
          <Text style={styles.boldText}>Location:</Text> Online
        </Text>
      </View>
      <View style={styles.detailsRow}>
        <Ionicons name="time-outline" size={20} color="#666" />
        <Text style={styles.detailText}>
          <Text style={styles.boldText}>Duration:</Text> 2 hours
        </Text>
      </View>
      <View style={styles.detailsRow}>
        <Ionicons name="cash-outline" size={20} color="#666" />
        <Text style={styles.detailText}>
          <Text style={styles.boldText}>Refund Policy:</Text> No refunds
        </Text>
      </View>

      {/* Ticket Button */}
      <TouchableOpacity style={styles.ticketButton}>
        <Text style={styles.ticketButtonText}>Get Tickets</Text>
      </TouchableOpacity>

      {/* Footer Icons */}
      <View style={styles.footerIcons}>
        <TouchableOpacity
          style={styles.footerIcon}
          onPress={() => navigation.navigate('Directions')} // Navigate to DirectionsPage
        >
          <Ionicons name="navigate-outline" size={28} color="#4B4BF9" />
          <Text style={styles.footerIconText}>Directions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerIcon} onPress={saveEvent}>
          <Ionicons
            name={isSaved ? 'bookmark' : 'bookmark-outline'}
            size={28}
            color={isSaved ? 'blue' : '#4B4BF9'}
          />
          <Text style={styles.footerIconText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Ionicons name="share-outline" size={28} color="#4B4BF9" />
          <Text style={styles.footerIconText}>Share</Text>
        </TouchableOpacity>
      </View>

      {/* Toast Message */}
      <Animated.View style={[styles.toast, { opacity: toastOpacity }]}>
        <Text style={styles.toastText}>Saved!</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  price: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
  boldText: {
    fontWeight: 'bold',
  },
  basicDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
    lineHeight: 20,
  },
  organizer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  organizerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  organizerFollowers: {
    fontSize: 12,
    color: '#999',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  ticketButton: {
    backgroundColor: '#4B4BF9',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 20,
  },
  ticketButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  footerIcon: {
    alignItems: 'center',
  },
  footerIconText: {
    marginTop: 5,
    fontSize: 12,
    color: '#4B4BF9',
  },
  toast: {
    position: 'absolute',
    bottom: 100, // Position above Save button
    alignSelf: 'center',
    backgroundColor: '#4B4BF9',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    zIndex: 10,
  },
  toastText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default EventDetailsPage;
