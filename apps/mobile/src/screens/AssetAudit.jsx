import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Modal,
  Dimensions,
  SafeAreaView,
  Animated,
  StatusBar,
  TextInput,
  BackHandler,
} from "react-native";
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useLazyGetBarcodeDataQuery,
  useSaveBarcodeDetailsMutation,
  useGetRoomMasterQuery,
  useGetFloorMasterQuery,
  useGetBuildingMasterQuery,
  useGetDivisionMasterQuery,
} from '../redux/service/commonMasters';
import { useGetCompanycodeQuery } from '../redux/service/user';
import { useTheme } from '../theme/ThemeProvider';

import { getCurrentLocation, requestLocationPermission } from '../utils/CustomLocation';
import { TOMTOM_API_KEY } from '../constants/apiUrl';
import { handleLogout } from '../utils/Logout';
import { ResetNavigation } from '../config/NavigationRef';

const { width, height } = Dimensions.get('window');

// ─── Color Tokens ─────────────────────────────────────────────────────────────
const getC = (theme) => {
  const isDark = theme.isDarkMode || theme.mode === 'dark';
  return {
    primary: theme.colors.primary,
    primaryDim: theme.colors.primary + '22',
    success: theme.colors.success || '#30D158',
    successDim: (theme.colors.success || '#30D158') + '22',
    danger: theme.colors.danger || '#EF4444',
    dangerDim: (theme.colors.danger || '#EF4444') + '22',
    warning: theme.colors.warning || '#F59E0B',
    warningDim: (theme.colors.warning || '#F59E0B') + '22',
    bg: theme.colors.background,
    surface: theme.colors.surface,
    surfaceAlt: isDark ? '#2C2C2E' : theme.colors.surfaceLight || '#f1f5f9',
    border: theme.colors.border,
    textPri: theme.colors.text,
    textSec: theme.colors.subtext,
    overlay: isDark ? 'rgba(0,0,0,0.82)' : 'rgba(0,0,0,0.5)',
    overlayTextPri: '#FFFFFF',
    overlayTextSec: 'rgba(255,255,255,0.8)',
    scanLine: theme.colors.primary,
  };
};

// ─── Animated Scan Line ───────────────────────────────────────────────────────
function ScanLine({ styles }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 1800, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  const frameH = 240;
  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, frameH - 4] });
  return (
    <Animated.View style={[
      styles.scanLineQR,
      { transform: [{ translateY }] }
    ]} />
  );
}

// ─── Corner Brackets ──────────────────────────────────────────────────────────
function Corners({ styles }) {
  return (
    <>
      <View style={[styles.corner, styles.cornerTL]} />
      <View style={[styles.corner, styles.cornerTR]} />
      <View style={[styles.corner, styles.cornerBL]} />
      <View style={[styles.corner, styles.cornerBR]} />
    </>
  );
}

// ─── Detail Row ───────────────────────────────────────────────────────────────
function DetailRow({ icon, label, value, iconColor, borderColor, styles, C }) {
  const iColor = iconColor || C.primary;
  const bColor = borderColor || C.border;
  return (
    <View style={[styles.detailRow, { borderBottomColor: bColor }]}>
      <View style={[styles.detailIconWrap, { backgroundColor: iColor + '22' }]}>
        <Ionicons name={icon} size={18} color={iColor} />
      </View>
      <View style={styles.detailTexts}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value || '—'}</Text>
      </View>
    </View>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ icon, label, badgeText, badgeColor, iconColor, sectionStyles, C }) {
  const bColor = badgeColor || C.textSec;
  const iColor = iconColor || C.textSec;
  return (
    <View style={sectionStyles.row}>
      <View style={sectionStyles.left}>
        <Ionicons name={icon} size={13} color={iColor} />
        <Text style={[sectionStyles.label, { color: iColor }]}>{label}</Text>
      </View>
      <View style={[sectionStyles.badge, { borderColor: bColor + '55', backgroundColor: bColor + '12' }]}>
        <Text style={[sectionStyles.badgeText, { color: bColor }]}>{badgeText}</Text>
      </View>
    </View>
  );
}

const getSectionStyles = () => StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  left: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  label: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.6 },
  badge: { borderWidth: 1, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  badgeText: { fontSize: 10, fontWeight: '600' },
});

// ─── Condition Pills ──────────────────────────────────────────────────────────
const getConditions = (C) => [
  { key: 'Good', icon: 'checkmark-circle', color: C.success, dim: C.successDim },
  { key: 'Damaged', icon: 'warning', color: C.danger, dim: C.dangerDim },
  { key: 'Under Maintenance', icon: 'construct', color: C.warning, dim: C.warningDim },
];

function SetupPopup({ visible, buildings, activeDivision, onConfirm, masterLoading, onCancel, onChangeDivision, popup, C }) {
  const [selRoom, setSelRoom] = useState(null);
  const [selFloor, setSelFloor] = useState(null);
  const [selBuilding, setSelBuilding] = useState(null);
  const [step, setStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: floorData, isLoading: floorLoading, isFetching: floorFetching } = useGetFloorMasterQuery(
    { buildingId: selBuilding?.ID, divisionId: activeDivision?.ID },
    { skip: !selBuilding?.ID }
  );

  const { data: roomData, isLoading: roomLoading, isFetching: roomFetching } = useGetRoomMasterQuery(
    { floorId: selFloor?.ID, divisionId: activeDivision?.ID },
    { skip: !selFloor?.ID }
  );

  const isMasterLoading = masterLoading || floorLoading || roomLoading || floorFetching || roomFetching;

  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 65, friction: 11 }).start();
    }
  }, [visible]);

  const steps = [
    { key: 'building', label: 'Building', icon: 'business', color: C.primary, data: buildings, selected: selBuilding, setSelected: setSelBuilding },
    { key: 'floor', label: 'Floor', icon: 'layers', color: C.success, data: floorData?.data || [], selected: selFloor, setSelected: setSelFloor },
    { key: 'room', label: 'Room', icon: 'grid', color: C.warning, data: roomData?.data || [], selected: selRoom, setSelected: setSelRoom },
  ];

  const current = steps[step];
  const isLast = step === steps.length - 1;

  const handleNext = () => {
    if (!current.selected) {
      Alert.alert('Required', `Please select a ${current.label} to continue.`);
      return;
    }
    if (isLast) {
      onConfirm({ room: selRoom, floor: selFloor, building: selBuilding, division: activeDivision });
    } else {
      setStep(s => s + 1);
      setSearchQuery('');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={() => {
        if (step > 0) {
          setStep(s => s - 1);
          setSearchQuery('');
        } else {
          if (onCancel) onCancel();
        }
      }}
    >
      <View style={popup.backdrop}>
        <Animated.View style={[popup.sheet, { transform: [{ translateY: slideAnim }] }]}>

          {/* Header */}
          <View style={popup.header}>
            <View style={popup.headerLeft}>
              <View style={[popup.headerIcon, { backgroundColor: current.color + '22' }]}>
                <Ionicons name={current.icon} size={22} color={current.color} />
              </View>
              <View>
                <Text style={popup.headerTitle}>Audit Setup</Text>
                <Text style={popup.headerSub}>Step {step + 1} of {steps.length}</Text>
                {activeDivision && (
                  <TouchableOpacity onPress={onChangeDivision} style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: C.warning + '22', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6, marginTop: 6 }}>
                    <Ionicons name="business" size={10} color={C.warning} style={{ marginRight: 4 }} />
                    <Text style={{ fontSize: 12, color: C.warning, fontWeight: '600', maxWidth: 290 }} numberOfLines={1}>
                      {activeDivision.NAME}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={popup.dotsRow}>
              {steps.map((s, i) => (
                <View
                  key={s.key}
                  style={[
                    popup.dot,
                    i === step && { backgroundColor: current.color, width: 18 },
                    i < step && { backgroundColor: C.success },
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Selected Path Breadcrumbs */}
          {step > 0 && (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, marginTop: 16, flexWrap: 'wrap', gap: 6 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: C.primary + '18', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                <Ionicons name="business" size={12} color={C.primary} style={{ marginRight: 4 }} />
                <Text style={{ fontSize: 13, color: C.primary, fontWeight: '600', maxWidth: 120 }} numberOfLines={1}>{selBuilding?.NAME}</Text>
              </View>
              {step > 1 && (
                <>
                  <Ionicons name="chevron-forward" size={12} color={C.textSec} />
                  <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: C.success + '18', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                    <Ionicons name="layers" size={12} color={C.success} style={{ marginRight: 4 }} />
                    <Text style={{ fontSize: 13, color: C.success, fontWeight: '600', maxWidth: 120 }} numberOfLines={1}>{selFloor?.NAME}</Text>
                  </View>
                </>
              )}
            </View>
          )}

          {/* Step label */}
          <Text style={[popup.stepLabel, step > 0 && { marginTop: 12 }]}>
            Select <Text style={{ color: current.color }}>{current.label}</Text>
          </Text>
          <Text style={popup.stepHint}>
            Choose the {current.label.toLowerCase()} where this audit is being conducted
          </Text>

          {/* Search Input */}
          {!isMasterLoading && (current.data || []).length > 0 && (
            <View style={popup.searchContainer}>
              <Ionicons name="search" size={18} color={C.textSec} style={{ marginRight: 8 }} />
              <TextInput
                style={popup.searchInput}
                placeholder={`Search ${current.label.toLowerCase()}...`}
                placeholderTextColor={C.textSec}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCorrect={false}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')} style={{ padding: 4 }}>
                  <Ionicons name="close-circle" size={18} color={C.textSec} />
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Options list */}
          {isMasterLoading ? (
            <View style={popup.loadingWrap}>
              <ActivityIndicator size="large" color={current.color} />
              <Text style={popup.loadingText}>Loading {current.label}s…</Text>
            </View>
          ) : (
            <ScrollView
              style={popup.listScroll}
              contentContainerStyle={popup.listContent}
              showsVerticalScrollIndicator={false}
            >
              {((current.data || []).filter(item => !searchQuery || item.NAME?.toLowerCase().includes(searchQuery.toLowerCase()))).map((item) => {
                const isSelected = current.selected?.ID === item.ID;
                return (
                  <TouchableOpacity
                    key={item.ID}
                    style={[
                      popup.optionRow,
                      isSelected && { backgroundColor: current.color + '18', borderColor: current.color },
                    ]}
                    onPress={() => {
                      if (current.key === 'building' && current.selected?.ID !== item.ID) {
                        setSelFloor(null);
                        setSelRoom(null);
                      } else if (current.key === 'floor' && current.selected?.ID !== item.ID) {
                        setSelRoom(null);
                      }
                      current.setSelected(item);
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={[popup.optionDot, isSelected && { backgroundColor: current.color }]}>
                      {isSelected && <Ionicons name="checkmark" size={12} color="#fff" />}
                    </View>
                    <Text style={[popup.optionText, isSelected && { color: current.color, fontWeight: '700' }]}>
                      {item.NAME}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}

          {/* Footer */}
          <View style={popup.footer}>
            {step > 0 ? (
              <TouchableOpacity style={popup.backBtn} onPress={() => { setStep(s => s - 1); setSearchQuery(''); }}>
                <Ionicons name="arrow-back" size={18} color={C.textSec} />
                <Text style={popup.backBtnText}>Back</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={popup.backBtn} onPress={() => { if (onCancel) onCancel(); }}>
                <Ionicons name="close" size={18} color={C.textSec} />
                <Text style={popup.backBtnText}>Cancel</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[popup.nextBtn, { backgroundColor: current.color }, !current.selected && popup.nextBtnDisabled]}
              onPress={handleNext}
            >
              <Text style={popup.nextBtnText}>{isLast ? 'Start Scanning' : 'Next'}</Text>
              <Ionicons name={isLast ? 'scan' : 'arrow-forward'} size={18} color="#2c2a2a" />
            </TouchableOpacity>
          </View>

        </Animated.View>
      </View>
    </Modal>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AssetAudit() {
  const { theme } = useTheme();
  const C = getC(theme);
  const sectionStyles = getSectionStyles();
  const CONDITIONS = getConditions(C);
  const popup = getPopup(C);
  const styles = getStyles(C);

  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [assetData, setAssetData] = useState(null);
  const [cameraActive, setCameraActive] = useState(true);
  const [latitude, setLatitude] = useState(11.77);
  const [longitude, setLongitude] = useState(77.3433);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [condition, setCondition] = useState('Good');
  const [showSetup, setShowSetup] = useState(true);
  const [auditParams, setAuditParams] = useState(null);
  const [companyCode, setCompanyCode] = useState('');
  const [asyncCompCode, setAsyncCompCode] = useState(null);
  const [userCompanies, setUserCompanies] = useState([]);
  const [compid, setCompid] = useState(null);
  const [showDivisionModal, setShowDivisionModal] = useState(false);
  const [savedDivision, setSavedDivision] = useState(null);
  const [isCompanyLoading, setIsCompanyLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);

  const camera = useRef(null);
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleBackPress = () => {
    Alert.alert(
      "Exit Audit",
      "Are you sure you want to close this screen? Any unsaved progress will be lost.",
      [
        { text: "No", style: "cancel", onPress: () => {} },
        { 
          text: "Logout", 
          style: "destructive", 
          onPress: () => {
            handleLogout(ResetNavigation);
          }
        }
      ],
      { cancelable: true }
    );
    return true; // prevent default hardware back behavior
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
  }, [navigation]);

  const { data: divisionData, isLoading: divisionLoading } = useGetDivisionMasterQuery();
  const { data: companyMaster } = useGetCompanycodeQuery({});

  const companyName = companyMaster?.data?.find(
    (c) => String(c.value).toUpperCase() === String(companyCode).toUpperCase()
  )?.label || companyCode;

  const divisions = divisionData?.data || [];

  // Use saved division from AsyncStorage if it matches the current company, else fallback to auto-select if only 1 division
  const activeDivision = auditParams?.division || savedDivision || (divisions.length === 1 ? divisions[0] : null);

  useEffect(() => {
    // Wait until companyCode and divisions are loaded
    if (isCompanyLoading || divisionLoading) return;

    // If there are multiple divisions and no active division, force the modal
    if (divisions.length > 1 && !activeDivision && !showDivisionModal) {
      setShowDivisionModal(true);
    }
  }, [divisions.length, activeDivision, showDivisionModal, isCompanyLoading, divisionLoading]);

  const { data: buildingData, isLoading: buildingLoading, isFetching: buildingFetching } = useGetBuildingMasterQuery(
    activeDivision?.ID,
    { skip: !activeDivision?.ID }
  );

  const masterLoading = buildingLoading || divisionLoading || buildingFetching;

  const [BarcodeRefetch] = useLazyGetBarcodeDataQuery();
  const [addBarcode] = useSaveBarcodeDetailsMutation();

  const { hasPermission: cameraPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back', { physicalDevices: ['wide-angle-camera'] });

  useEffect(() => {
    (async () => {
      if (!cameraPermission) {
        const status = await requestPermission();
        setHasPermission(status === 'granted');
      } else {
        setHasPermission(true);
      }
    })();
  }, [cameraPermission]);

  useEffect(() => { fetchAddress(); }, []);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const userDataStr = await AsyncStorage.getItem('userName');
        let parsedUserData = null;
        if (userDataStr) {
          parsedUserData = JSON.parse(userDataStr);
          if (parsedUserData?.GCOMPCODE) setCompanyCode(parsedUserData.GCOMPCODE);
          if (parsedUserData?.COMPID) setCompid(parsedUserData.COMPID);
        }

        const storedCompcode = await AsyncStorage.getItem('compcode');
        if (storedCompcode) setAsyncCompCode(storedCompcode);

        const storedUserComps = await AsyncStorage.getItem('userCompanies');
        if (storedUserComps) setUserCompanies(JSON.parse(storedUserComps));

        // Load the user's previously saved division for this screen
        const savedDivStr = await AsyncStorage.getItem('defaultDivision');
        if (savedDivStr) {
          const parsedDiv = JSON.parse(savedDivStr);
          const currentComp = storedCompcode || (parsedUserData ? parsedUserData.GCOMPCODE : null);

          // Only use it if it belongs to the current company!
          if (!currentComp || String(parsedDiv.COMPCODE).toUpperCase() === String(currentComp).toUpperCase()) {
            setSavedDivision(parsedDiv);
            setAuditParams(prev => ({ ...prev, division: parsedDiv }));
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsCompanyLoading(false);
      }
    };
    fetchCompany();
  }, []);

  useEffect(() => {
    if (showDetails) {
      Animated.parallel([
        Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 65, friction: 11 }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: height, duration: 300, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [showDetails]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'code-128', 'upc-a', 'code-39'],
    onCodeScanned: (codes) => {
      if (!scanned && codes.length > 0 && codes[0].value) {
        setScanned(true);
        handleBarCodeScanned(codes[0].value);
      }
    },
  });





  const fetchAssetData = async (assetId) => {
    setLoading(true);
    try {
      const mockData = await BarcodeRefetch({ BARCODEID: assetId }).unwrap();
      const bardata = mockData?.data;
      if (bardata && bardata.length > 0) {
        // Attach the source flag onto the row so the UI knows where data came from
        setAssetData({ ...bardata[0], _source: mockData?.source || 'master' });
        setShowDetails(true);
      } else {
        Alert.alert('Not Found', 'Asset with this barcode not found in master records.');
        setScanned(false);
      }
    } catch (err) {
      console.error("fetchAssetData Error:", err);
      Alert.alert('Error', 'Failed to fetch asset data.');
      setScanned(false);
    } finally {
      setLoading(false);
    }
  };

  const handleBarCodeScanned = (data) => {
    if (data) fetchAssetData(data);
    else {
      Alert.alert('Scan Error', 'No data found. Please try again.');
      setScanned(false);
    }
  };

  const resetScanner = () => {
    setScanned(false);
    setAssetData(null);
    setShowDetails(false);
    setCameraActive(true);
    setCondition('Good');
  };

  async function fetchAddress() {
    try {
      setLocationLoading(true);

      const position = await getCurrentLocation();

      // Guard: permission denied or native module returned null
      if (!position || !position.coords) {
        setAddress('Location unavailable');
        return;
      }

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setLatitude(lat);
      setLongitude(lng);

      // Guard: skip TomTom call if API key is missing
      if (!TOMTOM_API_KEY) {
        setAddress(`${lat}, ${lng}`);
        return;
      }

      const url = `https://api.tomtom.com/search/2/reverseGeocode/${lat},${lng}.json?key=${TOMTOM_API_KEY}&radius=50&language=en-US`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      const best = data.addresses?.[0]?.address;
      const addr = best?.freeformAddress ||
        [best?.streetNumber, best?.streetName, best?.municipality || best?.country]
          .filter(Boolean).join(', ');

      setAddress(addr || `${lat}, ${lng}`);

    } catch (e) {
      console.warn('fetchAddress error:', e?.message);
      setAddress('Location unavailable');
    } finally {
      setLocationLoading(false);
    }
  }

  const SaveScanner = async (logoutAfterSave = false) => {
    try {
      setLoading(true);
      const {
        DOCID, DOCID1,                          // history source aliases DOCID → DOCID1
        ASSETID, SUBGRP, MMADE, MMODEL,
        MACHINEMADE, MACHINEMODEL,              // history source aliases MMADE → MACHINEMADE
        REMARKS, MAINGRP, ABARID,
      } = assetData || {};

      const resolvedDOCID = DOCID ?? DOCID1;    // master has DOCID via A.*, history has DOCID1
      const resolvedMMade = MMADE ?? MACHINEMADE;
      const resolvedMModel = MMODEL ?? MACHINEMODEL;

      const _data = await addBarcode({
        DOCID: resolvedDOCID,
        ASSETID, SUBGRP, MMADE: resolvedMMade, MMODEL: resolvedMModel, REMARKS, MAINGRP, ABARID,
        ROOM: auditParams?.room?.ID,
        BUILDING: auditParams?.building?.ID,
        FLOORS: auditParams?.floor?.ID,
        DIVISION: auditParams?.division?.ID,
        LOC: address,
        CONDITION: condition,
      })?.unwrap();

      if (_data?.statusCode === 1 && _data?.data?.rowsAffected == 1) {
        Alert.alert('Success', 'Asset data saved successfully!');
        if (logoutAfterSave === true) {
          handleLogout(ResetNavigation);
        } else {
          resetScanner();
        }
      } else if (_data?.statusCode == 0) {
        Alert.alert('Warning', _data?.message || 'Failed to save asset data.');
      }
    } catch (error) {
      console.error("SaveScanner Error:", error);
      Alert.alert('ERROR', JSON?.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  const handleSetupConfirm = (params) => {
    setAuditParams(params);
    setShowSetup(false);
  };

  const handleModalBackPress = () => {
    Alert.alert(
      "Unsaved Scan",
      "You have an unsaved scan. What would you like to do?",
      [
        { text: "No", style: "cancel", onPress: () => {} },
        { 
          text: "Save & Logout", 
          onPress: () => {
            SaveScanner(true);
          }
        }
      ],
      { cancelable: true }
    );
  };

  // ── Validation Helpers ────────────────────────────────────────────────────
  const _pick = (...keys) => { for (const k of keys) { if (assetData?.[k]) return assetData[k]; } return null; };
  
  const regBuilding = _pick('BNAME1', 'BNAME');
  const regFloor = _pick('FNAME1', 'FNAME');
  const regRoom = _pick('RNAME1');

  const registeredLocation = [regBuilding, regFloor, regRoom].filter(Boolean).join('  ›  ');

  const isBuildingMismatch = regBuilding && auditParams?.building?.NAME && regBuilding !== auditParams.building.NAME;
  const isFloorMismatch = regFloor && auditParams?.floor?.NAME && regFloor !== auditParams.floor.NAME;
  const isRoomMismatch = regRoom && auditParams?.room?.NAME && regRoom !== auditParams.room.NAME;

  const locationMismatch = isBuildingMismatch || isFloorMismatch || isRoomMismatch;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* ── Pre-scan Setup Popup ── */}
      <SetupPopup popup={popup} C={C}
        visible={showSetup}
        buildings={buildingData?.data || []}
        activeDivision={activeDivision}
        masterLoading={masterLoading}
        onConfirm={handleSetupConfirm}
        onCancel={() => {
          handleBackPress();
        }}
        onChangeDivision={() => setShowDivisionModal(true)}
      />

      {/* ── Permission / No Device Screens ── */}
      {!showSetup && !hasPermission && (
        <SafeAreaView style={styles.permContainer}>
          <TouchableOpacity
            style={{ position: 'absolute', top: 50, left: 20, zIndex: 10, padding: 10 }}
            onPress={handleBackPress}
          >
            <Ionicons name="arrow-back" size={28} color={C.textPri} />
          </TouchableOpacity>
          <View style={styles.permIconWrap}>
            <Ionicons name="camera" size={40} color={C.primary} />
          </View>
          <Text style={styles.permTitle}>Camera Access Needed</Text>
          <Text style={styles.permSub}>Allow camera access to scan asset barcodes and QR codes</Text>
          <TouchableOpacity style={styles.permBtn} onPress={requestPermission}>
            <Text style={styles.permBtnText}>Grant Permission</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}

      {!showSetup && hasPermission && !device && (
        <SafeAreaView style={styles.permContainer}>
          <TouchableOpacity
            style={{ position: 'absolute', top: 50, left: 20, zIndex: 10, padding: 10 }}
            onPress={handleBackPress}
          >
            <Ionicons name="arrow-back" size={28} color={C.textPri} />
          </TouchableOpacity>
          <Text style={styles.permTitle}>Camera Unavailable</Text>
        </SafeAreaView>
      )}

      {/* ── Camera ── */}
      {cameraActive && !showSetup && hasPermission && device && (
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={cameraActive && !showSetup}
          codeScanner={codeScanner}
          audio={false}
          torch={flashOn ? 'on' : 'off'}
          onError={(error) => {
            console.log('Camera error:', error);
            if (error.code === 'system/code-scanner-unavailable') {
              // Ignore or show a toast message that the module is downloading
              console.log('Barcode scanner module is downloading. Please wait.');
            }
          }}
        />
      )}

      {/* ── Scanner Overlay ── */}
      {cameraActive && !showSetup && hasPermission && device && (
        <View style={styles.overlay}>

          {/* Top bar */}
          <SafeAreaView>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.topBar}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <TouchableOpacity
                  style={styles.iconBtn}
                  onPress={handleBackPress}
                >
                  <Ionicons name="arrow-back" size={20} color={C.overlayTextPri} />
                </TouchableOpacity>
                <View style={styles.topBadge}>
                  <View style={[styles.dot, { backgroundColor: C.success }]} />
                  <Text style={styles.topBadgeText}>Asset Audit</Text>
                </View>

                {companyCode ? (
                  <TouchableOpacity
                    style={styles.topBadge}
                    onPress={() => setShowDivisionModal(true)}
                  >
                    <Ionicons name="business" size={12} color={C.warning} />
                    <Text style={[styles.topBadgeText, { maxWidth: 150 }]} numberOfLines={1}>
                      {auditParams?.division?.NAME || companyName}
                    </Text>
                  </TouchableOpacity>
                ) : null}

                <TouchableOpacity style={styles.iconBtn} onPress={() => setShowSetup(true)}>
                  <Ionicons name="settings-outline" size={20} color={C.overlayTextSec} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.iconBtn, flashOn && styles.iconBtnActive]}
                  onPress={() => setFlashOn(f => !f)}
                >
                  <Ionicons name={flashOn ? 'flash' : 'flash-off'} size={20} color={flashOn ? C.warning : C.overlayTextSec} />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>

          {/* Selected params banner */}
          {auditParams && (
            <View style={styles.paramsBanner}>
              <Ionicons name="location" size={13} color={C.primary} />
              <Text style={styles.paramsBannerText} numberOfLines={1}>
                {auditParams.building?.NAME}  ›  {auditParams.floor?.NAME}  ›  {auditParams.room?.NAME}
              </Text>
            </View>
          )}

          {/* Middle – scan frame */}
          <View style={styles.frameArea}>
            <View style={styles.dimLeft} />
            <View style={styles.frameCol}>
              <View style={styles.dimTop} />
              <View style={styles.qrFrame}>
                <Corners styles={styles} C={C} />
                <ScanLine styles={styles} />
              </View>
              <View style={styles.dimBottom} />
            </View>
            <View style={styles.dimRight} />
          </View>

          {/* Hint label */}
          <View style={styles.hintRow}>
            <Ionicons name="scan-outline" size={16} color={C.overlayTextSec} />
            <Text style={styles.hintText}>
              Point camera at QR code or barcode
            </Text>
          </View>


        </View>
      )}

      {/* ── Processing indicator ── */}
      {scanned && !showDetails && (
        <View style={styles.processingOverlay}>
          <View style={styles.processingCard}>
            <ActivityIndicator size="large" color={C.primary} />
            <Text style={styles.processingText}>Fetching asset info…</Text>
          </View>
        </View>
      )}

      {/* ── Asset Details Modal ── */}
      <Modal
        visible={showDetails}
        transparent
        animationType="none"
        onRequestClose={handleModalBackPress}
      >
        <Animated.View style={[styles.modalBg, { opacity: fadeAnim }]}>
          <Animated.View style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}>

            <View style={styles.sheetHandle} />

            {/* Sheet header */}
            <View style={styles.sheetHeader}>
              <View>
                <Text style={styles.sheetTitle}>Asset Details</Text>
                <Text style={styles.sheetSub}>{assetData?.ABARID || 'Scanned'}</Text>
              </View>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => { setShowDetails(false); setScanned(false); }}
              >
                <Ionicons name="close" size={18} color={C.textSec} />
              </TouchableOpacity>
            </View>

            {loading ? (
              <View style={styles.sheetLoading}>
                <ActivityIndicator size="large" color={C.primary} />
                <Text style={styles.sheetLoadingText}>Loading asset…</Text>
              </View>
            ) : assetData ? (
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetScroll}>

                {/* ── SECTION 1: Scanned Asset (Master or History) ── */}
                <SectionHeader sectionStyles={sectionStyles} C={C}
                  icon={assetData?._source === 'history' ? 'time-outline' : 'server-outline'}
                  label="Scanned Asset"
                  badgeText={assetData?._source === 'history' ? 'From last scan history' : 'From master records'}
                  badgeColor={assetData?._source === 'history' ? C.warning : C.textSec}
                  iconColor={assetData?._source === 'history' ? C.warning : C.textSec}
                />
                <View style={styles.infoCard}>
                  <DetailRow styles={styles} C={C}
                    icon="barcode"
                    label="Asset ID"
                    value={assetData?.ABARID}
                    iconColor={C.primary}
                    borderColor={C.border}
                  />
                  <DetailRow styles={styles} C={C}
                    icon="cube-outline"
                    label="Asset Name"
                    value={assetData?.SUBGRPNAME}
                    iconColor={C.primary}
                    borderColor={C.border}
                  />
                  <DetailRow styles={styles} C={C}
                    icon="pricetag-outline"
                    label="Main Group"
                    value={assetData?.MAINGRPNAME}
                    iconColor={C.textSec}
                    borderColor={C.border}
                  />
                  {/* Registered location — last row, no bottom border */}
                  <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
                    <View style={[styles.detailIconWrap, { backgroundColor: C.textSec + '18' }]}>
                      <Ionicons name="pin-outline" size={18} color={C.textSec} />
                    </View>
                    <View style={styles.detailTexts}>
                      <Text style={styles.detailLabel}>Available Location</Text>
                      <Text style={[styles.detailValue, { fontSize: 13, lineHeight: 20, color: C.textSec }]}>
                        {registeredLocation || '—'}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* ── SECTION 2: Current Audit Location (Setup Params) ── */}
                <View style={{ marginTop: 20 }}>
                  <SectionHeader sectionStyles={sectionStyles} C={C}
                    icon="location-outline"
                    label="Current Audit Location"
                    badgeText="Selected in setup"
                    badgeColor={C.primary}
                    iconColor={C.primary}
                  />
                  <View style={[styles.infoCard, styles.auditCard]}>
                    <DetailRow styles={styles} C={C}
                      icon="business"
                      label="Building"
                      value={auditParams?.building?.NAME}
                      iconColor={C.primary}
                      borderColor={'rgba(10,132,255,0.15)'}
                    />
                    <DetailRow styles={styles} C={C}
                      icon="layers"
                      label="Floor"
                      value={auditParams?.floor?.NAME}
                      iconColor={C.success}
                      borderColor={'rgba(10,132,255,0.15)'}
                    />
                    <DetailRow styles={styles} C={C}
                      icon="grid"
                      label="Room"
                      value={auditParams?.room?.NAME}
                      iconColor={C.warning}
                      borderColor={'rgba(10,132,255,0.15)'}
                    />
                    <DetailRow styles={styles} C={C}
                      icon="people"
                      label="Division"
                      value={auditParams?.division?.NAME}
                      iconColor="#BF5AF2"
                      borderColor={'rgba(10,132,255,0.15)'}
                    />
                    {/* GPS Address — last row, no bottom border */}
                    <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
                      <View style={[styles.detailIconWrap, { backgroundColor: C.warning + '22' }]}>
                        <Ionicons name="location" size={18} color={C.warning} />
                      </View>
                      <View style={styles.detailTexts}>
                        <Text style={styles.detailLabel}>GPS Address</Text>
                        <Text style={[styles.detailValue, { fontSize: 13, lineHeight: 18 }]}>
                          {address || '—'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* ── Mismatch Warning ── */}
                {locationMismatch && (
                  <View style={styles.mismatchBanner}>
                    <View style={styles.mismatchIconWrap}>
                      <Ionicons name="warning" size={16} color={C.danger} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.mismatchTitle}>Location Mismatch</Text>
                      <Text style={styles.mismatchText}>
                        This asset is registered in{' '}
                        <Text style={{ fontWeight: '700', color: C.textPri }}>{registeredLocation || 'an unknown location'}</Text>
                        {' '}but is being audited in{' '}
                        <Text style={{ fontWeight: '700', color: C.primary }}>
                          {[auditParams?.building?.NAME, auditParams?.floor?.NAME, auditParams?.room?.NAME].filter(Boolean).join('  ›  ')}
                        </Text>.
                      </Text>
                    </View>
                  </View>
                )}

                {/* ── Condition Selector ── */}
                <Text style={[styles.sectionLabel, { marginTop: 20 }]}>Asset Condition</Text>
                <View style={styles.conditionRow}>
                  {CONDITIONS.map(({ key, icon, color, dim }) => (
                    <TouchableOpacity
                      key={key}
                      style={[
                        styles.condChip,
                        condition === key && { backgroundColor: dim, borderColor: color },
                      ]}
                      onPress={() => setCondition(key)}
                    >
                      <Ionicons name={icon} size={16} color={condition === key ? color : C.textSec} />
                      <Text style={[styles.condChipText, condition === key && { color }]}>{key}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* ── Actions ── */}
                <View style={styles.actionRow}>
                  <TouchableOpacity style={styles.secondaryBtn} onPress={resetScanner}>
                    <Ionicons name="scan" size={18} color={C.primary} />
                    <Text style={styles.secondaryBtnText}>Scan Again</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.primaryBtn} onPress={SaveScanner} disabled={loading}>
                    {loading
                      ? <ActivityIndicator size="small" color="#fff" />
                      : <>
                        <Ionicons name="checkmark-circle" size={18} color="#fff" />
                        <Text style={styles.primaryBtnText}>Confirm &amp; Save</Text>
                      </>
                    }
                  </TouchableOpacity>
                </View>

              </ScrollView>
            ) : null}
          </Animated.View>
        </Animated.View>
      </Modal>

      {/* ── Division Select Modal ── */}
      <Modal
        visible={showDivisionModal}
        transparent
        animationType="fade"
        onRequestClose={() => {
          if (activeDivision) setShowDivisionModal(false);
        }}
      >
        <View style={popup.backdrop}>
          <View style={[popup.sheet, { maxHeight: height * 0.6 }]}>
            <View style={popup.header}>
              <View style={popup.headerLeft}>
                <View style={[popup.headerIcon, { backgroundColor: C.warning + '22' }]}>
                  <Ionicons name="business" size={22} color={C.warning} />
                </View>
                <View>
                  <Text style={popup.headerTitle}>Select Division</Text>
                  <Text style={popup.headerSub}>Allowed divisions</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => {
                  if (activeDivision) {
                    setShowDivisionModal(false);
                  } else {
                    Alert.alert("Required", "Please select a division to proceed.");
                  }
                }}
              >
                <Ionicons name="close" size={18} color={C.textSec} />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ padding: 20 }}>
              {divisions.map((item) => {
                const isSelected = auditParams?.division?.ID === item.ID;
                return (
                  <TouchableOpacity
                    key={item.ID}
                    style={[
                      popup.optionRow,
                      { marginBottom: 10 },
                      isSelected && { backgroundColor: C.warning + '18', borderColor: C.warning },
                    ]}
                    onPress={() => {
                      if (auditParams?.division?.ID !== item.ID) {
                        setAuditParams({ division: item });
                        setSavedDivision(item);
                        AsyncStorage.setItem('defaultDivision', JSON.stringify(item)).catch(console.error);
                        setShowSetup(true); // Re-trigger setup for new division
                      }
                      setShowDivisionModal(false);
                    }}
                  >
                    <View style={[popup.optionDot, isSelected && { backgroundColor: C.warning, borderColor: C.warning }]}>
                      {isSelected && <Ionicons name="checkmark" size={12} color="#fff" />}
                    </View>
                    <Text style={[popup.optionText, isSelected && { color: C.warning, fontWeight: '700' }]}>
                      {item.NAME}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Back button footer */}
            <View style={[popup.footer, { paddingTop: 8 }]}>
              <TouchableOpacity
                style={popup.backBtn}
                onPress={() => {
                  setShowDivisionModal(false);
                  navigation.navigate('HOME');
                }}
              >
                <Ionicons name="arrow-back" size={18} color={C.textSec} />
                <Text style={popup.backBtnText}>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const getPopup = (C) => StyleSheet.create({
  backdrop: {
    flex: 1, backgroundColor: C.overlay,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: C.surface,
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    maxHeight: height * 0.82, paddingBottom: 24,
  },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 24, paddingTop: 20, paddingBottom: 16,
    borderBottomWidth: 1, borderBottomColor: C.border,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerIcon: {
    width: 44, height: 44, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: C.textPri },
  headerSub: { fontSize: 13, color: C.textSec, marginTop: 2 },
  dotsRow: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  dot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: C.border,
  },
  stepLabel: {
    fontSize: 22, fontWeight: '700', color: C.textPri,
    paddingHorizontal: 24, marginTop: 20,
  },
  stepHint: {
    fontSize: 14, color: C.textSec, paddingHorizontal: 24,
    marginTop: 4, marginBottom: 14,
  },
  loadingWrap: {
    height: 200, justifyContent: 'center', alignItems: 'center', gap: 14,
  },
  loadingText: { color: C.textSec, fontSize: 15 },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.surfaceAlt,
    marginHorizontal: 20, marginBottom: 12,
    borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10,
    borderWidth: 1, borderColor: C.border,
  },
  searchInput: {
    flex: 1, color: C.textPri, fontSize: 15, padding: 0,
  },
  listScroll: { maxHeight: height * 0.38 },
  listContent: { paddingHorizontal: 20, paddingBottom: 8, gap: 8 },
  optionRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: C.surfaceAlt,
    borderRadius: 14, paddingVertical: 14, paddingHorizontal: 16,
    borderWidth: 1.5, borderColor: 'transparent',
  },
  optionDot: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: C.border,
    justifyContent: 'center', alignItems: 'center',
  },
  optionText: { fontSize: 15, color: C.textPri, fontWeight: '500', flex: 1 },
  footer: {
    flexDirection: 'row', gap: 12,
    paddingHorizontal: 20, paddingTop: 16,
  },
  backBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 15, paddingHorizontal: 18,
    borderRadius: 14, borderWidth: 1.5, borderColor: C.border,
    backgroundColor: C.surfaceAlt,
  },
  backBtnText: { color: C.textSec, fontSize: 15, fontWeight: '600' },
  nextBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 8,
    paddingVertical: 15, borderRadius: 14,
  },
  nextBtnDisabled: { opacity: 0.5 },
  nextBtnText: { color: '#1a1818', fontSize: 15, fontWeight: '700' },
});

// ─── Main Styles ──────────────────────────────────────────────────────────────
const FRAME_QR = 240;
const FRAME_BAR_W = 290;
const FRAME_BAR_H = 130;
const CORNER = 22;

const getStyles = (C) => StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },

  permContainer: {
    flex: 1, backgroundColor: C.bg,
    justifyContent: 'center', alignItems: 'center', padding: 32,
  },
  permIconWrap: {
    width: 88, height: 88, borderRadius: 28,
    backgroundColor: C.primaryDim,
    justifyContent: 'center', alignItems: 'center', marginBottom: 24,
  },
  permTitle: { fontSize: 22, fontWeight: '700', color: C.textPri, marginBottom: 10, textAlign: 'center' },
  permSub: { fontSize: 15, color: C.textSec, textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  permBtn: { backgroundColor: C.primary, paddingHorizontal: 32, paddingVertical: 14, borderRadius: 14 },
  permBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  overlay: { flex: 1, justifyContent: 'space-between' },
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8,
  },
  topBadge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, gap: 8,
  },
  dot: { width: 7, height: 7, borderRadius: 4 },
  topBadgeText: { color: C.overlayTextPri, fontSize: 14, fontWeight: '600', letterSpacing: 0.3 },
  iconBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center', alignItems: 'center',
  },
  iconBtnActive: { backgroundColor: 'rgba(255,214,10,0.15)' },

  paramsBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    alignSelf: 'center',
    backgroundColor: 'rgba(10,132,255,0.18)',
    borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6,
  },
  paramsBannerText: { color: C.primary, fontSize: 13, fontWeight: '600', maxWidth: width * 0.7 },

  frameArea: { flex: 1, flexDirection: 'row' },
  frameCol: { flexDirection: 'column' },
  dimLeft: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)' },
  dimRight: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)' },
  dimTop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)' },
  dimBottom: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)' },

  qrFrame: { width: FRAME_QR, height: FRAME_QR, overflow: 'hidden', position: 'relative' },
  barcodeFrame: { width: FRAME_BAR_W, height: FRAME_BAR_H, overflow: 'hidden', position: 'relative' },

  corner: { position: 'absolute', width: CORNER, height: CORNER, borderColor: C.primary, borderWidth: 3 },
  cornerTL: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 6 },
  cornerTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 6 },
  cornerBL: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 6 },
  cornerBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 6 },

  scanLineQR: {
    position: 'absolute', left: 4, right: 4, height: 2,
    backgroundColor: C.scanLine, borderRadius: 1,
    shadowColor: C.scanLine, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.9, shadowRadius: 6,
  },
  scanLineBarcode: {
    position: 'absolute', left: 0, right: 0, height: 2,
    backgroundColor: C.danger, borderRadius: 1,
    shadowColor: C.danger, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.9, shadowRadius: 6,
  },

  hintRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14 },
  hintText: { color: C.overlayTextSec, fontSize: 14, fontWeight: '500' },
  bottomBar: { alignItems: 'center', paddingBottom: 80, paddingTop: 8 },
  modeBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: 'rgba(10,132,255,0.12)',
    borderWidth: 1, borderColor: 'rgba(10,132,255,0.3)',
    paddingHorizontal: 24, paddingVertical: 13, borderRadius: 40,
  },
  modeBtnText: { color: C.primary, fontSize: 15, fontWeight: '600' },

  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: C.overlay,
    justifyContent: 'center', alignItems: 'center',
  },
  processingCard: { backgroundColor: C.surface, borderRadius: 20, padding: 32, alignItems: 'center', gap: 16, minWidth: 200 },
  processingText: { color: C.textSec, fontSize: 15, fontWeight: '500' },

  modalBg: { flex: 1, backgroundColor: C.overlay, justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: C.surface,
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    maxHeight: height * 0.88, paddingBottom: 16,
  },
  sheetHandle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: C.border, alignSelf: 'center', marginTop: 12, marginBottom: 4,
  },
  sheetHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    paddingHorizontal: 24, paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: C.border,
  },
  sheetTitle: { fontSize: 20, fontWeight: '700', color: C.textPri },
  sheetSub: { fontSize: 13, color: C.textSec, marginTop: 3 },
  closeBtn: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: C.surfaceAlt,
    justifyContent: 'center', alignItems: 'center',
  },
  sheetLoading: { padding: 48, alignItems: 'center', gap: 16 },
  sheetLoadingText: { color: C.textSec, fontSize: 15 },
  sheetScroll: { padding: 20, gap: 4 },

  // ── Info cards ──
  infoCard: {
    backgroundColor: C.surfaceAlt,
    borderRadius: 16, paddingHorizontal: 16,
    overflow: 'hidden',
  },
  auditCard: {
    backgroundColor: 'rgba(10,132,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(10,132,255,0.3)',
  },

  detailRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, borderBottomWidth: 1, gap: 14,
  },
  detailIconWrap: {
    width: 38, height: 38, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
  },
  detailTexts: { flex: 1 },
  detailLabel: {
    fontSize: 11, color: C.textSec, fontWeight: '500',
    marginBottom: 3, textTransform: 'uppercase', letterSpacing: 0.5,
  },
  detailValue: { fontSize: 15, color: C.textPri, fontWeight: '600' },

  // ── Mismatch banner ──
  mismatchBanner: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    backgroundColor: C.dangerDim,
    borderWidth: 1, borderColor: C.danger + '45',
    borderRadius: 14, padding: 14, marginTop: 12,
  },
  mismatchIconWrap: {
    width: 30, height: 30, borderRadius: 10,
    backgroundColor: C.danger + '22',
    justifyContent: 'center', alignItems: 'center',
    marginTop: 1,
  },
  mismatchTitle: { fontSize: 13, fontWeight: '700', color: C.danger, marginBottom: 3 },
  mismatchText: { fontSize: 12, color: C.textSec, lineHeight: 18 },

  sectionLabel: {
    fontSize: 11, color: C.textSec, fontWeight: '600',
    textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8,
  },
  conditionRow: { flexDirection: 'row', gap: 10 },
  condChip: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, paddingVertical: 12, borderRadius: 12,
    borderWidth: 1.5, borderColor: C.border, backgroundColor: C.surfaceAlt,
  },
  condChipText: { fontSize: 12, fontWeight: '600', color: C.textSec },

  actionRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
  secondaryBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 15, borderRadius: 14,
    borderWidth: 1.5, borderColor: C.primary, backgroundColor: C.primaryDim,
  },
  secondaryBtnText: { color: C.primary, fontSize: 15, fontWeight: '600' },
  primaryBtn: {
    flex: 1.4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 15, borderRadius: 14, backgroundColor: C.primary,
  },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});