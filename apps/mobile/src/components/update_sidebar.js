const fs = require('fs');
let content = fs.readFileSync('SideBar.jsx', 'utf8');

// 1. Add PanResponder to imports
content = content.replace(
  /TouchableOpacity,/,
  `TouchableOpacity,\n  PanResponder,`
);

// 2. Add PanResponder logic inside CustomDrawer component
content = content.replace(
  /const slideAnim = useRef\(new Animated\.Value\(drawerWidth\)\)\.current;/,
  `const slideAnim = useRef(new Animated.Value(drawerWidth)).current;

  const openSidebarRef = useRef(openSidebar);
  useEffect(() => {
    openSidebarRef.current = openSidebar;
  }, [openSidebar]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dx, dy, x0 } = gestureState;
        const isOpen = openSidebarRef.current;
        
        if (!isOpen) {
           if (x0 > width - 40 && dx < -10 && Math.abs(dx) > Math.abs(dy)) {
               return true;
           }
        } else {
           if (dx > 10 && Math.abs(dx) > Math.abs(dy)) {
               return true;
           }
        }
        return false;
      },
      onPanResponderRelease: (evt, gestureState) => {
        const isOpen = openSidebarRef.current;
        if (!isOpen && gestureState.dx < -50) {
          setopenSidebar(true);
        } else if (isOpen && gestureState.dx > 50) {
          handleCloseDrawer();
        }
      },
    })
  ).current;`
);

// 3. Wrap return in PanResponder view
content = content.replace(
  /return \(\s*<>\s*\{openSidebar && \(/,
  `return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none" {...panResponder.panHandlers}>
      {openSidebar && (`
);

content = content.replace(
  /<\/Animated\.View>\s*<\/>/,
  `</Animated.View>\n    </View>`
);

fs.writeFileSync('SideBar.jsx', content);
console.log('done sidebar');
