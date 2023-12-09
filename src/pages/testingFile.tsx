import { useState } from "react";

//client.tsx
async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) return;
    let base64Img = await getBase64(file);
    if (typeof base64Img == 'string') {
        base64Img = base64Img.replace(/^data:.+base64,/, '')
    }
    return base64Img;
}

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

export default function PrivatePage(props) {
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [data, setData] = useState(null);

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];

            //setImage(i);
            setData(submit(i));
        }
    };

    return (
        <div>
            <div>
                <img src={createObjectURL} />
                {data}
                <h4>Select Image</h4>
                <input type="file" name="myImage" onChange={uploadToClient} />
                {/* <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={uploadToServer}
                >
                    Send to server
                </button> */}
            </div>
        </div>
    );
}
