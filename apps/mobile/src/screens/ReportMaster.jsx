import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    SafeAreaView,
    ScrollView
} from 'react-native';
import { useSelector } from 'react-redux';
import { AllowedTabs_Filter } from '../utils/AllowedPagesFiltering';
import { Common_Context } from '../contexts/Common_Context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/ThemeProvider';

const { width } = Dimensions.get('window');

const ReportMaster = ({ navigation }) => {
    const [selectedCard, setSelectedCard] = useState(null);
    const { page, admin } = useContext(Common_Context);
    const countUnder20DueDays = useSelector(state => state.dueDays.countUnder20DueDays);
    const { theme } = useTheme();
    const currentStyles = createStyles(theme);

    const cardLabels = [
        {
            label: 'Asset Audit Report',
            subtitle: 'View recent asset audits and summaries',
            action: 'audit',
            icon: 'barcode-scan',
            notify: 0,
            color: theme.colors.primary
        },
    ];

    const handleClick = (label, action) => {
        setSelectedCard(label);
        navigation.navigate(action);
    };

    const filterCards = admin == 1 ? cardLabels : AllowedTabs_Filter({ tabs: cardLabels, allowedTabs: page, tabsPath_key: "action", allowedTabspath_key: "link", condtion: "isdefault" })

    return (
        <SafeAreaView style={currentStyles.container}>
            <View style={currentStyles.titleSection}>
                <Text style={currentStyles.sectionTitle}>Reports Dashboard</Text>
                <Text style={currentStyles.sectionSubtitle}>Select a report to view details</Text>
            </View>

            <ScrollView
                contentContainerStyle={currentStyles.cardContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={currentStyles.grid}>
                    {filterCards.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={currentStyles.card}
                            onPress={() => handleClick(item.label, item.action)}
                            activeOpacity={0.7}
                        >
                            <View style={[currentStyles.iconWrapper, { backgroundColor: (theme.isDarkMode || theme.mode === 'dark') ? theme.colors.surfaceLight : theme.colors.accentLight }]}>
                                <MaterialCommunityIcons
                                    name={item.icon}
                                    size={36}
                                    color={theme.colors.accent}
                                />
                            </View>
                            <View style={currentStyles.textContainer}>
                                <Text style={currentStyles.cardText}>{item.label}</Text>
                                {item.subtitle && (
                                    <Text style={currentStyles.cardSubtitle}>{item.subtitle}</Text>
                                )}
                            </View>
                            {item.notify > 0 && (
                                <View style={currentStyles.badge}>
                                    <Text style={currentStyles.badgeText}>{item.notify}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const createStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    titleSection: {
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: theme.colors.text,
        fontFamily: theme.fonts?.bold || 'System',
    },
    sectionSubtitle: {
        fontSize: 14,
        color: theme.colors.subtext,
        marginTop: 6,
        fontWeight: '500',
        fontFamily: theme.fonts?.semiBold || 'System',
    },
    cardContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    grid: {
        flexDirection: 'column',
        gap: 12,
    },
    card: {
        width: '100%',
        backgroundColor: theme.colors.surface,
        borderRadius: 14,
        flexDirection: "row",
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: theme.colors.border,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    iconWrapper: {
        width: 72,
        height: 72,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    cardText: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.text,
        marginBottom: 2,
        fontFamily: theme.fonts?.bold || 'System',
    },
    cardSubtitle: {
        fontSize: 13,
        color: theme.colors.subtext,
        fontWeight: '500',
        fontFamily: theme.fonts?.regular || 'System',
    },
    badge: {
        backgroundColor: theme.colors.danger || '#ef4444',
        borderRadius: 12,
        minWidth: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    badgeText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '700',
        fontFamily: theme.fonts?.bold || 'System',
    },
});

export default ReportMaster;