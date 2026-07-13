import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import Button from "../components/Button";
import Chip from "../components/Chip";
import { colors, radius } from "../theme";
import { SERVICES, PICKUP_SLOTS, DELIVERY_FEE } from "../data";
import { useApp } from "../context/AppContext";

export default function CartScreen() {
  const { cart, incLine, decLine, removeLine, lineTotal, cartSubtotal, selectedSlot, setSelectedSlot, navigate, resetToTab } = useApp();

  const subtotal = cartSubtotal();
  const total = cart.length ? subtotal + DELIVERY_FEE : 0;

  if (cart.length === 0) {
    return (
      <View style={styles.wrap}>
        <Text style={styles.h2}>Your cart</Text>
        <View style={styles.empty}>
          <Text style={{ fontSize: 44, marginBottom: 10 }}>🧺</Text>
          <Text style={styles.emptyTitle}>Your basket is empty</Text>
          <Text style={styles.emptySub}>Add a service to get your laundry moving.</Text>
          <Button title="Browse services" onPress={() => resetToTab("home")} style={{ marginTop: 14, width: 200 }} />
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.wrap} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
      <Text style={styles.h2}>Your cart</Text>

      {cart.map((line) => {
        const svc = SERVICES.find((s) => s.id === line.serviceId);
        const addonText = line.addons.length ? line.addons.map((a) => a.name).join(", ") : null;
        return (
          <View key={line.lineId} style={styles.item}>
            <View style={styles.itemEmojiBox}>
              <Text style={{ fontSize: 22 }}>{svc.emoji}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{svc.name}</Text>
              <Text style={styles.itemMeta}>
                {line.qty} {svc.unit}{line.qty > 1 ? "s" : ""}{addonText ? " · " + addonText : ""}
              </Text>
              <Text style={styles.itemPrice}>KSh {lineTotal(line)}</Text>
              <TouchableOpacity onPress={() => removeLine(line.lineId)}>
                <Text style={styles.remove}>Remove</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemControls}>
              <TouchableOpacity style={styles.miniBtn} onPress={() => decLine(line.lineId)}>
                <Text style={styles.miniBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qty}>{line.qty}</Text>
              <TouchableOpacity style={styles.miniBtn} onPress={() => incLine(line.lineId)}>
                <Text style={styles.miniBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}

      <Text style={styles.sectionTitle}>Pickup window</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {PICKUP_SLOTS.map((slot) => (
          <Chip key={slot} label={slot} active={slot === selectedSlot} onPress={() => setSelectedSlot(slot)} />
        ))}
      </ScrollView>

      <View style={styles.summary}>
        <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Subtotal</Text><Text style={styles.summaryLabel}>KSh {subtotal}</Text></View>
        <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Delivery fee</Text><Text style={styles.summaryLabel}>KSh {DELIVERY_FEE}</Text></View>
        <View style={[styles.summaryRow, styles.summaryTotal]}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalLabel}>KSh {total}</Text></View>
      </View>

      <Button title="Proceed to checkout" onPress={() => navigate("checkout")} style={{ marginTop: 16 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, paddingHorizontal: 22, paddingTop: 8 },
  h2: { fontSize: 22, fontWeight: "700", color: colors.ink, marginBottom: 14 },
  empty: { alignItems: "center", paddingTop: 60 },
  emptyTitle: { fontSize: 17, fontWeight: "700", color: colors.ink },
  emptySub: { fontSize: 14, color: colors.inkSoft, marginTop: 4, textAlign: "center" },
  item: {
    flexDirection: "row", alignItems: "center", backgroundColor: colors.surface, borderWidth: 1.5,
    borderColor: colors.line, borderRadius: radius.md, padding: 12, marginBottom: 12,
  },
  itemEmojiBox: {
    width: 46, height: 46, borderRadius: 12, backgroundColor: colors.pale,
    alignItems: "center", justifyContent: "center", marginRight: 12,
  },
  itemName: { fontSize: 14.5, fontWeight: "700", color: colors.ink },
  itemMeta: { fontSize: 12.5, color: colors.inkSoft, marginTop: 2 },
  itemPrice: { fontSize: 12.5, fontWeight: "700", color: colors.primaryDark, marginTop: 2 },
  remove: { fontSize: 12, fontWeight: "700", color: colors.danger, marginTop: 4 },
  itemControls: { flexDirection: "row", alignItems: "center", gap: 8 },
  miniBtn: {
    width: 26, height: 26, borderRadius: 13, borderWidth: 1.5, borderColor: colors.line,
    alignItems: "center", justifyContent: "center", backgroundColor: colors.surface,
  },
  miniBtnText: { fontSize: 14, color: colors.ink },
  qty: { fontSize: 13, fontWeight: "700", color: colors.ink, minWidth: 14, textAlign: "center" },
  sectionTitle: {
    fontSize: 13, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.6,
    color: colors.inkSoft, marginTop: 22, marginBottom: 10,
  },
  summary: {
    backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.line, borderRadius: radius.md,
    padding: 16, marginTop: 16,
  },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 },
  summaryLabel: { fontSize: 14, color: colors.inkSoft },
  summaryTotal: { borderTopWidth: 1, borderTopColor: colors.line, borderStyle: "dashed", marginTop: 6, paddingTop: 10 },
  totalLabel: { fontSize: 16, fontWeight: "800", color: colors.ink },
});
