import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Install this if not already installed: `npm install react-native-vector-icons`

const Header = ({ title, onMenuPress, onNotificationPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
        <Icon name="menu-outline" size={28} color="#4A4A4A" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onNotificationPress} style={styles.iconButton}>
        <Icon name="notifications-outline" size={28} color="#4A4A4A" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  iconButton: {
    padding: 5,
  },
});

export default Header;
