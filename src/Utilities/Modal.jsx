import { forwardRef, useImperativeHandle, useRef } from "react"
import {createPortal} from 'react-dom'
import { ButtonStyle1 } from "../Constants";



const Modal = forwardRef(function Modal({children, buttoncaption}, ref)
{
    const dialog = useRef();
useImperativeHandle(ref,() =>
{
    return{
        open()
        {
            dialog.current.showModal();
        }
    }

});


    return createPortal(
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
            {children}
            <form method="dialog" className="mt-4 text-right">
                <button className={ButtonStyle1}>{buttoncaption}</button>
            </form>
        </dialog>,
        document.getElementById('modal-root')
    );

});


export default Modal;