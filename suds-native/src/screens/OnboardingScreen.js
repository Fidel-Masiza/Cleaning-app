import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import { colors } from "../theme";
import { useApp } from "../context/AppContext";

export default function OnboardingScreen() {
  const { navigate } = useApp();
  return (
    <View style={styles.wrap}>
      <View style={styles.illustration}>
        <Text style={{ fontSize: 72 }}>🧺</Text>
      </View>
      <Text style={styles.eyebrow}>01 / BOOK</Text>
      <Text style={styles.title}>Schedule a pickup in under a minute</Text>
      <Text style={styles.copy}>Pick a service, set a time window, and we'll knock on your door.</Text>
      <View style={styles.dots}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
      <Button title="Continue" onPress={() => navigate("login")} />
      <Button title="Skip" variant="ghost" onPress={() => navigate("login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: "center", paddingTop: 80 },
  illustration: {
    width: 220,
    height: 160,
    borderRadius: 24,
    backgroundColor: colors.pale,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  eyebrow: { fontSize: 12, fontWeight: "800", color: colors.primary, letterSpacing: 1, marginBottom: 8 },
  title: { fontSize: 24, fontWeight: "700", color: colors.ink, textAlign: "center", lineHeight: 30, maxWidth: 300 },
  copy: { fontSize: 14, color: colors.inkSoft, textAlign: "center", marginTop: 10, maxWidth: 280 },
  dots: { flexDirection: "row", gap: 6, marginVertical: 28 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.line },
  dotActive: { width: 20, backgroundColor: colors.primary },
});
