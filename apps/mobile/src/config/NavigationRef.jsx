import { createNavigationContainerRef } from "@react-navigation/native";

export const NavRef=createNavigationContainerRef()
export function CustomNavigation(name, params) {
    if (NavRef.isReady()) {
        console.log("NavRef is ready, navigating to:", name);
        NavRef.navigate(name, params);
    } else {
        console.warn("NavRef is NOT ready! Cannot navigate to:", name);
    }
}

export function ResetNavigation(name, params) {
    if (NavRef.isReady()) {
        NavRef.reset({
            index: 0,
            routes: [{ name, params }],
        });
    } else {
        console.warn("NavRef is NOT ready! Cannot reset to:", name);
    }
}