import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../theme";
import { useApp } from "../context/AppContext";

const TABS = [
  { key: "home", label: "Home", icon: "🏠" },
  { key: "orders", label: "Orders", icon: "📦" },
  { key: "cart", label: "Cart", icon: "🧺" },
  { key: "profile", label: "Profile", icon: "👤" },
];

export default function BottomTabBar() {
  const { current, resetToTab, cart } = useApp();
  const cartCount = cart.reduce((n, l) => n + l.qty, 0);

  return (
    <View style={styles.wrap}>
      {TABS.map((tab) => {
        const active = current.screen === tab.key;
        return (
          <TouchableOpacity key={tab.key} style={styles.item} onPress={() => resetToTab(tab.key)}>
            <View>
              <Text style={styles.icon}>{tab.icon}</Text>
              {tab.key === "cart" && cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount > 9 ? "9+" : cartCount}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, active && styles.labelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingTop: 10,
    paddingBottom: 14,
  },
  item: { alignItems: "center", gap: 3, paddingHorizontal: 10 },
  icon: { fontSize: 19 },
  label: { fontSize: 10.5, fontWeight: "700", color: colors.inkSoft, marginTop: 2 },
  labelActive: { color: colors.primary },
  badge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: colors.danger,
    width: 15,
    height: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: "#fff", fontSize: 8.5, fontWeight: "800" },
});
