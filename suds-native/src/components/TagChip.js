import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme";

const TONES = {
  yellow: { bg: colors.accent, fg: "#4A3200" },
  blue: { bg: colors.pale, fg: colors.primaryDark },
  green: { bg: "#DFF3E7", fg: "#24734B" },
};

export default function TagChip({ label, tone = "yellow" }) {
  const t = TONES[tone] || TONES.yellow;
  return (
    <View style={[styles.wrap, { backgroundColor: t.bg }]}>
      <Text style={[styles.text, { color: t.fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  text: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
});
