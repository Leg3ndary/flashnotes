import { motion } from "framer-motion";

export default function Card() {
    return (
        <motion.div
            className="bg-white rounded-lg shadow-xl p-4"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">Card Title</h1>
                <motion.button
                    className="hover:bg-blue-500 bg-transparent border-blue-500 hover:border-blue-500 border-2 text-blue-500 hover:text-white transition-colors font-bold rounded-lg px-2 py-1 ml-auto"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Edit
                </motion.button>
            </div>
            <p className="text-gray-600 mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                tempora quibusdam voluptatum, quos illum, voluptates
                exercitationem, fugiat doloribus quas natus quod. Quaerat
                voluptatem quidem, voluptate voluptatibus quibusdam quos
                voluptatum. Quod. SOME CARD TEXT
            </p>
        </motion.div>
    );
}
