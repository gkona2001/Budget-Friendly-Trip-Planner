import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import HeaderWithBackButton from '../components/HeaderWithBackButton';
import Footer from '../components/Footer';
import StatusBar from '../components/StatusBar';
import { FontAwesome5 } from '@expo/vector-icons'; // For flight icons or other visuals

const FlightSearchResults = ({ navigation, route }) => {
  const { from, to } = route.params;

  const flightOptions = [
    {
      id: '1',
      airline: 'Delta Airlines',
      departureTime: '10:00 AM',
      arrivalTime: '12:15 PM',
      departureAirport: "ORD",
      arrivalAirport: 'JFK',
      flightDuration: '2h 15m',
      stops: 'Non-stop',
      price: '$250',
      returnFlight: {
        departureTime: '3:00 PM',
        arrivalTime: '8:15 PM',
        departureAirport: 'JFK',
        arrivalAirport: "ORD",
        flightDuration: '5h 15m',
        stops: '1 stop',
        stopCity: 'Detroit',
        layoverTime: '1h 45m'
      },
    },
    {
      id: '2',
      airline: 'American Airlines',
      departureTime: '11:30 AM',
      arrivalTime: '1:45 PM',
      departureAirport: "ORD",
      arrivalAirport: 'JFK',
      flightDuration: '6h 15m',
      stops: '1 stop',
      price: '$320',
      stopCity: 'Boston',
      layoverTime: '1h 30m',
      returnFlight: {
        departureTime: '6:30 PM',
        arrivalTime: '8:45 PM',
        departureAirport: 'JFK',
        arrivalAirport: "ORD",
        flightDuration: '2h 15m',
        stops: 'Non-stop',
      },
    },
    {
      id: '3',
      airline: 'United Airlines',
      departureTime: '8:00 AM',
      arrivalTime: '10:15 AM',
      departureAirport: "ORD",
      arrivalAirport: 'JFK',
      flightDuration: '2h 35m',
      stops: 'Non-stop',
      price: '$400',
      returnFlight: {
        departureTime: '4:30 PM',
        arrivalTime: '6:45 PM',
        departureAirport: 'JFK',
        arrivalAirport: "ORD",
        flightDuration: '2h 15m',
        stops: 'Non-stop',
      },
    },
    {
      id: '4',
      airline: 'Spirit Airlines',
      departureTime: '1:00 PM',
      arrivalTime: '3:15 PM',
      departureAirport: "ORD",
      arrivalAirport: 'JFK',
      flightDuration: '2h 15m',
      stops: '1 stop',
      price: '$480',
      stopCity: 'Detroit',
      layoverTime: '2h 10m',
      returnFlight: {
        departureTime: '8:00 PM',
        arrivalTime: '10:15 PM',
        departureAirport: 'JFK',
        arrivalAirport: "ORD",
        flightDuration: '2h 15m',
        stops: '1 stop',
        stopCity: 'Boston',
        layoverTime: '1h 05m'
      },
    },
    {
      id: '5',
      airline: 'Southwest Airlines',
      departureTime: '9:45 AM',
      arrivalTime: '12:00 PM',
      departureAirport: "ORD",
      arrivalAirport: 'JFK',
      flightDuration: '4h 15m',
      stops: '1 stop',
      price: '$675',
      stopCity: 'Boston',
      layoverTime: '2h 10m',
      returnFlight: {
        departureTime: '5:00 PM',
        arrivalTime: '7:15 PM',
        departureAirport: 'JFK',
        arrivalAirport: "ORD",
        flightDuration: '5h 15m',
        stops: '1 stop',
        stopCity: 'Tampa',
        layoverTime: '45m'
      },
    },
  ];
  
  

  const renderFlightCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('FlightDetails', { flight: item })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.airline}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
  
      {/* Outbound Flight */}
      <View style={styles.flightRow}>
        <Text style={styles.time}>{item.departureTime}</Text>
        <View style={styles.flightInfo}>
          <Text style={styles.airportCode}>{`${item.departureAirport.split(' ')[0]}-${item.arrivalAirport.split(' ')[0]}`}</Text>
          <Text style={styles.flightDuration}>{item.flightDuration}</Text>
          <Text style={[styles.stops, item.stops === 'Non-stop' ? styles.nonStop : styles.stop]}>
            {item.stops}
          </Text>
          {item.stops !== 'Non-stop' && (
            <Text style={styles.stopCity}> {item.stopCity} ({item.layoverTime})</Text>
          )}
        </View>
        <Text style={styles.time}>{item.arrivalTime}</Text>
      </View>
  
      {/* Dotted Divider */}
      <View style={styles.dottedLine} />
  
      {/* Return Flight */}
      {item.returnFlight && (
        <View style={styles.flightRow}>
          <Text style={styles.time}>{item.returnFlight.departureTime}</Text>
          <View style={styles.flightInfo}>
            <Text style={styles.airportCode}>{`${item.returnFlight.departureAirport.split(' ')[0]}-${item.returnFlight.arrivalAirport.split(' ')[0]}`}</Text>
            <Text style={styles.flightDuration}>{item.returnFlight.flightDuration}</Text>
            <Text style={[styles.stops, item.returnFlight.stops === 'Non-stop' ? styles.nonStop : styles.stop]}>
              {item.returnFlight.stops}
            </Text>
            {item.returnFlight.stops !== 'Non-stop' && (
              <Text style={styles.stopCity}> {item.returnFlight.stopCity} ({item.returnFlight.layoverTime})</Text>
            )}
          </View>
          <Text style={styles.time}>{item.returnFlight.arrivalTime}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
  
  

  return (
    <View style={styles.container}>
      <StatusBar />
      <HeaderWithBackButton title="Flights" />
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleTitle}>
            Explore flights from Chicago to New York
          </Text>
          <Text style={styles.subtitleDates}>
            December 8th, 2024 - December 20th, 2024
          </Text>
        </View>

      <FlatList
        data={flightOptions}
        keyExtractor={(item) => item.id}
        renderItem={renderFlightCard}
        contentContainerStyle={styles.cardList}
      />
      {/* <Footer /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingBottom: 20, // Add padding to prevent overlap with footer
  },
  subtitleContainer: {
    marginTop: 15, // Adjust spacing at the top
    marginBottom: 20, // Even spacing between subtitle and cards
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  subtitleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  subtitleDates: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  cardList: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B4BF9',
  },
  flightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  time: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'left',
  },
  flightInfo: {
    flex: 2,
    alignItems: 'center',
  },
  airportCode: {
    fontSize: 12,
    color: '#666',
  },
  flightDuration: {
    fontSize: 12,
    color: '#666',
    marginVertical: 2,
  },
  stops: {
    fontSize: 12,
    fontWeight: '600',
  },
  stop: {
    color: '#E91E63',
  },
  nonStop: {
    color: '#4CAF50',
  },
  dottedLine: {
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
  },
  footer: {
    height: 30, // Height for footer to cover the home indicator
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
  },
  stopCity: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    fontStyle: 'italic',
  },
});

export default FlightSearchResults;
