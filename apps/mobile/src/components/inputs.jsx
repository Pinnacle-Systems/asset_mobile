import  { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,

} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTheme } from '../theme/ThemeProvider';

export const Dropdown = ({
  selected,
  setSelected,
  width,
  options,
  label,
  _label,
  _value,
  multiple = false,
  isLoading,
  placeholder,
  style: wrapperStyle,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const isPortrait = screenHeight > screenWidth;
  const { theme } = useTheme();
  const styles = createStyles(theme);

  useEffect(() => {
    const data = (options?.data || [])?.map((item) => ({
      label: item?.[_label || "value"],
      value: item?.[_value || "id"]
    }));
    setItems(data);
  }, [options?.data]);

  const dropdownWidth = width || '100%';

  return (
    <View style={[
      styles.container,
      { zIndex: open ? 1000 : 1 },
      wrapperStyle
    ]}>
      {label && (typeof label === 'string' ? <Text style={styles.label}>{label}</Text> : label)}
      <DropDownPicker
        open={open}
        value={multiple ? selected || [] : selected}
        items={items}
        setOpen={setOpen}
        setValue={setSelected}
        multiple={multiple}
        setItems={setItems}
        searchable={true}
        searchPlaceholder="Search options..."
        placeholder={isLoading ? 'Loading...' : placeholder}
        dropDownDirection="AUTO"
        style={[
          styles.dropdown,
          { width: dropdownWidth },
          isPortrait ? styles.portraitDropdown : styles.landscapeDropdown
        ]}
        searchTextInputStyle={styles.searchTextInputStyle}
        dropDownContainerStyle={[
          styles.dropDownContainerStyle,
          { width: dropdownWidth }
        ]}
        listMode="MODAL"
        zIndex={100}
        maxHeight={screenHeight * 0.5}
        modalContentContainerStyle={{
          backgroundColor: theme.colors.surface,
          marginHorizontal: 20,
          marginTop: isPortrait ? '30%' : '10%',
          borderRadius: 12,
          padding: 16,
          height: screenHeight * 0.5,
          maxHeight: screenHeight * 0.5,
          zIndex: 200,
          elevation: 10,
          width: isPortrait ? screenWidth * 0.9 : screenWidth * 0.8
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
        mode="SIMPLE"
        {...props}
        theme={(theme.isDarkMode || theme.mode === 'dark') ? "DARK" : "LIGHT"}
      />
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  portraitContainer: {
    width: '90%',
    alignSelf: 'center'
  },
  landscapeContainer: {
    width: '45%',
    marginHorizontal: '2.5%'
  },
  label: {
    fontSize: theme.fontSize?.sm || 14,
    fontWeight: '600',
    marginBottom: 6,
    color: theme.colors.text,
  },
  dropdown: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius?.sm || 6,
    justifyContent: 'center',
  },
  portraitDropdown: {
    minHeight: 45,
    paddingHorizontal: 10,
  },
  landscapeDropdown: {
    minHeight: 40,
    paddingHorizontal: 8,
  },
  dropDownContainerStyle: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius?.sm || 6,
    marginTop: 2,
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
