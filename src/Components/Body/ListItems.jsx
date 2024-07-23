import { useContext,useState } from "react";
import { ListItemStyle } from "../../Constants";
import { ButtonStyleDelete, ButtonStyleAdd } from "../../Constants";
import { EditListItemContext } from "../Contexts/EditListItemContext";
import EditItem from "./EditItem";
import { ItemListContext } from "../Contexts/ItemListContext";



export default function ListItems({id,name,price,description,date,children})
{

    const ItemCtx = useContext(ItemListContext);

    const [Edit, setItem] = useState(false);
   
    const toggleEdit = () => {
        console.log("toggleEdit invoked");
      setItem((prevItems) => !prevItems);
    };

    function deleteClickHandler()
    { 

    fetch('http://localhost:8080/api/v1/order/' + id, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
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
        
        <div>

        { !Edit && <div className={ListItemStyle}>
        <h3>Order</h3>
        <h4>Name:{name}</h4>
        <h4>Price:{price}</h4>
        <p>Description:{description}</p>
        <menu className="flex items-center justify-start gap-4 py-4">
            <li><button onClick={ () => toggleEdit()} className={ButtonStyleAdd}>Edit</button></li>
            <li><button className={ButtonStyleDelete} onClick={deleteClickHandler} >Delete</button></li>
        </menu>
        </div> }
        {
            Edit && <EditItem id={id} name={name} price={price} description={description} toggleEdit={toggleEdit}></EditItem>
        }

        </div>
        
    );
}