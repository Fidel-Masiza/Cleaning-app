import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import Button from "../components/Button";
import { colors, radius } from "../theme";
import { SERVICES } from "../data";
import { useApp } from "../context/AppContext";

const ADDONS = [
  { name: "Fabric softener", desc: "Extra soft, extra fresh", price: 50 },
  { name: "Express (12h)", desc: "Jump the queue", price: 200 },
];

export default function DetailScreen() {
  const { current, goBack, addToCart, navigate } = useApp();
  const service = SERVICES.find((s) => s.id === current.params.serviceId) || SERVICES[0];
  const [qty, setQty] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);

  const toggleAddon = (addon) => {
    setSelectedAddons((prev) =>
      prev.find((a) => a.name === addon.name)
        ? prev.filter((a) => a.name !== addon.name)
        : [...prev, addon]
    );
  };

  const total = useMemo(() => {
    return service.price * qty + selectedAddons.reduce((sum, a) => sum + a.price, 0);
  }, [service, qty, selectedAddons]);

  const onAdd = () => {
    addToCart(service.id, qty, selectedAddons);
    navigate("cart");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.hero}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <Text style={{ fontSize: 16 }}>←</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 84 }}>{service.emoji}</Text>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{service.name}</Text>
          <Text style={styles.price}>
            KSh {service.price} <Text style={styles.unit}>/{service.unit}</Text>
          </Text>
        </View>
        <Text style={styles.desc}>{service.desc}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaPill}><Text style={styles.metaText}>⏱ 24h turnaround</Text></View>
          <View style={styles.metaPill}><Text style={styles.metaText}>🌿 Eco detergent</Text></View>
        </View>

        <Text style={styles.sectionTitle}>Quantity ({service.unit})</Text>
        <View style={styles.stepper}>
          <TouchableOpacity style={styles.stepperBtn} onPress={() => setQty((q) => Math.max(1, q - 1))}>
            <Text style={styles.stepperBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{qty}</Text>
          <TouchableOpacity style={styles.stepperBtn} onPress={() => setQty((q) => q + 1)}>
            <Text style={styles.stepperBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Add-ons</Text>
        {ADDONS.map((addon) => {
          const checked = !!selectedAddons.find((a) => a.name === addon.name);
          return (
            <TouchableOpacity key={addon.name} style={[styles.addonRow, checked && styles.addonRowActive]} onPress={() => toggleAddon(addon)}>
              <View style={{ flex: 1 }}>
                <Text style={styles.addonName}>{addon.name}</Text>
                <Text style={styles.addonDesc}>{addon.desc}</Text>
              </View>
              <Text style={styles.addonPrice}>+KSh {addon.price}</Text>
              <View style={[styles.checkbox, checked && styles.checkboxActive]}>
                {checked && <Text style={{ color: "#fff", fontSize: 12, fontWeight: "800" }}>✓</Text>}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <Button title={`Add to cart · KSh ${total}`} onPress={onAdd} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 220, backgroundColor: colors.pale, alignItems: "center", justifyContent: "center",
  },
  backBtn: {
    position: "absolute", top: 16, left: 16, width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.surface, alignItems: "center", justifyContent: "center", zIndex: 2,
  },
  body: { flex: 1, paddingHorizontal: 22, paddingTop: 20 },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  name: { fontSize: 22, fontWeight: "700", color: colors.ink, flex: 1, paddingRight: 8 },
  price: { fontWeight: "800", color: colors.primaryDark, fontSize: 16 },
  unit: { fontWeight: "500", color: colors.inkSoft, fontSize: 11 },
  desc: { fontSize: 14, color: colors.inkSoft, marginTop: 6, lineHeight: 20 },
  metaRow: { flexDirection: "row", gap: 10, marginTop: 14 },
  metaPill: { backgroundColor: colors.pale, borderRadius: 999, paddingVertical: 8, paddingHorizontal: 12 },
  metaText: { color: colors.primaryDark, fontSize: 12.5, fontWeight: "700" },
  sectionTitle: {
    fontSize: 13, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.6,
    color: colors.inkSoft, marginTop: 22, marginBottom: 10,
  },
  stepper: {
    flexDirection: "row", alignItems: "center", gap: 20, backgroundColor: colors.surface,
    borderWidth: 1.5, borderColor: colors.line, borderRadius: radius.md, paddingVertical: 10,
    paddingHorizontal: 20, alignSelf: "flex-start",
  },
  stepperBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.pale, alignItems: "center", justifyContent: "center" },
  stepperBtnText: { color: colors.primaryDark, fontSize: 18, fontWeight: "700" },
  qtyValue: { fontSize: 17, fontWeight: "700", color: colors.ink, minWidth: 18, textAlign: "center" },
  addonRow: {
    flexDirection: "row", alignItems: "center", padding: 14, borderWidth: 1.5, borderColor: colors.line,
    borderRadius: radius.md, marginBottom: 10,
  },
  addonRowActive: { borderColor: colors.primary, backgroundColor: "#F1FAFC" },
  addonName: { fontSize: 14.5, fontWeight: "700", color: colors.ink },
  addonDesc: { fontSize: 12.5, color: colors.inkSoft, marginTop: 2 },
  addonPrice: { fontSize: 12.5, color: colors.inkSoft, marginRight: 10 },
  checkbox: {
    width: 22, height: 22, borderRadius: 6, borderWidth: 1.5, borderColor: colors.line,
    alignItems: "center", justifyContent: "center",
  },
  checkboxActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  footer: { padding: 22, backgroundColor: colors.bg, borderTopWidth: 1, borderTopColor: colors.line },
});
