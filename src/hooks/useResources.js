import { useState, useEffect } from 'react';

export const useResources = (bodyParts) => {
  const [resources, setResources] = useState({
    bodyImage: '/images/body-outline.png', // Imagen estática
    audioFiles: {},
    loading: false,
    error: null
  });

  useEffect(() => {
    const loadResources = async () => {
      try {
        // Usar Web Speech API en lugar de archivos de audio
        setResources({
          bodyImage: '/images/body-outline.png',
          audioFiles: {},
          loading: false,
          error: null
        });
      } catch (error) {
        setResources(prev => ({
          ...prev,
          loading: false,
          error: 'Error loading resources'
        }));
      }
    };

    loadResources();
  }, [bodyParts]);

  return resources;
};
