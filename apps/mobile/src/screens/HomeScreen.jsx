import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { Button } from "../components/Button.jsx";
import { Screen } from "../components/Screen.jsx";
import { Text } from "../components/Text.jsx";
import { api } from "../services/api.js";

export function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [health, setHealth] = useState(null);

  const loadHealth = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.getHealth();
      setHealth(response?.data ?? null);
    } catch (err) {
      setError("Unable to reach the API right now.");
      console.warn("Mobile health check failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHealth();
  }, []);

  return (
    <Screen style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>Asset Mobile</Text>
        <Text style={styles.subtitle}>Checking the API connection...</Text>

        {loading ? (
          <View style={styles.stateRow}>
            <ActivityIndicator size="small" color="#2563eb" />
            <Text style={styles.stateText}>Loading health status</Text>
          </View>
        ) : null}

        {!loading && error ? (
          <View style={styles.stateRow}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {!loading && health ? (
          <View style={styles.card}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>{health.status}</Text>
            <Text style={styles.label}>Service</Text>
            <Text style={styles.value}>{health.service}</Text>
            <Text style={styles.label}>Timestamp</Text>
            <Text style={styles.value}>{health.timestamp}</Text>
          </View>
        ) : null}

        <Button title="Retry" onPress={loadHealth} disabled={loading} style={styles.button} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
  },
  content: {
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    color: "#6b7280",
    marginBottom: 8,
  },
  stateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stateText: {
    color: "#374151",
  },
  errorText: {
    color: "#dc2626",
  },
  card: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  label: {
    color: "#6b7280",
    fontSize: 12,
    textTransform: "uppercase",
  },
  value: {
    color: "#111827",
    fontWeight: "600",
  },
  button: {
    marginTop: 8,
  },
});
