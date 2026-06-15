import React from "react";
import { StyleSheet, Text as RNText } from "react-native";

export function Text({ children, style, ...props }) {
  return (
    <RNText style={[styles.text, style]} {...props}>
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#111827",
    fontSize: 16,
    lineHeight: 24,
  },
});
