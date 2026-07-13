import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../theme";

export default function Chip({ label, icon, active, onPress, dark }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.chip, active && (dark !== false ? styles.chipActiveDark : styles.chipActive)]}
    >
      {icon ? <Text style={styles.icon}>{icon} </Text> : null}
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.line,
    marginRight: 10,
  },
  chipActiveDark: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  icon: { fontSize: 14 },
  label: { fontSize: 13.5, fontWeight: "600", color: colors.ink },
  labelActive: { color: "#fff" },
});
