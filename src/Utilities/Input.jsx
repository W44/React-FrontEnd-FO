import { forwardRef, useState, useImperativeHandle, useRef } from "react";
import { Filter } from "bad-words";
import "./Input.css"


const filter = new Filter();


const Input = forwardRef(function Input({ label, textarea, tooltip, ...props }, ref) {
  const classStyle = `
    w-full px-4 py-2 
    rounded-md border border-stone-300 bg-stone-200 text-stone-600 
    focus:outline-none focus:ring-2 focus:ring-stone-600 focus:border-stone-600 
    transition duration-300
  `;

  const inputRef = useRef(null);

  const [error, setError] = useState("");

  useImperativeHandle(ref, () => ({
    getError: () => error,
    getValue: () => inputRef.current.value.trim(),
    clearValue: () => {
      if (inputRef.current) {
        inputRef.current.value = "";
        setError("");
      }
    },
  }), [error]);

  function InputHandler(value) {
    if (filter.isProfane(value)) {
      setError("Profanity is not allowed.");
    } else {
      setError("");
    }
  }

  return (
    <div className="flex flex-col gap-2 my-4">
      <label className="text-sm font-semibold text-stone-900">{label}
        {tooltip && (
          <span className="tooltip-icon" style={{ marginLeft: "5px", position: "relative" }}>
            ℹ️
            <span className="tooltip">{tooltip}</span>
          </span>
        )}


      </label>
      {textarea ? (
        <>
          <textarea
            ref={inputRef}
            className={`${classStyle} resize-none`}
            onChange={(e) => InputHandler(e.target.value)}
            {...props}
          ></textarea>
          {error && <p className="text-red-700 font-bold">{error}</p>}
        </>
      ) : (
        <>
          <input ref={inputRef} className={classStyle} onChange={(e) => InputHandler(e.target.value)} {...props} />
          {error && <p className="text-red-700 font-bold">{error}</p>}
        </>
      )}
    </div>
  );
});

export default Input;
