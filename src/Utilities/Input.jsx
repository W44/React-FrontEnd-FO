import { forwardRef } from "react";

const Input = forwardRef(function Input({label,textarea,...props}, ref)
{
    const classStyle = 'w-full p-1 rounded-sm border-stone-300 border-b-2 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600';

    return (
        <p className="flex flex-col gap-1 my-4">
        <label className="text-sm font-bold uppercase text-stone-900">{label}</label>
        {textarea ? <textarea ref={ref} className={classStyle} {...props}></textarea> : <input ref={ref} className={classStyle} {...props}></input>}
        </p>
    );
});

export default Input;