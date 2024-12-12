import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';
import HeaderWithFaceIcon from '../components/HeaderWithFaceIcon';
import Footer from '../components/Footer';
import StatusBar from '../components/StatusBar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FlightSearchResults from './FlightSearchResults';
import Footerforbase from '../components/Footerforbase';
import { LayoutAnimation } from 'react-native';

const handleTabChange = (tab) => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  setActiveTab(tab);
};

const GOOGLE_PLACES_API_KEY = '';

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Flights');
  const [fromLocation, setFromLocation] = useState('');
  const [fromLocation1, setFromLocation1] = useState('');
const [fromLocation2, setFromLocation2] = useState('');

  const [fromLocation1Suggestions, setFromLocation1Suggestions] = useState([]);
  const [fromLocation2Suggestions, setFromLocation2Suggestions] = useState([]);
  const [toLocation, setToLocation] = useState('');
  const [location, setLocation] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [pickupDateTime, setPickupDateTime] = useState(new Date());
  const [dropoffDateTime, setDropoffDateTime] = useState(new Date());
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [isPickupPickerVisible, setPickupPickerVisible] = useState(false);
  const [isDropoffPickerVisible, setDropoffPickerVisible] = useState(false);
  const [tripType, setTripType] = useState('roundTrip'); // 'roundTrip' or 'oneWay'


  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [showTravelerModal, setShowTravelerModal] = useState(false);

  const fetchCitySuggestions = async (input, setSuggestionsFn) => {
    if (input.length === 0) {
      setSuggestionsFn([]);
      return;
    }
  
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
        {
          params: {
            input,
            key: GOOGLE_PLACES_API_KEY,
            types: '(cities)', // Restrict suggestions to cities
          },
        }
      );
      setSuggestionsFn(response.data.predictions);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
    }
  };
  
  const fetchCarRentalLocations = async (input, setSuggestionsFn) => {
    if (input.length === 0) {
      setSuggestionsFn([]);
      return;
    }
  
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
        {
          params: {
            input,
            key: GOOGLE_PLACES_API_KEY,
            types: 'establishment',
            keyword: 'car rental', // Filter results for car rental locations
          },
        }
      );
      setSuggestionsFn(response.data.predictions);
    } catch (error) {
      console.error('Error fetching car rental locations:', error);
    }
  };
  

  const renderTravelerModal = (includeRooms = false) => (
    <Modal
      visible={showTravelerModal}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Travelers</Text>

          {/* Adults Count */}
          <View style={styles.travelerRow}>
            <Text style={styles.travelerText}>Adults</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => setAdults(Math.max(1, adults - 1))}
              >
                <Text style={styles.counterText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{adults}</Text>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => setAdults(adults + 1)}
              >
                <Text style={styles.counterText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Children Count */}
          <View style={styles.travelerRow}>
            <Text style={styles.travelerText}>Children</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => setChildren(Math.max(0, children - 1))}
              >
                <Text style={styles.counterText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{children}</Text>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => setChildren(children + 1)}
              >
                <Text style={styles.counterText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Rooms Count (only for Stays) */}
          {includeRooms && (
            <View style={styles.travelerRow}>
              <Text style={styles.travelerText}>Rooms</Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => setRooms(Math.max(1, rooms - 1))}
                >
                  <Text style={styles.counterText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterValue}>{rooms}</Text>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => setRooms(rooms + 1)}
                >
                  <Text style={styles.counterText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowTravelerModal(false)}
          >
            <Text style={styles.closeButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderTabContent = () => {
    switch (activeTab) {
// Inside the renderTabContent function for Flights and Stays

case 'Flights':
    return (
      <>
        {/* From Location Input */}
        <View style={{ position: 'relative' }}>
        {/* Toggle Buttons for Trip Type */}
<View style={styles.toggleContainer}>
  <TouchableOpacity
    style={[
      styles.toggleButton,
      tripType === 'roundTrip' && styles.activeToggleButton,
    ]}
    onPress={() => setTripType('roundTrip')}
  >
    <Text
      style={[
        styles.toggleButtonText,
        tripType === 'roundTrip' && styles.activeToggleButtonText,
      ]}
    >
      Round Trip
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.toggleButton,
      tripType === 'oneWay' && styles.activeToggleButton,
    ]}
    onPress={() => setTripType('oneWay')}
  >
    <Text
      style={[
        styles.toggleButtonText,
        tripType === 'oneWay' && styles.activeToggleButtonText,
      ]}
    >
      One Way
    </Text>
  </TouchableOpacity>
</View>

          <TextInput
            style={styles.input}
            placeholder="From (e.g., Chicago, IL)"
            placeholderTextColor="#666"
            value={fromLocation1}
            onChangeText={(text) => {
              setFromLocation1(text);
              fetchCitySuggestions(text, setFromLocation1Suggestions);
            }}
          />
          {fromLocation1Suggestions.length > 0 && (
            <FlatList
              data={fromLocation1Suggestions}
              keyExtractor={(item) => item.place_id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setFromLocation1(item.description);
                    setFromLocation1Suggestions([]);
                  }}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownText}>{item.description}</Text>
                </TouchableOpacity>
              )}
              style={styles.dropdown} // This style is updated below
            />
          )}
        </View>

        {/* To Location Input */}
        <View style={{ position: 'relative' }}>
          <TextInput
            style={styles.input}
            placeholder="To (e.g., New York, NY)"
            placeholderTextColor="#666"
            value={fromLocation2}
            onChangeText={(text) => {
              setFromLocation2(text);
              fetchCitySuggestions(text, setFromLocation2Suggestions);
            }}
          />
          {fromLocation2Suggestions.length > 0 && (
            <FlatList
              data={fromLocation2Suggestions}
              keyExtractor={(item) => item.place_id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setFromLocation2(item.description);
                    setFromLocation2Suggestions([]);
                  }}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownText}>{item.description}</Text>
                </TouchableOpacity>
              )}
              style={styles.dropdown} // This style is updated below
            />
          )}
        </View>

{/* Date Inputs */}
<View style={styles.row}>
  <TouchableOpacity
    style={[styles.input, styles.dateInput]}
    onPress={() => setStartDatePickerVisible(true)}
  >
    <Text>{dateStart.toDateString()}</Text>
  </TouchableOpacity>
  {tripType === 'roundTrip' && (
    <TouchableOpacity
      style={[styles.input, styles.dateInput]}
      onPress={() => setEndDatePickerVisible(true)}
    >
      <Text>{dateEnd.toDateString()}</Text>
    </TouchableOpacity>
  )}
</View>


        {/* Start Date Picker */}
        <DateTimePickerModal
          isVisible={isStartDatePickerVisible}
          mode="date"
          minimumDate={new Date()} // Ensure the date starts from today
          onConfirm={(date) => {
            setDateStart(date);
            setStartDatePickerVisible(false);
          }}
          onCancel={() => setStartDatePickerVisible(false)}
        />

        {/* End Date Picker */}
        <DateTimePickerModal
          isVisible={isEndDatePickerVisible}
          mode="date"
          minimumDate={new Date()} // Ensure the date starts from today
          onConfirm={(date) => {
            setDateEnd(date);
            setEndDatePickerVisible(false);
          }}
          onCancel={() => setEndDatePickerVisible(false)}
        />
      </>
    );


  case 'Stays':
    return (
      <>
        {/* Location Input */}
        <TextInput
          style={styles.input}
          placeholder="Location (e.g., Chicago, IL)"
          placeholderTextColor="#666"
          value={location}
          onChangeText={(text) => {
            setLocation(text);
            fetchCitySuggestions(text, setLocationSuggestions);
          }}
        />
        {location.length > 0 && (
          <FlatList
            data={locationSuggestions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setLocation(item.description);
                  setLocationSuggestions([]);
                }}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownText}>{item.description}</Text>
              </TouchableOpacity>
            )}
            style={styles.dropdown}
          />
        )}

        {/* Date Inputs */}
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.input, styles.dateInput]}
            onPress={() => setStartDatePickerVisible(true)}
          >
            <Text>{dateStart.toDateString()}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.input, styles.dateInput]}
            onPress={() => setEndDatePickerVisible(true)}
          >
            <Text>{dateEnd.toDateString()}</Text>
          </TouchableOpacity>
        </View>

        {/* Start Date Picker */}
        <DateTimePickerModal
          isVisible={isStartDatePickerVisible}
          mode="date"
          onConfirm={(date) => {
            setDateStart(date);
            setStartDatePickerVisible(false);
          }}
          onCancel={() => setStartDatePickerVisible(false)}
        />

        {/* End Date Picker */}
        <DateTimePickerModal
          isVisible={isEndDatePickerVisible}
          mode="date"
          onConfirm={(date) => {
            setDateEnd(date);
            setEndDatePickerVisible(false);
          }}
          onCancel={() => setEndDatePickerVisible(false)}
        />

        {/* Traveler Info */}
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowTravelerModal(true)}
        >
          <Text style={{ color: '#333' }}>
            {adults} Adults, {children} Children, {rooms} Room(s)
          </Text>
        </TouchableOpacity>

        {/* Traveler Modal */}
        <Modal
          visible={showTravelerModal}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Travelers</Text>

              {/* Adults Count */}
              <View style={styles.travelerRow}>
                <Text style={styles.travelerText}>Adults</Text>
                <View style={styles.counterContainer}>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setAdults(Math.max(1, adults - 1))}
                  >
                    <Text style={styles.counterText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterValue}>{adults}</Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setAdults(adults + 1)}
                  >
                    <Text style={styles.counterText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Children Count */}
              <View style={styles.travelerRow}>
                <Text style={styles.travelerText}>Children</Text>
                <View style={styles.counterContainer}>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setChildren(Math.max(0, children - 1))}
                  >
                    <Text style={styles.counterText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterValue}>{children}</Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setChildren(children + 1)}
                  >
                    <Text style={styles.counterText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Rooms Count */}
              <View style={styles.travelerRow}>
                <Text style={styles.travelerText}>Rooms</Text>
                <View style={styles.counterContainer}>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setRooms(Math.max(1, rooms - 1))}
                  >
                    <Text style={styles.counterText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterValue}>{rooms}</Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setRooms(rooms + 1)}
                  >
                    <Text style={styles.counterText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowTravelerModal(false)}
              >
                <Text style={styles.closeButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </>
    );


      case 'Cars':
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Car Rental Location"
              placeholderTextColor="#666"
              value={location}
              onChangeText={(text) => {
                setLocation(text);
                fetchCarRentalLocations(text, setLocationSuggestions);
              }}
            />
            {location.length > 0 && (
              <FlatList
                data={locationSuggestions}
                keyExtractor={(item) => item.place_id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setLocation(item.description);
                      setLocationSuggestions([]);
                    }}
                    style={styles.dropdownItem}
                  >
                    <Text style={styles.dropdownText}>{item.description}</Text>
                  </TouchableOpacity>
                )}
                style={styles.dropdown}
              />
            )}

            <TouchableOpacity
              style={styles.input}
              onPress={() => setPickupPickerVisible(true)}
            >
              <Text>{pickupDateTime.toLocaleString()}</Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isPickupPickerVisible}
              mode="datetime"
              onConfirm={(date) => {
                setPickupDateTime(date);
                setPickupPickerVisible(false);
              }}
              onCancel={() => setPickupPickerVisible(false)}
            />

            <TouchableOpacity
              style={styles.input}
              onPress={() => setDropoffPickerVisible(true)}
            >
              <Text>{dropoffDateTime.toLocaleString()}</Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDropoffPickerVisible}
              mode="datetime"
              onConfirm={(date) => {
                setDropoffDateTime(date);
                setDropoffPickerVisible(false);
              }}
              onCancel={() => setDropoffPickerVisible(false)}
            />
          </>
        );

      default:
        return null;
    }
  };
  const renderDealCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}</Text>
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <View style={styles.expiryContainer}>
            <Text style={styles.expiryText}>Expires in {item.expires}</Text>
        </View>
    </TouchableOpacity>
);


return (
  <View style={styles.container}>
    <StatusBar />
    <HeaderWithFaceIcon title="Event Planner" />
    <View style={{ flex: 1 }}>
    <View
    style={[
      styles.primaryContent,
      {
        flexGrow: activeTab === 'Flights' || activeTab === 'Stays' || activeTab === 'Cars' ? 3 : 2,
      },
    ]}
  >
        <View>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Flights' && styles.activeTab]}
              onPress={() => setActiveTab('Flights')}
            >
              <View style={styles.iconWrapper}>
                <Icon name="flight" size={30} color={activeTab === 'Flights' ? '#fff' : '#000'} />
              </View>
              <Text style={[styles.tabText, activeTab === 'Flights' && styles.activeTabText]}>
                Flights
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Stays' && styles.activeTab]}
              onPress={() => setActiveTab('Stays')}
            >
              <View style={styles.iconWrapper}>
                <Icon name="hotel" size={30} color={activeTab === 'Stays' ? '#fff' : '#000'} />
              </View>
              <Text style={[styles.tabText, activeTab === 'Stays' && styles.activeTabText]}>
                Stays
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Cars' && styles.activeTab]}
              onPress={() => setActiveTab('Cars')}
            >
              <View style={styles.iconWrapper}>
                <Icon
                  name="directions-car"
                  size={30}
                  color={activeTab === 'Cars' ? '#fff' : '#000'}
                />
              </View>
              <Text style={[styles.tabText, activeTab === 'Cars' && styles.activeTabText]}>
                Cars
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputSection}>
            {renderTabContent()}
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => {
                navigation.navigate('FlightSearchResults', { from: fromLocation1, to: fromLocation2 });
              }}
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
    style={[
      styles.secondaryContent,
      {
        flexGrow: 1,
        paddingBottom: 20, // Ensure space below the cards
        marginBottom: 20, // Additional spacing from the bottom of the screen
      },
    ]}
  >
       
  </View>
</View>
    <Footer
      currentScreen="Home"
      onHomePress={() => navigation.navigate('Home')}
      onEventsPress={() => navigation.navigate('Deals')}
      onMapsPress={() => navigation.navigate('Maps')}
      onMyEventsPress={() => navigation.navigate('MyEvents')}
    />
    <Footerforbase />
  </View>
);

      }

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#f9f9f9',
        },
        primaryContent: {
          padding: 20,
          justifyContent: 'flex-start',
          backgroundColor: '#eef2ff',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          elevation: 3,
          flex: 2, // Allocate more space to the primary section
        },
        secondaryContent: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingBottom: 20, // Add spacing below the content
          marginBottom: 20, // Ensure spacing from the screen bottom
          backgroundColor: '#f9f9f9',
          flex: 1, // Allocate less space to the secondary section
        },
        secondaryText: {
          fontSize: 16,
          textAlign: 'center',
          color: '#333',
          marginBottom: 5,
        },
        tabContainer: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 20,
        },
        tab: {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f2f2f2',
          borderRadius: 15,
          width: 70,
          height: 70,
          elevation: 2,
        },
        activeTab: {
          backgroundColor: '#4B4BF9',
        },
        iconWrapper: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabText: {
          marginTop: 5,
          fontSize: 12,
          fontWeight: '600',
          color: '#000',
        },
        activeTabText: {
          color: '#fff',
        },
        inputSection: {
          marginTop: 10,
        },
        input: {
          backgroundColor: '#fff',
          color: '#333',
          padding: 15,
          marginVertical: 10,
          borderRadius: 10,
          borderColor: '#ccc',
          borderWidth: 1,
          elevation: 1,
        },
        dropdown: {
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          maxHeight: 200,
          zIndex: 1000,
          elevation: 5,
        },
        dropdownItem: {
          padding: 10,
        },
        dropdownText: {
          fontSize: 14,
          color: '#333',
        },
        searchButton: {
          backgroundColor: '#4B4BF9',
          padding: 15,
          borderRadius: 10,
          alignItems: 'center',
          marginTop: 20,
        },
        searchButtonText: {
          color: '#fff',
          fontSize: 16,
          fontWeight: 'bold',
        },
        modalContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        modalContent: {
          width: '80%',
          backgroundColor: '#fff',
          padding: 20,
          borderRadius: 10,
        },
        modalTitle: {
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 15,
        },
        travelerRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10,
        },
        travelerText: {
          fontSize: 16,
        },
        counterContainer: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        counterButton: {
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: '#ccc',
          justifyContent: 'center',
          alignItems: 'center',
        },
        counterText: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        counterValue: {
          marginHorizontal: 10,
          fontSize: 16,
        },
        closeButton: {
          backgroundColor: '#4B4BF9',
          padding: 10,
          borderRadius: 10,
          marginTop: 20,
          alignItems: 'center',
        },
        closeButtonText: {
          color: '#fff',
          fontWeight: 'bold',
        },
        toggleContainer: {
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 10,
        },
        toggleButton: {
          flex: 1,
          padding: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          alignItems: 'center',
          borderRadius: 5,
          marginHorizontal: 5,
          backgroundColor: '#f2f2f2',
        },
        activeToggleButton: {
          backgroundColor: '#4B4BF9',
          borderColor: '#4B4BF9',
        },
        toggleButtonText: {
          color: '#333',
          fontSize: 14,
          fontWeight: '600',
        },
        activeToggleButtonText: {
          color: '#fff',
        },
        horizontalCardContainer: {
          paddingHorizontal: 10,
          paddingTop: 10, // Add space above the cards
          paddingBottom: 10, // Ensure space below the cards
        },
        card: {
          backgroundColor: '#fff',
          borderRadius: 12,
          marginHorizontal: 10,
          padding: 10,
          width: 200,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
        },
        cardImage: {
          height: 100,
          width: '100%',
          borderRadius: 10,
          marginBottom: 10,
        },
        discountBadge: {
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: '#4CAF50',
          padding: 5,
          borderRadius: 8,
        },
        discountText: {
          fontSize: 12,
          color: '#fff',
          fontWeight: 'bold',
        },
        cardTitle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 5,
        },
        cardDescription: {
          fontSize: 14,
          color: '#666',
        },
        expiryContainer: {
          marginTop: 10,
        },
        expiryText: {
          fontSize: 12,
          color: '#4CAF50',
        },
      });
      
      export default HomeScreen;
      



