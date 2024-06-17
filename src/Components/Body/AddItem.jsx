import { useRef } from "react";
import Input from "../../Utilities/Input";
import { ButtonStyle2, ButtonStyleAdd } from "../../Constants";



export default function AddItem({name,price,description,children})
{
    const nameRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();

    function AddItemHandler()
    {
        //async call functionality tobe added
        const itenName = nameRef.current.value;
        const itemsPrice = priceRef.current.value;
        const itemDescription = descriptionRef.current.value;
        console.log("AddItemHandler: invoked");
        return true;
    }
    return (
        <div className="w-[35rem]">
        <menu className="flex items-center justify-end gap-4 py-4">
            <li><button className={ButtonStyleAdd} onClick={AddItemHandler}>Add</button></li>
            <li><button className={ButtonStyle2} >cancel</button></li>
        </menu>
        <div>
            <Input ref={nameRef} label={'Name'}/>
            <Input ref={priceRef} type={'number'} label={'Price'}/>
            <Input ref={descriptionRef} textarea={true} label={'Description'}/>
        </div>
        </div>
    );
}