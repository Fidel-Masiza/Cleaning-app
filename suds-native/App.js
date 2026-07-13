import React from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { AppProvider, useApp } from "./src/context/AppContext";
import BottomTabBar from "./src/components/BottomTabBar";
import { colors } from "./src/theme";

import SplashScreen from "./src/screens/SplashScreen";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import CartScreen from "./src/screens/CartScreen";
import CheckoutScreen from "./src/screens/CheckoutScreen";
import ConfirmScreen from "./src/screens/ConfirmScreen";
import OrdersScreen from "./src/screens/OrdersScreen";
import TrackScreen from "./src/screens/TrackScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const SCREENS = {
  splash: SplashScreen,
  onboarding: OnboardingScreen,
  login: LoginScreen,
  signup: SignupScreen,
  home: HomeScreen,
  detail: DetailScreen,
  cart: CartScreen,
  checkout: CheckoutScreen,
  confirm: ConfirmScreen,
  orders: OrdersScreen,
  track: TrackScreen,
  profile: ProfileScreen,
};

const TAB_SCREENS = new Set(["home", "orders", "cart", "profile"]);

function Root() {
  const { ready, current } = useApp();
  if (!ready) return <View style={styles.container} />;

  const Screen = SCREENS[current.screen] || HomeScreen;
  const showTabs = TAB_SCREENS.has(current.screen);

  return (
    <View style={styles.container}>
      <ExpoStatusBar style="dark" />
      <View style={styles.content}>
        <Screen />
      </View>
      {showTabs && <BottomTabBar />}
    </View>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Root />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === "web" ? 20 : 0,
  },
});
