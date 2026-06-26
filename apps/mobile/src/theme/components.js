/**
 * Shared component style snippets using the global theme.
 * Import individual snippets in your component StyleSheet.create() calls.
 */
import { theme } from './index';

export const componentStyles = {
    // Primary action button (green)
    button: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.radius.md,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md - 4,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: theme.colors.primaryDark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
    },

    buttonText: {
        color: theme.colors.textOnPrimary,
        fontSize: theme.fontSize.md,
        fontWeight: '600',
    },

    buttonDisabled: {
        opacity: 0.6,
    },

    // Input / text field container
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        paddingHorizontal: theme.spacing.md - 1,
        height: 55,
    },

    inputFocused: {
        borderColor: theme.colors.borderFocus,
    },

    input: {
        flex: 1,
        height: '100%',
        fontSize: theme.fontSize.md,
        color: theme.colors.text,
    },

    // Card surface
    card: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.md,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },

    // Screen / page background
    screen: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    // Icon container chip (accent light)
    iconChip: {
        width: 36,
        height: 36,
        borderRadius: theme.radius.sm + 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.accentLight,
    },

    // Active icon chip (green)
    iconChipActive: {
        backgroundColor: theme.colors.primary,
    },

    // Section title
    sectionTitle: {
        fontSize: theme.fontSize.xl,
        fontWeight: '800',
        color: theme.colors.text,
    },

    sectionSubtitle: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.subtext,
        fontWeight: '500',
        marginTop: 6,
    },

    // Dropdown border
    dropdown: {
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.accent,
        borderWidth: 1,
        borderRadius: theme.radius.sm,
    },

    label: {
        fontSize: theme.fontSize.sm,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: 6,
    },
};

export default componentStyles;
