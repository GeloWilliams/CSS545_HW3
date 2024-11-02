import { fetchData } from './axios-api.service';

/* imageService
   - acts as a wrapper class for axios-api service
   - filters/restricts fetchData requests to images */
const imageService = {
   fetchBanners: async () => {
      return await fetchData('banners');
   },
};

export default imageService;