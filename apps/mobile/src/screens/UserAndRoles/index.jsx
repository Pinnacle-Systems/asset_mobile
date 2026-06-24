import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { useGetUserDetQuery, useGetUsersQuery } from '../../redux/service/user';
import UserCreation from './UserCreation';
import Form from './Form';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import RoleOnPage_Master from './RoleOnPage_Master';
import { useTheme } from '../../theme/ThemeProvider';

export default function UserAndRoles() {
    // activeTab: 0 = Role Master, 1 = Allocate Role, 2 = Create User
    const [activeTab, setActiveTab] = useState(0);

    const { data: userDet } = useGetUserDetQuery();
    const indicatorAnim = useRef(new Animated.Value(0)).current;
    const buttonScale = useRef(new Animated.Value(1)).current;
    const { theme } = useTheme();
    const currentStyles = styles(theme);

    const handleTabPress = (tabIndex) => {
        animateButton();
        Animated.timing(indicatorAnim, {
            toValue: tabIndex,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
        }).start();
        setActiveTab(tabIndex);
    };

    const animateButton = () => {
        Animated.sequence([
            Animated.timing(buttonScale, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(buttonScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            })
        ]).start();
    };

    // Calculate indicator position for 3 tabs
    const indicatorLeft = indicatorAnim.interpolate({
        inputRange: [0, 1, 2],
        outputRange: ['0%', '33.33%', '66.66%']
    });

    return (
        <View style={currentStyles.container}>
            <View style={currentStyles.tabContainer}>
                <Animated.View style={[currentStyles.activeIndicator, { left: indicatorLeft }]}>
                    <LinearGradient
                        colors={[theme.colors.primary, theme.colors.accent]}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                        style={StyleSheet.absoluteFill}
                    />
                </Animated.View>

                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => handleTabPress(0)}
                    activeOpacity={0.8}
                >
                    <Animated.View
                        style={[
                            currentStyles.tabButton,
                            { transform: [{ scale: buttonScale }] }
                        ]}
                    >
                        <MaterialIcons
                            name="app-settings-alt"
                            size={20}
                            color={activeTab === 0 ? theme.colors.textOnPrimary : theme.colors.subtext}
                        />
                        <Text style={[
                            currentStyles.tabButtonText,
                            activeTab === 0 && currentStyles.activeTabText
                        ]}>
                            Role Master
                        </Text>
                    </Animated.View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => handleTabPress(1)}
                    activeOpacity={0.8}
                >
                    <Animated.View
                        style={[
                            currentStyles.tabButton,
                            { transform: [{ scale: buttonScale }] }
                        ]}
                    >
                        <MaterialIcons
                            name="display-settings"
                            size={20}
                            color={activeTab === 1 ? theme.colors.textOnPrimary : theme.colors.subtext}
                        />
                        <Text style={[
                            currentStyles.tabButtonText,
                            activeTab === 1 && currentStyles.activeTabText
                        ]}>
                            Allocate Role
                        </Text>
                    </Animated.View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => handleTabPress(2)}
                    activeOpacity={0.8}
                >
                    <Animated.View
                        style={[
                            currentStyles.tabButton,
                            { transform: [{ scale: buttonScale }] }
                        ]}
                    >
                        <MaterialIcons
                            name="person-add"
                            size={20}
                            color={activeTab === 2 ? theme.colors.textOnPrimary : theme.colors.subtext}
                        />
                        <Text style={[
                            currentStyles.tabButtonText,
                            activeTab === 2 && currentStyles.activeTabText
                        ]}>
                            Create User
                        </Text>
                    </Animated.View>
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={currentStyles.contentContainer}>
                {activeTab === 0 && <RoleOnPage_Master />}
                {activeTab === 1 && <UserCreation userDet={userDet} />}
                {activeTab === 2 && <Form userDet={userDet} />}
            </View>
        </View>
    );
}

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    tabContainer: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: theme.colors.surface,
        borderRadius: 16,
        margin: 16,
        marginBottom: 0,
        elevation: 8,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        position: 'relative',
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    tabButton: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
    },
    activeTabText: {
        color: theme.colors.textOnPrimary,
    },
    tabButtonText: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: 4,
        color: theme.colors.subtext,
        textAlign: 'center',
    },
    activeIndicator: {
        position: 'absolute',
        top: 6,
        bottom: 6,
        width: '33.33%',
        marginLeft: '0%',
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    contentContainer: {
        flex: 1,
    },
});
