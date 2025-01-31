import { useState, useEffect } from 'react';

const AboutPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasOpened = localStorage.getItem('aboutPopupOpened');
    if (!hasOpened) {
      setIsOpen(true);
      localStorage.setItem('aboutPopupOpened', 'true');
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
          <h2 className="text-lg font-bold text-gray-900">About This App</h2>
          <p className="mt-2 text-gray-700">This is a concept project for a food-sharing web application.</p>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300"
            onClick={closePopup}
          >
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default AboutPopup;
