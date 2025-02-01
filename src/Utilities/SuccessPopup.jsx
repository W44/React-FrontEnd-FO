import { useEffect } from "react";

export default function SuccessPopup({ message }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            document.getElementById("success-popup").classList.add("hidden");
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div id="success-popup" className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
            {message}
        </div>
    );
}
