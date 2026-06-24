const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const targetDir = 'apps/mobile/src/redux';
const files = [];

// Helper to recursively get all files
function walkDir(dir) {
    const list = fs.readdirSync(dir); 
    for (const item of list) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walkDir(fullPath);
        } else {
            if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
                files.push(fullPath);
            }
        }
    }
}

walkDir(targetDir);
console.log(`Checking ${files.length} files in redux folder...`);

let removedCount = 0;

files.forEach(fullPath => {
    const relativePath = path.relative(targetDir, fullPath).replace(/\\/g, '/');
    const base = path.parse(relativePath).name;

    // Skip index and store files
    if (base.toLowerCase() === 'index' || base.toLowerCase() === 'store') return;

    try {
        const rawOut = cp.execSync(`git grep -i -E "${base}" apps/mobile/`).toString();
        const lines = rawOut.trim().split('\n').filter(line => !line.includes(fullPath.replace(/\\/g, '/')));

        if (lines.length === 0) {
            console.log('REMOVING (No mentions found): ' + relativePath);
            fs.unlinkSync(fullPath);
            removedCount++;
        }
    } catch (e) {
        if (e.status === 1) { // git grep returned 1 (not found)
            console.log('REMOVING (Not found anywhere): ' + relativePath);
            fs.unlinkSync(fullPath);
            removedCount++;
        }
    }
});

console.log(`Total removed: ${removedCount}`);
