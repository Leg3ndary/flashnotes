import { useState } from "react";
import { DM_Sans } from "next/font/google";
import { motion } from "framer-motion";
import Card from "@/pages/components/Card";
import Upload from "@/pages/components/Upload";

const dmsans = DM_Sans({ subsets: ["latin"] });

const containerOpen = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2,
        },
    },
};

type flashCardType = {
    question: string;
    answer: string;
};

const exampleData: flashCardType[] = [
    // write some sample questions and answers
    {
        question: "How does this project work?",
        answer: "Click on the above button to generate flash cards!",
    },
    {
        question: "What is this project built with?",
        answer: "Next.js, TailwindCSS, Framer Motion, and TypeScript.",
    },
    {
        question: "Why shouldn't I use FlashNotes?",
        answer: "No reasons at all",
    },
];

const isValidUrl = (urlString: string) => {
    try {
        return Boolean(new URL(urlString));
    } catch (e) {
        return false;
    }
};

export default function Home() {
    async function generateFlashCards(event: any) {
        if (currentUrl === "" || !isValidUrl(currentUrl)) {
            return;
        }
        setProcessing(true);

        const res = await fetch(
            `/api/chatgpt/${encodeURIComponent(currentUrl)}`,
            {
                method: "GET",
            },
        );

        const data = await res.json();

        setFlashCards(flashCards.concat(data.answer));
        setProcessing(false);
    }

    const [processing, setProcessing] = useState(false);
    const [currentUrl, setCurrentUrl] = useState("");
    const [flashCards, setFlashCards] = useState<flashCardType[]>([]);

    return (
        <main
            className={`flex min-h-screen flex-col cards-center justify-between ${dmsans.className}`}
        >
            <div className="fixed h-16 w-full bg-gradient-to-r from-blue-500 to-fuchsia-500 flex items-center p-6 z-40">
                <h1 className="text-2xl font-black text-white">FlashNotes</h1>
                {/* <motion.button
                    className="hover:bg-blue-500 bg-transparent border-white hover:border-blue-500 border-2 text-white transition-colors font-bold rounded-lg px-2 py-0.5 h-4 ml-auto"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={uploadImage}
                >
                    Create Account
                </motion.button> */}
            </div>
            <div className="relative h-16"></div>
            {/* Hero Section */}
            <div className="w-full flex flex-col justify-center h-80 bg-cover bg-no-repeat bg-[url('https://i.imgur.com/ZPg7m6t.jpg')]">
                <div className="absolute w-full h-80 bg-black opacity-50"></div>
                <h1 className="text-4xl lg:text-7xl font-black text-white text-center z-30">
                    Study Smarter, not Harder.
                </h1>
            </div>
            {/* Upload Section */}
            <div className="w-full p-12 h-auto flex flex-col items-center justify-center">
                <input
                    className="w-11/12 bg-transparent focus:outline-blue-500 mr-4 p-4 rounded-xl bg-white shadow-xl my-4 invalid:focus:outline-red-500"
                    type="url"
                    placeholder="Enter a URL to Generate Flash Cards"
                    onChange={(e) => {
                        setCurrentUrl(e.currentTarget.value);
                    }}
                />
                
                <div className="m-4 flex justify-center items-center gap-6 flex-col lg:flex-row">
                    <motion.button
                        className="hover:bg-green-500 bg-transparent border-green-500 hover:border-green-500 border-2 text-green-500 hover:text-white transition-colors font-bold rounded-lg px-4 py-1 mx-auto text-3xl flex flex-row items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={generateFlashCards}
                    >
                        {processing && (
                            <motion.svg
                                className="animate-spin h-5 w-5 mr-2"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-0"
                                    cx="16"
                                    cy="16"
                                    r="15"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                            </motion.svg>
                        )}
                        Generate
                    </motion.button>
                    <motion.button
                        className="hover:bg-red-500 bg-transparent border-red-500 hover:border-red-500 border-2 text-red-500 hover:text-white transition-colors font-bold rounded-lg px-4 py-1 mx-auto text-3xl flex flex-row items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            setFlashCards([]);
                        }}
                    >
                        Clear
                    </motion.button>
                </div>
                <Upload flashCards={flashCards} setFlashCards={setFlashCards} />
            </div>
            <hr className="border-gray-300 w-11/12 mx-auto rounded-2xl border-2" />
            {/* Cards Section */}
            <motion.div
                className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid gap-12 p-16"
                // animate children
                initial="hidden"
                animate="visible"
                variants={containerOpen}
            >
                {flashCards.map((card: flashCardType, index: number) => (
                    <Card
                        num={(index + 1) as unknown as string}
                        question={card.question}
                        answer={card.answer}
                        key={index}
                    />
                ))}
            </motion.div>
            {flashCards.length === 0 && (
                <h1 className="text-6xl font-bold text-center text-gray-300 -mt-16 mb-20">
                    Start adding flash cards above!
                </h1>
            )}
            <div className="w-full h-16 bg-gray-200 flex items-center px-12">
                <p className="text-gray-400 ml-auto">
                    Copyright 2023 Ben, Adam, Oscar
                </p>
            </div>
        </main>
    );
}
