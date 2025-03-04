import { useContext,useState } from "react";
import { ListItemStyle } from "../../Constants";
import { ButtonStyleDelete, ButtonStyleAdd } from "../../Constants";
import { EditListItemContext } from "../Contexts/EditListItemContext";
import EditItem from "./EditItem";
import { ItemListContext } from "../Contexts/ItemListContext";
import AuthContext from "../Contexts/AuthContext";
import { URL } from "../../Constants";



export default function ListItems({id,name,price,description,date,children})
{

    const ItemCtx = useContext(ItemListContext);
    const authContext = useContext(AuthContext);

    const [Edit, setItem] = useState(false);
   
    const toggleEdit = () => {
        console.log("toggleEdit invoked");
      setItem((prevItems) => !prevItems);
    };

    function deleteClickHandler()
    { 

    fetch(URL+'/api/v1/order/' + id, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authContext.token}`
        },
      }).then((response)=>{
        if (response.ok)
            {
              const fetchData = async () => {
                  try {
                    const response = await fetch(URL+'/api/v1/order', {
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
          <div className="flex flex-col w-full">
          {!Edit && (
            <div className="w-full p-4 bg-stone-800 text-stone-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mb-6">
              <h3 className="text-lg font-bold text-stone-200 mb-2">Order</h3>
              <h4 className="text-sm font-medium text-stone-300 mb-2">Name: {name}</h4>
              <h4 className="text-sm font-medium text-stone-300 mb-2">Price: {price}</h4>
              <p className="text-sm text-stone-300 mb-4 break-words">
                Description: {description}
              </p>
              <menu className="flex items-center justify-start gap-4 pt-4 border-t border-stone-700 mt-4">
                <li>
                  <button onClick={() => toggleEdit()} className={ButtonStyleAdd}>
                    Edit
                  </button>
                </li>
                <li>
                  <button className={ButtonStyleDelete} onClick={deleteClickHandler}>
                    Delete
                  </button>
                </li>
              </menu>
            </div>
          )}
          {Edit && (
            <EditItem
              id={id}
              name={name}
              price={price}
              description={description}
              toggleEdit={toggleEdit}
            />
          )}
        </div>
        
  );
        
}