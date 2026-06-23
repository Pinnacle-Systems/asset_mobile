const fs = require('fs');
let content = fs.readFileSync('index.jsx', 'utf8');

// The issue was a duplicate trailing block in styles.tabContainer
// Let's just find and replace it
content = content.replace(
    /borderColor: '#f0f0f0',\s*\},\s*shadowOpacity: 0\.1,\s*shadowRadius: 4,\s*position: 'relative',\s*\}/g,
    "borderColor: '#f0f0f0',\n    }"
);

fs.writeFileSync('index.jsx', content);
console.log('Fixed index.jsx');
