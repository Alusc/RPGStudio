import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './components/AppNavigation';

import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    "Hanken Grotesk": require("./assets/fonts/HankenGrotesk-Regular.ttf"),
    "Open Sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "Kalnia": require("./assets/fonts/Kalnia-Regular.ttf")
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <View onLayout={onLayoutRootView} style={styles.container}></View>
      <AppNavigation />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
});
