import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Dimensions,
  FlatList,
  TouchableOpacity,
  PanResponder,
} from 'react-native';
import LogoutModal from './Modal/LogoutModal';
import { handleLogout } from '../utils/Logout';
import { CustomNavigation, ResetNavigation } from '../config/NavigationRef';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Common_Context } from '../contexts/Common_Context';
import { useSelector } from 'react-redux';
import { useTheme } from '../theme/ThemeProvider';

const { width } = Dimensions.get('window');
const drawerWidth = width * 0.78;

const CustomDrawer = ({ tabs, activeRoute, openSidebar, setopenSidebar }) => {
  const [openLogoutModal, setLogoutModal] = useState(false);
  const USER = useSelector((state) => state?.UserDetails);
  const slideAnim = useRef(new Animated.Value(drawerWidth)).current;
  const { theme } = useTheme();
  const currentStyles = styles(theme);

  const openSidebarRef = useRef(openSidebar);
  useEffect(() => {
    openSidebarRef.current = openSidebar;
  }, [openSidebar]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dx, dy, x0 } = gestureState;
        const isOpen = openSidebarRef.current;
        if (!isOpen) {
          return x0 > width - 40 && dx < -10 && Math.abs(dx) > Math.abs(dy);
        } else {
          return dx > 10 && Math.abs(dx) > Math.abs(dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const isOpen = openSidebarRef.current;
        if (!isOpen && gestureState.dx < -50) {
          setopenSidebar(true);
        } else if (isOpen && gestureState.dx > 50) {
          handleCloseDrawer();
        }
      },
    })
  ).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: openSidebar ? 0 : drawerWidth,
      speed: 18,
      bounciness: 0,
      useNativeDriver: true,
    }).start(() => {
      if (!openSidebar) setopenSidebar(false);
    });
  }, [openSidebar]);

  const handleCloseDrawer = () => {
    Animated.spring(slideAnim, {
      toValue: drawerWidth,
      speed: 18,
      bounciness: 0,
      useNativeDriver: true,
    }).start(() => setopenSidebar(false));
  };

  const getInitial = (name) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  const renderItem = ({ item }) => {
    const isActive = activeRoute === item.path;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[currentStyles.menuRow, isActive && currentStyles.menuRowActive]}
        onPress={() => {
          CustomNavigation(item?.path);
          handleCloseDrawer();
        }}
      >
        <View style={[currentStyles.menuIconWrap, isActive && currentStyles.menuIconWrapActive]}>
          {React.cloneElement(item?.icon, {
            color: isActive ? theme.colors.textOnPrimary : theme.colors.accent,
            size: 20,
          })}
        </View>
        <Text style={[currentStyles.menuLabel, isActive && currentStyles.menuLabelActive]}>
          {item.label || item.name}
        </Text>
        <AntDesign
          name="right"
          size={13}
          color={isActive ? theme.colors.accent : theme.colors.menuChevron}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[StyleSheet.absoluteFillObject, { zIndex: 999, elevation: 999 }]}
      pointerEvents="box-none"
      {...panResponder.panHandlers}
    >
      {openSidebar && (
        <Pressable style={currentStyles.backdrop} onPress={handleCloseDrawer} />
      )}

      <Animated.View style={[currentStyles.drawer, { transform: [{ translateX: slideAnim }] }]}>

        {/* ── Dark Header ── */}
        <View style={currentStyles.header}>
          {/* Close button */}
          <TouchableOpacity style={currentStyles.closeBtn} onPress={handleCloseDrawer} activeOpacity={0.7}>
            <AntDesign name="close" size={16} color="#fff" />
          </TouchableOpacity>

          {/* Avatar */}
          <View style={currentStyles.avatarCircle}>
            <Text style={currentStyles.avatarInitial}>{getInitial(USER?.userName)}</Text>
          </View>

          <Text style={currentStyles.welcomeText}>Welcome back</Text>
          <Text style={currentStyles.userName}>{USER?.userName || 'User'}</Text>

          {/* Role badge */}
          <View style={currentStyles.roleBadge}>
            <Text style={currentStyles.roleText}>{USER?.role || 'Employee'}</Text>
          </View>
        </View>

        {/* ── White Menu Body ── */}
        <View style={currentStyles.body}>
          <Text style={currentStyles.sectionLabel}>MAIN</Text>

          <FlatList
            data={tabs}
            renderItem={renderItem}
            keyExtractor={(item) => item?.name}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* ── Sign Out Footer ── */}
        <View style={currentStyles.footer}>
          <View style={currentStyles.footerDivider} />
          <TouchableOpacity
            style={currentStyles.signOutRow}
            onPress={() => setLogoutModal(true)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="logout" size={20} color={theme.colors.danger} />
            <Text style={currentStyles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <LogoutModal
          isModalVisible={openLogoutModal}
          confirm={() => {
            handleLogout(ResetNavigation);
            setLogoutModal(false);
            setopenSidebar(false);
          }}
          cancel={() => setLogoutModal(false)}
        />
      </Animated.View>
    </View>
  );
};

const styles = (theme) => StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 99,
  },
  drawer: {
    width: drawerWidth,
    height: '100%',
    position: 'absolute',
    right: 0,
    zIndex: 100,
    elevation: 20,
    backgroundColor: theme.colors.surface,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
  },

  // ── Header ──
  header: {
    backgroundColor: theme.colors.headerBg,
    paddingTop: 50,
    paddingBottom: 28,
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.colors.headerFrosted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: theme.colors.headerFrosted,
    borderWidth: 2,
    borderColor: theme.colors.headerFrostedBorder,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarInitial: {
    fontSize: 30,
    fontWeight: '700',
    color: theme.colors.headerText,
    fontFamily: theme.fonts.bold,
  },
  welcomeText: {
    fontSize: 13,
    color: theme.colors.headerSubtext,
    fontFamily: theme.fonts.regular,
    marginBottom: 3,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.headerText,
    fontFamily: theme.fonts.bold,
    marginBottom: 10,
  },
  roleBadge: {
    backgroundColor: theme.colors.headerFrosted,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: theme.colors.headerRoleBadgeBorder,
  },
  roleText: {
    fontSize: 12,
    color: theme.colors.headerRoleText,
    fontFamily: theme.fonts.regular,
  },

  // ── Body ──
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 80,   // Leave room for the absolute-positioned footer
    backgroundColor: theme.colors.surface,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.menuLabel,
    letterSpacing: 1.5,
    fontFamily: theme.fonts.semiBold,
    marginBottom: 8,
    paddingLeft: 4,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginVertical: 2,
    backgroundColor: 'transparent',
  },
  menuRowActive: {
    backgroundColor: theme.colors.accentLight,
  },
  menuIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.accentLight,
    marginRight: 12,
  },
  menuIconWrapActive: {
    backgroundColor: theme.colors.accent,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: theme.colors.menuText,
    fontFamily: theme.fonts.regular,
  },
  menuLabelActive: {
    color: theme.colors.accent,
    fontFamily: theme.fonts.semiBold,
  },

  // ── Footer ──
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 30,
    backgroundColor: theme.colors.surface,
  },
  footerDivider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginBottom: 16,
  },
  signOutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  signOutText: {
    fontSize: 15,
    color: theme.colors.danger,
    fontFamily: theme.fonts.semiBold,
  },
});

export default CustomDrawer;
