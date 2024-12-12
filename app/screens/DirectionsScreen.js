import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import Footerforbase from '../components/Footerforbase';

const GOOGLE_MAPS_API_KEY = ''; // Replace with your actual Google Maps API Key

const DirectionsScreen = ({ route }) => {
  const { userLocation, event } = route.params;

  // Construct the Google Maps Embed URL
  const mapUrl = `https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_MAPS_API_KEY}&origin=${userLocation.latitude},${userLocation.longitude}&destination=${event.coordinates.lat},${event.coordinates.lng}&mode=driving`;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body style="margin:0;padding:0;">
                <iframe
                  width="100%"
                  height="100%"
                  frameborder="0"
                  style="border:0;"
                  src="${mapUrl}"
                  allowfullscreen>
                </iframe>
              </body>
            </html>
          `,
        }}
        style={styles.webview}
        allowFullScreen
        javaScriptEnabled
        domStorageEnabled
      />
      
      <Footerforbase/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default DirectionsScreen;
