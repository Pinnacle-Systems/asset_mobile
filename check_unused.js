const fs = require('fs');
const path = require('path');

const prismaContent = fs.readFileSync('D:/asset_mobile/apps/api/prisma/schema.prisma', 'utf8');
const regexModel = /^\s*model\s+([A-Za-z0-9_]+)\s*\{/gm;
let models = [];
let match;
while ((match = regexModel.exec(prismaContent)) !== null) {
    models.push(match[1]);
}

let allFilesContent = '';
function collectFiles(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (dirPath.includes('node_modules') || dirPath.includes('generated') || dirPath.includes('.git')) return;
        if (fs.statSync(dirPath).isDirectory()) {
            collectFiles(dirPath);
        } else if (f.endsWith('.js') || f.endsWith('.ts') || f.endsWith('.jsx') || f.endsWith('.tsx')) {
            allFilesContent += fs.readFileSync(dirPath, 'utf8') + '\n';
        }
    });
}

collectFiles('D:/asset_mobile/apps/api/src');
collectFiles('D:/asset_mobile/apps/mobile/src');

let unused = [];
for (let m of models) {
    let lowerFirst = m.charAt(0).toLowerCase() + m.slice(1);
    
    // Check if exact model name or camelCase name exists in the collected string as a word
    let r1 = new RegExp('\\b' + m + '\\b');
    let r2 = new RegExp('\\b' + lowerFirst + '\\b');
    
    if (!r1.test(allFilesContent) && !r2.test(allFilesContent)) {
        unused.push(m);
    }
}

fs.writeFileSync('D:/asset_mobile/unused_result.txt', unused.join('\n'));
