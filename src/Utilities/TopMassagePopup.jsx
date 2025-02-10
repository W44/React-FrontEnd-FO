import { useEffect } from "react";

export default function TopMassagePopup({ message, color = "green" }) {
    /*useEffect(() => {
        const timer = setTimeout(() => {
            document.getElementById("success-popup")?.classList.add("hidden");
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
*/
    return (
        <div id="success-popup" className={`fixed top-5 right-5 text-white px-4 py-2 rounded shadow-lg opacity-100 z-50 ${
            color === "green" ? "bg-green-500" : "bg-red-500"
          }`}>
            {message}
        </div>
    );
}
