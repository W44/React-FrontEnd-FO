import { useContext, useEffect, useRef, useState } from "react";
import Input from "../../Utilities/Input";
import { ButtonStyle2, ButtonStyleAdd, ModalTextStyle } from "../../Constants";
import Modal from "../../Utilities/Modal";
import { ItemListContext } from "../Contexts/ItemListContext";
import { EditListItemContext } from "../Contexts/EditListItemContext";
import { unstable_renderSubtreeIntoContainer } from "react-dom";



export default function EditItem({name,price,description,toggleEdit,children})
{
    const modalRef = useRef();
    
    const [itemName, setItemName] = useState(name);
    const [itemPrice, setItemPrice] = useState(price);
    const [itemDescription, setItemDescription] = useState(description);


    useEffect(()=>{
        setItemName(name);
        setItemPrice(price);
        setItemDescription(description);
        console.log("values set in Edit item:" + name);

    },[name,price,description]);
    return (
        <>
        <Modal ref={modalRef} buttoncaption='Close'> <h2 className={ModalTextStyle}>Validation failed, Please enter all the required fields</h2></Modal>
        <div className="w-[35rem]">
        <menu className="flex items-center justify-end gap-4 py-4">
            <li><button className={ButtonStyleAdd} >Edit</button></li>
            <li><button onClick={toggleEdit} className={ButtonStyle2} >cancel</button></li>
        </menu>
        <div>
            <Input value={itemName} onChange={(e) => setItemName(e.target.value)} label={'Name'}/>
            <Input value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} type={'number'} label={'Price'}/>
            <Input value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} textarea={true} label={'Description'}/>
        </div>
        </div>
        </>
    );



}