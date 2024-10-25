import axios from 'axios';

const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const UNSPLASH_API_URL = 'https://api.unsplash.com';

// Simplificamos el servicio para usar la imagen local
export const getBodyImage = async () => {
  return '/images/body.jpg';
};

export const getPhotoCredits = async () => {
  return null;
};
