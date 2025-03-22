import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSocket } from "../hook/useSocket";

function ImageForm() {
    const [Ready, Value, send] = useSocket({ url: " ws://localhost:8080" })
    const [income, setIncome] = useState<string>("")
    // Handle image file selection
    const handleImageChange = (event:ChangeEvent<HTMLInputElement>) => {
        setIncome(()=>event.target.value)
    };//

    // Handle form submission
    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (Ready && income) {
            send(income.trim()); // Send the ArrayBuffer over WebSocket
        } else {
            console.error("WebSocket is not ready or no image selected.");
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="number"value={income} onChange={handleImageChange} />
            <button type="submit" disabled={!Ready || !income}>
                Sacar Total
            </button>
            {Value && <h1>Total de impuestos:{JSON.parse(Value)?.afterTaxIncome}</h1>}
        </form>
    );
}
export default ImageForm;