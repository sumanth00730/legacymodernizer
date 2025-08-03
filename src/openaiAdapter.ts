import OpenAI from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: '',
});

export async function modernizeCode(prompt: string): Promise<string> {
  const response = await openai.completions.create({
    model: "text-davinci-003",
    prompt,
    max_tokens: 200,
    temperature: 0.2,
  });
  return response.choices[0].text?.trim() || '';
}

test
tesst2