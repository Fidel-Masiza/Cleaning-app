import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Button from "../components/Button";
import { colors, radius } from "../theme";
import { useApp } from "../context/AppContext";

const MENU = [
  { icon: "📍", label: "Saved addresses" },
  { icon: "💳", label: "Payment methods" },
  { icon: "🔔", label: "Notifications" },
  { icon: "🎁", label: "Promo codes" },
  { icon: "❓", label: "Help & support" },
];

export default function ProfileScreen() {
  const { user, logout, resetToTab } = useApp();
  const name = user ? user.name : "Guest User";
  const phone = user ? user.phone : "Not signed in";
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  const onLogout = () => {
    logout();
    resetToTab("login");
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.h2}>Profile</Text>

      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.phone}>{phone}</Text>
        </View>
      </View>

      <View style={styles.menu}>
        {MENU.map((item) => (
          <TouchableOpacity key={item.label} style={styles.menuItem}>
            <Text style={styles.menuLabel}>{item.icon} {item.label}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Log out" variant="ghost" onPress={onLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, paddingHorizontal: 22, paddingTop: 8 },
  h2: { fontSize: 22, fontWeight: "700", color: colors.ink, marginBottom: 14 },
  card: {
    flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: colors.surface,
    borderWidth: 1.5, borderColor: colors.line, borderRadius: radius.md, padding: 16, marginBottom: 20,
  },
  avatar: {
    width: 54, height: 54, borderRadius: 27, backgroundColor: colors.primary,
    alignItems: "center", justifyContent: "center",
  },
  avatarText: { color: "#fff", fontWeight: "800", fontSize: 17 },
  name: { fontSize: 16, fontWeight: "700", color: colors.ink },
  phone: { fontSize: 12.5, color: colors.inkSoft, marginTop: 2 },
  menu: { marginBottom: 20 },
  menuItem: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.line,
  },
  menuLabel: { fontSize: 14.5, fontWeight: "600", color: colors.ink },
  chevron: { color: colors.inkSoft, fontSize: 16 },
});
