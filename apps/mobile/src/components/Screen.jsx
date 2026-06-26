import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { theme } from "../theme/index";

export function Screen({ children, style }) {
  return <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
});

