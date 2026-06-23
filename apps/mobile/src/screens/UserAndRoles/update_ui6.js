const fs = require('fs');
let content = fs.readFileSync('Form.jsx', 'utf8');

content = content.replace(
  /<FloatingButton[\s\S]*?\/>/,
  `<View style={styles.bottomButtonsContainer}>
                <TouchableOpacity 
                    style={[styles.actionBtnRow, styles.newButton, { marginRight: 6 }]} 
                    onPress={() => {
                        setIsEditing(false);
                        setCurrentUserId(null);
                        ClearState(setUserName, setPassword, setEmail, setSelectedCompany, setSelectedEmply, setSelectedRole, setSelectedHod);
                    }}
                >
                    <MaterialIcons name="add" size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>New</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.actionBtnRow, isEditing ? styles.updateButton : styles.saveButton, { marginLeft: 6 }]} 
                    onPress={isEditing ? handleUpdate : handleSubmit}
                >
                    <MaterialIcons name={isEditing ? "update" : "save"} size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>{isEditing ? 'Update' : 'Save'}</Text>
                </TouchableOpacity>
            </View>`
);

content = content.replace(
  /actionButton: {[\s\S]*?},/,
  `actionButton: {
        padding: 6,
        borderRadius: 20,
        backgroundColor: Colors.lightGray,
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
    }`
);

content = content.replace(
  /import FloatingButton from "\.\.\/\.\.\/components\/FloatingButton";/,
  ''
);

fs.writeFileSync('Form.jsx', content);
console.log('done Form');
