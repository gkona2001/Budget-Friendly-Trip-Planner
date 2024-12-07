import React, { useState } from 'react';
import { Switch } from 'react-native';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import HeaderWithOnlyName from '../components/Headerwithonlyname';
import Footer from '../components/Footer';
import Footerforbase from '../components/Footerforbase';
import StatusBar from '../components/StatusBar';

const dealsData = [
  {
    id: '1',
    image: 'https://360chicagoevents.com/wp-content/uploads/2022/12/events-homepage-hero-1.jpg',
    title: 'Getting Paid to Talk',
    description: 'Intro to Voice Over - Live Online Workshop',
    date: 'Monday, December 9 at 19:30',
    location: 'Online',
    duration: '2 hours',
    refundPolicy: 'No refunds',
    price: 'From $30',
    tag: 'Promoted',
  },
  {
    id: '2',
    image: 'https://marketing-cdn.tickettailor.com/ZgP1j7LRO5ile62O_HowdoyouhostasmallcommunityeventA10-stepguide%2CMiniflagsattheevent.jpg?auto=format%2Ccompress&fit=max&w=3840',
    title: 'Chicago Puzzle Meetup',
    description: 'Enjoy an interactive puzzle-solving experience.',
    date: 'Sunday, December 10 at 14:00',
    location: 'Puzzle Cafe, Chicago',
    duration: '3 hours',
    refundPolicy: 'Refund requests reviewed case-by-case',
    price: 'Free',
    tag: 'Popular',
  },
];

const DealsPage = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyFree, setShowOnlyFree] = useState(false);
  const [filters, setFilters] = useState(route.params?.filters || []);
  const [maxPrice, setMaxPrice] = useState(route.params?.maxPrice || null);

  const filteredData = showOnlyFree
    ? dealsData.filter((deal) => deal.price === 'Free')
    : dealsData;

  const renderDealCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('EventDetailsPage', { event: item })}
      style={styles.card}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardDate}>{item.date}</Text>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <View style={styles.footerRow}>
        <Text style={styles.priceText}>{item.price}</Text>
        <TouchableOpacity style={styles.ticketButton}>
          <Text style={styles.ticketButtonText}>Get tickets</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar />
      <HeaderWithOnlyName title="Explore Events" />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for events"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Selected Filters */}
      {filters.length > 0 || maxPrice ? (
        <FlatList
          data={[...filters, maxPrice ? `Price: <$${maxPrice}` : null].filter(Boolean)}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.filterChip}>
              <Text style={styles.filterChipText}>{item}</Text>
              <TouchableOpacity
                onPress={() =>
                  setFilters((prevFilters) =>
                    prevFilters.filter((filter) => filter !== item && !item.startsWith('Price'))
                  )
                }
              >
                <Ionicons name="close" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.filtersRow}
        />
      ) : null}

      {/* Filters Button and Toggle */}
      <View style={styles.filtersContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => navigation.navigate('FiltersPage')}
        >
          <MaterialIcons name="filter-list" size={20} color="#4B4BF9" />
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Show Free Only</Text>
          <Switch
            value={showOnlyFree}
            onValueChange={(value) => setShowOnlyFree(value)}
            trackColor={{ false: '#ddd', true: '#4B4BF9' }}
            thumbColor={showOnlyFree ? '#fff' : '#999'}
          />
        </View>
      </View>

      {/* Event Cards */}
      <FlatList
        data={filteredData}
        renderItem={renderDealCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cardContainer}
      />
      <Footer
      currentScreen="Events"
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
    backgroundColor: '#f9f9f9',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    margin: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  filtersRow: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4B4BF9',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginRight: 6,
  },
  filterChipText: {
    color: '#fff',
    fontSize: 12,
    marginRight: 4,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
    padding: 8,
    borderRadius: 8,
  },
  filterText: {
    fontSize: 12,
    color: '#4B4BF9',
    marginLeft: 5,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    fontSize: 12,
    color: '#333',
    marginRight: 8,
  },
  cardContainer: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    padding: 12,
  },
  cardImage: {
    height: 200,
    width: '100%',
    borderRadius: 10,
  },
  topIcons: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    gap: 8,
  },
  cardDate: {
    fontSize: 15,
    color: '#000',
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  priceText: {
    fontSize: 16,
    color: '#4B4BF9',
    fontWeight: 'bold',
  },
  ticketButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  ticketButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default DealsPage;
