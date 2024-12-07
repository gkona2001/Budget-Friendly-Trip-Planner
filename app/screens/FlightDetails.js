import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import HeaderWithBackButton from '../components/HeaderWithBackButton';
import Footerforbase from '../components/Footerforbase';
import StatusBar from '../components/StatusBar';

const FlightDetails = ({ route, navigation }) => {
  const { flight } = route.params;
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const renderFlightDetails = (segment, title) => (
    <View style={styles.flightCard}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.row}>
        <Text style={styles.time}>{segment.departureTime}</Text>
        <Text style={styles.city}>{segment.departureCity}</Text>
      </View>
      <View style={styles.flightRoute}>
        <Text style={styles.airport}>{segment.departureAirport}</Text>
        <View style={styles.lineContainer}>
          <View style={styles.verticalLine} />
          <Text style={styles.duration}>{segment.flightDuration}</Text>
          <View style={styles.verticalLine} />
        </View>
        <Text style={styles.airport}>{segment.arrivalAirport}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.time}>{segment.arrivalTime}</Text>
        <Text style={styles.city}>{segment.arrivalCity}</Text>
      </View>
      {segment.stops !== 'Non-stop' && (
        <Text style={styles.stops}>
          Stops: {segment.stops} ({segment.stopCity || 'Unknown'})
        </Text>
      )}
    </View>
  );

  const handleConfirm = () => {
    setShowConfirmationModal(false);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigation.navigate('Home'); // Navigate to HomeScreen after toast is hidden
    }, 1000); // 1-second delay for the toast message
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <HeaderWithBackButton title="Flight Details" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>{flight.airline}</Text>

        {/* First Flight */}
        {renderFlightDetails(
          {
            departureTime: flight.departureTime,
            arrivalTime: flight.arrivalTime,
            flightDuration: flight.flightDuration,
            departureCity: flight.departureCity,
            arrivalCity: flight.arrivalCity,
            departureAirport: flight.departureAirport,
            arrivalAirport: flight.arrivalAirport,
            stops: flight.stops,
            stopCity: flight.stopCity,
          },
          'First Flight'
        )}

        {/* Return Flight */}
        {flight.returnFlight &&
          renderFlightDetails(
            {
              departureTime: flight.returnFlight.departureTime,
              arrivalTime: flight.returnFlight.arrivalTime,
              flightDuration: flight.returnFlight.flightDuration,
              departureCity: flight.returnFlight.departureCity,
              arrivalCity: flight.returnFlight.arrivalCity,
              departureAirport: flight.returnFlight.departureAirport,
              arrivalAirport: flight.returnFlight.arrivalAirport,
              stops: flight.returnFlight.stops,
              stopCity: flight.returnFlight.stopCity,
            },
            'Return Flight'
          )}

        {/* Book Now Button */}
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => setShowConfirmationModal(true)}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmationModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Your Booking</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to book this flight with {flight.airline}?
            </Text>
            <Text style={styles.modalDetails}>
              Departure: {flight.departureCity} ({flight.departureAirport}){'\n'}
              Arrival: {flight.arrivalCity} ({flight.arrivalAirport}){'\n'}
              Flight Duration: {flight.flightDuration}{'\n'}
              <Text style={{ fontSize: 16, color: '#000', marginBottom: 5 }}>
              <Text style={{ fontWeight: 'bold' }}>Price: {flight.price}</Text> 
              </Text>
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowConfirmationModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Toast Message */}
      {showToast && (
        <View style={styles.toastContainer}>
          <View style={styles.toast}>
            <MaterialIcons name="check-circle" size={50} color="#4CAF50" />
            <Text style={styles.toastText}>Booking Confirmed!</Text>
          </View>
        </View>
      )}
      <Footerforbase/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  flightCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  city: {
    fontSize: 14,
    color: '#666',
  },
  flightRoute: {
    alignItems: 'center',
    marginVertical: 10,
  },
  airport: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginVertical: 5,
  },
  lineContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  verticalLine: {
    width: 2,
    height: 20,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
  duration: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginVertical: 5,
  },
  stops: {
    fontSize: 12,
    color: '#E91E63',
    textAlign: 'center',
    marginTop: 5,
  },
  bookButton: {
    backgroundColor: '#4B4BF9',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 20,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 10,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  modalDetails: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#4B4BF9',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  toastContainer: {
    position: 'absolute',
    top: '50%', // Center vertically
    left: 20,
    right: 20,
    alignItems: 'center',
    transform: [{ translateY: -50 }], // Adjust to center precisely
  },
  
  toast: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  toastText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default FlightDetails;
