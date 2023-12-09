import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI();

type Data = {
    success: boolean;
    failedReason?: any;
    answer: any;
};

const INSTRUCTIONS =
    'You are a flashcard app. You receive images containing notes from students. You need to interpret and summarize the text in the image. The summmarized text should be very consise and fitted into flashcards as list which fits the following JSON format: {"question": "", "answer": ""}. Questions must be clearly questions. For questions which have multiple answers, make sure to list them in a single response. Cover each topic in the image, but do not include any unnecessary information. Have a minimum of 6 flashcards.';

export const config = {
    api: {
        responseLimit: false,
    },
    }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    const raw = req.body;
    const b64 = decodeURIComponent(JSON.parse(raw).base64 as string);

    if (b64 === undefined) {
        res.status(400).json({
            success: false,
            failedReason: "No url provided",
            answer: "",
        });
        return;
    }

    client.chat.completions
        .create({
            model: "gpt-4-vision-preview",
            messages: [
                {
                    role: "system",
                    content: INSTRUCTIONS,
                },
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: "Use the following image to create a list of flashcards.",
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: b64,
                            },
                        },
                    ],
                },
            ],
            max_tokens: 1000,
        })
        .then((completion) => {
            const rawAnswer = completion.choices[0].message.content as string;

            const answer = JSON.parse(
                rawAnswer.substring(7, rawAnswer.length - 4),
            );

            res.status(200).json({
                success: true,
                answer: answer,
            });
        })
        .catch((reason) => {
            res.status(404).json({
                success: false,
                failedReason: reason,
                answer: "",
            });
        });
}
