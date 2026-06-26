import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { theme } from "../theme/index";
import { Text } from "./Text.jsx";

export function Button({ title, onPress, disabled = false, style }) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={[styles.button, disabled && styles.disabled, style]}>
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,   // Green
    borderRadius: theme.radius.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm + 4,
    alignItems: "center",
    shadowColor: theme.colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: theme.colors.textOnPrimary,   // White
    fontWeight: "600",
    fontSize: theme.fontSize.md,
  },
});
