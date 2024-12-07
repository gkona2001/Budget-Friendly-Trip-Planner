import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import StatusBar from '../components/StatusBar';
import Footerforbase from '../components/Footerforbase';

const categories = ['Music', 'Business', 'Food & Drink', 'Arts', 'Community', "Concerts", "Festivals", "Comedy", "Theater Performances" ];
const eventTypes = ['Conference', 'Seminar', 'Expo' , 'Party'];
const languages = ['English', 'German', 'Spanish', 'French'];

const FiltersPage = ({ navigation }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedEventTypes, setSelectedEventTypes] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [priceRange, setPriceRange] = useState(220);

  const toggleSelection = (item, selectedList, setSelectedList) => {
    if (selectedList.includes(item)) {
      setSelectedList(selectedList.filter((i) => i !== item));
    } else {
      setSelectedList([...selectedList, item]);
    }
  };

  const renderOption = (item, selectedList, setSelectedList) => (
    <TouchableOpacity
      style={[
        styles.option,
        selectedList.includes(item) && styles.selectedOption,
      ]}
      onPress={() => toggleSelection(item, selectedList, setSelectedList)}
    >
      <Text
        style={[
          styles.optionText,
          selectedList.includes(item) && styles.selectedOptionText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <StatusBar />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <TouchableOpacity>
          <Text style={styles.clearAll}>Clear all</Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        data={categories}
        numColumns={4} // Display items in 2 columns
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          renderOption(item, selectedCategories, setSelectedCategories)
        }
        contentContainerStyle={styles.optionsContainer}
      />

      {/* Event Types */}
      <Text style={styles.sectionTitle}>Event type</Text>
      <FlatList
        data={eventTypes}
        numColumns={6} // Display items in 2 columns
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          renderOption(item, selectedEventTypes, setSelectedEventTypes)
        }
        contentContainerStyle={styles.optionsContainer}
      />

      {/* Languages */}
      <Text style={styles.sectionTitle}>Languages</Text>
      <FlatList
        data={languages}
        numColumns={6} // Display items in 2 columns
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          renderOption(item, selectedLanguages, setSelectedLanguages)
        }
        contentContainerStyle={styles.optionsContainer}
      />
      <TouchableOpacity>
        <Text style={styles.showAll}>Show all languages</Text>
      </TouchableOpacity>

      {/* Price Range */}
      <Text style={styles.sectionTitle}>Price Range</Text>
      <View style={styles.sliderContainer}>
        <Text style={styles.priceText}>&lt;${priceRange}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={500}
          step={10}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value)}
          minimumTrackTintColor="#4B4BF9"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#4B4BF9"
        />
      </View>

      {/* Apply Filters */}
      <TouchableOpacity
        style={styles.applyButton}
        onPress={() =>
          navigation.navigate('Deals', {
            filters: [
              ...selectedCategories,
              ...selectedEventTypes,
              ...selectedLanguages,
            ],
          })
        }
      >
        <Text style={styles.applyButtonText}>Apply filters</Text>
      </TouchableOpacity>
      <Footerforbase />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearAll: {
    fontSize: 12,
    color: '#4B4BF9',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  optionsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom:10,
    paddingVertical: 15,
  },
  option: {
    backgroundColor: '#eef2ff',
    paddingVertical: 8, // Reduced padding for smaller size
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 8, // Space between options
    marginRight: 8, // Space between options in a row
  },
  optionText: {
    color: '#4B4BF9',
    fontSize: 16, // Reduced font size
    fontWeight: 'bold',
  },
  selectedOption: {
    backgroundColor: '#4B4BF9',
  },
  selectedOptionText: {
    color: '#fff',
  },
  showAll: {
    color: '#4B4BF9',
    fontSize: 12,
    marginVertical: 5,
  },
  sliderContainer: {
    marginVertical: 10,
  },
  slider: {
    width: '100%',
    height: 30,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  applyButton: {
    backgroundColor: '#4B4BF9',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 15,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default FiltersPage;
