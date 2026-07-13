import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../theme";

export default function Button({ title, onPress, variant = "primary", style, disabled }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        variant === "primary" && styles.primary,
        variant === "ghost" && styles.ghost,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.text, variant === "ghost" && styles.textGhost]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  primary: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  textGhost: {
    color: colors.inkSoft,
  },
});
