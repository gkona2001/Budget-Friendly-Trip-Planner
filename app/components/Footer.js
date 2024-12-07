import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const Footer = ({ currentScreen, onHomePress, onEventsPress, onMapsPress, onMyEventsPress }) => {
  console.log('Current Screen in Footer:', currentScreen);

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.footerItem} onPress={onHomePress}>
        <Ionicons
          name="home-outline"
          size={24}
          color={currentScreen === 'Home' ? '#4B4BF9' : '#666'}
        />
        <Text style={[styles.footerText, currentScreen === 'Home' && styles.activeText]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem} onPress={onEventsPress}>
        <FontAwesome5
          name="calendar-alt"
          size={20}
          color={currentScreen === 'Events' ? '#4B4BF9' : '#666'}
        />
        <Text style={[styles.footerText, currentScreen === 'Events' && styles.activeText]}>
          Events
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem} onPress={onMapsPress}>
        <Ionicons
          name="map-outline"
          size={24}
          color={currentScreen === 'Maps' ? '#4B4BF9' : '#666'}
        />
        <Text style={[styles.footerText, currentScreen === 'Maps' && styles.activeText]}>
          Maps
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem} onPress={onMyEventsPress}>
        <Ionicons
          name="bookmark-outline"
          size={24}
          color={currentScreen === 'MyEvents' ? '#4B4BF9' : '#666'}
        />
        <Text style={[styles.footerText, currentScreen === 'MyEvents' && styles.activeText]}>
          Saved
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    height: 60,
  },
  footerItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  activeText: {
    color: '#4B4BF9',
    fontWeight: 'bold',
  },
});

export default Footer;
