import React, { useEffect, useCallback, useState } from 'react';
import { View, Image, StyleSheet, Text, Button, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import imageService from '../services/image.service';
import storageService from '../services/storage.service';
import { ImageItem } from '../models/model';

const STORAGE_KEY = 'your_storage_key';
const StoryPage: React.FC = () => {
    const { theme } = useTheme();
    const [images, setImages] = useState<ImageItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const loadImages = useCallback(async () => {
        setLoading(true);
        try {
            const cachedImages = await storageService.getData(STORAGE_KEY);
            if (cachedImages) {
                setImages(cachedImages);
            } else {
                const newImages: ImageItem[] = await imageService.fetchAndCacheImages();
                setImages(newImages);
            }
        } catch (err) {
            setError('Error loading images');
            console.error('Error loading images:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadImages();
    }, []); 

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
                <Button title="Retry" onPress={loadImages} color={theme.buttonColor} />
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
