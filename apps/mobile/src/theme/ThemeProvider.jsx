import React, { useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from './index';
import { ThemeContext } from '../contexts/ThemeContext';

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Load saved theme from storage
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('appThemeMode');
                if (savedTheme) {
                    setIsDarkMode(savedTheme === 'dark');
                } else {
                    // Fallback to system preference
                    const colorScheme = Appearance.getColorScheme();
                    setIsDarkMode(colorScheme === 'dark');
                }
            } catch (e) {
                console.error('Failed to load theme preference', e);
            }
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        try {
            const newMode = !isDarkMode;
            setIsDarkMode(newMode);
            await AsyncStorage.setItem('appThemeMode', newMode ? 'dark' : 'light');
        } catch (e) {
            console.error('Failed to save theme preference', e);
        }
    };

    // Construct current theme dynamically. Since we define `theme` in index.js, 
    // we could potentially swap the `colors` object if dark mode is active.
    // In our simplified setup, we'll patch `theme` with dark colors here if needed.
    const activeTheme = {
        ...theme,
        colors: isDarkMode ? theme.darkColors : theme.lightColors,
        isDarkMode
    };

    return (
        <ThemeContext.Provider value={{ theme: activeTheme, isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
