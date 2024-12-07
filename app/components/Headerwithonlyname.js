import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const HeaderWithOnlyName = ({ title = 'Budget-Friendly Services', onMenuPress }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {/* Back Button */}
      {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity> */}

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Hamburger Menu */}
      {/* <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity> */}
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

export default HeaderWithOnlyName;
