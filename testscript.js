const fs = require('fs');
const path = require('path');

let usedKeywords = new Set();
const regex = /\b([a-zA-Z_][a-zA-Z0-9_]*)\b/gi;

function walk(dir) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (dirPath.replace(/\\/g, '/').includes('apps/api/src/generated')) return;
        
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walk(dirPath);
        } else if (/\.(js|ts|jsx|tsx)$/.test(f)) {
            let content = fs.readFileSync(dirPath, 'utf8');
            let match;
            while ((match = regex.exec(content)) !== null) {
                usedKeywords.add(match[1].toLowerCase());
            }
        }
    });
}
walk('D:/asset_mobile/apps/api/src');
walk('D:/asset_mobile/apps/mobile/src');

const prismaSchema = fs.readFileSync('D:/asset_mobile/apps/api/prisma/schema.prisma', 'utf8');
const regexModel = /^\s*model\s+([A-Za-z0-9_]+)\s*\{/gm;
let unusedModels = [];
let allModels = [];
let match;
while ((match = regexModel.exec(prismaSchema)) !== null) {
    let modelName = match[1];
    allModels.push(modelName);
    if (!usedKeywords.has(modelName.toLowerCase())) {
        unusedModels.push(modelName);
    }
}
fs.writeFileSync('unused_models.txt', unusedModels.join('\n'));
