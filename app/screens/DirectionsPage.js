import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import StatusBar from "../components/StatusBar";

const DirectionsPage = ({ route, navigation }) => {
  const [currentLocation, setCurrentLocation] = useState("Your location");
  const [destinationLocation, setDestinationLocation] = useState(
    "Hampton Inn Majestic Chicago Theatre District, 22 W Monroe St, Chicago, IL 60603"
  );

  const routes = {
    car: {
      time: "5 min",
      distance: "1.2 mi",
      coordinates: [
        { latitude: 41.87557, longitude: -87.63061 },
        { latitude: 41.87550, longitude: -87.62759 },
        { latitude: 41.86749, longitude: -87.62759 },
        { latitude: 41.86749, longitude: -87.62413 },
      ],
    },
    bus: {
      time: "7 min",
      distance: "1.5 mi",
      coordinates: [
        { latitude: 41.87557, longitude: -87.63061 },
        { latitude: 41.87550, longitude: -87.62413 },
        { latitude: 41.86749, longitude: -87.62413 },
      ],
    },
    cycle: {
      time: "10 min",
      distance: "1.3 mi",
      coordinates: [
        { latitude: 41.87557, longitude: -87.63061 },
        { latitude: 41.87550, longitude: -87.62759 },
        { latitude: 41.86749, longitude: -87.62759 },
        { latitude: 41.86749, longitude: -87.62413 },
      ],
    },
    walk: {
      time: "17 min",
      distance: "1.0 mi",
      coordinates: [
        { latitude: 41.87557, longitude: -87.63061 },
        { latitude: 41.86744, longitude: -87.63033 },
        { latitude: 41.86749, longitude: -87.62413 },
      ],
    },
  };

  const [selectedMode, setSelectedMode] = useState("car");
  const currentRoute = routes[selectedMode];
  const mapRef = useRef(null);

  useEffect(() => {
    // Automatically fit to markers when the mode or route changes
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(currentRoute.coordinates, {
        edgePadding: { top: 100, right: 80, bottom: 50, left: 190 }, // Add some padding
        animated: true,
      });
    }
  }, [selectedMode]);

  const handleModeChange = (mode) => {
    setSelectedMode(mode);
  };

  return (
    <View style={styles.container}>
      {/* Unified Container */}
      <StatusBar />
      <View style={styles.unifiedContainer}>
        {/* Search Section */}
        <View style={styles.searchRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Maps")}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchBar1}
            value={currentLocation}
            placeholder="Your location"
            onChangeText={setCurrentLocation}
          />
        </View>
        <View style={styles.searchRow}>
          <Ionicons name="location-outline" size={24} color="#FF5733" />
          <TextInput
            style={styles.searchBar2}
            value={destinationLocation}
            onChangeText={setDestinationLocation}
          />
        </View>

        {/* Mode Selection Section */}
        <View style={styles.modeRow}>
          {Object.entries(routes).map(([mode, route]) => (
            <TouchableOpacity
              key={mode}
              style={[
                styles.modeButton,
                selectedMode === mode && styles.selectedMode,
              ]}
              onPress={() => handleModeChange(mode)}
            >
              <Ionicons
                name={
                  mode === "car"
                    ? "car-outline"
                    : mode === "walk"
                    ? "walk-outline"
                    : mode === "bus"
                    ? "bus-outline"
                    : "bicycle-outline"
                }
                size={24}
                color={selectedMode === mode ? "#4B4BF9" : "#000"}
              />
              <Text style={styles.modeText}>{mode.toUpperCase()}</Text>
              <Text style={styles.modeTime}>{route.time}</Text>
              <Text style={styles.modeDistance}>{route.distance}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Map */}
      <MapView
        ref={mapRef} // Reference to the map
        style={styles.map}
        initialRegion={{
          latitude: 41.87557,
          longitude: -87.63061,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={currentRoute.coordinates[0]}
          title="Start"
          description="Starting Point"
        />
        <Marker
          coordinate={
            currentRoute.coordinates[currentRoute.coordinates.length - 1]
          }
          title="Destination"
          description="Destination Point"
        />
        <Polyline
          coordinates={currentRoute.coordinates}
          strokeColor="#FF5733"
          strokeWidth={5}
        />
      </MapView>

      {/* Start Button */}
      <View style={styles.startButtonContainer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => console.log("Navigation Started")}
        >
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  unifiedContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 15,
    zIndex: 10,
    elevation: 5,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchBar1: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    marginLeft: 10,
  },
  searchBar2: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    marginLeft: 19,
  },
  backButton: {
    marginRight: 10,
  },
  modeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modeButton: {
    alignItems: "center",
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  selectedMode: {
    backgroundColor: "#cce0ff",
  },
  modeText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
    marginTop: 5,
  },
  modeTime: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  modeDistance: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  startButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
    zIndex: 10,
  },
  startButton: {
    backgroundColor: "#4B4BF9",
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 10,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DirectionsPage;
