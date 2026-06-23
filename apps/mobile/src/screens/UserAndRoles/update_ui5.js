const fs = require('fs');
let content = fs.readFileSync('UserCreation.js', 'utf8');

content = content.replace(
  /<FloatingButton[\s\S]*?\/>/,
  `<View style={styles.bottomButtonsContainer}>
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
            </View>`
);

content = content.replace(
  /cellText: {[\s\S]*?},/,
  `cellText: {
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
    }`
);

content = content.replace(
  /import FloatingButton from '\.\.\/\.\.\/components\/FloatingButton';/,
  ''
);

fs.writeFileSync('UserCreation.js', content);
console.log('done');
