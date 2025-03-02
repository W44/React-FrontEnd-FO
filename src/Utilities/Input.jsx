import { forwardRef } from "react";

const Input = forwardRef(function Input({ label, textarea, ...props }, ref) {
  const classStyle = `
    w-full px-4 py-2 
    rounded-md border border-stone-300 bg-stone-200 text-stone-600 
    focus:outline-none focus:ring-2 focus:ring-stone-600 focus:border-stone-600 
    transition duration-300
  `;

  return (
    <p className="flex flex-col gap-2 my-4">
      <label className="text-sm font-semibold text-stone-900">{label}</label>
      {textarea ? (
        <textarea
          ref={ref}
          className={`${classStyle} resize-none`}
          {...props}
        ></textarea>
      ) : (
        <input ref={ref} className={classStyle} {...props} />
      )}
    </p>
  );
});

export default Input;
