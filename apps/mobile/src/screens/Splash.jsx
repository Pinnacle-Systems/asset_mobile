import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import {View, Image, StyleSheet, Animated, Easing, Text, Platform, StatusBar} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import { useGet_Change_SettingsQuery } from '../redux/service/user';

// Constants
const GRADIENT_COLORS = ['#f4f6f8', '#e2e8f0'];
const GRADIENT_CONFIG = {start: {x: 0, y: 0}, end: {x: 1, y: 1}};
const LOADING_TIMEOUT = 10000;
const ANIMATION_DURATION = 3000; 

const Splash = React.memo(({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [verificationFailed, setVerificationFailed] = useState(false);
  const [IDCARD, SETIDCARD] = useState(null);
  
  // Animation refs
  const fadeAnim = useMemo(() => new Animated.Value(1), []);
  const logoScale = useMemo(() => new Animated.Value(0.8), []);
  const textSlide = useMemo(() => new Animated.Value(30), []);
  const scanLineAnim = useMemo(() => new Animated.Value(0), []);
  
  const lottieRef = useRef(null);
  const timeoutRef = useRef(null);
  const {data, isLoading: settings_loading} = useGet_Change_SettingsQuery({params: {Idcard: IDCARD}});
  
  const settings_data = useMemo(() => data?.data || {}, [data]);

  useEffect(() => {
    let isMounted = true;
    const loadUserData = async () => {
      try {
        const result = await Promise.race([
          AsyncStorage.getItem("userName"),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 90000)
          )
        ]);
        
        if (isMounted) {
          if (result) {
            const res = JSON.parse(result);
            SETIDCARD(res?.Id);
          } else {
            clearTimeout(timeoutId);
            navigation.reset({ routes: [{ name: 'LOGIN' }] });
          }
        }
      } catch (error) {
        clearTimeout(timeoutId);
        if (isMounted) {
          navigation.reset({ routes: [{ name: 'LOGIN' }] });
        }
      }
    };
    
    loadUserData();

    const timeoutId = setTimeout(() => {
      if (isMounted) {
        navigation.reset({ routes: [{ name: 'LOGIN' }] });
      }
    }, LOADING_TIMEOUT);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [navigation]);

  const handleBiometricVerification = useCallback(async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const { available } = await rnBiometrics.isSensorAvailable();

      if (!available) {
        navigation.reset({ routes: [{ name: 'HOME' }] });
        return;
      }

      const biometricPromise = rnBiometrics.simplePrompt({
        promptMessage: 'Verify your identity',
        cancelButtonText: 'Use Password',
      });

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Biometric timeout')), 3000
      ))

      const { success } = await Promise.race([biometricPromise, timeoutPromise]);

      if (success) {
        navigation.reset({ routes: [{ name: 'HOME' }] });
      } else {
        setVerificationFailed(true);
        timeoutRef.current = setTimeout(() => {
          navigation.reset({ routes: [{ name: 'LOGIN' }] });
        }, 1500);
      }
    } catch (error) {
      console.error("Biometric error:", error);
      navigation.reset({ routes: [{ name: 'LOGIN' }] });
    }
  }, [navigation]);

  useEffect(() => {
    if (settings_loading) return;

    let isMounted = true;
    const animate = async () => {
      try {
        lottieRef.current?.play();
        
        // Start scanner loop animation
        Animated.loop(
          Animated.sequence([
            Animated.timing(scanLineAnim, {
              toValue: 1,
              duration: 1500,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(scanLineAnim, {
              toValue: 0,
              duration: 0, // Instantly snap back to top
              useNativeDriver: true,
            })
          ])
        ).start();

        await Promise.all([
          new Promise(resolve => {
            Animated.sequence([
              Animated.spring(logoScale, {
                toValue: 1.1,
                friction: 3,
                useNativeDriver: true,
              }),
              Animated.spring(logoScale, {
                toValue: 1,
                friction: 5,
                tension: 40,
                useNativeDriver: true,
              })
            ]).start(resolve);
          }),
          new Promise(resolve => {
            Animated.timing(textSlide, {
              toValue: 0,
              duration: 600,
              easing: Easing.out(Easing.exp),
              useNativeDriver: true,
            }).start(resolve);
          }),
          new Promise(resolve => setTimeout(resolve, ANIMATION_DURATION))
        ]);

        if (!isMounted) return;

        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }).start(async () => {
          if (!isMounted) return;
          
          setIsLoading(false);
          const userName = await AsyncStorage.getItem("userName");
          
          if (!userName) {
            navigation.reset({ routes: [{ name: 'LOGIN' }] });
            return;
          }

          if (settings_data?.BioMatrics) {
            await handleBiometricVerification();
          } else {
            navigation.reset({ routes: [{ name: 'HOME' }] });
          }
        });
      } catch (error) {
        console.error("Splash error:", error);
        if (isMounted) {
          navigation.reset({ routes: [{ name: 'LOGIN' }] });
        }
      }
    };

    animate();

    return () => {
      isMounted = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      fadeAnim.stopAnimation();
      logoScale.stopAnimation();
      textSlide.stopAnimation();
      scanLineAnim.stopAnimation();
      if (lottieRef.current) lottieRef.current.reset();
    };
  }, [settings_loading, IDCARD, settings_data, navigation, fadeAnim, logoScale, textSlide, scanLineAnim, handleBiometricVerification]);

  if (!isLoading && settings_loading) return null;

  if (verificationFailed) {
    return (
      <LinearGradient 
        colors={['#ef4444', '#b91c1c']} 
        style={styles.container}
        {...GRADIENT_CONFIG}
      >
        <StatusBar barStyle="light-content" backgroundColor="#ef4444" />
        <LottieView
          ref={lottieRef}
          source={require('../utils/Loader/Error.json')}
          autoPlay
          loop={false}
          style={styles.lottie}
          cacheStrategy="strong"
        />
        <Text style={styles.errorTitle}>Authentication Failed</Text>
        <Text style={styles.errorText}>Please try again or login manually</Text>
      </LinearGradient>
    );
  }

  const logoSize = Platform.select({ ios: 180, android: 160 });

  return (
    <LinearGradient 
      colors={GRADIENT_COLORS} 
      style={styles.container}
      {...GRADIENT_CONFIG}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f4f6f8" />
      <Animated.View style={[styles.content, {opacity: fadeAnim}]}>
        
        <View style={[styles.logoContainer, { width: logoSize, height: logoSize }]}>
          <Animated.Image 
            source={require('../assets/logo_splash1.png')} 
            style={[styles.logo, { width: logoSize, height: logoSize, transform: [{ scale: logoScale }] }]}
            resizeMode="contain"
          />
          {/* Laser Scan Line */}
          <Animated.View style={[
            styles.scannerLine,
            {
              transform: [{
                translateY: scanLineAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, logoSize]
                })
              }]
            }
          ]} />
        </View>
        
        <Animated.View style={{ 
          transform: [{ translateY: textSlide }],
          alignItems: 'center'
        }}>
          <Text style={styles.title}>Asset Auditing</Text>
          <Text style={styles.subtitle}>Smart Verification & Tracking</Text>
        </Animated.View>

      </Animated.View>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    padding: 30,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logo: {
    // sizing handled inline
  },
  scannerLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#4f46e5', // Bright indigo laser
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 6,
    borderRadius: 2,
    zIndex: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: "#0f172a",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 20,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  lottie: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    paddingHorizontal: 40,
    fontWeight: '500',
  },
});

export default Splash;