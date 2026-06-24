import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, Alert, TextInput } from 'react-native';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomDataTable from '../../components/CommonDataTable';
import { useDelete_CommonMutation, useUpdate_CommonMutation } from '../../redux/service/commonMasters';
import { showMessage } from 'react-native-flash-message';
import { useAddRole_masterMutation, useGet_all_roleQuery } from '../../redux/service/RoleOn';
import { Picker } from '@react-native-picker/picker';

function RoleOnPage_Master() {
  const [isEdit, setisEdit] = useState(false);
  const UserDetailsdata = useSelector(state => state.UserDetails);
  const [id, setid] = useState();
  const [isLoading, setIsLoading] = useState(false);
  
  const [name, setName] = useState('');
  const [active, setActive] = useState('y');

  const [addRole_onData] = useAddRole_masterMutation();
  const [update_table] = useUpdate_CommonMutation();
  const [delete_row] = useDelete_CommonMutation();
  const { data: all_Role_names, refetch: get_all_refresh } = useGet_all_roleQuery({where:UserDetailsdata?.GCOMPCODE});

  const handleSubmit = async () => {
    if (!name) return Alert.alert("Error", "Role Name is required");
    setIsLoading(true);
    try {
      const permisiondata = await addRole_onData({ data:{name:name+"@"+UserDetailsdata?.GCOMPCODE, active }}).unwrap();

      if (permisiondata?.status == 1) {
        get_all_refresh();
        setName('');
        setActive('y');
        showMessage({ message: "Role created successfully", type: "success" });
      } else {
        showMessage({ message: "Failed to create role", type: "danger" });
      }
    } catch (error) {
      showMessage({ message: "An error occurred", type: "danger" });
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    { key: 'displayName', label: 'Name', titleProps: { numeric: false }, cellProps: { numeric: false } },
    { key: 'active', label: 'Active', titleProps: { numeric: false }, cellProps: { numeric: false } },
  ];

  const handleEdit = (item) => {
    setName(item?.name?.split('@')[0] || item?.name);
    setActive(item.active);
    setid(item?.id);
    setisEdit(true);
  };

  const deleteConfirm = async (item) => {
    var delete_Data = await delete_row({ table: 'role', where: { id: item.id } });
    const res = delete_Data?.data;
    if (res?.status == 1) {
      showMessage({
        message: "Data Deleted Successfully",
        type: "info",
      });
      get_all_refresh();
    }
  };

  const handleDelete = (item) => {
    Alert.alert('Delete', 'Do You Want Delete ? ', [{ text: "Cancel", style: "cancel" }, { text: "OK", onPress: () => deleteConfirm(item) }]);
  };

  const handleUpdate = async () => {
    if (!name) return Alert.alert("Error", "Role Name is required");
    setIsLoading(true);
    try {
      var Update_data = await update_table({ where: { id: id }, data: { name: name+"@"+UserDetailsdata?.GCOMPCODE, active }, table: 'role' });
      if (Update_data?.data?.status == 1) {
        showMessage({ message: "Data Update Successfully", type: "success" });
        setName('');
        setActive('y');
        setisEdit(false);
        get_all_refresh();
      } else {
        showMessage({ message: "Data Update Failed", type: "danger" });
      }
    } catch (error) {
      showMessage({ message: "An error occurred", type: "danger" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.header}>Role Master</Text>
          
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Role Name</Text>
              <TextInput 
                style={styles.input} 
                value={name} 
                onChangeText={setName} 
                placeholder="Enter Role Name" 
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Active</Text>
              <View style={styles.pickerContainer}>
                <Picker selectedValue={active} onValueChange={(itemValue) => setActive(itemValue)}>
                  <Picker.Item label="Yes" value="y" />
                  <Picker.Item label="No" value="N" />
                </Picker>
              </View>
            </View>
            
            {isEdit ? (
              <TouchableOpacity style={styles.submitButton} onPress={handleUpdate} disabled={isLoading}>
                {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}><Icon name="edit" size={18} color="#fff" /> Update Role</Text>}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={isLoading}>
                {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}><Icon name="add" size={18} color="#fff" /> Add Role</Text>}
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.tableContainer}>
            <CustomDataTable
              title="Role List"
              data={(all_Role_names?.data || []).map(role => ({ ...role, displayName: role.name?.split('@')[0] || role.name }))}
              fields={fields}
              onEdit={handleEdit}
              onDelete={handleDelete}
              itemsPerPage={3}
            />
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#f4f5f7',
  },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#2c3e50' },
  formContainer: { marginBottom: 20 },
  inputGroup: { marginBottom: 15 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#636e72',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#dfe6e9', 
    borderRadius: 10, 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    fontSize: 16, 
    backgroundColor: '#fdfdfd',
    color: '#2d3436',
  },
  pickerContainer: { 
    borderWidth: 1, 
    borderColor: '#dfe6e9', 
    borderRadius: 10, 
    backgroundColor: '#fdfdfd',
    overflow: 'hidden',
  },
  submitButton: { 
    backgroundColor: '#4facfe', 
    paddingVertical: 14, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 10, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    elevation: 3,
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: '700', marginLeft: 8 },
  tableContainer: { marginTop: 24, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#f0f0f0' }
});

export default RoleOnPage_Master;
