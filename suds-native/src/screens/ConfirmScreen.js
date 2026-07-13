import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import { colors } from "../theme";
import { useApp } from "../context/AppContext";

export default function ConfirmScreen() {
  const { current, resetToTab } = useApp();
  const orderId = current.params.orderId;

  return (
    <View style={styles.wrap}>
      <View style={styles.center}>
        <View style={styles.badge}>
          <Text style={{ color: "#fff", fontSize: 30, fontWeight: "800" }}>✓</Text>
        </View>
        <Text style={styles.title}>Order placed!</Text>
        <Text style={styles.orderId}>Order #{orderId}</Text>
        <Text style={styles.copy}>
          We'll pick up your laundry in the selected window. You'll get a notification when it's on the way back.
        </Text>
      </View>
      <Button title="Track my order" onPress={() => resetToTab("orders")} />
      <Button title="Back to home" variant="ghost" onPress={() => resetToTab("home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: "flex-end", paddingBottom: 30 },
  center: { alignItems: "center", marginVertical: "auto", paddingVertical: 40 },
  badge: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: colors.success,
    alignItems: "center", justifyContent: "center", marginBottom: 18,
  },
  title: { fontSize: 24, fontWeight: "700", color: colors.ink, marginBottom: 6 },
  orderId: { fontSize: 14, color: colors.inkSoft, marginBottom: 14 },
  copy: { fontSize: 14, color: colors.inkSoft, textAlign: "center", maxWidth: 280, lineHeight: 20 },
});
