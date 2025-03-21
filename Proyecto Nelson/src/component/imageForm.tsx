import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSocket } from "../hook/useSocket";

function ImageForm() {
    const [Ready, Value, send] = useSocket({ url: " ws://localhost:8080" })
    const [image, setImage] = useState<File | null>(null)
    // Handle image file selection
    const handleImageChange = (event:ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
          }
    };//

    // Handle form submission
    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (Ready && image) {
            send(image); // Send the ArrayBuffer over WebSocket
        } else {
            console.error("WebSocket is not ready or no image selected.");
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button type="submit" disabled={!Ready || !image}>
                Send Image
            </button>
            {Value && <img src={Value} />}
        </form>
    );
}
export default ImageForm;