import React, { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppStateManager = () => {
    const [appState, setAppState] = useState(AppState.currentState);
    const [currentPage, setCurrentPage] = useState(1); // Example state

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (appState.match(/inactive|background/) && nextAppState === 'active') {
                retrieveCurrentPage();
            } else if (nextAppState === 'background') {
                saveCurrentPage(currentPage);
            }
            setAppState(nextAppState);
        });

        return () => {
            subscription.remove();
        };
    }, [appState]);

    const saveCurrentPage = async (page: number) => {
        await AsyncStorage.setItem('@current_page', page.toString());
    };

    const retrieveCurrentPage = async () => {
        const savedPage = await AsyncStorage.getItem('@current_page');
        if (savedPage) {
            setCurrentPage(Number(savedPage));
        }
    };

    return null; // no need to return or render anything
};

export default AppStateManager;
