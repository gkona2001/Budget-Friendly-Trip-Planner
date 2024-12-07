import React from 'react';
import { View, StyleSheet } from 'react-native';

const Footerforbase = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    height: 18, // Double the default height (default is ~30)
    backgroundColor: '#FFFFFF', // Matches iPhone's typical status bar background
  },
});

export default Footerforbase;