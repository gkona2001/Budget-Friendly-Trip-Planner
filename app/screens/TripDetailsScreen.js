import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatusBar from '../components/StatusBar'; // Import StatusBar component

const GOOGLE_PLACES_API_KEY = 'AIzaSyB3DgKHLD1rverz7rpCmpmhQq__SVnEXPg'; // Replace with your Google API Key

const TripDetailsScreen = ({ navigation }) => {
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [numPeople, setNumPeople] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState('backpackers');
  const [numChildren, setNumChildren] = useState('');

  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
        {
          params: {
            input,
            key: GOOGLE_PLACES_API_KEY,
          },
        }
      );
      setSuggestions(response.data.predictions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSelectSuggestion = (place) => {
    setDestination(place.description);
    setSuggestions([]); // Clear suggestions after selection
  };

  const formatDate = (date) => {
    if (!date) return 'Select Date';
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  const handleSubmit = () => {
    if (!destination || !numPeople || !startDate || !endDate || !budget) {
      alert('Please fill in all required fields.');
      return;
    }
    if (category === 'family' && !numChildren) {
      alert('Please provide the number of children.');
      return;
    }

    navigation.navigate('EventRecommendations', {
      destination,
      numPeople: parseInt(numPeople),
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      budget: parseFloat(budget),
      category,
      numChildren: category === 'family' ? parseInt(numChildren) : 0,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* StatusBar */}
        <StatusBar />

        {/* Header */}
        <Header title="Plan Your Trip" />

        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Enter Trip Details</Text>

          {/* Destination Input with Autocomplete */}
          <TextInput
            style={styles.input}
            placeholder="Enter Destination"
            placeholderTextColor="black" // Set placeholder color to black
            value={destination}
            onChangeText={(text) => {
              setDestination(text);
              fetchSuggestions(text); // Fetch suggestions as the user types
            }}
          />
          {/* Suggestions List */}
          {suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.place_id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => handleSelectSuggestion(item)}
                >
                  <Text style={styles.suggestionText}>{item.description}</Text>
                </TouchableOpacity>
              )}
            />
          )}

          {/* Number of People */}
          <TextInput
            style={styles.input}
            placeholder="Number of People"
            placeholderTextColor="black" // Set placeholder color to black
            value={numPeople}
            onChangeText={setNumPeople}
            keyboardType="numeric"
          />

          {/* Start Date Picker */}
          <Text style={styles.label}>Start Date:</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowStartPicker(true)}
          >
            <Text style={styles.dateText}>
              {startDate ? formatDate(startDate) : 'Select Date'}
            </Text>
          </TouchableOpacity>
          {showStartPicker && (
            <DateTimePicker
              value={startDate || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, date) => {
                setShowStartPicker(false);
                if (date) setStartDate(date);
              }}
            />
          )}

          {/* End Date Picker */}
          <Text style={styles.label}>End Date:</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowEndPicker(true)}
          >
            <Text style={styles.dateText}>
              {endDate ? formatDate(endDate) : 'Select Date'}
            </Text>
          </TouchableOpacity>
          {showEndPicker && (
            <DateTimePicker
              value={endDate || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, date) => {
                setShowEndPicker(false);
                if (date) setEndDate(date);
              }}
            />
          )}

          {/* Budget */}
          <TextInput
            style={styles.input}
            placeholder="Enter Total Budget"
            placeholderTextColor="black" // Set placeholder color to black
            value={budget}
            onChangeText={setBudget}
            keyboardType="numeric"
          />

          {/* Category Selection */}
          <Text style={styles.label}>Select Category:</Text>
          <View style={styles.categoryButtons}>
            <TouchableOpacity
              style={[
                styles.categoryButton,
                category === 'backpackers' && styles.selectedCategory,
              ]}
              onPress={() => setCategory('backpackers')}
            >
              <Text style={styles.categoryText}>Backpackers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.categoryButton,
                category === 'family' && styles.selectedCategory,
              ]}
              onPress={() => setCategory('family')}
            >
              <Text style={styles.categoryText}>Family</Text>
            </TouchableOpacity>
          </View>

          {category === 'family' && (
            <TextInput
              style={styles.input}
              placeholder="Number of Children"
              placeholderTextColor="black" // Set placeholder color to black
              value={numChildren}
              onChangeText={setNumChildren}
              keyboardType="numeric"
            />
          )}

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Find Events</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Footer />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: 'black', // Text color set to black
  },
  suggestionItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  suggestionText: {
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  dateButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 16,
    color: 'black', // Text color for date picker set to black
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  categoryButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
  },
  selectedCategory: {
    backgroundColor: '#4B4BF9',
    borderColor: '#4B4BF9',
  },
  categoryText: {
    color: '#fff',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#4B4BF9',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TripDetailsScreen;
