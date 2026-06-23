const fs = require('fs');

// Update UserCreation.js
let content = fs.readFileSync('UserCreation.js', 'utf8');

content = content.replace(
  /card: {[\s\S]*?},/,
  `card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: '#f4f5f7',
    },`
);

content = content.replace(
  /cardTitle: {[\s\S]*?},/,
  `cardTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2d3436',
        marginBottom: 20,
        letterSpacing: 0.5,
    },`
);

content = content.replace(
  /label: {[\s\S]*?},/,
  `label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#636e72',
        marginBottom: 8,
        letterSpacing: 0.3,
    },`
);

content = content.replace(
  /dropdownContainer: {[\s\S]*?},/,
  `dropdownContainer: {
        marginBottom: 20,
    },`
);

content = content.replace(
  /usernameContainer: {[\s\S]*?},/,
  `usernameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },`
);

fs.writeFileSync('UserCreation.js', content);
console.log('UI updated for UserCreation.js');

// Update RoleOnPage_Master.jsx
let roleContent = fs.readFileSync('RoleOnPage_Master.jsx', 'utf8');

roleContent = roleContent.replace(
  /card: {[\s\S]*?},/,
  `card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#f4f5f7',
  },`
);

roleContent = roleContent.replace(
  /cardTitle: {[\s\S]*?},/,
  `cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 20,
    letterSpacing: 0.5,
  },`
);

roleContent = roleContent.replace(
  /label: {[\s\S]*?},/,
  `label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#636e72',
    marginBottom: 8,
    letterSpacing: 0.3,
  },`
);

roleContent = roleContent.replace(
  /submitButton: {[\s\S]*?},/,
  `submitButton: { 
    backgroundColor: '#00a8ff', 
    paddingVertical: 14, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 20, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    elevation: 4,
    shadowColor: '#00a8ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },`
);

roleContent = roleContent.replace(
  /input: {[\s\S]*?},/,
  `input: { 
    borderWidth: 1, 
    borderColor: '#dfe6e9', 
    borderRadius: 10, 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    fontSize: 16, 
    backgroundColor: '#fdfdfd',
    color: '#2d3436',
  },`
);

roleContent = roleContent.replace(
  /pickerContainer: {[\s\S]*?},/,
  `pickerContainer: { 
    borderWidth: 1, 
    borderColor: '#dfe6e9', 
    borderRadius: 10, 
    backgroundColor: '#fdfdfd',
    overflow: 'hidden',
  },`
);

fs.writeFileSync('RoleOnPage_Master.jsx', roleContent);
console.log('UI updated for RoleOnPage_Master.jsx');
