import { motion } from "framer-motion";
import { useState } from "react";

const itemOpen = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

export default function Card({num, question, answer}: {num: string, question: string, answer: string}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            className="bg-white rounded-lg shadow-xl p-8 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            variants={itemOpen}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">{isOpen ? "Answer" : "Question"}</h1>
                {/* <motion.button
                    className="hover:bg-blue-500 bg-transparent border-blue-500 hover:border-blue-500 border-2 text-blue-500 hover:text-white transition-colors font-bold rounded-lg px-2 py-0.5 ml-auto"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onExplain}
                >
                    Check
                </motion.button> */}
            </div>
            <div className="w-full bg-gray-200 h-1 rounded-xl my-2" />
            <p className="text-gray-600 mt-2 text-xl">
                {isOpen ? answer : question}
            </p>
        </motion.div>
    );
}
