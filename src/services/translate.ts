import axios from 'axios';
import { Language } from '../types';

const COHERE_API_KEY = 'gZXeYbyWWXfd3G4RdC4jHjbON47SHccSnoZmO0T5';
const COHERE_API_URL = 'https://api.cohere.ai/v1/chat';

export const translateText = async (text: string, targetLanguage: Language): Promise<string> => {
  try {
    const response = await axios.post(
      COHERE_API_URL,
      {
        message: `Translate the following text to ${targetLanguage}: '${text}'`,
        model: 'command-r-plus'
      },
      {
        headers: {
          'Authorization': `Bearer ${COHERE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.text;
  } catch (error) {
    console.error('Error translating text:', error);
    throw new Error('Failed to translate text');
  }
}
