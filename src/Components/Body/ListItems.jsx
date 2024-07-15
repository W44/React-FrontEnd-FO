import { useContext,useState } from "react";
import { ListItemStyle } from "../../Constants";
import { ButtonStyleDelete, ButtonStyleAdd } from "../../Constants";
import { EditListItemContext } from "../Contexts/EditListItemContext";
import EditItem from "./EditItem";



export default function ListItems({id,name,price,description,date,children})
{

    const [Edit, setItem] = useState(false);
   
    const toggleEdit = () => {
        console.log("toggleEdit invoked");
      setItem((prevItems) => !prevItems);
    };

    
    

    return (
        
        <div>

        { !Edit && <div className={ListItemStyle}>
        <h3>Order</h3>
        <h4>Name:{name}</h4>
        <h4>Price:{price}</h4>
        <p>Description:{description}</p>
        <menu className="flex items-center justify-start gap-4 py-4">
            <li><button onClick={ () => toggleEdit()} className={ButtonStyleAdd}>Edit</button></li>
            <li><button className={ButtonStyleDelete} >Delete</button></li>
        </menu>
        </div> }
        {
            Edit && <EditItem name={name} price={price} description={description} toggleEdit={toggleEdit}></EditItem>
        }

        </div>
        
    );
}