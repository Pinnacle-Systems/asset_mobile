// Colors — re-exported from the global theme for backward compatibility.
// To change the palette, edit src/theme/index.js
import { theme } from '../theme/index';

export const Colors = {
  // Brand
  primary: theme.colors.primary,       // Green #22c55e
  accent: theme.colors.accent,         // Light dark blue #1e40af
  accentMid: theme.colors.accentMid,
  accentLight: theme.colors.accentLight,

  // Neutrals
  white: theme.colors.white,
  dark: theme.colors.dark,
  gray: theme.colors.gray,
  grayDark: theme.colors.grayDark,
  border: theme.colors.border,
  borderLight: '#f1f5f9',
  shadow: theme.colors.shadow,
  lightBackground: theme.colors.background,

  // Semantic
  success: theme.colors.success,
  danger: theme.colors.danger,
  warning: theme.colors.warning,

  // Text
  text: theme.colors.text,
  subtext: theme.colors.subtext,
};