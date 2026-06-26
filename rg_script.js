const { execSync } = require('child_process');
const fs = require('fs');

const prismaSchema = fs.readFileSync('D:/asset_mobile/apps/api/prisma/schema.prisma', 'utf8');
const regexModel = /^\s*model\s+([A-Za-z0-9_]+)\s*\{/gm;
let models = [];
let match;
while ((match = regexModel.exec(prismaSchema)) !== null) {
    models.push(match[1]);
}

let unusedModels = [];
for (let model of models) {
    try {
        let output = execSync('git grep -il "\\b' + model + '\\b" || true', { encoding: 'utf8' });
        let lines = output.trim().split('\n');
        let used = false;
        for (let line of lines) {
            line = line.replace(/\\/g, '/');
            if (!line) continue;
            // if line is not schema.prisma, and not generated, and not migrations
            if (!line.includes('apps/api/prisma/schema.prisma') &&
                !line.includes('/generated/') &&
                !line.includes('.sql')) {
                used = true;
                break;
            }
        }
        if (!used) unusedModels.push(model);
    } catch (e) {
        // grep fails if nothing found
        unusedModels.push(model);
    }
}
fs.writeFileSync('D:/asset_mobile/real_unused.txt', unusedModels.join('\n'));
