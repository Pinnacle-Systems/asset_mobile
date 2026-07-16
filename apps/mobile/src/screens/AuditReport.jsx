/**
 * AuditReport.jsx — Enhanced Audit & Variance Report
 * Features: Date filtering, Variance flow visualization, User-friendly UI
 */

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, ActivityIndicator,
  TouchableOpacity, Alert, FlatList, Modal, Switch,
  SafeAreaView, Platform, RefreshControl, Animated, TextInput,
  Dimensions
} from 'react-native';
import {
  useGetAuditAssestDetailsQuery,
  useGetAuditVarianceReportQuery,
} from '../redux/service/commonMasters';
import XLSX from 'xlsx-js-style';
import Orientation from 'react-native-orientation-locker';
import Share from 'react-native-share';
import FS from 'react-native-fs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import { setOptions } from '../redux/Slices/UserDetails';
import { useDispatch } from 'react-redux';
import { useTheme } from '../theme/ThemeProvider';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Design Tokens ──────────────────────────────────────────────────────────
const getC = (theme) => {
  const isDark = theme.isDarkMode || theme.mode === 'dark';
  return {
    // Base
    bg: isDark ? '#0f172a' : '#F8FAFC',
    surface: isDark ? '#1e293b' : '#FFFFFF',
    surfaceHigh: isDark ? '#334155' : '#F1F5F9',
    border: isDark ? '#475569' : '#E2E8F0',
    borderBright: isDark ? '#64748b' : '#CBD5E1',

    // Accent
    accent: isDark ? '#60a5fa' : '#2563EB',
    accentGlow: isDark ? 'rgba(96,165,250,0.15)' : '#2563EB15',
    accentLight: isDark ? '#3B82F6' : '#3B82F6',
    accentSoft: isDark ? 'rgba(56,130,246,0.2)' : '#DBEAFE',

    // Status
    available: isDark ? '#34d399' : '#059669',
    availableBg: isDark ? 'rgba(52,211,153,0.15)' : '#D1FAE5',
    misplaced: isDark ? '#fbbf24' : '#D97706',
    misplacedBg: isDark ? 'rgba(251,191,36,0.15)' : '#FEF3C7',
    damaged: isDark ? '#f87171' : '#DC2626',
    damagedBg: isDark ? 'rgba(248,113,113,0.15)' : '#FEE2E2',
    ghost: isDark ? '#a78bfa' : '#7C3AED',
    ghostBg: isDark ? 'rgba(167,139,250,0.15)' : '#EDE9FE',
    changed: isDark ? '#38bdf8' : '#0284C7',
    changedBg: isDark ? 'rgba(56,189,248,0.15)' : '#E0F2FE',
    nochange: isDark ? '#94a3b8' : '#64748B',
    nochangeBg: isDark ? 'rgba(148,163,184,0.15)' : '#F1F5F9',

    // Flow colors
    flowFrom: isDark ? '#64748b' : '#94A3B8',
    flowTo: isDark ? '#60a5fa' : '#2563EB',
    flowArrow: isDark ? '#64748b' : '#94A3B8',
    flowBg: isDark ? '#0f172a' : '#F8FAFC',

    // Text
    textPri: isDark ? '#f8fafc' : '#0F172A',
    textSec: isDark ? '#94a3b8' : '#475569',
    textMuted: isDark ? '#64748b' : '#64748B',
    textLight: isDark ? '#475569' : '#94A3B8',

    // Diff
    removed: isDark ? '#f87171' : '#DC2626',
    added: isDark ? '#34d399' : '#059669',
  };
};

// ─── Status Config ────────────────────────────────────────────────────────
const getStatusCfg = (s, C) => {
  const cfg = {
    Available: { color: C.available, bg: C.availableBg, icon: 'check-circle', label: 'Available' },
    Misplaced: { color: C.misplaced, bg: C.misplacedBg, icon: 'swap-horiz', label: 'Misplaced' },
    Damaged: { color: C.damaged, bg: C.damagedBg, icon: 'warning', label: 'Damaged' },
    Ghost: { color: C.ghost, bg: C.ghostBg, icon: 'help-outline', label: 'Ghost' },
    Changed: { color: C.changed, bg: C.changedBg, icon: 'compare-arrows', label: 'Changed' },
    'No Change': { color: C.nochange, bg: C.nochangeBg, icon: 'remove-circle', label: 'No Change' },
    'First Scan': { color: C.accent, bg: C.accentGlow, icon: 'fiber-new', label: 'First Scan' },
  };
  return cfg[s] || { color: C.textSec, bg: C.border, icon: 'info', label: s || 'N/A' };
};

// ─── Transform raw API row ─────────────────────────────────────────────────
const transform = (item, mode) => ({
  // Identity
  abarid: String(item.ABARID || 'N/A'),
  assetId: String(item.ASSETID || 'N/A'),
  docId: String(item.DOCID || 'N/A'),

  // Asset info
  mmade: String(item.MMADE || 'N/A'),
  mmodel: String(item.MMODEL || 'N/A'),
  subGroup: String(item.SUBGRPNAME || 'N/A'),
  division: String(item.DIVISION_NAME || 'N/A'),
  condition: String(item.CONDITION || 'N/A'),
  loc: String(item.LOC || 'N/A'),
  remarks: String(item.REMARKS || 'N/A'),

  // Dates
  auditDate: item.AUDIT_DATE ? moment(item.AUDIT_DATE).format('DD MMM YY HH:mm') : 'N/A',
  auditDateObj: item.AUDIT_DATE ? new Date(item.AUDIT_DATE) : null,
  auditDateRaw: item.AUDIT_DATE,
  prevAuditDate: item.PREV_AUDIT_DATE ? moment(item.PREV_AUDIT_DATE).format('DD MMM YY HH:mm') : null,
  prevAuditDateRaw: item.PREV_AUDIT_DATE,

  // Locations — today
  scannedRoom: String(item.SCANNED_ROOM || 'N/A'),
  scannedBuilding: String(item.SCANNED_BUILDING || 'N/A'),
  scannedFloor: String(item.SCANNED_FLOOR || 'N/A'),

  // Locations — previous
  prevRoom: String(item.PREV_ROOM || 'N/A'),
  prevBuilding: String(item.PREV_BUILDING || 'N/A'),
  prevFloor: String(item.PREV_FLOOR || 'N/A'),
  prevCondition: String(item.PREV_CONDITION || 'N/A'),

  // Locations — expected (master)
  expectedRoom: String(item.EXPECTED_ROOM || 'N/A'),
  expectedBuilding: String(item.EXPECTED_BUILDING || 'N/A'),
  expectedFloor: String(item.EXPECTED_FLOOR || 'N/A'),

  // Status & variance flags
  status: String(item.STATUS || (mode === 'scanned' ? 'Scanned' : 'N/A')),
  roomChanged: String(item.ROOM_CHANGED || 'N/A'),
  buildingChanged: String(item.BUILDING_CHANGED || 'N/A'),
  floorChanged: String(item.FLOOR_CHANGED || 'N/A'),
  conditionChanged: String(item.CONDITION_CHANGED || 'N/A'),
  changeSummary: String(item.CHANGE_SUMMARY || 'N/A'),
  roomVariance: String(item.ROOM_VARIANCE || ''),

  // Helpers
  hasAnyChange: ['ROOM_CHANGED', 'BUILDING_CHANGED', 'FLOOR_CHANGED', 'CONDITION_CHANGED']
    .some(k => item[k] === 'Yes'),
  isFirstScan: item.ROOM_CHANGED === 'New',
});

// ─── Variance Flow Component ───────────────────────────────────────────────
function VarianceFlow({ item }) {
  const { theme } = useTheme();
  const C = React.useMemo(() => getC(theme), [theme]);
  const vf = React.useMemo(() => get_vf(C), [C]);
  const [expanded, setExpanded] = useState(false);

  const hasChanges = item.roomChanged === 'Yes' ||
    item.buildingChanged === 'Yes' ||
    item.floorChanged === 'Yes' ||
    item.conditionChanged === 'Yes';

  if (!hasChanges && !item.isFirstScan) return null;

  return (
    <View style={vf.container}>
      <TouchableOpacity
        style={vf.header}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <View style={vf.headerLeft}>
          <Icon name="timeline" size={18} color={C.accent} />
          <Text style={vf.headerText}>Change Timeline</Text>
        </View>
        <Icon name={expanded ? 'expand-less' : 'expand-more'} size={20} color={C.textSec} />
      </TouchableOpacity>

      {expanded && (
        <View style={vf.content}>
          {/* Previous Scan Date */}
          {item.prevAuditDate && (
            <View style={vf.dateRow}>
              <View style={vf.dateBadge}>
                <Text style={vf.dateLabel}>PREVIOUS SCAN</Text>
                <Text style={vf.dateValue}>{item.prevAuditDate}</Text>
              </View>
              <Icon name="arrow-forward" size={16} color={C.flowArrow} />
              <View style={vf.dateBadge}>
                <Text style={vf.dateLabel}>CURRENT SCAN</Text>
                <Text style={vf.dateValue}>{item.auditDate}</Text>
              </View>
            </View>
          )}

          {/* Changes Flow */}
          <View style={vf.flowContainer}>
            {item.roomChanged === 'Yes' && (
              <View style={vf.flowItem}>
                <Text style={vf.flowLabel}>📍 Room</Text>
                <View style={vf.flowPath}>
                  <Text style={vf.flowFrom}>{item.prevRoom}</Text>
                  <Icon name="arrow-forward" size={14} color={C.flowArrow} />
                  <Text style={vf.flowTo}>{item.scannedRoom}</Text>
                </View>
              </View>
            )}

            {item.buildingChanged === 'Yes' && (
              <View style={vf.flowItem}>
                <Text style={vf.flowLabel}>🏢 Building</Text>
                <View style={vf.flowPath}>
                  <Text style={vf.flowFrom}>{item.prevBuilding}</Text>
                  <Icon name="arrow-forward" size={14} color={C.flowArrow} />
                  <Text style={vf.flowTo}>{item.scannedBuilding}</Text>
                </View>
              </View>
            )}

            {item.floorChanged === 'Yes' && (
              <View style={vf.flowItem}>
                <Text style={vf.flowLabel}>📊 Floor</Text>
                <View style={vf.flowPath}>
                  <Text style={vf.flowFrom}>{item.prevFloor}</Text>
                  <Icon name="arrow-forward" size={14} color={C.flowArrow} />
                  <Text style={vf.flowTo}>{item.scannedFloor}</Text>
                </View>
              </View>
            )}

            {item.conditionChanged === 'Yes' && (
              <View style={vf.flowItem}>
                <Text style={vf.flowLabel}>🔧 Condition</Text>
                <View style={vf.flowPath}>
                  <Text style={vf.flowFrom}>{item.prevCondition}</Text>
                  <Icon name="arrow-forward" size={14} color={C.flowArrow} />
                  <Text style={vf.flowTo}>{item.condition}</Text>
                </View>
              </View>
            )}

            {item.isFirstScan && (
              <View style={vf.firstScanBadge}>
                <Icon name="fiber-new" size={16} color={C.accent} />
                <Text style={vf.firstScanText}>First time scan - No previous data</Text>
              </View>
            )}
          </View>

          {/* Change Summary */}
          {item.changeSummary !== 'N/A' && item.changeSummary !== 'No Change' && (
            <View style={vf.summaryBox}>
              <Icon name="info-outline" size={16} color={C.accent} />
              <Text style={vf.summaryText}>{item.changeSummary}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const get_vf = (C) => StyleSheet.create({
  container: {
    marginTop: 12,
    backgroundColor: C.surfaceHigh,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: C.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: C.surface,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerText: {
    fontSize: 13,
    fontWeight: '600',
    color: C.textPri,
  },
  content: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: C.border,
    gap: 16,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: C.surface,
    borderRadius: 10,
    padding: 10,
  },
  dateBadge: {
    flex: 1,
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: C.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 11,
    fontWeight: '600',
    color: C.textPri,
  },
  flowContainer: {
    gap: 10,
  },
  flowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: C.surface,
    borderRadius: 8,
    padding: 8,
  },
  flowLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: C.textSec,
    width: 70,
  },
  flowPath: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  flowFrom: {
    fontSize: 11,
    color: C.flowFrom,
    textDecorationLine: 'line-through',
  },
  flowTo: {
    fontSize: 11,
    fontWeight: '600',
    color: C.flowTo,
  },
  firstScanBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: C.accentSoft,
    borderRadius: 8,
    padding: 10,
  },
  firstScanText: {
    fontSize: 11,
    color: C.accent,
    fontWeight: '600',
  },
  summaryBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: C.accentGlow,
    borderRadius: 8,
    padding: 10,
  },
  summaryText: {
    flex: 1,
    fontSize: 11,
    color: C.accent,
    fontWeight: '500',
  },
});

// ─── Simple Calendar Date Picker ─────────────────────────────────
function CustomDatePicker({ visible, onClose, onConfirm, value, title }) {
  const { theme } = useTheme();
  const C = React.useMemo(() => getC(theme), [theme]);

  const now = value || new Date();
  const [viewYear,  setViewYear]  = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [selected,  setSelected]  = useState(now);

  useEffect(() => {
    const d = value || new Date();
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
    setSelected(d);
  }, [value, visible]);

  const MONTHS = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  const DAYS   = ['Su','Mo','Tu','We','Th','Fr','Sa'];

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  // Build calendar grid
  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const totalDays   = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const isSelected = (d) =>
    d &&
    selected &&
    selected.getDate() === d &&
    selected.getMonth() === viewMonth &&
    selected.getFullYear() === viewYear;

  const isToday = (d) => {
    const t = new Date();
    return d && t.getDate() === d && t.getMonth() === viewMonth && t.getFullYear() === viewYear;
  };

  const handleDay = (d) => {
    if (d) setSelected(new Date(viewYear, viewMonth, d));
  };

  const handleConfirm = () => {
    onConfirm(selected);
    onClose();
  };

  const CELL = 38;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: C.surface, borderRadius: 20, width: 320, overflow: 'hidden' }}>

          {/* Title bar */}
          <View style={{ backgroundColor: C.accent, paddingHorizontal: 20, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700' }}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Selected date display */}
          <View style={{ backgroundColor: C.accentGlow, paddingVertical: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: '800', color: C.accent }}>
              {selected ? `${selected.getDate()} ${MONTHS[selected.getMonth()]} ${selected.getFullYear()}` : 'Pick a date'}
            </Text>
          </View>

          {/* Month navigation */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 }}>
            <TouchableOpacity onPress={prevMonth} style={{ padding: 6 }}>
              <Icon name="chevron-left" size={24} color={C.accent} />
            </TouchableOpacity>
            <Text style={{ fontSize: 15, fontWeight: '700', color: C.textPri }}>
              {MONTHS[viewMonth]} {viewYear}
            </Text>
            <TouchableOpacity onPress={nextMonth} style={{ padding: 6 }}>
              <Icon name="chevron-right" size={24} color={C.accent} />
            </TouchableOpacity>
          </View>

          {/* Day-of-week headers */}
          <View style={{ flexDirection: 'row', paddingHorizontal: 8 }}>
            {DAYS.map(d => (
              <View key={d} style={{ width: CELL, alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ fontSize: 11, fontWeight: '700', color: C.textMuted }}>{d}</Text>
              </View>
            ))}
          </View>

          {/* Calendar grid */}
          <View style={{ paddingHorizontal: 8, paddingBottom: 8 }}>
            {Array.from({ length: cells.length / 7 }, (_, row) => (
              <View key={row} style={{ flexDirection: 'row' }}>
                {cells.slice(row * 7, row * 7 + 7).map((d, col) => {
                  const sel = isSelected(d);
                  const tod = isToday(d);
                  return (
                    <TouchableOpacity
                      key={col}
                      onPress={() => handleDay(d)}
                      disabled={!d}
                      style={{
                        width: CELL, height: CELL,
                        borderRadius: CELL / 2,
                        backgroundColor: sel ? C.accent : tod ? C.accentGlow : 'transparent',
                        alignItems: 'center', justifyContent: 'center',
                        marginVertical: 1,
                      }}
                    >
                      {d ? (
                        <Text style={{
                          fontSize: 13,
                          fontWeight: sel || tod ? '700' : '400',
                          color: sel ? '#fff' : tod ? C.accent : C.textPri,
                        }}>{d}</Text>
                      ) : null}
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>

          {/* Buttons */}
          <View style={{ flexDirection: 'row', gap: 10, padding: 14, borderTopWidth: 1, borderTopColor: C.border }}>
            <TouchableOpacity
              style={{ flex: 1, padding: 12, borderRadius: 12, backgroundColor: C.bg, borderWidth: 1, borderColor: C.border, alignItems: 'center' }}
              onPress={onClose}
            >
              <Text style={{ color: C.textSec, fontWeight: '600' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 2, padding: 12, borderRadius: 12, backgroundColor: C.accent, alignItems: 'center' }}
              onPress={handleConfirm}
            >
              <Text style={{ color: '#fff', fontWeight: '700' }}>OK</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}

// ─── Date Filter Component ─────────────────────────────────────────────
function DateFilterModal({ visible, onClose, onApply, initialDate }) {
  const { theme } = useTheme();
  const C = React.useMemo(() => getC(theme), [theme]);
  const df = React.useMemo(() => get_df(C), [C]);
  const [startDate, setStartDate] = useState(initialDate?.start || null);
  const [endDate,   setEndDate]   = useState(initialDate?.end   || null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker,   setShowEndPicker]   = useState(false);
  const [quickSelect, setQuickSelect] = useState('');

  const handleQuickSelect = (option) => {
    let start = new Date(), end = new Date();
    switch (option) {
      case 'today':     start = moment().startOf('day').toDate(); end = moment().endOf('day').toDate(); break;
      case 'yesterday': start = moment().subtract(1,'days').startOf('day').toDate(); end = moment().subtract(1,'days').endOf('day').toDate(); break;
      case 'thisWeek':  start = moment().startOf('week').toDate(); end = moment().endOf('day').toDate(); break;
      case 'lastWeek':  start = moment().subtract(1,'weeks').startOf('week').toDate(); end = moment().subtract(1,'weeks').endOf('week').toDate(); break;
      case 'thisMonth': start = moment().startOf('month').toDate(); end = moment().endOf('day').toDate(); break;
      case 'lastMonth': start = moment().subtract(1,'months').startOf('month').toDate(); end = moment().subtract(1,'months').endOf('month').toDate(); break;
    }
    setStartDate(start); setEndDate(end); setQuickSelect(option);
  };

  const handleApply = () => { onApply({ start: startDate, end: endDate }); onClose(); };
  const handleClear = () => { setStartDate(null); setEndDate(null); setQuickSelect(''); };

  return (
    <>
      <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
        <View style={df.overlay}>
          <View style={df.sheet}>
            <View style={df.handle} />
            <View style={df.header}>
              <Text style={df.title}>Filter by Date</Text>
              <TouchableOpacity onPress={onClose} style={df.closeBtn}>
                <Icon name="close" size={20} color={C.textSec} />
              </TouchableOpacity>
            </View>

            <ScrollView style={df.content}>
              <Text style={df.sectionTitle}>QUICK SELECT</Text>
              <View style={df.quickGrid}>
                {[['today','Today'],['yesterday','Yesterday'],['thisWeek','This Week'],
                  ['lastWeek','Last Week'],['thisMonth','This Month'],['lastMonth','Last Month']
                ].map(([key, label]) => (
                  <TouchableOpacity key={key} style={[df.quickBtn, quickSelect === key && df.quickBtnActive]} onPress={() => handleQuickSelect(key)}>
                    <Text style={[df.quickBtnText, quickSelect === key && df.quickBtnTextActive]}>{label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={df.sectionTitle}>CUSTOM RANGE</Text>

              <TouchableOpacity style={df.dateField} onPress={() => setShowStartPicker(true)}>
                <Text style={df.dateLabel}>From</Text>
                <Text style={df.dateValue}>{startDate ? moment(startDate).format('DD MMM YYYY') : 'Select date'}</Text>
                <Icon name="calendar-today" size={18} color={C.accent} />
              </TouchableOpacity>

              <TouchableOpacity style={df.dateField} onPress={() => setShowEndPicker(true)}>
                <Text style={df.dateLabel}>To</Text>
                <Text style={df.dateValue}>{endDate ? moment(endDate).format('DD MMM YYYY') : 'Select date'}</Text>
                <Icon name="calendar-today" size={18} color={C.accent} />
              </TouchableOpacity>

              {(startDate || endDate) && (
                <View style={df.activeFilter}>
                  <Icon name="filter-list" size={16} color={C.accent} />
                  <Text style={df.activeFilterText}>
                    {startDate && moment(startDate).format('DD MMM')}
                    {startDate && endDate && ' — '}
                    {endDate && moment(endDate).format('DD MMM YYYY')}
                  </Text>
                </View>
              )}
            </ScrollView>

            <View style={df.footer}>
              <TouchableOpacity style={df.clearBtn} onPress={handleClear}>
                <Text style={df.clearBtnText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity style={df.applyBtn} onPress={handleApply}>
                <Text style={df.applyBtnText}>Apply Filter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Pure-JS date pickers — no native module needed */}
      <CustomDatePicker
        visible={showStartPicker}
        title="Select From Date"
        value={startDate}
        onClose={() => setShowStartPicker(false)}
        onConfirm={(date) => { setStartDate(date); setShowStartPicker(false); }}
      />
      <CustomDatePicker
        visible={showEndPicker}
        title="Select To Date"
        value={endDate}
        onClose={() => setShowEndPicker(false)}
        onConfirm={(date) => { setEndDate(date); setShowEndPicker(false); }}
      />
    </>
  );
}

const get_df = (C) => StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: C.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%' },
  handle: { width: 40, height: 4, backgroundColor: C.borderBright, borderRadius: 2, alignSelf: 'center', marginTop: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: C.border },
  title: { fontSize: 18, fontWeight: '700', color: C.textPri },
  closeBtn: { padding: 4 },
  content: { padding: 20 },
  sectionTitle: { fontSize: 11, fontWeight: '700', color: C.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12, marginTop: 8 },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  quickBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: C.bg, borderWidth: 1, borderColor: C.border },
  quickBtnActive: { backgroundColor: C.accent, borderColor: C.accent },
  quickBtnText: { fontSize: 12, color: C.textSec, fontWeight: '500' },
  quickBtnTextActive: { color: '#fff' },
  dateField: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.bg, borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: C.border },
  dateLabel: { fontSize: 13, color: C.textSec, width: 50 },
  dateValue: { flex: 1, fontSize: 13, color: C.textPri, fontWeight: '500' },
  activeFilter: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: C.accentGlow, borderRadius: 10, padding: 12, marginTop: 16 },
  activeFilterText: { fontSize: 12, color: C.accent, fontWeight: '600' },
  footer: { flexDirection: 'row', gap: 12, padding: 20, borderTopWidth: 1, borderTopColor: C.border },
  clearBtn: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: C.bg, borderWidth: 1, borderColor: C.border, alignItems: 'center' },
  clearBtnText: { color: C.textSec, fontWeight: '600', fontSize: 14 },
  applyBtn: { flex: 2, padding: 14, borderRadius: 12, backgroundColor: C.accent, alignItems: 'center' },
  applyBtnText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});

// ─── Diff Pill ─────────────────────────────────────────────────────────────
function DiffPill({ from, to, changed }) {
  const { theme } = useTheme();
  const C = React.useMemo(() => getC(theme), [theme]);
  const dp = React.useMemo(() => get_dp(C), [C]);
  if (!changed || changed === 'No' || changed === 'N/A') {
    return <Text style={dp.same} numberOfLines={1}>{to || '—'}</Text>;
  }
  if (changed === 'New') {
    return (
      <View style={dp.newWrap}>
        <Icon name="fiber-new" size={10} color={C.accent} />
        <Text style={dp.newText} numberOfLines={1}>{to || '—'}</Text>
      </View>
    );
  }
  return (
    <View style={dp.wrap}>
      <Text style={dp.from} numberOfLines={1}>{from || '—'}</Text>
      <Icon name="arrow-forward" size={9} color={C.textSec} />
      <Text style={dp.to} numberOfLines={1}>{to || '—'}</Text>
    </View>
  );
}

const get_dp = (C) => StyleSheet.create({
  same: { fontSize: 11, color: C.textSec },
  wrap: { flexDirection: 'row', alignItems: 'center', gap: 3, flexWrap: 'wrap' },
  from: { fontSize: 10, color: C.removed, textDecorationLine: 'line-through', maxWidth: 70 },
  to: { fontSize: 11, color: C.added, fontWeight: '700', maxWidth: 70 },
  newWrap: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  newText: { fontSize: 11, color: C.accent, fontWeight: '700' },
});

// ─── Status Badge ─────────────────────────────────────────────────────────
function StatusBadge({ status, small }) {
  const { theme } = useTheme();
  const C = React.useMemo(() => getC(theme), [theme]);
  const sb = React.useMemo(() => get_sb(C), [C]);
  const cfg = getStatusCfg(status, C);
  return (
    <View style={[sb.wrap, { backgroundColor: cfg.bg }, small && sb.small]}>
      <Icon name={cfg.icon} size={small ? 10 : 12} color={cfg.color} />
      <Text style={[sb.text, { color: cfg.color }, small && sb.smallText]}>{cfg.label}</Text>
    </View>
  );
}

const get_sb = (C) => StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  text: { fontSize: 11, fontWeight: '700' },
  small: { paddingHorizontal: 6, paddingVertical: 2 },
  smallText: { fontSize: 9 },
});

// ─── Stat Card ────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, color, active, onPress }) {
  const { theme } = useTheme();
  const C = React.useMemo(() => getC(theme), [theme]);
  const sc = React.useMemo(() => get_sc(C), [C]);
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.93, duration: 80, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        onPress={handlePress}
        style={[sc.card, active && { backgroundColor: color, borderColor: color }]}
      >
        <View style={[sc.icon, { backgroundColor: active ? 'rgba(255,255,255,0.2)' : color + '18' }]}>
          <Icon name={icon} size={16} color={active ? '#fff' : color} />
        </View>
        <Text style={[sc.val, { color: active ? '#fff' : color }]}>{value}</Text>
        <Text style={[sc.lbl, { color: active ? 'rgba(255,255,255,0.8)' : C.textSec }]} numberOfLines={1}>
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const get_sc = (C) => StyleSheet.create({
  card: { width: 85, borderRadius: 14, padding: 10, alignItems: 'center', gap: 4, backgroundColor: C.surface, borderWidth: 1, borderColor: C.border },
  icon: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  val: { fontSize: 20, fontWeight: '800' },
  lbl: { fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.4, textAlign: 'center' },
});

// ─── Card Item ────────────────────────────────────────────────────────────
function CardItem({ item, mode }) {
  const { theme } = useTheme();
  const C = React.useMemo(() => getC(theme), [theme]);
  const ci = React.useMemo(() => get_ci(C), [C]);
  const [open, setOpen] = useState(false);

  const hasChange = item.hasAnyChange;

  return (
    <View style={[ci.card, hasChange && ci.changedCard]}>
      <TouchableOpacity onPress={() => setOpen(!open)} activeOpacity={0.85}>
        {/* Row 1: Identity + Status */}
        <View style={ci.row1}>
          <View style={ci.id}>
            <Text style={ci.assetId} numberOfLines={1}>{item.assetId}</Text>
            <Text style={ci.abarid}>{item.abarid}</Text>
          </View>
          <View style={ci.right}>
            <View style={ci.dateBadge}>
              <Icon name="access-time" size={10} color={C.textMuted} />
              <Text style={ci.date}>{item.auditDate}</Text>
            </View>
            <StatusBadge status={item.status} />
          </View>
        </View>

        {/* Row 2: Subgroup + machine */}
        <View style={ci.row2}>
          <Text style={ci.subgrp} numberOfLines={1}>{item.subGroup}</Text>
          <Text style={ci.machine} numberOfLines={1}>{item.mmade} · {item.mmodel}</Text>
        </View>

        {/* Row 3: Diff strip */}
        <View style={ci.diffStrip}>
          <View style={ci.diffCell}>
            <Text style={ci.diffLbl}>📍 Room</Text>
            <DiffPill from={item.prevRoom} to={item.scannedRoom} changed={item.roomChanged} />
          </View>
          <View style={[ci.diffCell, ci.diffMid]}>
            <Text style={ci.diffLbl}>🏢 Building</Text>
            <DiffPill from={item.prevBuilding} to={item.scannedBuilding} changed={item.buildingChanged} />
          </View>
          <View style={ci.diffCell}>
            <Text style={ci.diffLbl}>🔧 Condition</Text>
            <DiffPill from={item.prevCondition} to={item.condition} changed={item.conditionChanged} />
          </View>
        </View>

        {/* Chevron */}
        <View style={ci.chevron}>
          <Icon name={open ? 'expand-less' : 'expand-more'} size={20} color={C.textSec} />
        </View>
      </TouchableOpacity>

      {/* Expanded details */}
      {open && (
        <View style={ci.expanded}>
          {/* Variance Flow (only in variance mode) */}
          {mode === 'variance' && <VarianceFlow item={item} />}

          {/* Expected vs Scanned */}
          {mode === 'variance' && item.expectedRoom !== 'N/A' && (
            <View style={ci.expVsScan}>
              <View style={ci.evs}>
                <Text style={ci.evsLbl}>Expected Room</Text>
                <Text style={ci.evsVal}>{item.expectedRoom}</Text>
              </View>
              <Icon name="compare-arrows" size={16} color={C.borderBright} />
              <View style={[ci.evs, { alignItems: 'flex-end' }]}>
                <Text style={ci.evsLbl}>Scanned Room</Text>
                <Text style={[ci.evsVal, item.expectedRoom !== item.scannedRoom && { color: C.damaged }]}>
                  {item.scannedRoom}
                </Text>
              </View>
            </View>
          )}

          {/* Grid of details */}
          <View style={ci.grid}>
            {[
              ['Floor', item.scannedFloor, item.prevFloor, item.floorChanged],
              ['Division', item.division, null, null],
              ['Doc ID', item.docId, null, null],
              ['Location', item.loc, null, null],
            ].map(([lbl, cur, prev, chg]) => (
              <View key={lbl} style={ci.gridItem}>
                <Text style={ci.gridLbl}>{lbl}</Text>
                {chg ? <DiffPill from={prev} to={cur} changed={chg} /> :
                  <Text style={ci.gridVal} numberOfLines={1}>{cur}</Text>}
              </View>
            ))}
          </View>

          {/* Previous scan info */}
          {item.prevAuditDate && (
            <View style={ci.prevScan}>
              <Icon name="history" size={11} color={C.textSec} />
              <Text style={ci.prevText}>
                Previous scan: {item.prevAuditDate}
                {item.prevRoom !== 'N/A' && `  ·  Room: ${item.prevRoom}`}
                {item.prevCondition !== 'N/A' && `  ·  Cond: ${item.prevCondition}`}
              </Text>
            </View>
          )}

          {/* Remarks */}
          {item.remarks !== 'N/A' && (
            <View style={ci.remarks}>
              <Icon name="chat-bubble-outline" size={11} color={C.textSec} />
              <Text style={ci.remarksText}>{item.remarks}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const get_ci = (C) => StyleSheet.create({
  card: {
    backgroundColor: C.surface,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: C.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  changedCard: {
    borderLeftWidth: 4,
    borderLeftColor: C.changed,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  id: { flex: 1 },
  assetId: {
    fontSize: 15,
    fontWeight: '800',
    color: C.accent,
  },
  abarid: {
    fontSize: 10,
    color: C.textMuted,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
    gap: 6,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: C.bg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  date: {
    fontSize: 9,
    color: C.textMuted,
    fontWeight: '500',
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  subgrp: {
    fontSize: 12,
    color: C.textPri,
    fontWeight: '600',
    flex: 1,
  },
  machine: {
    fontSize: 11,
    color: C.textSec,
  },
  diffStrip: {
    flexDirection: 'row',
    backgroundColor: C.bg,
    borderRadius: 12,
    padding: 10,
    gap: 8,
    marginBottom: 8,
  },
  diffCell: { flex: 1 },
  diffMid: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 8,
  },
  diffLbl: {
    fontSize: 8,
    color: C.textMuted,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  chevron: {
    alignItems: 'center',
    marginTop: 2,
  },
  expanded: {
    marginTop: 14,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingTop: 12,
  },
  expVsScan: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: C.bg,
    borderRadius: 12,
    padding: 12,
  },
  evs: { flex: 1 },
  evsLbl: {
    fontSize: 9,
    color: C.textMuted,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  evsVal: {
    fontSize: 12,
    fontWeight: '700',
    color: C.textPri,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gridItem: {
    width: '48%',
    backgroundColor: C.bg,
    borderRadius: 10,
    padding: 10,
  },
  gridLbl: {
    fontSize: 9,
    color: C.textMuted,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  gridVal: {
    fontSize: 11,
    color: C.textSec,
    fontWeight: '600',
  },
  prevScan: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    backgroundColor: C.accentGlow,
    borderRadius: 10,
    padding: 10,
  },
  prevText: {
    flex: 1,
    fontSize: 10,
    color: C.textSec,
  },
  remarks: {
    flexDirection: 'row',
    gap: 6,
    padding: 10,
    backgroundColor: C.bg,
    borderRadius: 10,
  },
  remarksText: {
    flex: 1,
    fontSize: 11,
    color: C.textSec,
    fontStyle: 'italic',
  },
});

// ─── Table Row ────────────────────────────────────────────────────────────
function TableRow({ item, mode, even }) {
  const { theme } = useTheme();
  const C = React.useMemo(() => getC(theme), [theme]);
  const tr = React.useMemo(() => get_tr(C), [C]);
  return (
    <View style={[tr.row, even && tr.even, item.hasAnyChange && tr.changed]}>
      <View style={tr.c1}>
        <Text style={tr.assetId} numberOfLines={1}>{item.assetId}</Text>
        <Text style={tr.abarid} numberOfLines={1}>{item.abarid}</Text>
      </View>
      <Text style={[tr.cell, tr.c2]} numberOfLines={2}>{item.subGroup}</Text>
      <Text style={[tr.cell, tr.c3]} numberOfLines={1}>{item.mmade} {item.mmodel}</Text>
      <View style={tr.c4}>
        <DiffPill from={item.prevRoom} to={item.scannedRoom} changed={item.roomChanged} />
      </View>
      <View style={tr.c5}>
        <DiffPill from={item.prevBuilding} to={item.scannedBuilding} changed={item.buildingChanged} />
      </View>
      <View style={tr.c6}>
        <DiffPill from={item.prevCondition} to={item.condition} changed={item.conditionChanged} />
      </View>
      {mode === 'variance' && (
        <View style={tr.c7}>
          <Text style={tr.exp} numberOfLines={1}>{item.expectedRoom}</Text>
          <Text style={[tr.scn, item.expectedRoom !== item.scannedRoom && { color: C.damaged }]} numberOfLines={1}>
            {item.scannedRoom}
          </Text>
        </View>
      )}
      <View style={tr.c8}>
        <StatusBadge status={item.status} small />
      </View>
      <Text style={[tr.cell, tr.c9]} numberOfLines={1}>{item.auditDate}</Text>
    </View>
  );
}

const get_tr = (C) => StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    paddingVertical: 12,
    alignItems: 'center',
  },
  even: { backgroundColor: C.bg },
  changed: { borderLeftWidth: 3, borderLeftColor: C.changed },
  cell: { paddingHorizontal: 8, color: C.textSec, fontSize: 11 },
  c1: { width: 140, paddingHorizontal: 8 },
  assetId: { fontSize: 12, fontWeight: '700', color: C.accent },
  abarid: { fontSize: 9, color: C.textMuted, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  c2: { width: 160 },
  c3: { width: 160 },
  c4: { width: 140, paddingHorizontal: 8 },
  c5: { width: 140, paddingHorizontal: 8 },
  c6: { width: 120, paddingHorizontal: 8 },
  c7: { width: 140, paddingHorizontal: 8 },
  c8: { width: 120, paddingHorizontal: 8 },
  c9: { width: 140 },
  exp: { fontSize: 10, color: C.textMuted },
  scn: { fontSize: 11, fontWeight: '600', color: C.textPri },
});

// ─── Filter Sheet ─────────────────────────────────────────────────────────
function FilterSheet({ visible, onClose, filters, setFilters, uniq }) {
  const { theme } = useTheme();
  const C = React.useMemo(() => getC(theme), [theme]);
  const fs = React.useMemo(() => get_fs(C), [C]);
  const [local, setLocal] = useState(filters);

  useEffect(() => {
    if (visible) setLocal(filters);
  }, [visible, filters]);

  const apply = () => {
    setFilters(local);
    onClose();
  };

  const reset = () => {
    setLocal(defaultFilters());
  };

  const pickers = [
    { key: 'building', label: 'Building', opts: uniq.buildings, ph: 'All Buildings' },
    { key: 'floor', label: 'Floor', opts: uniq.floors, ph: 'All Floors' },
    { key: 'room', label: 'Room', opts: uniq.rooms, ph: 'All Rooms' },
    { key: 'division', label: 'Division', opts: uniq.divisions, ph: 'All Divisions' },
    { key: 'condition', label: 'Condition', opts: uniq.conditions, ph: 'All Conditions' },
    { key: 'status', label: 'Status', opts: uniq.statuses, ph: 'All Statuses' },
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={fs.overlay}>
        <View style={fs.sheet}>
          <View style={fs.handle} />

          <View style={fs.header}>
            <Text style={fs.title}>Filters</Text>
            <TouchableOpacity onPress={onClose} style={fs.closeBtn}>
              <Icon name="close" size={20} color={C.textSec} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={{ flexShrink: 1 }}
            contentContainerStyle={[fs.content, { paddingBottom: 40 }]}
            showsVerticalScrollIndicator={false}
          >
            {/* Change filter */}
            <Text style={fs.sectionTitle}>SHOW ONLY</Text>
            <View style={fs.chips}>
              {[
                ['ALL', 'All Records'],
                ['changed', 'Changed'],
                ['stable', 'No Change'],
              ].map(([v, l]) => (
                <TouchableOpacity
                  key={v}
                  style={[fs.chip, local.changeFilter === v && fs.chipActive]}
                  onPress={() => setLocal(p => ({ ...p, changeFilter: v }))}
                >
                  <Text style={[fs.chipText, local.changeFilter === v && fs.chipTextActive]}>
                    {l}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Pickers */}
            {pickers.map(({ key, label, opts, ph }) => (
              <View key={key}>
                <Text style={fs.sectionTitle}>{label.toUpperCase()}</Text>
                <View style={fs.pickerWrap}>
                  <Picker
                    selectedValue={local[key]}
                    style={fs.picker}
                    onValueChange={v => setLocal(p => ({ ...p, [key]: v }))}
                  >
                    <Picker.Item label={ph} value="" />
                    {opts.filter(Boolean).map((o, i) => (
                      <Picker.Item key={i} label={o} value={o} />
                    ))}
                  </Picker>
                </View>
              </View>
            ))}

            {/* Remarks toggle */}
            <View style={fs.switchRow}>
              <Text style={fs.switchLabel}>Has Remarks Only</Text>
              <Switch
                value={local.hasRemarks}
                onValueChange={v => setLocal(p => ({ ...p, hasRemarks: v }))}
                trackColor={{ true: C.accent }}
                thumbColor={C.surface}
              />
            </View>

            {/* Sort */}
            <Text style={fs.sectionTitle}>SORT BY</Text>
            <View style={fs.sortRow}>
              {[
                ['auditDate', 'Date'],
                ['assetId', 'Asset'],
                ['division', 'Division'],
                ['status', 'Status'],
              ].map(([k, l]) => (
                <TouchableOpacity
                  key={k}
                  style={[fs.sortBtn, local.sortBy === k && fs.sortBtnActive]}
                  onPress={() => setLocal(p => ({ ...p, sortBy: k }))}
                >
                  <Text style={[fs.sortBtnText, local.sortBy === k && fs.sortBtnTextActive]}>
                    {l}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={fs.sortOrderRow}>
              {[
                ['asc', '↑ Ascending'],
                ['desc', '↓ Descending'],
              ].map(([k, l]) => (
                <TouchableOpacity
                  key={k}
                  style={[fs.sortOrderBtn, local.sortOrder === k && fs.sortOrderBtnActive]}
                  onPress={() => setLocal(p => ({ ...p, sortOrder: k }))}
                >
                  <Text style={[fs.sortOrderText, local.sortOrder === k && fs.sortOrderTextActive]}>
                    {l}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View style={fs.footer}>
            <TouchableOpacity style={fs.resetBtn} onPress={reset}>
              <Text style={fs.resetText}>Reset All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={fs.applyBtn} onPress={apply}>
              <Text style={fs.applyText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const get_fs = (C) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: C.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: C.borderBright,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: C.textPri,
  },
  closeBtn: {
    padding: 4,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: C.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginTop: 12,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: C.bg,
    borderWidth: 1,
    borderColor: C.border,
  },
  chipActive: {
    backgroundColor: C.accent,
    borderColor: C.accent,
  },
  chipText: {
    fontSize: 12,
    color: C.textSec,
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#fff',
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    backgroundColor: C.bg,
    overflow: 'hidden',
  },
  picker: {
    height: 48,
    color: C.textPri,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: C.bg,
    padding: 14,
    borderRadius: 12,
    marginVertical: 8,
  },
  switchLabel: {
    fontSize: 13,
    color: C.textSec,
    fontWeight: '500',
  },
  sortRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  sortBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: C.bg,
    borderWidth: 1,
    borderColor: C.border,
  },
  sortBtnActive: {
    backgroundColor: C.accent,
    borderColor: C.accent,
  },
  sortBtnText: {
    fontSize: 12,
    color: C.textSec,
    fontWeight: '500',
  },
  sortBtnTextActive: {
    color: '#fff',
  },
  sortOrderRow: {
    flexDirection: 'row',
    gap: 8,
  },
  sortOrderBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: C.bg,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
  },
  sortOrderBtnActive: {
    backgroundColor: C.accent,
    borderColor: C.accent,
  },
  sortOrderText: {
    fontSize: 12,
    color: C.textSec,
    fontWeight: '500',
  },
  sortOrderTextActive: {
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  resetBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: C.bg,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
  },
  resetText: {
    color: C.textSec,
    fontWeight: '600',
    fontSize: 14,
  },
  applyBtn: {
    flex: 2,
    padding: 14,
    borderRadius: 12,
    backgroundColor: C.accent,
    alignItems: 'center',
  },
  applyText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

// ─── Default filters ──────────────────────────────────────────────────────
const defaultFilters = () => ({
  changeFilter: 'ALL',
  building: '',
  floor: '',
  room: '',
  division: '',
  condition: '',
  status: '',
  hasRemarks: false,
  sortBy: 'auditDate',
  sortOrder: 'desc',
});

// ─── Main Component ────────────────────────────────────────────────────────
export default function AuditReport() {
  const { theme } = useTheme();
  const C = React.useMemo(() => getC(theme), [theme]);
  const s = React.useMemo(() => get_s(C), [C]);
  const [mode, setMode] = useState('scanned');
  const [view, setView] = useState('card');
  const [showFilters, setShowFilters] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [filters, setFilters] = useState(defaultFilters());
  const [dateFilter, setDateFilter] = useState({ start: null, end: null });
  const [statFilter, setStatFilter] = useState(null);
  const [exporting, setExporting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  useEffect(() => {
    setPage(0);
  }, [filters, statFilter, dateFilter, mode]);

  const dispatch = useDispatch();

  const { data: auditData, isLoading: aLoad, error: aErr, refetch: rAudit } = useGetAuditAssestDetailsQuery();
  const { data: varianceData, isLoading: vLoad, error: vErr, refetch: rVariance } = useGetAuditVarianceReportQuery(
    undefined,
    { skip: mode !== 'variance' }
  );

  const isLoading = mode === 'scanned' ? aLoad : vLoad;
  const hasError = mode === 'scanned' ? aErr : vErr;
  const refetch = mode === 'scanned' ? rAudit : rVariance;

  // useEffect(() => {
  //   Orientation.lockToLandscape();
  //   dispatch(setOptions({ header: false }));

  //   return () => {
  //     dispatch(setOptions({ header: true }));
  //     Orientation.lockToPortrait();
  //   };
  // }, []);

  // Transform raw data
  const allData = useMemo(() => {
    const raw = mode === 'scanned' ? auditData?.data : varianceData?.data;
    return (raw || []).map(r => transform(r, mode));
  }, [auditData, varianceData, mode]);

  // Stats
  const stats = useMemo(() => ({
    total: allData.length,
    available: allData.filter(i => i.status === 'Available').length,
    misplaced: allData.filter(i => i.status === 'Misplaced').length,
    damaged: allData.filter(i => i.status === 'Damaged').length,
    ghost: allData.filter(i => i.status === 'Ghost').length,
    changed: allData.filter(i => i.hasAnyChange).length,
    nochange: allData.filter(i => !i.hasAnyChange && i.changeSummary !== 'First Scan').length,
  }), [allData]);

  // Unique values for filters
  const uniq = useMemo(() => {
    const sets = {
      buildings: new Set(),
      floors: new Set(),
      rooms: new Set(),
      divisions: new Set(),
      conditions: new Set(),
      statuses: new Set()
    };

    allData.forEach(i => {
      if (i.scannedBuilding !== 'N/A') sets.buildings.add(i.scannedBuilding);
      if (i.scannedFloor !== 'N/A') sets.floors.add(i.scannedFloor);
      if (i.scannedRoom !== 'N/A') sets.rooms.add(i.scannedRoom);
      if (i.division !== 'N/A') sets.divisions.add(i.division);
      if (i.condition !== 'N/A') sets.conditions.add(i.condition);
      if (i.status !== 'N/A') sets.statuses.add(i.status);
    });

    return Object.fromEntries(
      Object.entries(sets).map(([k, v]) => [k, [...v].sort()])
    );
  }, [allData]);

  // Filtered and sorted data
  const displayData = useMemo(() => {
    let d = [...allData];

    // Stat card filter
    if (statFilter === 'changed') d = d.filter(i => i.hasAnyChange);
    else if (statFilter === 'available') d = d.filter(i => i.status === 'Available');
    else if (statFilter === 'misplaced') d = d.filter(i => i.status === 'Misplaced');
    else if (statFilter === 'damaged') d = d.filter(i => i.status === 'Damaged');
    else if (statFilter === 'ghost') d = d.filter(i => i.status === 'Ghost');
    else if (statFilter === 'nochange') d = d.filter(i => !i.hasAnyChange && i.changeSummary !== 'First Scan');

    // Chip filter
    if (filters.changeFilter === 'changed') d = d.filter(i => i.hasAnyChange);
    if (filters.changeFilter === 'stable') d = d.filter(i => !i.hasAnyChange);

    // Dropdown filters
    if (filters.building) d = d.filter(i => i.scannedBuilding === filters.building);
    if (filters.floor) d = d.filter(i => i.scannedFloor === filters.floor);
    if (filters.room) d = d.filter(i => i.scannedRoom === filters.room);
    if (filters.division) d = d.filter(i => i.division === filters.division);
    if (filters.condition) d = d.filter(i => i.condition === filters.condition);
    if (filters.status) d = d.filter(i => i.status === filters.status);
    if (filters.hasRemarks) d = d.filter(i => i.remarks !== 'N/A' && i.remarks.trim());

    // Date filter
    if (dateFilter.start) {
      const start = moment(dateFilter.start).startOf('day').toDate();
      d = d.filter(i => i.auditDateObj && i.auditDateObj >= start);
    }
    if (dateFilter.end) {
      const end = moment(dateFilter.end).endOf('day').toDate();
      d = d.filter(i => i.auditDateObj && i.auditDateObj <= end);
    }

    // Sort
    d.sort((a, b) => {
      let av, bv;
      if (filters.sortBy === 'auditDate') {
        av = a.auditDateObj || 0;
        bv = b.auditDateObj || 0;
      } else if (filters.sortBy === 'status') {
        av = a.status;
        bv = b.status;
      } else if (filters.sortBy === 'division') {
        av = a.division;
        bv = b.division;
      } else {
        av = a.assetId;
        bv = b.assetId;
      }

      if (typeof av === 'string') {
        return filters.sortOrder === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return filters.sortOrder === 'asc' ? av - bv : bv - av;
    });

    return d;
  }, [allData, filters, statFilter, dateFilter]);

  const hasActiveFilters = useMemo(() => (
    statFilter ||
    filters.changeFilter !== 'ALL' ||
    Object.entries(filters).some(([k, v]) => !['sortBy', 'sortOrder', 'changeFilter'].includes(k) && !!v) ||
    dateFilter.start ||
    dateFilter.end
  ), [filters, statFilter, dateFilter]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (statFilter) count++;
    if (filters.changeFilter !== 'ALL') count++;
    if (filters.building) count++;
    if (filters.floor) count++;
    if (filters.room) count++;
    if (filters.division) count++;
    if (filters.condition) count++;
    if (filters.status) count++;
    if (filters.hasRemarks) count++;
    if (dateFilter.start) count++;
    if (dateFilter.end) count++;
    return count;
  }, [filters, statFilter, dateFilter]);

  // Refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      if (mode === 'scanned') {
        await rAudit();
      } else {
        await rVariance();
      }
    } catch (e) {
      // silently ignore, RTK Query handles error state
    } finally {
      setRefreshing(false);
    }
  }, [mode]);

  // Export
  const exportExcel = async () => {
    try {
      setExporting(true);
      if (!displayData.length) {
        Alert.alert('No Data', 'Nothing to export');
        return;
      }

      let exportData = displayData;
      let rows;

      if (mode === 'variance') {
        // For Variance tab: only export rows that have variance (any change)
        exportData = displayData.filter(i => i.hasAnyChange);

        if (!exportData.length) {
          Alert.alert('No Variance Data', 'No variance records found to export.');
          return;
        }

        rows = exportData.map(i => ({
          'Asset ID': i.assetId,
          'Barcode': i.abarid,
          'Name': i.subGroup,
          'Machine': `${i.mmade} ${i.mmodel}`,
          'Division': i.division,
          'Scanned Room': i.scannedRoom,
          'Scanned Building': i.scannedBuilding,
          'Scanned Floor': i.scannedFloor,
          'Prev Room': i.prevRoom,
          'Prev Building': i.prevBuilding,
          'Prev Condition': i.prevCondition,

          'Condition': i.condition,
          'Status': i.status,
          'Room Changed': i.roomChanged,
          'Building Changed': i.buildingChanged,
          'Floor Changed': i.floorChanged,
          'Condition Changed': i.conditionChanged,
          'Change Summary': i.changeSummary,
          'Audit Date': i.auditDate,
          'Prev Audit Date': i.prevAuditDate || 'N/A',
          'Remarks': i.remarks,
        }));
      } else {
        // For Scanned tab: export only scanned details (no prev/change columns)
        rows = exportData.map(i => ({
          'Asset ID': i.assetId,
          'Barcode': i.abarid,
          'Name': i.subGroup,
          'Machine': `${i.mmade} ${i.mmodel}`,
          'Division': i.division,
          'Status': i.status,
          'Scanned Room': i.scannedRoom,
          'Scanned Building': i.scannedBuilding,
          'Scanned Floor': i.scannedFloor,
          'Condition': i.condition,
          'Audit Date': i.auditDate,
          'Remarks': i.remarks,
        }));
      }

      let headerKeys = [];
      if (mode === 'variance') {
        headerKeys = [
          'Asset ID', 'Barcode', 'Name', 'Machine', 'Division',
          'Scanned Room', 'Scanned Building', 'Scanned Floor',
          'Prev Room', 'Prev Building', 'Prev Condition',
          'Condition', 'Status', 'Room Changed', 'Building Changed',
          'Floor Changed', 'Condition Changed', 'Change Summary',
          'Audit Date', 'Prev Audit Date', 'Remarks'
        ];
      } else {
        headerKeys = [
          'Asset ID', 'Barcode', 'Name', 'Machine', 'Division', 'Status',
          'Scanned Room', 'Scanned Building', 'Scanned Floor',
          'Condition', 'Audit Date', 'Remarks'
        ];
      }

      const ws = XLSX.utils.json_to_sheet(rows, { header: headerKeys });
      
      // Auto-size columns for better alignment and readability
      if (rows.length > 0) {
        const keys = Object.keys(rows[0]);
        const colWidths = keys.map(key => {
          // find max length between header and cell contents
          const maxContentLength = Math.max(
            key.length,
            ...rows.map(row => row[key] ? String(row[key]).length : 0)
          );
          // Add some padding, limit max width to 50 characters
          return { wch: Math.min(Math.max(maxContentLength + 2, 10), 50) };
        });
        ws['!cols'] = colWidths;

        // Apply styles (colors, alignment, borders)
        const range = XLSX.utils.decode_range(ws['!ref']);
        for (let R = range.s.r; R <= range.e.r; ++R) {
          for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
            if (!ws[cellAddress]) continue;

            const isHeader = R === 0;

            ws[cellAddress].s = {
              font: {
                bold: isHeader,
                color: isHeader ? { rgb: "FFFFFF" } : { rgb: "333333" },
                sz: 11
              },
              fill: isHeader ? { fgColor: { rgb: "4F81BD" } } : undefined, // Blue header
              alignment: {
                vertical: 'center',
                horizontal: isHeader ? 'center' : 'left',
                wrapText: true
              },
              border: {
                top: { style: 'thin', color: { rgb: "CCCCCC" } },
                bottom: { style: 'thin', color: { rgb: "CCCCCC" } },
                left: { style: 'thin', color: { rgb: "CCCCCC" } },
                right: { style: 'thin', color: { rgb: "CCCCCC" } }
              }
            };
          }
        }

        // Set row heights for padding effect
        ws['!rows'] = [{ hpt: 30 }]; // Header row taller
        for (let i = 1; i <= rows.length; i++) {
          ws['!rows'].push({ hpt: 24 }); // Data rows padded
        }
      }

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Audit Report');
      const out = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });

      const fileName = `Audit_${moment().format('YYYYMMDD_HHmmss')}.xlsx`;
      const path = `${FS.CachesDirectoryPath}/${fileName}`;

      await FS.writeFile(path, out, 'base64');

      await Share.open({
        url: Platform.OS === 'android' ? `file://${path}` : path,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        title: 'Audit Report',
        filename: fileName,
        failOnCancel: false,
      });
    } catch (e) {
      if (e?.message !== 'User did not share') {
        Alert.alert('Export Error', e?.message || 'Unknown error');
      }
    } finally {
      setExporting(false);
    }
  };

  // Loading / Error
  if (isLoading) {
    return (
      <View style={s.center}>
        <ActivityIndicator size="large" color={C.accent} />
        <Text style={s.loadingText}>Loading audit data…</Text>
      </View>
    );
  }

  if (hasError) {
    return (
      <View style={s.center}>
        <Icon name="error-outline" size={48} color={C.damaged} />
        <Text style={s.errorText}>Failed to load data</Text>
        <TouchableOpacity style={s.retryBtn} onPress={refetch}>
          <Text style={s.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={s.root}>
      <FilterSheet
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        setFilters={setFilters}
        uniq={uniq}
      />

      <DateFilterModal
        visible={showDateFilter}
        onClose={() => setShowDateFilter(false)}
        onApply={setDateFilter}
        initialDate={dateFilter}
      />

      {/* Header */}
      <View style={s.header}>

        <View style={s.segmentedControl}>
          {[
            ['scanned', 'Scanned'],
            ['variance', 'Variance'],
          ].map(([k, l]) => (
            <TouchableOpacity
              key={k}
              style={[s.segmentedBtn, mode === k && s.segmentedBtnActive]}
              onPress={() => setMode(k)}
            >
              <Text style={[s.segmentedText, mode === k && s.segmentedTextActive]}>
                {l}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View>
          <Text style={s.title}>Asset Audit</Text>
          <Text style={s.subtitle}>
            {displayData.length} of {allData.length} records
            {activeFilterCount > 0 && ` • ${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''} active`}
          </Text>
        </View>

        <View style={s.headerRight}>
          {/* Mode toggle */}


          {/* View toggle */}
          <View style={s.segmentedControl}>
            {[
              ['card', 'view-agenda', 'Card'],
              ['compact', 'view-list', 'Compact'],
              ['table', 'table-view', 'Table'],
            ].map(([k, ic, label]) => (
              <TouchableOpacity
                key={k}
                style={[s.iconBtn, view === k && s.iconBtnActive]}
                onPress={() => setView(k)}
              >
                <Icon name={ic} size={18} color={view === k ? '#fff' : C.textSec} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Action buttons */}
          <TouchableOpacity
            style={[s.actionBtn, dateFilter.start && s.actionBtnActive]}
            onPress={() => setShowDateFilter(true)}
          >
            <Icon name="date-range" size={18} color={dateFilter.start ? '#fff' : C.accent} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[s.actionBtn, hasActiveFilters && s.actionBtnActive]}
            onPress={() => setShowFilters(true)}
          >
            <Icon name="tune" size={18} color={hasActiveFilters ? '#fff' : C.accent} />
            {activeFilterCount > 0 && (
              <View style={s.badge}>
                <Text style={s.badgeText}>{activeFilterCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={s.actionBtn} onPress={onRefresh}>
            <Icon name="refresh" size={18} color={C.accent} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[s.actionBtn, s.exportBtn]}
            onPress={exportExcel}
            disabled={exporting}
          >
            {exporting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Icon name="file-download" size={18} color="#fff" />
            )}
          </TouchableOpacity>




        </View>
      </View>



      {/* Active filter bar */}
      {hasActiveFilters && (
        <View style={s.filterBar}>
          <Icon name="filter-list" size={14} color={C.accent} />
          <Text style={s.filterBarText}>
            {displayData.length} of {allData.length} records shown
          </Text>
          <TouchableOpacity
            onPress={() => {
              setFilters(defaultFilters());
              setStatFilter(null);
              setDateFilter({ start: null, end: null });
            }}
          >
            <Text style={s.clearText}>Clear all</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Content */}
      {displayData.length === 0 ? (
        <View style={s.emptyState}>
          <Icon name="inbox" size={48} color={C.textLight} />
          <Text style={s.emptyText}>No records match your filters</Text>
          {hasActiveFilters && (
            <TouchableOpacity
              style={s.clearFiltersBtn}
              onPress={() => {
                setFilters(defaultFilters());
                setStatFilter(null);
                setDateFilter({ start: null, end: null });
              }}
            >
              <Text style={s.clearFiltersText}>Clear Filters</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <>
          {view === 'card' && (
            <FlatList
              data={displayData}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item }) => <CardItem item={item} mode={mode} />}
              contentContainerStyle={s.list}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor={C.accent}
                />
              }
              showsVerticalScrollIndicator={false}
            />
          )}

          {view === 'compact' && (
            <FlatList
              data={displayData}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item }) => (
                <View style={s.compactCard}>
                  <View style={s.compactTop}>
                    <View>
                      <Text style={s.compactAsset}>{item.assetId}</Text>
                      <Text style={s.compactBarcode}>{item.abarid}</Text>
                    </View>
                    <StatusBadge status={item.status} small />
                  </View>
                  <Text style={s.compactName} numberOfLines={1}>
                    {item.subGroup}
                  </Text>
                  <View style={s.compactRow}>
                    <DiffPill
                      from={item.prevRoom}
                      to={item.scannedRoom}
                      changed={item.roomChanged}
                    />
                    <Text style={s.compactDot}>·</Text>
                    <DiffPill
                      from={item.prevCondition}
                      to={item.condition}
                      changed={item.conditionChanged}
                    />
                  </View>
                  {item.changeSummary !== 'N/A' && item.changeSummary !== 'No Change' && (
                    <Text style={s.compactSummary} numberOfLines={1}>
                      {item.changeSummary}
                    </Text>
                  )}
                </View>
              )}
              contentContainerStyle={s.list}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor={C.accent}
                />
              }
              showsVerticalScrollIndicator={false}
            />
          )}

          {view === 'table' && (
            <View style={s.tableContainer}>
              <ScrollView horizontal style={{ flex: 1 }}>
                <View style={{ minWidth: mode === 'variance' ? 1300 : 1100 }}>
                  {/* Table header */}
                  <View style={s.tableHeader}>
                    {[
                      'Asset / Barcode',
                      'Name',
                      'Machine',
                      'Room',
                      'Building',
                      'Condition',
                      ...(mode === 'variance' ? ['Expected → Scanned'] : []),
                      'Status',
                      'Audit Date',
                    ].map((h, i) => (
                      <Text
                        key={i}
                        style={[
                          s.tableHeaderCell,
                          { width: [140, 160, 160, 140, 140, 120, 140, 120, 140][i] || 140 },
                        ]}
                      >
                        {h}
                      </Text>
                    ))}
                  </View>

                  {/* Table rows */}
                  <FlatList
                    data={displayData.slice(page * rowsPerPage, (page + 1) * rowsPerPage)}
                    keyExtractor={(_, i) => i.toString()}
                    renderItem={({ item, index }) => (
                      <TableRow item={item} mode={mode} even={index % 2 === 0} />
                    )}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              </ScrollView>

              {/* Pagination Controls */}
              {displayData.length > 0 && (
                <View style={s.pagination}>
                  <TouchableOpacity
                    style={[s.pageBtn, page === 0 && s.pageBtnDisabled]}
                    disabled={page === 0}
                    onPress={() => setPage(Math.max(0, page - 1))}
                  >
                    <Icon name="chevron-left" size={24} color={page === 0 ? C.textMuted : C.accent} />
                  </TouchableOpacity>
                  <Text style={s.pageText}>
                    Page {page + 1} of {Math.ceil(displayData.length / rowsPerPage)}
                  </Text>
                  <TouchableOpacity
                    style={[s.pageBtn, (page + 1) * rowsPerPage >= displayData.length && s.pageBtnDisabled]}
                    disabled={(page + 1) * rowsPerPage >= displayData.length}
                    onPress={() => setPage(page + 1)}
                  >
                    <Icon name="chevron-right" size={24} color={(page + 1) * rowsPerPage >= displayData.length ? C.textMuted : C.accent} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

// ─── Global Styles ────────────────────────────────────────────────────────
const get_s = (C) => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    color: C.textSec,
    fontSize: 15,
    marginTop: 8,
  },
  errorText: {
    color: C.damaged,
    fontSize: 16,
    fontWeight: '600',
  },
  retryBtn: {
    backgroundColor: C.accent,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  // Header
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: C.surface,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: C.textPri,
  },
  subtitle: {
    fontSize: 11,
    color: C.textMuted,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: "wrap",
    gap: 10,
  },

  // Segmented control
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: C.bg,
    borderRadius: 10,
    padding: 2,
  },
  segmentedBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  segmentedBtnActive: {
    backgroundColor: C.accent,
  },
  segmentedText: {
    fontSize: 12,
    fontWeight: '600',
    color: C.textSec,
  },
  segmentedTextActive: {
    color: '#fff',
  },

  // Icon buttons
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBtnActive: {
    backgroundColor: C.accent,
  },

  // Action buttons
  actionBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: C.accentGlow,
    borderWidth: 1,
    borderColor: C.accent + '40',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  actionBtnActive: {
    backgroundColor: C.accent,
    borderColor: C.accent,
  },
  exportBtn: {
    backgroundColor: C.accent,
    borderColor: C.accent,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: C.damaged,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: C.surface,
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },

  // Stats bar
  statsBar: {
    backgroundColor: C.surface,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  statsContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },

  // Filter bar
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: C.accentGlow,
    borderBottomWidth: 1,
    borderBottomColor: C.accent + '30',
  },
  filterBarText: {
    flex: 1,
    fontSize: 11,
    color: C.accent,
    fontWeight: '500',
  },
  clearText: {
    fontSize: 11,
    color: C.accent,
    fontWeight: '700',
  },

  // List
  list: {
    padding: 12,
    paddingBottom: 20,
  },

  // Empty state
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '600',
    color: C.textSec,
  },
  clearFiltersBtn: {
    backgroundColor: C.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  clearFiltersText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },

  // Compact card
  compactCard: {
    backgroundColor: C.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: C.border,
  },
  compactTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  compactAsset: {
    fontSize: 14,
    fontWeight: '800',
    color: C.accent,
  },
  compactBarcode: {
    fontSize: 9,
    color: C.textMuted,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginTop: 1,
  },
  compactName: {
    fontSize: 11,
    color: C.textSec,
    marginBottom: 8,
  },
  compactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  compactDot: {
    color: C.textMuted,
  },
  compactSummary: {
    fontSize: 10,
    color: C.changed,
    marginTop: 6,
    fontStyle: 'italic',
  },

  // Table
  tableContainer: {
    flex: 1,
    margin: 12,
    padding: 12,
    backgroundColor: C.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: C.accent,
    paddingVertical: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeaderCell: {
    paddingHorizontal: 8,
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: C.border,
    marginTop: 8,
  },
  pageBtn: {
    padding: 4,
    borderRadius: 8,
    backgroundColor: C.accentGlow,
  },
  pageBtnDisabled: {
    backgroundColor: C.bg,
  },
  pageText: {
    fontSize: 13,
    color: C.textSec,
    fontWeight: '600',
  },
});