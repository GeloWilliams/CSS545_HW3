import { ImageItem } from '../models/model';
import { fetchData } from './axios-api.service';

const STORAGE_KEY: string = '@my_app_banners';

const imageService = {
    fetchBanners: async () => {
        return await fetchData('banners');
    },

    fetchAndCacheImages: async (): Promise<ImageItem[]> => {
        const response = await fetchData('banners'); // Fetch the images
        return response.map((img: any) => ({
            imageURL: img.url, 
            title: `Page ${img.order}`  // Set title to "Page X" based on the order
        }));
    },
};

export default imageService;