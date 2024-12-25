import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import CameraView from './CameraView';

export default function Home() {
  const [hasScanned, setHasScanned] = useState(false);
  const [lastScanTime, setLastScanTime] = useState(0);

  const handleBarcodeScanned = (barcode) => {
    const currentTime = Date.now();
    if (currentTime - lastScanTime > 1000) {
      setLastScanTime(currentTime);
      // Handle the barcode scanning logic here
    }
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: "Scan",
          headerShown: false,
        }}
      />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={handleBarcodeScanned}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});