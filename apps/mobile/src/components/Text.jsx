import { StyleSheet, Text as RNText } from "react-native";
import { theme } from "../theme/index";

export function Text({ children, style, ...props }) {
  return (
    <RNText style={[styles.text, style]} {...props}>
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  text: {
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
    lineHeight: 24,
    fontFamily: theme.fonts.regular,   // Segoe UI — applied to all <Text> globally
  },
});

export default Text;


