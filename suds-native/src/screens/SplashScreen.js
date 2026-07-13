import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import { colors } from "../theme";
import { useApp } from "../context/AppContext";

export default function SplashScreen() {
  const { navigate } = useApp();
  return (
    <View style={styles.wrap}>
      <View style={styles.center}>
        <View style={styles.mark}>
          <Text style={{ fontSize: 40 }}>🫧</Text>
        </View>
        <Text style={styles.title}>Suds</Text>
        <Text style={styles.tag}>Laundry, sorted.</Text>
      </View>
      <Button title="Get started" onPress={() => navigate("onboarding")} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: "space-between", paddingTop: 100, paddingBottom: 30 },
  center: { alignItems: "center", marginTop: 60 },
  mark: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.pale,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  title: { fontSize: 42, fontWeight: "700", color: colors.ink, letterSpacing: -0.5 },
  tag: { fontSize: 15, color: colors.inkSoft, marginTop: 6 },
});
