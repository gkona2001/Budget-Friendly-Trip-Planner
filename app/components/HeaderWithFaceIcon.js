import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HeaderWithFaceIcon = ({ title = 'Budget-Friendly Services', onMenuPress }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Face Icon */}
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="person-circle" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Hamburger Menu */}
      <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height: 60,
  },
  iconButton: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
});

export default HeaderWithFaceIcon;
