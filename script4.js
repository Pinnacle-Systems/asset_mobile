const fs = require('fs');
const path = require('path');

let usedKeywords = new Set();
const regex = /\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g;

function walk(dir, exclude) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (exclude && dirPath.includes(exclude)) return;
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walk(dirPath, exclude);
        } else if (f.endsWith('.js') || f.endsWith('.ts') || f.endsWith('.jsx') || f.endsWith('.tsx')) {
            let content = fs.readFileSync(dirPath, 'utf8');
            let match;
            while ((match = regex.exec(content)) !== null) {
                usedKeywords.add(match[1].toLowerCase());
            }
        }
    });
}
walk('D:/asset_mobile/apps/api/src', 'generated');

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
console.log(unusedModels.join('\n'));
