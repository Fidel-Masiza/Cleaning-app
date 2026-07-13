import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import Button from "../components/Button";
import TagChip from "../components/TagChip";
import { colors, radius } from "../theme";
import { DELIVERY_FEE } from "../data";
import { useApp } from "../context/AppContext";

const PAY_METHODS = [
  { key: "mpesa", label: "📱 M-Pesa" },
  { key: "card", label: "💳 Card" },
  { key: "cash", label: "💵 Cash on delivery" },
];

export default function CheckoutScreen() {
  const { goBack, cartSubtotal, placeOrder, replace } = useApp();
  const [payment, setPayment] = useState("mpesa");

  const subtotal = cartSubtotal();
  const total = subtotal + DELIVERY_FEE;

  const onPlaceOrder = () => {
    const order = placeOrder();
    replace("confirm", { orderId: order.id });
  };

  return (
    <ScrollView style={styles.wrap} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.iconBtn} onPress={goBack}>
          <Text>←</Text>
        </TouchableOpacity>
        <Text style={styles.h2}>Checkout</Text>
      </View>

      <Text style={styles.sectionTitle}>Delivery address</Text>
      <View style={styles.addressCard}>
        <TagChip label="Home" tone="blue" />
        <Text style={styles.addressText}>Kiambu Road, Githunguri, Kiambu County</Text>
      </View>

      <Text style={styles.sectionTitle}>Payment method</Text>
      {PAY_METHODS.map((m) => (
        <TouchableOpacity
          key={m.key}
          style={[styles.payOption, payment === m.key && styles.payOptionActive]}
          onPress={() => setPayment(m.key)}
        >
          <View style={[styles.radio, payment === m.key && styles.radioActive]} />
          <Text style={styles.payLabel}>{m.label}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.summary}>
        <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Subtotal</Text><Text style={styles.summaryLabel}>KSh {subtotal}</Text></View>
        <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Delivery fee</Text><Text style={styles.summaryLabel}>KSh {DELIVERY_FEE}</Text></View>
        <View style={[styles.summaryRow, styles.summaryTotal]}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalLabel}>KSh {total}</Text></View>
      </View>

      <Button title="Place order" onPress={onPlaceOrder} style={{ marginTop: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, paddingHorizontal: 22, paddingTop: 8 },
  topbar: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 6 },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface,
    alignItems: "center", justifyContent: "center",
  },
  h2: { fontSize: 22, fontWeight: "700", color: colors.ink },
  sectionTitle: {
    fontSize: 13, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.6,
    color: colors.inkSoft, marginTop: 22, marginBottom: 10,
  },
  addressCard: {
    backgroundColor: "#F1FAFC", borderWidth: 1.5, borderColor: colors.primary, borderRadius: radius.md, padding: 14,
  },
  addressText: { fontSize: 14, color: colors.ink, marginTop: 8 },
  payOption: {
    flexDirection: "row", alignItems: "center", gap: 10, padding: 14, borderWidth: 1.5,
    borderColor: colors.line, borderRadius: radius.md, marginBottom: 10,
  },
  payOptionActive: { borderColor: colors.primary, backgroundColor: "#F1FAFC" },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: colors.line },
  radioActive: { borderColor: colors.primary, backgroundColor: colors.primary },
  payLabel: { fontSize: 14.5, fontWeight: "600", color: colors.ink },
  summary: {
    backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.line, borderRadius: radius.md,
    padding: 16, marginTop: 16,
  },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 },
  summaryLabel: { fontSize: 14, color: colors.inkSoft },
  summaryTotal: { borderTopWidth: 1, borderTopColor: colors.line, borderStyle: "dashed", marginTop: 6, paddingTop: 10 },
  totalLabel: { fontSize: 16, fontWeight: "800", color: colors.ink },
});
