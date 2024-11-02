import AsyncStorage from '@react-native-async-storage/async-storage';

const storageService = {
    storeData: async (key: string, value: any) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.error('Error storing data:', e);
        }
    },

    getData: async (key: string): Promise<any | null> => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error('Error retrieving data:', e);
            return null; // Return null on error
        }
    },

    removeData: async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            console.error('Error removing data:', e);
        }
    },
};

export default storageService;
