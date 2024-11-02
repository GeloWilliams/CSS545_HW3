import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, Button, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useTheme } from '../context/ThemeContext';

import imageService from '../services/image.service';
import * as storageService from '../services/storage.service';

const STORAGE_KEY = 'cachedImages';

const StoryPage = () => {
    const { theme } = useTheme();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadImages = async () => {
            setLoading(true);
            try {
                const cachedImages = await storageService.getData(STORAGE_KEY);
                if (cachedImages) {
                    setImages(cachedImages);
                } else {
                    setImages([]);
                    await fetchAndCacheImages();
                }
            } catch (err) {
                setError('Error loading images');
                console.error('Error loading images:', err);
            } finally {
                setLoading(false);
            }
        };
        loadImages();
    }, []);

    const fetchAndCacheImages = async () => {
        try {
            const response = await imageService.fetchBanners();
            console.log('Fetched banners response:', response);
            if (Array.isArray(response)) {
                const newImages = await Promise.all(
                    response.map(async (img) => {
                        try {
                            const fileUri = `${FileSystem.cacheDirectory}${img.title}.jpg`;
                            const downloadResult = await FileSystem.downloadAsync(img.url, fileUri);
                            console.log(`Download succeeded for ${img.title}:`, downloadResult.uri);
                            return { imageURL: downloadResult.uri, title: img.title };
                        } catch (downloadErr) {
                            console.error(`Failed to download ${img.title}:`, downloadErr);
                            return null;
                        }
                    })
                );
                const filteredImages = newImages.filter(img => img !== null);
                setImages(filteredImages);
                console.log('Set images state with:', filteredImages);
                await storageService.storeData(STORAGE_KEY, filteredImages);
            } else {
                setError('Error: Invalid response structure');
            }
        } catch (err) {
            setError('Error fetching images');
            console.error('Error fetching images:', err.message);
        } finally {
            setLoading(false);
            console.log('Loading set to false');
        }
    };
    

    const { width } = Dimensions.get('window');

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
                <ActivityIndicator size="large" color={theme.textColor} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
                <Text style={{ color: theme.textColor }}>{error}</Text>
                <Button title="Retry" onPress={fetchAndCacheImages} color={theme.buttonColor} />
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <ScrollView horizontal pagingEnabled>
                {images.map((item, index) => (
                    <View key={index} style={styles.carouselItem}>
                        <Image source={{ uri: item.imageURL }} style={styles.image} />
                        <Text style={[styles.title, { color: theme.textColor }]}>{item.title}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    carouselItem: { width: Dimensions.get('window').width, alignItems: 'center' },
    image: { width: '100%', height: 400, resizeMode: 'contain' },
    title: { marginTop: 10, fontSize: 18 },
});

export default StoryPage;
