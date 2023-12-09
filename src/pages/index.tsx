import Image from "next/image";
import { DM_Sans } from "next/font/google";
import { motion } from "framer-motion";
import Card from "@/pages/components/Card";

const dmsans = DM_Sans({ subsets: ["latin"] });

export default function Home() {
    function uploadImage() {
        console.log("Uploading Image...");
    }

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between ${dmsans.className}`}
        >
            <div className="fixed h-16 w-full bg-gradient-to-r from-blue-500 to-fuchsia-500 flex items-center p-6 z-40">
                <h1 className="text-2xl font-black text-white">FlashNotes</h1>
                <motion.button
                    className="hover:bg-blue-500 bg-transparent border-white hover:border-blue-500 border-2 text-white transition-colors font-bold rounded-lg px-2 py-1 ml-auto"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={uploadImage}
                >
                    Create Account
                </motion.button>
            </div>
            <div className="relative h-16"></div>
            {/* Hero Section */}
            <div className="w-full flex flex-col items-center justify-center p-12 h-80 bg-cover bg-no-repeat bg-[url('https://i.imgur.com/ZPg7m6t.jpg')]">
                <div className="absolute w-full h-80 bg-black opacity-50"></div>
                <h1 className="text-7xl font-black text-white text-center z-30">
                    Study Smarter, not Harder.
                </h1>
            </div>
            {/* Upload Section */}
            <div className="w-full p-12 h-40 flex justify-center items-center">
                <motion.button
                    className="rounded-lg bg-transparent border-green-500 border-4 duration-200 transition-colors text-green-500 hover:bg-green-500 px-8 py-2 text-3xl font-bold hover:text-white shadow-xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={uploadImage}
                >
                    Upload Image
                </motion.button>
            </div>
            <hr className="border-gray-300 w-11/12 mx-auto rounded-2xl border-2" />
            {/* Cards Section */}
            <motion.div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid gap-12 p-16"
                // animate children
                initial="hidden"
                animate="visible"
                
                >
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </motion.div>
        </main>
    );
}
