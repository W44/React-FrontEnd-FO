import { useContext, useRef, useState } from "react";
import Input from "../../Utilities/Input";
import { ButtonStyle2, ButtonStyleAdd, ModalTextStyle } from "../../Constants";
import Modal from "../../Utilities/Modal";
import { ItemListContext } from "../Contexts/ItemListContext";
import SuccessPopup from "../../Utilities/SuccessPopup";
import { SidebarContext } from '../Contexts/SidebarContext';

export default function AddItem({ name, price, description, children }) {
    const modalRef = useRef();
    const nameRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();
    const ItemCtx = useContext(ItemListContext);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const menuCtx = useContext(SidebarContext);
    
    async function AddItemHandler() {
        const itemName = nameRef.current.value;
        const itemsPrice = priceRef.current.value;
        const itemDescription = descriptionRef.current.value;
        
        if (itemName.trim() === '' || itemsPrice.trim() === '' || itemsPrice < 0 || itemDescription.trim() === '') {
            modalRef.current.open();
            return;
        }
        
        setIsLoading(true);
        
        try {
            const response = await fetch('http://localhost:8080/api/v1/order', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": itemName,
                    "price": itemsPrice,
                    "description": itemDescription,
                    "date": "2024-03-24"
                })
            });

            if (response.ok) {
              const fetchData = async () => {
                  try {
                      const response = await fetch('http://localhost:8080/api/v1/order', {
                          headers: {
                              'Content-Type': 'application/json',
                          },
                      });
                      if (!response.ok) {
                          throw new Error('Server response caused an error');
                      }
                      const jsonData = await response.json();
                      ItemCtx.setCustomItemsRefreshed(jsonData);
                      setShowSuccess(true);
          
                      // Wait for the success popup to be visible before switching tabs
                      setTimeout(() => {
                          setShowSuccess(false);
                          menuCtx.setMenu({ type: "viewCurrent" });
                      }, 3000);
                  } catch (error) {
                      console.error('Error fetching data:', error);
                  }
              };
              await fetchData();
          }
          
        } catch (error) {
            console.error('Error adding item:', error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
                setShowSuccess(false);
                menuCtx.setMenu({ type: "viewCurrent" });
            }, 8000);
        }
    }

    return (
        <>
            <Modal ref={modalRef} buttoncaption='Close'>
                <h2 className={ModalTextStyle}>Validation failed, Please enter all the required fields</h2>
            </Modal>
            {showSuccess && <SuccessPopup message="Item added successfully!" />}
            <div className="w-[35rem]">
                <menu className="flex items-center justify-end gap-4 py-4">
                    <li>
                        <button className={ButtonStyleAdd} onClick={AddItemHandler} disabled={isLoading}>
                            {isLoading ? <span className="loader"></span> : "Add"}
                        </button>
                    </li>
                    <li>
                        <button className={ButtonStyle2}>Cancel</button>
                    </li>
                </menu>
                <div>
                    <Input ref={nameRef} label={'Name'} />
                    <Input ref={priceRef} type={'number'} label={'Price'} />
                    <Input ref={descriptionRef} textarea={true} label={'Description'} />
                </div>
            </div>
        </>
    );
}