const fs = require('fs');

// Fix UserCreation.js
let userCreation = fs.readFileSync('UserCreation.js', 'utf8');
userCreation = userCreation.replace(
    /borderColor: '#f4f5f7',\s*\},\s*shadowOpacity: 0\.1,\s*shadowRadius: 6,\s*elevation: 3,\s*width:"100%"\s*\}/,
    "borderColor: '#f4f5f7',\n    }"
);
fs.writeFileSync('UserCreation.js', userCreation);
console.log('Fixed UserCreation.js');

// Fix Form.jsx
let form = fs.readFileSync('Form.jsx', 'utf8');
form = form.replace(
    /borderColor: '#f4f5f7',\s*\},\s*shadowOpacity: 0\.1,\s*shadowRadius: 4,\s*elevation: 2,\s*\}/,
    "borderColor: '#f4f5f7',\n    }"
);
fs.writeFileSync('Form.jsx', form);
console.log('Fixed Form.jsx');
