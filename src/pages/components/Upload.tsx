import type { NextPage } from "next";
import { motion } from "framer-motion";
import { useState } from "react";


// The upload component for our webpage
const Upload: NextPage = ({ flashCards, setFlashCards }) => {
    // Processing the image into a base64 string
    const [base64, setBase64] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            console.log("no file sreturn");
            return;
        }
        const file = e.target.files[0];

        const base64 = await toBase64(file as File);
        setBase64(base64 as string);
        setProcessing(true);

        const res = await fetch(`/api/chatgpt-b64/base64`, {
            method: "POST",
            body: JSON.stringify({
                base64: encodeURIComponent(base64 as string),
            }),
        });

        const data = await res.json();

        setFlashCards(flashCards.concat(data.answer));
        setBase64("");
        setProcessing(false);
    };

    const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.currentTarget.value = "";
    };

    return (
        <>
            <form
                className="flex justify-center items-center gap-4"
                method="POST"
                encType="multipart/form-data"
            >
                <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={onFileChange}
                    onClick={onClick}
                    className="hidden"
                    id="files"
                />
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
                <label
                    className="hover:bg-blue-500 cursor-pointer bg-transparent border-blue-500 hover:border-blue-500 border-2 text-blue-500 hover:text-white transition-colors font-bold rounded-lg px-4 py-1 mx-auto text-3xl flex flex-row items-center justify-center"
                    htmlFor="files"
                >
                    Generate from File
                </label>
            </form>
            {base64 && (
                <img
                    src={base64}
                    alt="Uploaded Image"
                    className="w-1/2 my-4 mt-8"
                />
            )}
        </>
    );
};


// Helper function to convert a file to a base64 string
const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

export default Upload;
