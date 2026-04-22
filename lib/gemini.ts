import { GoogleGenAI } from "@google/genai";

import { serverEnv } from "@/lib/server-env";

const model = "gemini-2.5-flash";

export async function generatePostSummary(input: {
  title: string;
  body: string;
}) {
  if (!serverEnv.googleApiKey) {
    return "Summary unavailable";
  }

  const ai = new GoogleGenAI({
    apiKey: serverEnv.googleApiKey,
  });

  const prompt = [
    "Summarize the following blog post in approximately 200 words in a clear, reader-friendly way.",
    "Focus on the main ideas and key points.",
    `Title: ${input.title}`,
    `Body: ${input.body}`,
  ].join("\n\n");

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text?.trim() || "Summary unavailable";
  } catch (error) {
    console.error("Gemini summary generation failed", error);
    return "Summary unavailable";
  }
}
