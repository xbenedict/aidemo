
import { GoogleGenAI, GenerateContentResponse, Content } from "@google/genai";
import { GEMINI_MODEL_TEXT } from '../constants';
import { GeminiResponse } from '../types';

// Hardcode the API key for testing purposes
const apiKey = "AIzaSyA-uI79muGP72Nj_J9SW6a6vlIWdYKOstY";

// No need to check for apiKey here as it's hardcoded
// if (!apiKey) {
//   console.error("API_KEY is not set in environment variables. Gemini API calls will fail.");
// }

const ai = new GoogleGenAI({ apiKey: apiKey });

export async function generateContentWithPrompt<T,>(promptText: string): Promise<GeminiResponse<T>> {
  // No need for this check either as apiKey is always present
  // if (!apiKey) {
  //   return { error: "API Key is not configured. Cannot connect to Gemini service." };
  // }

  try {
    const requestContents: Content[] = [{ parts: [{ text: promptText }] }];

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: requestContents,
      config: {
        responseMimeType: "application/json",
      },
    });

    let jsonStr = response.text.trim();
    
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    try {
      const parsedData: T = JSON.parse(jsonStr);
      return { data: parsedData };
    } catch (parseError) {
      console.error("Failed to parse JSON response from Gemini:", parseError);
      console.error("Raw response text:", response.text);
      return { error: `Failed to parse AI response. Raw text: ${response.text}` };
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        if (error.name === 'NotSupportedError' && error.message.includes('ReadableStream uploading is not supported')) {
             return { error: `Safari/Proxy Compatibility Error: ${error.message}. Please try a different browser or check proxy configuration.` };
        }
        return { error: `Gemini API error: ${error.message}` };
    }
    return { error: "An unknown error occurred with the Gemini API." };
  }
}
