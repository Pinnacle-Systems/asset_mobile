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
    Platform
} from 'react-native';
import { useLoginUserMutation, useUpdate_user_fcmMutation } from '../redux/service/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from '../components/inputs';

import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { RESET_STORE } from '../redux/store';
import { screenWidth } from '../utils/Screens';
import CustomText from '../components/Text';
import ForgotPasswordScreen from './ForgotScreen';
import CommonModal from '../components/CommonModal';

import Custom_Notification from '../utils/Custom_Notification';
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [Global, setGlobal] = useState(false);
    const [Id, setId] = useState();
    const [Globaldata, setGlobalData] = useState([]);
    const [forgotpassword_Modal, setforgotPassword_Modal] = useState(false);
    const [error, setError] = useState(null);
    const [loginUser, { isLoading }] = useLoginUserMutation();
    const [fadeAnim] = useState(new Animated.Value(0));
    const navigation_use = useNavigation();
    const dispatch = useDispatch();
    const [GlobalSelected, setGlobalSelected] = useState();
    const [head, setHead] = useState();
    const [hr, sethr] = useState();
    const [roleid, setrolid] = useState();
    const [update_fcm] = useUpdate_user_fcmMutation();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const OnSelectCompany = async () => {
        if (!GlobalSelected) return alert("Select Company");
        var company = Globaldata?.find((data) => data?.companyCode == GlobalSelected);

        if (company?.companyid) {
            await AsyncStorage.setItem('userName', JSON.stringify({
                userName: username, Id: Id, GCOMPCODE: company?.companyCode, COMPID: company?.companyid,hr, hod: head, roleId: roleid
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

    const handleLogin = async () => {
        setError(null);
        var MobileDevice = "AssetMobile";
        var MobileIP = "0.0.0.0";
        if (!username || !password) {
            Alert.alert('Validation Error', 'Username and password are required');
            return;
        }
        try {
            const data = await loginUser({ username, password,deviceName:MobileDevice,MobileIP,COMPCODE:GlobalSelected}).unwrap();
            if (data.message === 'Login Successfull') {
                var filterdata = data?.data;

                if (filterdata?.isAdmin == 1) {
                    await AsyncStorage.setItem('userName', JSON.stringify({
                        userName: username, Id: Id, hod: head,approval:filterdata?.approval,hr:hr, roleId: roleid, isAdmin: 1
                    }));
                    // Wipe all RTK Query caches before navigating so fresh data loads for this user
                    dispatch(RESET_STORE);
                    navigation_use.replace('HOME');
                    return;
                }
                setrolid(filterdata?.roleId);
                setGlobal(true);
                sethr(filterdata?.hr)
                var addComp=[]
                var filterunique=filterdata?.Companies.filter((data)=>{
                if(!addComp.includes(data?.companyCode) )
                {
                     addComp.push(data?.companyCode)
                   return  data
                }
                });
                
                setGlobalData(filterunique);
                addComp=[]
                setId(filterdata?.Idcard);
                setHead(filterdata?.hod);
            } else {
                setError('Login failed, please try again.');
            }
        } catch (error) {
            setError(error.data ? error.data.message : error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" backgroundColor="#1a365d" />
            
            <LinearGradient
                colors={['#1a365d', '#4299e1']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.background}
            >
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
                        <Text style={styles.selectionTitle}>Select Your Company</Text>
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
                        {error && <Text style={styles.errorText}>{error}</Text>}
                        
                        <View style={styles.inputContainer}>
                            <Icon name="person" size={20} color="#4299e1" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Username"
                                placeholderTextColor="#a0aec0"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                            />
                        </View>
                        
                        <View style={styles.inputContainer}>
                            <Icon name="lock" size={20} color="#4299e1" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#a0aec0"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!isPasswordVisible}
                            />
                            <TouchableOpacity 
                                style={styles.eyeIcon} 
                                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                            >
                                <Icon 
                                    name={isPasswordVisible ? "visibility" : "visibility-off"} 
                                    size={20} 
                                    color="#4299e1" 
                                />
                            </TouchableOpacity>
                        </View>
                        
                        <TouchableOpacity 
                            style={styles.forgotPassword} 
                            onPress={() => setforgotPassword_Modal(true)}
                        >
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>
                        
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
            </LinearGradient>

            <CommonModal 
                height={"60%"}  
                isModalVisible={forgotpassword_Modal} 
                Title='Forgot Password' 
                BodyComponent={
                    <ForgotPasswordScreen  
                        navigation={navigation} 
                        setforgotPassword_Modal={setforgotPassword_Modal}
                    />
                } 
                setIsModalVisible={setforgotPassword_Modal}
            />
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
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    appName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
        fontFamily: 'Roboto-Bold',
    },
    appSubtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        fontFamily: 'Roboto-Regular',
    },
    card: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        marginBottom: 25,
        paddingBottom: 5,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 45,
        fontSize: 16,
        color: '#2d3748',
        fontFamily: 'Roboto-Regular',
    },
    eyeIcon: {
        padding: 5,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 25,
    },
    forgotPasswordText: {
        color: '#4299e1',
        fontSize: 14,
        fontFamily: 'Roboto-Medium',
    },
    loginButton: {
        ButtonOuter: {
            backgroundColor: '#1a365d',
            borderRadius: 30,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#1a365d',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
        },
        ButtonText: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Bold',
        },
    },
    errorText: {
        color: '#e53e3e',
        textAlign: 'center',
        marginBottom: 15,
        fontFamily: 'Roboto-Medium',
    },
    companySelectionContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    selectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a365d',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Roboto-Bold',
    },
    dropdownLabel: {
        color: '#1a365d',
        marginBottom: 5,
        fontFamily: 'Roboto-Medium',
    },
    dropdown: {
        marginBottom: 25,
    },
    selectButton: {
        ButtonOuter: {
            backgroundColor: '#1a365d',
            borderRadius: 30,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#1a365d',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
        },
        ButtonText: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Bold',
        },
    },
    footer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    footerText: {
        color: 'rgba(255,255,255,0.8)',
        marginRight: 5,
        fontFamily: 'Roboto-Regular',
        width:210,
        textAlign:"center"
    },
    footerLink: {
        color: 'white',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontFamily: 'Roboto-Bold',
    },

});

export default LoginScreen;