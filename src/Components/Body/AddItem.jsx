import { useContext, useRef } from "react";
import Input from "../../Utilities/Input";
import { ButtonStyle2, ButtonStyleAdd, ModalTextStyle } from "../../Constants";
import Modal from "../../Utilities/Modal";
import { ItemListContext } from "../Contexts/ItemListContext";



export default function AddItem({name,price,description,children})
{
    const modalRef = useRef();
    const nameRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();
    const ItemCtx = useContext(ItemListContext);


    function AddItemHandler()
    {
        //async call functionality tobe added
        const itemName = nameRef.current.value;
        const itemsPrice = priceRef.current.value;
        const itemDescription = descriptionRef.current.value;
        //validation 
        if (itemName.trim() === '' || itemsPrice.trim() === '' || itemsPrice < 0 || itemDescription.trim() === '')
            {
                modalRef.current.open();
                return;
            }
        console.log("AddItemHandler: invoked");

            fetch('http://localhost:8080/api/v1/order', {
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
            }).then((response)=>{
              if (response.ok)
                  {
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
                        } catch (error) {
                          console.error('Error fetching data:', error);
                        }
                    }
                    fetchData();
                  }
                  });
        
    }
    return (
        <>
        <Modal ref={modalRef} buttoncaption='Close'> <h2 className={ModalTextStyle}>Validation failed, Please enter all the required fields</h2></Modal>
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
        </>
    );
}