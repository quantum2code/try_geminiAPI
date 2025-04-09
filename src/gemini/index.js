import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
console.log(process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function getGeminiResponse(imgRes) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    config: {
      systemInstruction: "Describe the image under max 100 words",
      temperature: 1,
    },
    contents: {
      inlineData: {
        data: Buffer.from(imgRes).toString("base64"),
        mimeType: "image/jpeg",
      },
    },
  });
  return response;
}

export default getGeminiResponse;
