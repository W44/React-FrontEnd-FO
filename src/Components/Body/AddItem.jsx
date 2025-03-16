import { useContext, useRef, useState } from "react";
import Input from "../../Utilities/Input";
import { ButtonStyle2, ButtonStyleAdd, MenuSelect, ModalTextStyle } from "../../Constants";
import Modal from "../../Utilities/Modal";
import { ItemListContext } from "../Contexts/ItemListContext";
import TopMassagePopup from "../../Utilities/TopMassagePopup";
import { SidebarContext } from '../Contexts/SidebarContext';
import AuthContext from "../Contexts/AuthContext";
import { URL } from "../../Constants";

export default function AddItem({ name, price, description, children }) {
    const modalRef = useRef();
    const nameRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();
    const ItemCtx = useContext(ItemListContext);
    const menuCtx = useContext(SidebarContext);
    const authContext = useContext(AuthContext)
    
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    
    function CancelClickHandler()
    {
        const itemName = nameRef.current.clearValue();
        const itemsPrice = priceRef.current.clearValue();
        const itemDescription = descriptionRef.current.clearValue();
    }
    async function AddItemHandler() {
        const itemName = nameRef.current.getValue();
        const itemsPrice = priceRef.current.getValue();
        const itemDescription = descriptionRef.current.getValue();
        const itemNameProfanity = nameRef.current.getError();
        const itemDescriptionProfanity = nameRef.current.getError();
        
        if (!itemName || !itemsPrice || itemsPrice < 0 || !itemDescription || itemNameProfanity || itemDescriptionProfanity ) {
            modalRef.current.open();
            return;
        }
        
        setIsLoading(true);

        try {
            const response = await fetch(URL+'/api/v1/order', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authContext.token}`
                },
                body: JSON.stringify({
                    "name": itemName,
                    "price": itemsPrice,
                    "description": itemDescription,
                    "date": "2024-03-24",
                    "isactive": true,
                    "userId": authContext.userId
                })
            });

            if (!response.ok) throw new Error('Failed to add item');

            const fetchData = async () => {
                try {
                    const response = await fetch(URL+'/api/v1/order/active', {
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authContext.token}` 
                        },
                    });
                    if (!response.ok) throw new Error('Error fetching items');

                    const jsonData = await response.json();
                    ItemCtx.setCustomItemsRefreshed(jsonData);

                    // Show success message
                    setShowSuccess(true);
                    
                    setTimeout(() => {
                        setShowSuccess(false);
                        menuCtx.setMenu({ type: MenuSelect.View_Current });
                    }, 3000);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setShowError(true);
                    setTimeout(() => {
                        setShowError(false);
                    }, 3000);
                }
            };
            await fetchData();
            
        } catch (error) {
            console.error('Error adding item:', error);
            console.error('Error fetching data:', error);
                    setShowError(true);
                    setTimeout(() => {
                        setShowError(false);
                    }, 3000);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    }

    return (
        <>
            <Modal ref={modalRef} buttoncaption='Close'>
                <h2 className={ModalTextStyle}>Validation failed, Please enter all the required fields or remove profanity.</h2>
            </Modal>

            {showSuccess && <TopMassagePopup message="Item added successfully!" color="green" />}
            {showError && <TopMassagePopup message="Item failed to add!" color="red" />}


            <div className="w-[35rem]">
                <menu className="flex items-center justify-end gap-4 py-4">
                    <li>
                        <button className={ButtonStyleAdd} onClick={AddItemHandler} disabled={isLoading}>
                            {isLoading ? <span className="loader"></span> : "Add"}
                        </button>
                    </li>
                    <li>
                        <button className={ButtonStyle2} onClick={CancelClickHandler}>Reset</button>
                    </li>
                </menu>
                <div>
                    <Input ref={nameRef} tooltip={"Write the item name that you want to order."} label={'Name'} />
                    <Input ref={priceRef} tooltip={"Write the item price that you want to order."} type={'number'} label={'Price'} />
                    <Input ref={descriptionRef} tooltip={"Write the item decsription that you want to order."} textarea={true} label={'Description'} />
                </div>
            </div>
        </>
    );
}
