import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  TextInput,
  FlatList,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import HeaderWithOnlyName from '../components/Headerwithonlyname';
import Footer from '../components/Footer';
import StatusBar from '../components/StatusBar';
import { Ionicons } from '@expo/vector-icons';
import Footerforbase from '../components/Footerforbase';

const MapsPage = ({ navigation }) => {
  const [region, setRegion] = useState({
    latitude: 41.8781, // Default to Chicago
    longitude: -87.6298,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [savedEvents, setSavedEvents] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const GOOGLE_MAPS_API_KEY = '';

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
          {
            params: {
              location: `${region.latitude},${region.longitude}`,
              radius: 2000,
              type: 'event',
              key: GOOGLE_MAPS_API_KEY,
            },
          }
        );

        const fetchedEvents = response.data.results.map((event, index) => ({
          id: index.toString(),
          title: event.name || 'Unnamed Event',
          description: event.vicinity || 'No description available',
          latitude: event.geometry?.location?.lat || 0,
          longitude: event.geometry?.location?.lng || 0,
        }));

        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [region]);

  const searchPlaces = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
        {
          params: {
            input: query,
            key: GOOGLE_MAPS_API_KEY,
            types: '(cities)', // Restrict to cities, change or remove for broader search
          },
        }
      );

      const results = response.data.predictions.map((place) => ({
        id: place.place_id,
        description: place.description,
      }));

      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const handleSelectPlace = async (placeId) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json`,
        {
          params: {
            place_id: placeId,
            key: GOOGLE_MAPS_API_KEY,
          },
        }
      );

      const location = response.data.result.geometry.location;
      setRegion({
        ...region,
        latitude: location.lat,
        longitude: location.lng,
      });

      setSearchQuery('');
      setSearchResults([]);
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const closeModal = () => setSelectedEvent(null);

  const toggleSaveEvent = (eventId) => {
    setSavedEvents((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  const shareEvent = (event) => {
    console.log(`Sharing event: ${event.title}`);
  };

  const enhanceEventDetails = (selectedEvent) => ({
    details: (
      <>
        <Text style={{ fontWeight: 'bold' }}>Date:</Text> Monday, December 2 at 19:00{'\n'}
        <Text style={{ fontWeight: 'bold' }}>Cost:</Text> Free
      </>
    ),
    description: `${selectedEvent.description}. This event offers an incredible opportunity to connect, engage, and enjoy the local community. Join us for an unforgettable experience filled with excitement and fun!`,
  });

  return (
    <View style={styles.container}>
      <StatusBar />
      <HeaderWithOnlyName title="Maps" />
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search places..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            searchPlaces(text);
          }}
        />
      </View>
      {searchResults.length > 0 && (
        <FlatList
          style={styles.searchResults}
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.searchResultItem}
              onPress={() => handleSelectPlace(item.id)}
            >
              <Text style={styles.searchResultText}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        {filteredEvents.map((event) => (
          <Marker
            key={event.id}
            coordinate={{
              latitude: event.latitude,
              longitude: event.longitude,
            }}
            onPress={() => setSelectedEvent(event)}
          />
        ))}
      </MapView>
      {selectedEvent && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={closeModal}
        >
          <Pressable style={styles.modalOverlay} onPress={closeModal} />
          <View style={styles.modalContent}>
            <View style={styles.imageContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
              <Image
                source={{
                  uri: 'https://t4.ftcdn.net/jpg/01/99/21/01/360_F_199210113_PO4I2F3CAfEhCnVnWNveK9mlgWyxY8jn.jpg',
                }}
                style={styles.eventImage}
              />
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.eventTitle}>{selectedEvent.title}</Text>
              <Text style={styles.eventDetails}>
                {enhanceEventDetails(selectedEvent).details}
              </Text>
              <Text style={styles.eventDescription}>
                {enhanceEventDetails(selectedEvent).description}
              </Text>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  closeModal();
                  navigation.navigate('Directions', {
                    destination: {
                      latitude: selectedEvent.latitude,
                      longitude: selectedEvent.longitude,
                      title: selectedEvent.title,
                    },
                  });
                }}
              >
                <Ionicons name="navigate-outline" size={20} color="#fff" />
                <Text style={styles.actionButtonText}>Directions</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.iconButton,
                  savedEvents[selectedEvent.id] && styles.iconButtonSaved,
                ]}
                onPress={() => toggleSaveEvent(selectedEvent.id)}
              >
                <Ionicons
                  name={
                    savedEvents[selectedEvent.id]
                      ? 'bookmark'
                      : 'bookmark-outline'
                  }
                  size={24}
                  color={savedEvents[selectedEvent.id] ? '#fff' : '#4B4BF9'}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => shareEvent(selectedEvent)}
              >
                <Ionicons name="share-outline" size={24} color="#4B4BF9" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      <Footer
        currentScreen="Maps"
        onHomePress={() => navigation.navigate('Home')}
        onEventsPress={() => navigation.navigate('Deals')}
        onMapsPress={() => navigation.navigate('Maps')}
        onMyEventsPress={() => navigation.navigate('MyEvents')}
      />
      <Footerforbase />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginVertical: 0,
    marginHorizontal: 0,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: '#fff',
  },
  searchIcon: {
    marginRight: 15,
  },
  searchBar: {
    flex: 1,
    fontSize: 30,
    color: '#fff',
  },
  searchResults: {
    maxHeight: 200,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 5,
    padding: 5,
  },
  searchResultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchResultText: {
    fontSize: 16,
    color: '#333',
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 5,
    borderRadius: 15,
  },
  eventImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  detailsContainer: {
    padding: 20,
  },
  eventTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  eventDetails: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    lineHeight: 22,
    textAlign: 'left',
  },
  eventDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4B4BF9',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 2,
    marginRight: 10,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  iconButton: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  iconButtonSaved: {
    backgroundColor: '#4B4BF9',
  },
});

export default MapsPage;
