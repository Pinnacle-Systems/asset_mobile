const fs = require('fs');
const path = require('path');

const prismaSchema = fs.readFileSync('D:/asset_mobile/apps/api/prisma/schema.prisma', 'utf8');
const models = [];
const regex = /^\s*model\s+([A-Za-z0-9_]+)\s*\{/gm;
let match;
while ((match = regex.exec(prismaSchema)) !== null) {
    models.push(match[1]);
}

let usedModels = new Set();
function walk(dir, exclude) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (exclude && dirPath.includes(exclude)) return;
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walk(dirPath, exclude);
        } else if (f.endsWith('.js') || f.endsWith('.ts') || f.endsWith('.jsx') || f.endsWith('.tsx')) {
            let content = fs.readFileSync(dirPath, 'utf8');
            for (let model of models) {
                let propName = model.charAt(0).toLowerCase() + model.slice(1);
                // check if exact model name or propName appears in the file
                // as a word boundary
                let regexModel = new RegExp('\\b' + model + '\\b', 'g');
                let regexProp = new RegExp('\\b' + propName + '\\b', 'g');
                if (regexModel.test(content) || regexProp.test(content)) {
                    usedModels.add(model);
                }
            }
        }
    });
}
walk('D:/asset_mobile/apps/api/src', 'generated');
walk('D:/asset_mobile/apps/mobile/src');

const unusedModels = models.filter(m => !usedModels.has(m));
console.log(unusedModels.join('\n'));
