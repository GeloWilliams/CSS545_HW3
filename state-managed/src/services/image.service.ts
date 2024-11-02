import { ImageItem } from '../models/model';
import { fetchData } from './axios-api.service';

const STORAGE_KEY: string = '@my_app_banners';

const imageService = {
   fetchBanners: async () => {
       return await fetchData('banners');
   },
   fetchAndCacheImages: async (): Promise<ImageItem[]> => {
       // Fetch and process your images, ensuring they match the ImageItem structure
       const response = await fetchData('banners');
       return response.map((img: any) => ({
           imageURL: img.url, 
           title: img.title,  
       }));
   },
};

export default imageService;
