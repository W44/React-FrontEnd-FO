import { useState, useContext } from "react";
import AuthContext from "../Contexts/AuthContext";

export default function Header() {
    const { user, logout } = useContext(AuthContext); 
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full bg-gray-800 text-yellow-500 text-3xl font-serif italic p-4 shadow-md z-50 flex justify-between items-center px-6">
            
           
            <div className="text-center text-2xl">FS</div>

           
            <div 
                className="relative cursor-pointer text-xl"
                onClick={() => setDropdownOpen((prev) => !prev)}
                    // onBlur={(e) => {
                    //     if (!dropdownRef.current.contains(e.relatedTarget)) {
                    //         setDropdownOpen(false);
                    //     }
                    // }}
            >
                {user?.username || "Guest"} ⏷

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-gray-700 text-white shadow-lg rounded-md py-2">
                        <button 
                            onClick={logout} 
                            className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
