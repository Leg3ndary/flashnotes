import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI();

type Data = {
    key: string;
    answer: string;
};

const INSTRUCTIONS = "Interpret and summarize the text in this image.";
const PROMPT = "ok";
let image_url = "";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    const completion = await client.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
            {
                role: "system",
                content: INSTRUCTIONS,
            },
            {
                role: "user",
                content: [
                    { type: "text", text: "Interpret and summarize the text in this image." },
                    {
                        type: "image_url",
                        image_url: {
                            url: image_url,
                        },
                    },
                ],
            }, 
        ],
        max_tokens:500
    });

    const answer = completion.choices[0].message.content;

    res.status(200).json({
        key: process.env.OPENAI_API_KEY || "",
        answer: answer,
    });
}
