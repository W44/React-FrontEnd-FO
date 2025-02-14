import { useEffect } from "react";


export default function ErrorFallback({ error, resetErrorBoundary }) {
  useEffect(() => {
    console.error("Error caught by boundary:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100 text-red-800">
      <div className="p-6 max-w-md bg-white shadow-md rounded-lg text-center">
        <h1 className="text-2xl font-bold">Oops! Something went wrong.</h1>
        <p className="mt-2">{error.message}</p>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          onClick={resetErrorBoundary}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
