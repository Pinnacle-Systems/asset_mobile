import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTheme } from '../theme/ThemeProvider';

export const TextOnlyDropdown = ({
  selected,
  setSelected,
  width,
  options,
  label,
  _label,
  labelstyle,
  auto_open,
  container,
  _value,
  multiple = false,
  isLoading,
  placeholder,
  disabled = false, // New disabled prop
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  const { theme } = useTheme();
  const styles = createStyles(theme);

  useEffect(() => {
    const data = (options?.data || [])?.map((item) => ({
      label: item?.[_label || "value"],
      value: item?.[_value || "id"],
      disabled: item.disabled || false // Support disabling individual items
    }));
    setItems(data);
  }, [options?.data]);

  const handlePress = () => {
    if (!disabled) {
      setOpen(true);
    }
  };


  return (
    <View style={container || styles.container}>
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={disabled ? 1 : 0.2}
      >
        {label && (
          <Text
            style={[
              labelstyle || styles.label,
              disabled && styles.disabledLabel // Apply disabled style
            ]}
          >
            {label}
          </Text>
        )}
      </TouchableOpacity>

      <DropDownPicker
        open={open || auto_open}
        value={multiple ? selected || [] : selected}
        items={items}
        setOpen={setOpen}
        setValue={setSelected}
        multiple={multiple}
        setItems={setItems}

        searchable={!disabled} // Disable search when disabled
        disabled={disabled} // Native dropdown disable
        searchPlaceholder="Search options..."
        placeholder={isLoading ? 'Loading...' : (disabled ? '' : placeholder)}
        dropDownDirection="AUTO"
        style={[
          styles.dropdown,
          { width, opacity: 0, height: 0 },
          disabled && styles.disabledDropdown
        ]}
        searchTextInputStyle={styles.searchTextInputStyle}
        dropDownContainerStyle={[
          styles.dropDownContainerStyle,
          disabled && styles.disabledDropDownContainer
        ]}
        listMode="MODAL"
        zIndex={100}
        maxHeight={"50%"}
        modalContentContainerStyle={{
          backgroundColor: theme.colors.surface,
          marginHorizontal: 20,
          marginTop: '50%',
          borderRadius: 12,
          padding: 16,
          height: 300,
          maxHeight: "50%",
          zIndex: 200,
          elevation: 10,
          opacity: disabled ? 0.5 : 1 // Fade when disabled
        }}
        modalProps={{
          animationType: 'slide',
          transparent: true,
          presentationStyle: 'overFullScreen',
          backdropColor: "rgba(0,0,0,0.5)"
        }}
        textStyle={{
          color: theme.colors.text
        }}
        mode={"SIMPLE"}
        theme={(theme.isDarkMode || theme.mode === 'dark') ? "DARK" : "LIGHT"}
        {...props}
      />
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    marginVertical: 1,
    zIndex: 1000,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: theme.colors.text,
  },
  disabledLabel: {
    color: theme.colors.subtext,
  },
  dropdown: {
    backgroundColor: 'transparent',
  },
  disabledDropdown: {
    // Additional disabled styles if needed
  },
  dropDownContainerStyle: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: 8,
    marginTop: 2,
    zIndex: 1000,
  },
  disabledDropDownContainer: {
    backgroundColor: theme.colors.background,
  },
  searchTextInputStyle: {
    height: 40,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    color: theme.colors.text,
  },
});
