import { useContext, useEffect, useRef, useState } from "react";
import Input from "../../Utilities/Input";
import { ButtonStyle2, ButtonStyleAdd, ModalTextStyle } from "../../Constants";
import Modal from "../../Utilities/Modal";
import { ItemListContext } from "../Contexts/ItemListContext";
import { EditListItemContext } from "../Contexts/EditListItemContext";
import AuthContext from "../Contexts/AuthContext";
import { URL as Base_URL } from "../../Constants";



export default function EditItem({id, name,price,description,toggleEdit,children})
{

    const ItemCtx = useContext(ItemListContext);
    const authContext = useContext(AuthContext);

    const modalRef = useRef();
    
    //const [itemId, setItemId] = useState(id);
    const [itemName, setItemName] = useState(name);
    const [itemPrice, setItemPrice] = useState(price);
    const [itemDescription, setItemDescription] = useState(description);


    useEffect(()=>{
        //setItemId(id);
        setItemName(name);
        setItemPrice(price);
        setItemDescription(description);
        console.log("values set in Edit item:" + name);

    },[name,price,description]);


    function editClickHandler()
    {
        const url = new URL(Base_URL+'/api/v1/order/' + id);
        url.searchParams.append('name', itemName);
        url.searchParams.append('price', itemPrice);
        url.searchParams.append('description', itemDescription); 

    fetch(url, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authContext.token}`
        },
        body: JSON.stringify({
            "name": itemName,
            "price": itemPrice,
            "description": itemDescription,
            "isactive": true,
            "userId": authContext.userId,
        })
      }).then((response)=>{
        if (response.ok)
            {
              const fetchData = async () => {
                  try {
                    const response = await fetch(Base_URL+'/api/v1/order/active', {
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${authContext.token}`
                          },
                      });
                    if (!response.ok) {
                      throw new Error('Server response caused an error');
                    }
                    const jsonData = await response.json();
                    
                    ItemCtx.setCustomItemsRefreshed(jsonData); 
                    toggleEdit();
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
            <li><button className={ButtonStyleAdd} onClick={editClickHandler} >Edit</button></li>
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