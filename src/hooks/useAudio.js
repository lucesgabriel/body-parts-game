import { useCallback, useEffect, useState } from 'react';

export const useAudio = () => {
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const playAudio = useCallback((text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Buscar la mejor voz en inglés americano
    const preferredVoice = voices.find(
      voice => 
        voice.lang === 'en-US' && 
        (voice.name.includes('Google') || 
         voice.name.includes('English (United States)') ||
         voice.name.includes('Samantha'))
    ) || voices.find(voice => voice.lang === 'en-US');

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Configuración base
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Limpiar cualquier utterance anterior
    window.speechSynthesis.cancel();
    
    // Reproducir el nuevo audio
    window.speechSynthesis.speak(utterance);
  }, [voices]);

  // Función para detener el audio si es necesario
  const stopAudio = useCallback(() => {
    window.speechSynthesis.cancel();
  }, []);

  return { playAudio, stopAudio };
};
