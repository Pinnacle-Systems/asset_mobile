import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView, TouchableOpacity, Animated, Easing, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Table, Row, Rows } from 'react-native-table-component';

import { useCreateRoleOnPageMutation, useUpdateRoleOnPageMutation, useGetDesignationQuery, useGetRolesOnPageQuery, useGetCreatedRolesOnPageQuery } from '../../redux/service/user';

import { Dropdown } from '../../components/inputs';




import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useGet_all_roleQuery } from '../../redux/service/RoleOn';
import CustomDataTable from '../../components/CommonDataTable';
import { useDelete_CommonMutation } from '../../redux/service/commonMasters';
import { showMessage } from 'react-native-flash-message';

export default function UserCreation() {
    const [permissions, setPermissions] = useState({});
    const [selectedRole, setSelectedRole] = useState(null);
    const [roleName, setRoleName] = useState(null);
    const [copyRole, setCopyRole] = useState(null);
    const [username, setUsername] = useState(null);
    const [edit, setEdit] = useState(false);
    const [ CurrentEditingId, setCurrentEditingId]=useState()
    const [disabled, setDisabled] = useState(true);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;
    const UserDetailsdata = useSelector(state => state.UserDetails);
    
    const {data:get_created_roles,refetch:userRefetch}=useGetCreatedRolesOnPageQuery({where:UserDetailsdata?.GCOMPCODE})
    const { data: all_Role_names, isError, error, refetch: refetchCreatedRoles } = useGet_all_roleQuery({where:UserDetailsdata?.GCOMPCODE})
    const [createUserOnRole] = useCreateRoleOnPageMutation();
    const [delete_row] = useDelete_CommonMutation()
    const [updateUserOnRole] = useUpdateRoleOnPageMutation();
    

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = await AsyncStorage.getItem('userName');
            setUsername(JSON?.parse(storedUser)?.userName);
        };
        fetchUser();
    }, []);

    useEffect(() => {
        // Entrance animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            })
        ]).start();
    }, []);



    // useEffect(() => {
    //    // setSelectedRole(UserDetailsdata?.Role);
    // }, [UserDetailsdata?.Role, edit]);

    // useEffect(() => {
    //     setPagePermission(roleOnPage?.data || []);
    // }, [roleOnPage]);

    const deletedfun=async (id)=>{
         var delete_Data = await delete_row({ table: 'role', where: { id: id.id } });
            const res = delete_Data?.data;
            if (res?.status == 1) {
              showMessage({
                message: "Data",
                description: "Data Deleted Successfully",
                type: "info",
              });
              userRefetch()
            }
    }

    const onDelete=(id)=>{

       Alert.alert('Confirmation', 'Are you sure you want to Delete the details?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: () =>{deletedfun(id)}}
        ]);


    }

    const setPagePermission = (userData) => {
        
        const transformed = userData.reduce((acc, perm) => {
            acc[perm.Pages] = {
                read: !! perm.read,
                create: !!perm.create,
                edit: !!perm.edit,
                delete: !!perm.delete,
                isdefault: !!perm.isdefault
            };
            return acc;
        }, {});
        setPermissions(transformed);
    };

    const onNew = () =>{ 
     setPermissions({})
     setRoleName(null)
     setCopyRole(null)
     setEdit(false)
     setDisabled(false);   
    }

    const handleCopyRole = (selectedRoleName) => {
        setCopyRole(selectedRoleName);
        const item = get_created_roles?.data?.find(r => r.name === selectedRoleName);
        if (item && item.RoleOnPage) {
            setPermissions(transformPermissions(item.RoleOnPage));
            Toast.show({ type: 'success', text1: `Permissions copied from ${selectedRoleName}` });
        }
    };

    const validateData = ({ roleName, permissions }) => roleName && Object.keys(permissions).length > 0;

    const handleSubmission = async (callback, data, successMessage) => {
        try {
            const response = await callback(data).unwrap();
            
            if (response.status === 1) {
                 onNew();
               
            } else {
                Toast.show({ type: 'success', text1: `${successMessage} Successfully` });
            }
           // refetch()
            userRefetch();
        } catch (error) {
            Toast.show({ type: 'error', text1: `Error: ${error.message}` });
        }
    };

   const handlePermissionChange = useCallback((page, permission) => {
  setPermissions(prev => {
    const updated = { ...prev };
    
    if (!updated[page]) {
      updated[page] = { 
        read: false, 
        create: false, 
        edit: false, 
        delete: false, 
        isdefault: false 
      };
    }

    if (permission === 'isdefault') {
      updated[page] = {
        read: true,
        create: true,
        edit: true,
        delete: true,
        isdefault: true,
        ...(edit && { dbid: updated[page].dbid })
      };
    } else {
      updated[page] = {
        ...updated[page],
        [permission]: !updated[page][permission],
        isdefault: ['read', 'create', 'edit', 'delete'].every(
          p => p === permission ? !updated[page][p] : updated[page][p]
        )
      };
    }

    return updated;
  });
}, [edit]);

const handleSubmit = async () => {
        if (!roleName || Object.keys(permissions).length === 0) {
            Toast.show({ type: 'info', text1: 'Please fill all required fields' });
            return;
        }

        try {
           
            
    const permission_data=!edit ?  {...permissions,HOME:{ read: true,
        create: true,
        edit: true,
        delete: true,
        isdefault: true,roleName}} : permissions
        
    const formData = { 
                roleName, 
                permissions:permission_data,
                ...(edit && {  roleName: CurrentEditingId }) // Include ID if in edit mode
            };

           

            const response = edit 
                ? await updateRole(formData).unwrap()
                : await createUserOnRole(formData).unwrap();
                
            if (response.data?.count > 0) {
                Toast.show({ 
                    type: 'success', 
                    text1: `Role ${edit ? 'Updated' : 'Created'} Successfully` 
                        });
                refetchCreatedRoles();
                onNew();
            }
        } catch (error) {
            Toast.show({ 
                type: 'error', 
                text1: `Error: ${error.message || 'Failed to save role'}` 
            });
        }
    };

    const handleUpdate = () => {
        const formData = { permissions, roleName: selectedRole };
        Alert.alert('Confirmation', 'Are you sure you want to Update the details?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: () => handleSubmission(updateUserOnRole, formData, 'User Updated') }
        ]);
    };

    const transformPermissions = (data) => {
        return data.reduce((acc, perm) => {
            acc[perm.link] = {
                dbid:perm?.dbid || perm?.id ,
                read: !!perm.read,
                create: !!perm.create,
                edit: !!perm.edit,
                delete: !!perm.delete,
                isdefault: !!perm.isdefault
            };
            return acc;
        }, {});
    };

  const editData = async (item) => {
setSelectedRole(undefined)
  try {
    // Set loading states
    setEdit(true);
    setDisabled(false);
    setRoleName(item.name);
    setSelectedRole(item?.name);
    setCurrentEditingId(item?.name);

    // Force refetch with the new RoleId
    const data=item.RoleOnPage 
    if (data) {
      setPermissions(transformPermissions(data));
    } else {
      Toast.show({
        type: 'error', 
        text1: 'No data returned for this role'
      });
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Failed to load role data',
      text2: error.message
    });
    console.error('Error fetching role data:', error);
  }
};
        
   


    const tableHead = ['Pages', 'Read', 'Create', 'Edit', 'Delete', 'Admin'];
    const tabs = require('../../config/tabIndex').default;

    const PermissionCell = memo(({ perm, isActive, isDisabled, onPress }) => (
        <TouchableOpacity 
            disabled={isDisabled}
            style={[
                styles.permissionCell,
                isActive && styles.permissionActiveCell
            ]}
            onPress={onPress}
        >
            <Text style={styles.tickText}>{isActive ? '✔' : ''}</Text>
        </TouchableOpacity>
    ));

    const PermissionRow = memo(({ item, p, disabled, onPermissionChange }) => {
        const rowData = [
            item.list_name,
            ...['read', 'create', 'edit', 'delete', 'isdefault'].map(perm => {
                const isActive = item?.default || p[perm];
                const isDisabled = item?.default || disabled;
                return (
                    <PermissionCell 
                        key={perm}
                        perm={perm}
                        isActive={isActive}
                        isDisabled={isDisabled}
                        onPress={() => onPermissionChange(item.name, perm)}
                    />
                );
            })
        ];
        
        return (
            <Row 
                data={rowData} 
                style={styles.rows} 
                textStyle={StyleSheet.flatten(styles.cellText)} 
            />
        );
    });




    


 const fields = [
    { 
      key: 'displayName', 
      label: 'Name',
      titleProps: { numeric: false },
      cellProps: { numeric: false }
    },
    { 
      key: 'active', 
      label: 'Active',
      titleProps: { numeric: false },
      cellProps: { numeric: false }
    },
  ];

const { data: role, refetch: refetch_data} = useGetRolesOnPageQuery({RoleId: selectedRole || undefined })



//const filterRole=all_Role_names?.data?.filter((data))
 const filterRole=all_Role_names?.data?.filter((data)=>data?.RoleOnPage?.length==0)?.map(role => ({ ...role, displayName: role.name?.split('@')[0] || role.name }))


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <Animated.View 
            style={[
                styles.pageContainer,
                { 
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }] 
                }
            ]}
        >
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={userRefetch} />
                }
            >

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>User Information</Text>
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Username:</Text>
                        <View style={styles.usernameContainer}>
                            <MaterialIcons name="person" size={20} color="#555" />
                            <Text style={styles.usernameText}>{username}</Text>
                        </View>

                       
                        <View style={[styles.dropdownContainer, { zIndex: 300 }]}>
                         
                            <Dropdown
                                    selected={roleName}
                                    label={<Text>Select Role</Text>}
                                    setSelected={setRoleName}
                                    width={"100%"}
                                    _label={"displayName"}
                                    _value={"name"}
                                    options={{data: edit ? [{name: roleName, displayName: roleName?.split('@')[0]}] : filterRole} || []}
                                    disabled={edit || disabled}
                                    zIndex={300}
                                />
                        </View>

                        {!edit && (
                            <View style={[styles.dropdownContainer, { zIndex: 200 }]}>
                                <Dropdown
                                    selected={copyRole}
                                    label={<Text>Copy Permissions from Existing Role (Optional)</Text>}
                                    setSelected={handleCopyRole}
                                    width={"100%"}
                                    _label={"displayName"}
                                    _value={"name"}
                                    options={{data: (get_created_roles?.data || []).map(r => ({...r, displayName: r.name?.split('@')[0]}))}}
                                    disabled={disabled}
                                    zIndex={200}
                                />
                            </View>
                        )}

                        {/* {edit && (
                            <View style={styles.dropdownContainer}>
                                <Text style={styles.label}>Select Role:</Text>
                                <Dropdown
                                    selected={selectedRole}
                                    setSelected={setSelectedRole}
                                    options={role}
                                    style={styles.dropdown}
                                />
                            </View>
                        )} */}
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Page Permissions</Text>
                    <View style={styles.tableContainer}>
                        <Table borderStyle={styles.tableBorder}>
                            <Row 
                            
                                data={tableHead} 
                                style={styles.head} 
                                textStyle={StyleSheet.flatten(styles.headText)} 
                            />
                            {(tabs || []).filter(t => t.list).map(item => (
                                <PermissionRow 
                                    key={item.name}
                                    item={item}
                                    p={permissions[item.name] || {}}
                                    disabled={disabled}
                                    onPermissionChange={handlePermissionChange}
                                />
                            ))}
                        </Table>
                    </View>
                </View>

                <View style={styles.card}>
                    
                    <View style={styles.tableContainer}>
                       <CustomDataTable
                                      title="Available Roles"
                                      data={(get_created_roles?.data || []).map(role => ({...role, displayName: role.name?.split('@')[0] || role.name}))}
                                      fields={fields}
                                      onEdit={editData}
                                      onDelete={onDelete}
                                      itemsPerPage={3}
                         />
                    </View>
                </View>
            </ScrollView>

            <View style={styles.bottomButtonsContainer}>
                <TouchableOpacity 
                    style={[styles.actionButton, styles.newButton, { marginRight: 6 }]} 
                    onPress={onNew}
                >
                    <MaterialIcons name="add" size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>New</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.actionButton, edit ? styles.updateButton : styles.saveButton, { marginLeft: 6 }]} 
                    onPress={edit ? handleUpdate : handleSubmit}
                >
                    <MaterialIcons name={edit ? "update" : "save"} size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>{edit ? 'Update' : 'Save'}</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    pageContainer: { flex: 1, position: 'relative' },
    scrollContainer: { paddingBottom: 8 ,width:"100%",padding:0},
    formContainer: { padding: 2 },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#636e72',
        marginBottom: 8,
        letterSpacing: 0.3,
    },
    input: {
        height: 40,
        width: "100%",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        padding:5
    },
    dropdown: { marginTop: 2 },
    tableContainer: { flex: 1, marginBottom: 2 },
    tableBorder: { borderWidth: 1, borderColor: 'gray' },
    head: { height: 40, backgroundColor: "#7999f2" },
    headText: { textAlign: "center", fontFamily: "Dosis-Bold",color:"white" },
    rows: { height: "auto", width: "auto", borderBottomWidth: 4 },
    permissionCell: { justifyContent: 'center', alignItems: 'center' },
    tickText: { textAlign: 'center', fontSize: 18 },
    cellText: {
        textAlign: 'center',
        fontSize: 14,
    },
    bottomButtonsContainer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderColor: '#e2e8f0',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    newButton: {
        backgroundColor: '#94a3b8',
    },
    saveButton: {
        backgroundColor: '#38c98d',
    },
    updateButton: {
        backgroundColor: '#4facfe',
    },
    actionButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 8,
    },
    pageContainer: { 
        flex: 1, 
        position: 'relative',
        backgroundColor: '#f5f7fa',
    },
    scrollContainer: { 
        padding: 2,
        paddingBottom: 100 
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        marginHorizontal: 14,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: '#f4f5f7',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2d3436',
        marginBottom: 20,
        letterSpacing: 0.5,
    },
    formContainer: { 
        padding: 2,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#555',
        marginBottom: 8,
    },
    usernameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    usernameText: {
        fontSize: 16,
        marginLeft: 8,
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    inputIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        height: 48,
        fontSize: 16,
        color: '#333',
    },
    dropdownContainer: {
        marginBottom: 20,
    },
    dropdown: {
        marginTop: 2,
    },
    tableContainer: {
        flex: 1,
        marginBottom: 2,
        borderRadius: 8,
        overflow: 'hidden',
    },
    tableBorder: {
        borderWidth: 0,
    },
    head: {
        height: 48,
        backgroundColor: '#38c98d',
    },
    headText: {
        textAlign: 'center',
        fontWeight: '600',
        color: 'white',
        fontSize: 14,
    },
    rows: {
        height: 60,
        backgroundColor: 'white',
        padding:5
    },
    permissionCell: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor:"#f5f4f2",
        marginLeft:5
    },
    permissionActiveCell: {
        backgroundColor: '#E8F5E9',
    },
    pageNameText: {
        paddingLeft: 12,
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    roleIndexText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#666',
    },
    roleNameText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    cellText: {
        textAlign: 'center',
        fontSize: 14,
    },
});
