import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI();

type Data = {
    key: string;
    answer: string;
};

const INSTRUCTIONS =
    "You will be given notes and you will make a list of flashcards for it. A flashcard should include the name and the description and the description should not be longer than 20 words. The format of the flashcard should strictly be in this order: 'number. name - description'";

const note = "Because the Keychron k6 is case mounted in essentially just thin plastic, it does have quite a hollow feeling to it. Adding tactile switches and somewhat weightier XVX keycaps did help though and I thought the overall sound wasn’t that bad. Without these upgrades, the board was probably not for me. The Aluminum frame I imagine would add some weight to it so I’d have to recommend going for that one. The Board itself is a pretty cute, compact lightweight desk companion and even though I’d rate the K2 much higher for a marginally higher price point, it’d be a fine starter board if you just wanted to fool around with some cool looking keycaps and fiddle with some switches. It does have 2 mode connectivity, boasting both wireless and wired connection which is always handy."
    
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    const completion = await client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: INSTRUCTIONS,
            },
            {
                role: "user",
                content: note,
            },
        ],
    });

    const answer = completion.choices[0].message.content;

    res.status(200).json({
        key: process.env.OPENAI_API_KEY || "",
        answer: answer,
    });
}
