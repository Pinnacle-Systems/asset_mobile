const fs = require('fs');

let content = fs.readFileSync('Form.jsx', 'utf8');

content = content.replace(
  /section: {[\s\S]*?},/,
  `section: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 6,
        borderWidth: 1,
        borderColor: '#f4f5f7',
    },`
);

content = content.replace(
  /input: {[\s\S]*?},/,
  `input: {
        height: 50,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: '#fdfdfd',
        color: Colors.darkText,
    },`
);

fs.writeFileSync('Form.jsx', content);
console.log('UI updated for Form.jsx');
