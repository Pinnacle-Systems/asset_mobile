import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, StyleSheet, Alert, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { useCreateUserMutation, useGetCompanycodeQuery, useGetDesignationQuery, useGetEmployeeidsQuery, useGetUserDetQuery, useGetUsersQuery } from "../../redux/service/user";
import { Dropdown } from "../../components/inputs";
import { showMessage } from 'react-native-flash-message';
import ClearState from "../../components/ClearState";
import { useSelector } from "react-redux";
import { Checkbox } from "react-native-paper";
import { useGet_all_roleQuery } from "../../redux/service/RoleOn";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Checklevelgroup from "./Checklevelgroup";
import { useDelete_CommonMutation, useUpdate_CommonMutation } from '../../redux/service/commonMasters';
import ProgressPopup from "../../components/PopupLoading";
import { useTheme } from '../../theme/ThemeProvider';


const Form = ({ closeModal, onClose, userDet }) => {

    const [username, setUserName] = useState("");
    const UserSelect = useSelector((state) => state?.UserDetails);
    const [loading, setloading] = useState(false);
    const [password, setPassword] = useState("");
    const [isotpEmail, setotpEmail] = useState();
    const [otpEmail, setotpEmail_inp] = useState({});

    const [selectedEmply, setSelectedEmply] = useState('');
    const [SelectedCompany, setSelectedCompany] = useState('');
    const [SelectedHod, setSelectedHod] = useState('');
    const [SelectedHR, setSelectedHR] = useState('');
    const [email, setEmail] = useState('');
    const [createUser] = useCreateUserMutation();
    const { data: tableData, refetch: refetchUsers } = useGetUsersQuery({});
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectLevel, setSelectedLevel] = useState("user");
    const [delete_row] = useDelete_CommonMutation();
    const [update_row] = useUpdate_CommonMutation();
    const [isEditing, setIsEditing] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const { data: all_Role_names, refetch: get_all_refresh } = useGet_all_roleQuery({ feilds: "COMPCODE", where: SelectedCompany });

    const { theme } = useTheme();
    const currentStyles = styles(theme);

    //  const { data: role, refetch } = useGetDesignationQuery();
    const { data: companyCode, refetch: companycoderef } = useGetCompanycodeQuery();
    const { data: employee, refetch: employeecoderef } = useGetEmployeeidsQuery();

    // Alert.alert("",JSON?.stringify(tableData))
    useEffect(() => {
        if (userDet) {
            editData(userDet);
        }
    }, [userDet]);

    useEffect(() => {
        setIsEditing(false)
    }, [])

    const validateData = (data) => {
        if (data.username && data.password) {
            return true;
        }
        return false;
    };

    const handleSubmitCustom = async (callback, data, text) => {
        try {
            setloading(true);
            const response = await callback(data).unwrap();

            if (response.statusCode === 1) {
                showMessage({
                    message: "User Creation",
                    description: "Already Exist!",
                    type: "danger",
                });
            } else {
                showMessage({
                    message: "User Creation",
                    description: "Your User Create completed",
                    type: "success",
                });
                ClearState(setUserName, setPassword, setEmail, setSelectedCompany, setSelectedEmply, setSelectedRole, setSelectedHod);
                refetchUsers();
            }
            onClose && onClose();
        } catch (error) {
            console.log(`Error: ${error.message}`);
        } finally {
            setloading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        var Idcard = selectedEmply?.split("-")[1]
        var hod = SelectedHod?.split("-")[1]
        var hr = SelectedHR?.split("-")[1]

        if (selectLevel !== "admin" && selectLevel !== "top" && (!selectedEmply || !username))
            return Alert.alert("⚠ Warning!", !selectedEmply ? "Please Select Your Employee" : "Please Enter Your UserName")

        var company_code = (Array.isArray(SelectedCompany) ? SelectedCompany : [])?.map((data) => {
            var companyId = companyCode?.data?.find((cdata) => cdata?.value == data)
            return { companyCode: data, companyid: String(companyId?.COMPID), GCOMP: UserSelect?.GCOMPCODE }
        });

        var Id_card_Random = Date.now() + Math.floor(Math.random() * 10000)

        const formData = { username, /*approval:selectedKey,*/ roleId: selectedRole, otpemail: otpEmail, /*hr,*/ password, email, /*hod,*/ Idcard: selectLevel == "top" || selectLevel == "admin" ? String(Id_card_Random) : Idcard, Compcodes: company_code, level: selectLevel, isAdmin: selectLevel == "top" || selectLevel == "admin" ? true : false };

        if (!validateData(formData)) {
            Toast.show({
                type: "info",
                text1: "Please fill all required fields...!",
            });
            return;
        }

        Alert.alert(
            "Confirmation",
            "Are you sure you want to save the details?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => handleSubmitCustom(createUser, formData, "User Created"),
                },
            ],
            { cancelable: false }
        );
    };

    const editData = useCallback(async (item) => {
        try {


            setIsEditing(true);
            setCurrentUserId(item.id);
            setUserName(item.username);
            setEmail(item.gmail);
            setotpEmail_inp(item?.otpemail)
            // setotpEmail(item?.otpemail)
            setSelectedHR(item?.role?.COMPCODE + "-" + item?.hr)
            setSelectedRole(item.roleId);
            setSelectedLevel(item.level);

            setSelectedEmply(item?.role?.COMPCODE + "-" + item.Idcard);
            setSelectedHod(item?.role?.COMPCODE + "-" + item.hod);

            if (item?.Companies) {
                const companyValues = item?.Companies.map(code => code.companyCode);
                setSelectedCompany(companyValues);
            }

            showMessage({
                message: "Edit Mode",
                description: "You're now editing an existing user",
                type: "info",
            });

        } catch (error) {
            showMessage({
                message: "Error",
                description: "Failed to load user data",
                type: "danger",
            });
            console.error('Error loading user data:', error);
        }
    }, [isEditing])




    const onDelete = (id) => {

        Alert.alert(
            "Confirmation",
            "Are you sure you want to delete this user?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK",
                    onPress: () => handleDelete(id)
                }
            ]
        );
    };

    const handleDelete = async (id) => {
        try {
            setloading(true);
            const response = await delete_row({
                table: 'user',
                where: { id: id, GCOMP: UserSelect?.GCOMPCODE },
                onlywhere: true
            }).unwrap();

            if (response.status === 1) {
                showMessage({
                    message: "Success",
                    description: "User deleted successfully",
                    type: "success",
                });
                refetchUsers();
            }
        } catch (error) {
            showMessage({
                message: "Error",
                description: "Failed to delete user",
                type: "danger",
            });
            console.error('Delete error:', error);
        } finally {
            setloading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            setloading(true);
            const company_code = (Array.isArray(SelectedCompany) ? SelectedCompany : [])?.map((data) => {
                const companyId = companyCode?.data?.find((cdata) => cdata?.value == data);
                return { companyCode: data, companyid: String(companyId?.COMPID), GCOMP: UserSelect?.GCOMPCODE };
            });

            var Idcard = selectedEmply?.split("-")[1]
            var hod = SelectedHod?.split("-")[1]
            var hr = SelectedHR?.split("-")[1]
            var Id_card_Random = Date.now() + Math.floor((Math?.random() * 10000))
            const formData = {
                Compcodes: company_code,
                GCOMP: UserSelect?.GCOMPCODE,
                /*hr,*/
                username,
                role: {
                    connect: { name: selectedRole }
                },
                otpemail: otpEmail,
                password,
                email,
                /*hod,*/
                /*approval:selectedKey,*/
                Idcard: selectLevel == "top" || selectLevel == "admin" ? String(Id_card_Random) : Idcard,
                level: selectLevel,
                user_updation: true,
                isAdmin: selectLevel == "top" || selectLevel == "admin" ? true : false
            };



            const response = await update_row({
                table: 'user',
                data: formData,
                onlywhere: true,
                where: { id: currentUserId },
            }).unwrap();



            if (response?.status == 1) {
                showMessage({
                    message: "Success",
                    description: "User updated successfully",
                    type: "success",
                });
                refetchUsers();
                ClearState(setUserName, setPassword, setEmail, setSelectedCompany, setSelectedEmply, setSelectedRole, setSelectedHod);
                onClose && onClose();
            }
        } catch (error) {
            showMessage({
                message: "Error",
                description: "Failed to update user",
                type: "danger",
            });
            console.error('Update error:', error);
        } finally {
            setloading(false);
        }
    };

    const filterRole = all_Role_names ? (all_Role_names?.data?.length > 0 ? all_Role_names?.data : [])?.filter((data) => data?.RoleOnPage?.length > 0) : []

    return (<>
        {loading && (
            <ProgressPopup
                visible={loading}
                message={isEditing ? "Updating User Please wait....." : "Creating User Please wait....."}
            />
        )}
        <View style={currentStyles.container}>
            <ScrollView contentContainerStyle={currentStyles.scrollContainer}>
                {/* Header */}
                <View style={currentStyles.header}>
                    <Text style={currentStyles.headerTitle}>
                        {isEditing ? "Edit User" : "Create New User"}
                    </Text>
                    <TouchableOpacity onPress={onClose} style={currentStyles.closeButton}>
                        <MaterialIcons name="close" size={24} color={theme.colors.subtext} />
                    </TouchableOpacity>
                </View>

                {/* Company and Employee Selection */}
                <View style={currentStyles.section}>
                    <Text style={currentStyles.sectionTitle}>Basic Information</Text>

                    <Dropdown
                        selected={SelectedCompany}
                        label="Select Company"
                        multiple={true}
                        setSelected={setSelectedCompany}
                        options={companyCode}
                        zIndex={300}
                        style={currentStyles.dropdown}
                    />

                    <Dropdown
                        selected={selectedEmply}
                        label="Select Employee"
                        setSelected={setSelectedEmply}
                        options={employee}
                        zIndex={300}
                        style={currentStyles.dropdown}
                    />
                </View>

                {/* User Role and Level */}
                <View style={currentStyles.section}>
                    <Text style={currentStyles.sectionTitle}>User Role</Text>

                    <Checklevelgroup
                        selected={selectLevel}
                        setSelected={setSelectedLevel}
                        style={currentStyles.levelGroup}
                    />

                    <Dropdown
                        selected={selectedRole}
                        label="Select Pages Role"
                        setSelected={setSelectedRole}
                        _label={"name"}
                        _value={"name"}
                        options={{ data: filterRole } || []}
                        zIndex={300}
                        style={currentStyles.dropdown}
                    />
                </View>

                {/* Login Credentials */}
                <View style={currentStyles.section}>
                    <Text style={currentStyles.sectionTitle}>Login Credentials</Text>

                    <View style={currentStyles.inputGroup}>
                        <Text style={currentStyles.label}>Username*</Text>
                        <TextInput
                            value={username}
                            onChangeText={setUserName}
                            style={currentStyles.input}
                            placeholderTextColor={theme.colors.placeholder}
                            placeholder="Enter username"
                        />
                    </View>

                    <View style={currentStyles.inputGroup}>
                        <Text style={currentStyles.label}>Password*</Text>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            style={currentStyles.input}
                            secureTextEntry
                            placeholderTextColor={theme.colors.placeholder}
                            placeholder="Enter password"
                        />
                    </View>
                </View>

                {/* Email Settings */}
                <View style={currentStyles.section}>
                    <Text style={currentStyles.sectionTitle}>Email Settings</Text>

                    <View style={currentStyles.inputGroup}>
                        <Text style={currentStyles.label}>Email</Text>
                        <TextInput
                            value={email}
                            onChangeText={(e) => {
                                !isotpEmail && setotpEmail_inp(e);
                                setEmail(e);
                            }}
                            style={currentStyles.input}
                            placeholderTextColor={theme.colors.placeholder}
                            placeholder="Enter email"
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={currentStyles.inputGroup}>
                        <View style={currentStyles.otpEmailRow}>
                            <Text style={currentStyles.label}>OTP Email</Text>
                            <TouchableOpacity
                                style={currentStyles.checkboxContainer}
                                onPress={() => {
                                    if (isotpEmail) {
                                        setotpEmail_inp('');
                                    } else {
                                        setotpEmail_inp(email);
                                    }
                                    setotpEmail(!isotpEmail);
                                }}
                            >
                                <Checkbox
                                    status={isotpEmail ? 'checked' : 'unchecked'}
                                    color={theme.colors.primary}
                                    uncheckedColor={theme.colors.text}
                                />
                                <Text style={currentStyles.checkboxLabel}>Different from Email</Text>
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            value={otpEmail}
                            onChangeText={setotpEmail_inp}
                            style={currentStyles.input}
                            placeholderTextColor={theme.colors.placeholder}
                            placeholder="Enter OTP email"
                            keyboardType="email-address"
                            editable={isotpEmail}
                        />
                    </View>
                </View>

                {/* Existing Users Table */}
                <View style={currentStyles.section}>
                    <Text style={currentStyles.sectionTitle}>Existing Users</Text>

                    <View style={currentStyles.tableHeader}>
                        <Text style={[currentStyles.tableHeaderText, { flex: 0.5 }]}>#</Text>
                        <Text style={[currentStyles.tableHeaderText, { flex: 2 }]}>Username</Text>
                        <Text style={[currentStyles.tableHeaderText, { flex: 2 }]}>Role</Text>
                        <Text style={[currentStyles.tableHeaderText, { flex: 2 }]}>Email</Text>

                        <Text style={[currentStyles.tableHeaderText, { flex: 1.5 }]}>Actions</Text>
                    </View>

                    {tableData?.data ? (
                        tableData.data.map((item, index) => (
                            <View
                                key={index}
                                style={[
                                    currentStyles.tableRow,
                                    index % 2 === 0 ? currentStyles.evenRow : currentStyles.oddRow
                                ]}
                            >
                                <Text style={[currentStyles.tableCell, { flex: 0.5 }]}>{index + 1}</Text>
                                <Text style={[currentStyles.tableCell, { flex: 2 }]}>{item.username}</Text>
                                <Text style={[currentStyles.tableCell, { flex: 2 }]}>{item?.role?.name || "-"}</Text>
                                <Text style={[currentStyles.tableCell, { flex: 2 }]}>{item.gmail || "-"}</Text>
                                <View style={[currentStyles.tableCell, { flex: 1.5, flexDirection: 'row', justifyContent: 'center' }]}>
                                    <TouchableOpacity
                                        onPress={() => editData(item)}
                                        style={currentStyles.actionButton}
                                    >
                                        <MaterialIcons name="edit" size={20} color={theme.colors.primary} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => onDelete(item.id)}
                                        style={[currentStyles.actionButton, { marginLeft: 10 }]}
                                    >
                                        <MaterialIcons name="delete" size={20} color={theme.colors.danger} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text style={currentStyles.noDataText}>No users available</Text>
                    )}
                </View>
            </ScrollView>

            <View style={currentStyles.bottomButtonsContainer}>
                <TouchableOpacity
                    style={[currentStyles.actionBtnRow, currentStyles.newButton, { marginRight: 6 }]}
                    onPress={() => {
                        setIsEditing(false);
                        setCurrentUserId(null);
                        ClearState(setUserName, setPassword, setEmail, setSelectedCompany, setSelectedEmply, setSelectedRole, setSelectedHod);
                    }}
                >
                    <MaterialIcons name="add" size={20} color="#fff" />
                    <Text style={currentStyles.actionButtonText}>New</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[currentStyles.actionBtnRow, isEditing ? currentStyles.updateButton : currentStyles.saveButton, { marginLeft: 6 }]}
                    onPress={isEditing ? handleUpdate : handleSubmit}
                >
                    <MaterialIcons name={isEditing ? "update" : "save"} size={20} color="#fff" />
                    <Text style={currentStyles.actionButtonText}>{isEditing ? 'Update' : 'Save'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    </>
    );
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        position: "relative"
    },
    scrollContainer: {
        padding: 16,
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    closeButton: {
        padding: 4,
    },
    section: {
        backgroundColor: theme.colors.surface,
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 6,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: 12,
    },
    dropdown: {
        marginBottom: 16,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: theme.colors.subtext,
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: theme.colors.surface,
        color: theme.colors.text,
    },
    otpEmailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxLabel: {
        fontSize: 14,
        color: theme.colors.subtext,
        marginLeft: 8,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: theme.colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    tableHeaderText: {
        fontWeight: 'bold',
        color: theme.colors.textOnPrimary,
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderColor: theme.colors.border,
    },
    evenRow: {
        backgroundColor: theme.colors.surface,
    },
    oddRow: {
        backgroundColor: theme.colors.background,
    },
    tableCell: {
        textAlign: 'center',
        fontSize: 14,
        color: theme.colors.text,
    },
    noDataText: {
        textAlign: 'center',
        padding: 16,
        color: theme.colors.subtext,
    },
    levelGroup: {
        marginBottom: 16,
    },
    actionButton: {
        padding: 6,
        borderRadius: 20,
        backgroundColor: theme.colors.background,
    },
    bottomButtonsContainer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderColor: theme.colors.border,
        elevation: 8,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    actionBtnRow: {
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
        backgroundColor: theme.colors.gray || '#6b7280',   // Neutral gray for New
    },
    saveButton: {
        backgroundColor: theme.colors.primary,  // Green for Save
    },
    updateButton: {
        backgroundColor: theme.colors.accent,   // Blue for Update
    },
    actionButtonText: {
        color: theme.colors.textOnPrimary,
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 8,
    }
});

export default Form;
