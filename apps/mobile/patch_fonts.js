const fs = require('fs');
const glob = require('fs').readdirSync;
const path = require('path');

const screensDir = 'd:/asset_mobile/apps/mobile/src/screens';
const files = ['AuditReport.jsx', 'AssetAudit.jsx', 'Splash.jsx'];

files.forEach(file => {
    const filePath = path.join(screensDir, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    if (!content.includes("from '../theme/index'") && !content.includes("from '../../theme/index'")) {
        content = content.replace(/import React/, "import { theme } from '../theme/index';\nimport React");
    }

    // Inject bold font families
    content = content.replace(/(fontWeight:\s*['"](?:bold|700|800)['"](?:,\s*\n*|\n\s*)*)(?!.*fontFamily)/g, "$1fontFamily: theme.fonts.bold,\n    ");

    // Inject semiBold
    content = content.replace(/(fontWeight:\s*['"](?:600|500)['"](?:,\s*\n*|\n\s*)*)(?!.*fontFamily)/g, "$1fontFamily: theme.fonts.semiBold,\n    ");

    // Inject regular (any fontSize line without fontWeight below it, roughly)
    content = content.replace(/(\bfontSize:\s*\d+,?(?:,\s*\n*|\n\s*)*)(?!.*fontWeight)(?!.*fontFamily)/g, "$1fontFamily: theme.fonts.regular,\n    ");

    fs.writeFileSync(filePath, content);
    console.log('Patched ' + file);
});
