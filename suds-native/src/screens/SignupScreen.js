import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Button from "../components/Button";
import { colors } from "../theme";
import { useApp } from "../context/AppContext";

export default function SignupScreen() {
  const { navigate, signup, resetToTab } = useApp();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    signup(name, phone);
    resetToTab("home");
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.head}>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.sub}>Takes less than a minute.</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Full name</Text>
        <TextInput
          style={styles.input}
          placeholder="Jane Wanjiru"
          placeholderTextColor={colors.inkSoft}
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Phone number</Text>
        <TextInput
          style={styles.input}
          placeholder="07XX XXX XXX"
          placeholderTextColor={colors.inkSoft}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Create a password"
          placeholderTextColor={colors.inkSoft}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Button title="Create account" onPress={onSubmit} style={{ marginTop: 8 }} />

      <View style={styles.switchRow}>
        <Text style={styles.switchText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigate("login")}>
          <Text style={styles.switchLink}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, paddingTop: 50 },
  head: { marginBottom: 26 },
  title: { fontSize: 24, fontWeight: "700", color: colors.ink },
  sub: { fontSize: 14, color: colors.inkSoft, marginTop: 6 },
  field: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: "600", color: colors.inkSoft, marginBottom: 6 },
  input: {
    fontSize: 15,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    color: colors.ink,
  },
  switchRow: { flexDirection: "row", justifyContent: "center", marginTop: 22 },
  switchText: { fontSize: 14, color: colors.inkSoft },
  switchLink: { fontSize: 14, color: colors.primary, fontWeight: "700" },
});
