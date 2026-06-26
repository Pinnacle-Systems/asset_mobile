/**
 * Global Theme — asset_mobile
 *
 * Two brand colors:
 *   Primary  → Green        #22c55e  (buttons, active indicators, CTAs)
 *   Accent   → Light Dark Blue  #1e40af  (icons, borders, text accents, labels)
 */

export const lightColors = {
    // Brand
    primary: '#22c55e',
    primaryDark: '#16a34a',
    primaryLight: '#dcfce7',

    accent: '#1e40af',
    accentMid: '#3b82f6',
    accentLight: '#dbeafe',

    // Neutrals
    background: '#f4f7fa',
    surface: '#ffffff',
    border: '#e2e8f0',
    borderFocus: '#1e40af',

    // Text
    text: '#1e293b',
    subtext: '#64748b',
    placeholder: '#a0aec0',
    textOnPrimary: '#ffffff',

    // Semantic
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',

    // Misc
    shadow: '#000000',
    dark: '#334155',
    gray: '#94a3b8',
    grayDark: '#64748b',
    white: '#ffffff',

    headerBg: '#293a75',
    headerText: '#ffffff',
    headerSubtext: 'rgba(255,255,255,0.6)',
    headerFrosted: 'rgba(255,255,255,0.12)',
    headerFrostedBorder: 'rgba(255,255,255,0.25)',
    headerRoleBadgeBorder: 'rgba(255,255,255,0.2)',
    headerRoleText: 'rgba(255,255,255,0.85)',

    menuText: '#3d4455',
    menuLabel: '#9aa0b0',
    menuChevron: '#c4c9d4',
    divider: '#eef0f5',
};

export const darkColors = {
    // Brand
    primary: '#22c55e',
    primaryDark: '#14532d',
    primaryLight: '#022c22',

    accent: '#60a5fa',         // Lighter accent for dark mode
    accentMid: '#3b82f6',
    accentLight: '#1e3a8a',    // Darker bg

    // Neutrals
    background: '#0f172a',     // Slate 900
    surface: '#1e293b',        // Slate 800
    border: '#334155',         // Slate 700
    borderFocus: '#60a5fa',

    // Text
    text: '#f8fafc',           // Slate 50
    subtext: '#94a3b8',        // Slate 400
    placeholder: '#475569',
    textOnPrimary: '#ffffff',

    // Semantic
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',

    // Misc
    shadow: '#000000',
    dark: '#f8fafc',
    gray: '#475569',
    grayDark: '#cbd5e1',
    white: '#ffffff',

    headerBg: '#0f172a',
    headerText: '#ffffff',
    headerSubtext: 'rgba(255,255,255,0.6)',
    headerFrosted: 'rgba(255,255,255,0.12)',
    headerFrostedBorder: 'rgba(255,255,255,0.25)',
    headerRoleBadgeBorder: 'rgba(255,255,255,0.2)',
    headerRoleText: 'rgba(255,255,255,0.85)',

    menuText: '#f8fafc',
    menuLabel: '#64748b',
    menuChevron: '#475569',
    divider: '#334155',
};

export const theme = {
    colors: lightColors, // Default to light
    lightColors,
    darkColors,

    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },

    radius: {
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        full: 999,
    },

    fontSize: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 22,
        xxl: 28,
    },

    fonts: {
        regular: 'Segoe-UI',
        medium: 'Segoe-UI',
        semiBold: 'Segoe-UI-SemiBold',
        bold: 'Segoe-UI-Bold',
        light: 'Segoe-UI-Light',
        italic: 'Segoe-UI-Italic',
    },
};

export default theme;
