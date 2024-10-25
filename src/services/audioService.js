import { TextToSpeechClient } from '@google-cloud/text-to-speech';

const client = new TextToSpeechClient({
  projectId: process.env.REACT_APP_GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.REACT_APP_GOOGLE_CLOUD_API_KEY
});

export const generateAudio = async (text, language = 'en-US') => {
  try {
    const request = {
      input: { text },
      voice: { languageCode: language, ssmlGender: 'NEUTRAL' },
      audioConfig: { audioEncoding: 'MP3' },
    };

    const [response] = await client.synthesizeSpeech(request);
    return response.audioContent;
  } catch (error) {
    console.error('Error generating audio:', error);
    return null;
  }
};
