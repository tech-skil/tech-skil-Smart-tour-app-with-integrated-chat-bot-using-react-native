import axios from 'axios';
import { config } from './../../config'; // Adjust path as per your project structure

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchVideos = async (searchQuery) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        key: config.YOUTUBE_API_KEY, // Use the key from config.js
        q: searchQuery,
        type: 'video',
        part: 'snippet',
        maxResults: 10,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    throw error;
  }
};
