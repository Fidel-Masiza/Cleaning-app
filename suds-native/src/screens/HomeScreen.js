import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Chip from "../components/Chip";
import TagChip from "../components/TagChip";
import ServiceCard from "../components/ServiceCard";
import { colors, radius } from "../theme";
import { CATEGORIES, SERVICES } from "../data";
import { useApp } from "../context/AppContext";

export default function HomeScreen() {
  const { user, navigate, resetToTab } = useApp();
  const [activeCat, setActiveCat] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = SERVICES.filter((s) => {
    const catOk = activeCat === "all" || s.cat === activeCat;
    const searchOk = s.name.toLowerCase().includes(search.toLowerCase());
    return catOk && searchOk;
  });

  return (
    <ScrollView style={styles.wrap} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
      <View style={styles.topbar}>
        <View>
          <Text style={styles.hi}>Hi {user ? user.name.split(" ")[0] : "there"} 👋</Text>
          <Text style={styles.loc}>📍 Delivering to <Text style={{ fontWeight: "700" }}>Home</Text></Text>
        </View>
        <TouchableOpacity style={styles.iconBtn} onPress={() => resetToTab("profile")}>
          <Text style={{ fontSize: 18 }}>🧺</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Search services…"
        placeholderTextColor={colors.inkSoft}
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.promo}>
        <View style={{ flex: 1 }}>
          <TagChip label="First order" tone="yellow" />
          <Text style={styles.promoTitle}>20% off your first wash</Text>
          <Text style={styles.promoSub}>Use code FRESH20 at checkout</Text>
        </View>
        <Text style={{ fontSize: 34 }}>🧼</Text>
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 4 }}>
        {CATEGORIES.map((c) => (
          <Chip
            key={c.id}
            label={c.label}
            icon={c.icon}
            active={activeCat === c.id}
            onPress={() => setActiveCat(c.id)}
          />
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Popular services</Text>
      {filtered.map((s) => (
        <ServiceCard key={s.id} service={s} onPress={() => navigate("detail", { serviceId: s.id })} />
      ))}
      {filtered.length === 0 && (
        <Text style={{ color: colors.inkSoft, textAlign: "center", marginTop: 20 }}>No services match your search.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, paddingHorizontal: 22, paddingTop: 8 },
  topbar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  hi: { fontSize: 20, fontWeight: "700", color: colors.ink },
  loc: { fontSize: 12.5, color: colors.inkSoft, marginTop: 2 },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface,
    alignItems: "center", justifyContent: "center",
    shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 6, elevation: 2,
  },
  search: {
    borderWidth: 1.5, borderColor: colors.line, borderRadius: radius.md,
    backgroundColor: colors.surface, paddingVertical: 14, paddingHorizontal: 18,
    fontSize: 14, color: colors.ink, marginBottom: 16,
  },
  promo: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    backgroundColor: colors.primary, borderRadius: radius.lg, padding: 20, marginBottom: 6,
  },
  promoTitle: { color: "#fff", fontSize: 18, fontWeight: "700", marginTop: 8, marginBottom: 3 },
  promoSub: { color: "#D8ECF3", fontSize: 12.5 },
  sectionTitle: {
    fontSize: 13, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.6,
    color: colors.inkSoft, marginTop: 22, marginBottom: 10,
  },
});
