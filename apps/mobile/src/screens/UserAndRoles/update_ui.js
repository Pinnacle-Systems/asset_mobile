const fs = require('fs');
let content = fs.readFileSync('d:/asset_mobile/apps/mobile/src/screens/UserAndRoles/index.jsx', 'utf8');

content = content.replace(
  '<Animated.View style={[styles.activeIndicator, { left: indicatorLeft }]} />',
  `<Animated.View style={[styles.activeIndicator, { left: indicatorLeft }]}>
      <LinearGradient 
          colors={['#4facfe', '#00f2fe']} 
          start={{x: 0, y: 0}} end={{x: 1, y: 1}} 
          style={StyleSheet.absoluteFill} 
      />
  </Animated.View>`
);

content = content.replace(/role && role!="others" && styles\.activeTab,/g, '');
content = content.replace(/!role && role!="others" && styles\.activeTab,/g, '');
content = content.replace(/others && styles\.activeTab,/g, '');

content = content.replace(/activeTab: {[\s\S]*?},/, '');

content = content.replace(
  /activeIndicator: {[\s\S]*?},/,
  `activeIndicator: {
        position: 'absolute',
        top: 6,
        bottom: 6,
        width: '32%',
        marginLeft: '0.66%',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#4facfe',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },`
);

content = content.replace(
  /tabContainer: {[\s\S]*?},/,
  `tabContainer: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        margin: 16,
        marginBottom: 0,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        position: 'relative',
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },`
);

content = content.replace(
  /tabButtonText: {[\s\S]*?},/,
  `tabButtonText: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
        color: '#777',
    },`
);

fs.writeFileSync('d:/asset_mobile/apps/mobile/src/screens/UserAndRoles/index.jsx', content);
console.log('UI updated for index.jsx');
