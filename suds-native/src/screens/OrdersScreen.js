import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import Button from "../components/Button";
import TagChip from "../components/TagChip";
import { colors, radius } from "../theme";
import { TRACK_STEPS } from "../data";
import { useApp } from "../context/AppContext";

export default function OrdersScreen() {
  const { orders, navigate, resetToTab } = useApp();

  if (orders.length === 0) {
    return (
      <View style={styles.wrap}>
        <Text style={styles.h2}>Your orders</Text>
        <View style={styles.empty}>
          <Text style={{ fontSize: 44, marginBottom: 10 }}>📦</Text>
          <Text style={styles.emptyTitle}>No orders yet</Text>
          <Text style={styles.emptySub}>Your laundry history will show up here.</Text>
          <Button title="Book a service" onPress={() => resetToTab("home")} style={{ marginTop: 14, width: 200 }} />
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.wrap} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
      <Text style={styles.h2}>Your orders</Text>
      {orders.map((o) => {
        const step = TRACK_STEPS[Math.min(o.status, TRACK_STEPS.length - 1)];
        const done = o.status >= TRACK_STEPS.length - 1;
        return (
          <TouchableOpacity key={o.id} style={styles.card} onPress={() => navigate("track", { orderId: o.id })}>
            <View style={styles.cardTop}>
              <Text style={styles.orderId}>Order #{o.id}</Text>
              <TagChip label={step.title} tone={done ? "green" : "yellow"} />
            </View>
            <Text style={styles.items}>{o.items.map((i) => i.name).join(", ")}</Text>
            <Text style={styles.meta}>{o.slot} · KSh {o.total}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, paddingHorizontal: 22, paddingTop: 8 },
  h2: { fontSize: 22, fontWeight: "700", color: colors.ink, marginBottom: 14 },
  empty: { alignItems: "center", paddingTop: 60 },
  emptyTitle: { fontSize: 17, fontWeight: "700", color: colors.ink },
  emptySub: { fontSize: 14, color: colors.inkSoft, marginTop: 4, textAlign: "center" },
  card: {
    backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.line, borderRadius: radius.md,
    padding: 14, marginBottom: 12,
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  orderId: { fontSize: 14.5, fontWeight: "700", color: colors.ink },
  items: { fontSize: 12.5, color: colors.inkSoft, marginTop: 2 },
  meta: { fontSize: 12.5, color: colors.inkSoft, marginTop: 2 },
});
