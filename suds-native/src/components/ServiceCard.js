import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { colors, radius } from "../theme";

export default function ServiceCard({ service, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.card}>
      <View style={styles.emojiBox}>
        <Text style={styles.emoji}>{service.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{service.name}</Text>
        <Text style={styles.desc} numberOfLines={2}>{service.desc}</Text>
      </View>
      <View>
        <Text style={styles.price}>KSh {service.price}</Text>
        <Text style={styles.unit}>/{service.unit}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: 14,
    borderWidth: 1.5,
    borderColor: colors.line,
    marginBottom: 12,
  },
  emojiBox: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: colors.pale,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  emoji: { fontSize: 26 },
  info: { flex: 1, paddingRight: 8 },
  name: { fontSize: 15.5, fontWeight: "700", color: colors.ink, marginBottom: 2 },
  desc: { fontSize: 12.5, color: colors.inkSoft },
  price: { fontWeight: "800", color: colors.primaryDark, fontSize: 14.5, textAlign: "right" },
  unit: { fontSize: 11, color: colors.inkSoft, textAlign: "right" },
});
