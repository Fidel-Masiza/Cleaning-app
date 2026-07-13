import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import TagChip from "../components/TagChip";
import { colors, radius } from "../theme";
import { TRACK_STEPS } from "../data";
import { useApp } from "../context/AppContext";

export default function TrackScreen() {
  const { current, orders, goBack } = useApp();
  const order = orders.find((o) => o.id === current.params.orderId);

  if (!order) {
    return (
      <View style={styles.wrap}>
        <Text style={styles.h2}>Order not found</Text>
      </View>
    );
  }

  const done = order.status >= TRACK_STEPS.length - 1;

  return (
    <ScrollView style={styles.wrap} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.iconBtn} onPress={goBack}>
          <Text>←</Text>
        </TouchableOpacity>
        <Text style={styles.h2}>Order #{order.id}</Text>
      </View>

      <TagChip label={TRACK_STEPS[Math.min(order.status, TRACK_STEPS.length - 1)].title} tone={done ? "green" : "yellow"} />

      <View style={styles.clothesline}>
        <View style={styles.line} />
        {TRACK_STEPS.map((step, i) => {
          const state = i < order.status ? "done" : i === order.status ? "current" : "upcoming";
          return (
            <View key={step.key} style={styles.step}>
              <View
                style={[
                  styles.dot,
                  state === "done" && styles.dotDone,
                  state === "current" && styles.dotCurrent,
                ]}
              >
                <Text style={{ fontSize: state === "done" ? 13 : 14 }}>
                  {state === "done" ? "✓" : step.icon}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDesc}>{step.desc}</Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.summary}>
        {order.items.map((i, idx) => (
          <View key={idx} style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{i.emoji} {i.name} × {i.qty}{i.unit}</Text>
            <Text style={styles.summaryLabel}>KSh {i.total}</Text>
          </View>
        ))}
        <View style={[styles.summaryRow, styles.summaryTotal]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalLabel}>KSh {order.total}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, paddingHorizontal: 22, paddingTop: 8 },
  topbar: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 10 },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface,
    alignItems: "center", justifyContent: "center",
  },
  h2: { fontSize: 20, fontWeight: "700", color: colors.ink },
  clothesline: { marginTop: 26, marginLeft: 6 },
  line: {
    position: "absolute", left: 15, top: 6, bottom: 26, width: 2, backgroundColor: colors.line,
  },
  step: { flexDirection: "row", gap: 14, alignItems: "flex-start", marginBottom: 24 },
  dot: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: colors.surface, borderWidth: 2,
    borderColor: colors.line, alignItems: "center", justifyContent: "center",
  },
  dotDone: { backgroundColor: colors.success, borderColor: colors.success },
  dotCurrent: { backgroundColor: colors.accent, borderColor: colors.accent },
  stepTitle: { fontSize: 14, fontWeight: "700", color: colors.ink },
  stepDesc: { fontSize: 12.5, color: colors.inkSoft, marginTop: 2 },
  summary: {
    backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.line, borderRadius: radius.md,
    padding: 16, marginTop: 6,
  },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 },
  summaryLabel: { fontSize: 14, color: colors.inkSoft },
  summaryTotal: { borderTopWidth: 1, borderTopColor: colors.line, borderStyle: "dashed", marginTop: 6, paddingTop: 10 },
  totalLabel: { fontSize: 16, fontWeight: "800", color: colors.ink },
});
