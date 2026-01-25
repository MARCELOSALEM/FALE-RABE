
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getLetterNuance(letterName: string, transcription: string) {
  const prompt = `Como um professor de árabe especialista, explique brevemente (máximo 3 frases) as nuances de pronúncia da letra "${letterName}" (transcritas como ${transcription}). Forneça uma dica prática para um falante de português brasileiro. Retorne em português.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Desculpe, não consegui obter uma explicação da IA agora. Tente focar na descrição básica.";
  }
}
