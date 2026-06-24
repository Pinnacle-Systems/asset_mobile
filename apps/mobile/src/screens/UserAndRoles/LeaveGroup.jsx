import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox, Text, Avatar } from 'react-native-paper';
import { useTheme } from '../../theme/ThemeProvider';

const roles = [
  { id: 'top', label: 'Top ManageMent', icon: 'chess-queen', color: "#e3af02" },
  { id: 'admin', label: 'Admin', icon: 'account-cog' },
  { id: 'hod', label: 'Department Hod ', icon: 'account-tie' },
  { id: 'user', label: 'User', icon: 'account' },

];

const CheckboxLevelGroup = ({ selected, setSelected }) => {
  const { theme } = useTheme();
  const currentStyles = styles(theme);

  const toggleSelection = (id) => {
    // If already selected, deselect
    if (selected === id) {
      setSelected(null);
    } else {
      setSelected(id); // Select only this one
    }
  };

  return (
    <View style={currentStyles.container}>
      <Text style={currentStyles.title}>Select User Role</Text>
      {roles.map((role) => (
        <View key={role.id} style={currentStyles.item}>
          <Avatar.Icon size={36} icon={role.icon} color={role?.color || theme.colors.textOnPrimary} style={currentStyles.icon} />
          <Checkbox.Item
            label={role.label}
            status={selected === role.id ? 'checked' : 'unchecked'}
            onPress={() => toggleSelection(role.id)}
            color={theme.colors.primary}
            uncheckedColor={theme.colors.text}
            position="leading"
            labelStyle={currentStyles.label}
            style={currentStyles.checkbox}
          />
        </View>
      ))}
    </View>
  );
};

const styles = (theme) => StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: theme.colors.surface,
    elevation: 2,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: theme.colors.text,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
    backgroundColor: theme.colors.accentLight,
  },
  label: {
    fontSize: 16,
    color: theme.colors.text,
  },
  checkbox: {
    flex: 1,
  },
});

export default CheckboxLevelGroup;
