import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    Image,
    TouchableOpacity,
    Animated,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    BackHandler
} from 'react-native';
import { useLoginUserMutation } from '../redux/service/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from '../components/inputs';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { RESET_STORE } from '../redux/store';
import { screenWidth } from '../utils/Screens';
import CustomText from '../components/Text';

import Custom_Notification from '../utils/Custom_Notification';
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../theme/index';

function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [Global, setGlobal] = useState(false);
    const [Id, setId] = useState();
    const [Globaldata, setGlobalData] = useState([]);
    const [error, setError] = useState(null);
    const [loginUser, { isLoading }] = useLoginUserMutation();
    const [fadeAnim] = useState(new Animated.Value(0));
    const navigation_use = useNavigation();
    const dispatch = useDispatch();
    const [GlobalSelected, setGlobalSelected] = useState();
    const [head, setHead] = useState();
    const [hr, sethr] = useState();
    const [roleid, setrolid] = useState();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const OnSelectCompany = async () => {
        if (!GlobalSelected) return alert("Select Company");
        var company = Globaldata?.find((data) => data?.companyCode == GlobalSelected);

        if (company?.companyid) {
            await AsyncStorage.setItem('userName', JSON.stringify({
                userName: username, Id: Id, GCOMPCODE: company?.companyCode, COMPID: company?.companyid, hr, hod: head, roleId: roleid
            }));

            // Wipe all RTK Query caches before navigating so fresh data loads for this user
            dispatch(RESET_STORE);
            navigation_use.replace('HOME');
        } else {
            Custom_Notification(100, { title: "Failed", message: "Company Selection Failed" });
        }
    };

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                Alert.alert(
                    'Exit App',
                    'Are you sure you want to exit the application?',
                    [
                        { text: 'Cancel', onPress: () => null, style: 'cancel' },
                        { text: 'YES', onPress: () => BackHandler.exitApp() }
                    ]
                );
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    const handleLogin = async () => {
        setError(null);
        var MobileDevice = "AssetMobile";
        var MobileIP = "0.0.0.0";
        if (!username || !password) {
            setError('Username and password are required');
            return;
        }
        try {
            const data = await loginUser({ username, password, deviceName: MobileDevice, MobileIP, COMPCODE: GlobalSelected }).unwrap();
            if (data.statusCode === 0 || data.message === 'Login Successfull') {
                var filterdata = data?.data;

                if (filterdata?.isAdmin == 1) {
                    await AsyncStorage.setItem('userName', JSON.stringify({
                        userName: username, Id: Id, hod: head, hr: hr, roleId: roleid, isAdmin: 1
                    }));
                    // Wipe all RTK Query caches before navigating so fresh data loads for this user
                    dispatch(RESET_STORE);
                    navigation_use.replace('HOME');
                    return;
                }
                setrolid(filterdata?.roleId);
                setGlobal(true);
                sethr(filterdata?.hr)
                var addComp = []
                var filterunique = filterdata?.Companies.filter((data) => {
                    if (!addComp.includes(data?.companyCode)) {
                        addComp.push(data?.companyCode)
                        return data
                    }
                });

                setGlobalData(filterunique);
                addComp = []
                setId(filterdata?.Idcard);
                setHead(filterdata?.hod);
            } else {
                setError(data?.message || 'Login failed, please try again.');
            }
        } catch (error) {
            let errorMessage = "An unexpected error occurred. Please try again.";

            if (error?.data?.message) {
                errorMessage = error.data.message;
            } else if (error?.error) {
                errorMessage = error.error;
            } else if (error?.message) {
                errorMessage = error.message;
            }

            // Provide more user-friendly messages for common scenarios
            const lowerMsg = errorMessage.toLowerCase();
            if (lowerMsg.includes("fetch") || lowerMsg.includes("network")) {
                errorMessage = "Unable to connect to the server. Please check your internet connection.";
            } else if (lowerMsg.includes("invalid password") || lowerMsg.includes("incorrect password") || lowerMsg.includes("wrong password")) {
                errorMessage = "The password you entered is incorrect. Please try again.";
            } else if (lowerMsg.includes("not found") || lowerMsg.includes("invalid user")) {
                errorMessage = "We couldn't find an account with that username.";
            } else if (lowerMsg.includes("bad credentials")) {
                errorMessage = "Invalid username or password. Please try again.";
            }

            setError(errorMessage);
        }
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            <View style={styles.background}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/logo.png')}
                    />
                    <Text style={styles.appName}>Welcome Back</Text>
                    <Text style={styles.appSubtitle}>Sign in to your account</Text>
                </View>

                {Global ? (
                    <View style={styles.companySelectionContainer}>
                        <View style={styles.selectionHeader}>
                            <Text style={styles.selectionTitle}>Select Your Company</Text>
                            <TouchableOpacity
                                style={styles.selectionCloseBtn}
                                onPress={() => setGlobal(false)}
                            >
                                <Icon name="close" size={18} color="#718096" />
                            </TouchableOpacity>
                        </View>
                        <Dropdown
                            selected={GlobalSelected}
                            label={<Text style={styles.dropdownLabel}>Company</Text>}
                            _label={"companyCode"}
                            _value={"companyCode"}
                            setSelected={setGlobalSelected}
                            options={{ data: Globaldata }}
                            zIndex={300}
                            style={styles.dropdown}
                        />
                        <TouchableOpacity
                            style={styles.selectButton.ButtonOuter}
                            onPress={OnSelectCompany}
                        >
                            <Text style={styles.selectButton.ButtonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
                        {error ? (
                            <View style={styles.errorContainer}>
                                <Icon name="error-outline" size={20} color="#e53e3e" style={styles.errorIcon} />
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        ) : null}

                        <View style={styles.inputContainer}>
                            <Icon name="person" size={20} color={theme.colors.accent} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Username"
                                placeholderTextColor="#a0aec0"
                                value={username}
                                onChangeText={(text) => {
                                    setUsername(text);
                                    if (error) setError(null);
                                }}
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon name="lock" size={20} color={theme.colors.accent} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#a0aec0"
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    if (error) setError(null);
                                }}
                                secureTextEntry={!isPasswordVisible}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                            >
                                <Icon
                                    name={isPasswordVisible ? "visibility" : "visibility-off"}
                                    size={20}
                                    color={theme.colors.accent}
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={[styles.loginButton.ButtonOuter, { opacity: isLoading ? 0.7 : 1 }]}
                            onPress={handleLogin}
                            disabled={isLoading}
                        >
                            <Text style={styles.loginButton.ButtonText}>{isLoading ? 'Loading...' : 'Login'}</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}

                <View style={styles.footer}>
                    <Text style={styles.footerText}>@ 2025 Pinnacle Systems All right reserved</Text>
                    {/* <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.footerLink}>Sign up</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        width: '100%',
        backgroundColor: '#f4f7fa',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 35,
    },
    logo: {
        width: 110,
        height: 110,
        resizeMode: 'contain',
        marginBottom: 15,
    },
    appName: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 5,
        fontFamily: theme.fonts.bold,
        letterSpacing: 0.5,
    },
    appSubtitle: {
        fontSize: 16,
        color: '#64748b',
        fontFamily: theme.fonts.regular,
        marginBottom: 5,
    },
    card: {
        width: '94%',
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 30,
        shadowColor: '#94a3b8',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.15,
        shadowRadius: 36,
        elevation: 8,
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        marginBottom: 20,
        paddingHorizontal: 15,
        height: 55,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#2d3748',
        fontFamily: theme.fonts.regular,
    },
    eyeIcon: {
        padding: 5,
    },
    loginButton: {
        ButtonOuter: {
            backgroundColor: theme.colors.primary,   // Green
            borderRadius: 14,
            height: 55,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: theme.colors.primaryDark,
            shadowOffset: {
                width: 0,
                height: 8,
            },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 6,
            marginTop: 10,
        },
        ButtonText: {
            color: theme.colors.textOnPrimary,
            fontSize: 18,
            fontWeight: '600',
            fontFamily: theme.fonts.semiBold,
            letterSpacing: 0.5,
        },
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff5f5',
        padding: 12,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#feb2b2',
    },
    errorIcon: {
        marginRight: 10,
    },
    errorText: {
        color: '#c53030',
        flex: 1,
        fontSize: 14,
        fontFamily: theme.fonts.semiBold,
    },
    companySelectionContainer: {
        width: '94%',
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 30,
        shadowColor: '#94a3b8',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.15,
        shadowRadius: 36,
        elevation: 8,
    },
    selectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    selectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1e293b',
        fontFamily: theme.fonts.bold,
    },
    selectionCloseBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownLabel: {
        color: '#1a365d',
        marginBottom: 5,
        fontFamily: theme.fonts.semiBold,
    },
    dropdown: {
        marginBottom: 25,
    },
    selectButton: {
        ButtonOuter: {
            backgroundColor: theme.colors.primary,   // Green
            borderRadius: 14,
            height: 55,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: theme.colors.primaryDark,
            shadowOffset: {
                width: 0,
                height: 8,
            },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 6,
            marginTop: 10,
        },
        ButtonText: {
            color: theme.colors.textOnPrimary,
            fontSize: 18,
            fontWeight: '600',
            fontFamily: theme.fonts.semiBold,
            letterSpacing: 0.5,
        },
    },
    footer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    footerText: {
        color: '#a0aec0',
        marginRight: 5,
        fontFamily: theme.fonts.regular,
        width: 210,
        textAlign: "center"
    },
    footerLink: {
        color: 'white',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontFamily: theme.fonts.bold,
    },

});

export default LoginScreen;
