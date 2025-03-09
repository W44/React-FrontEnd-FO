import { useContext, useState } from "react";
import { ListItemStyle } from "../../Constants";
import { ButtonStyleDelete, ButtonStyleAdd } from "../../Constants";
import { EditListItemContext } from "../Contexts/EditListItemContext";
import EditItem from "./EditItem";
import { ItemListContext } from "../Contexts/ItemListContext";
import AuthContext from "../Contexts/AuthContext";
import { URL } from "../../Constants";



export default function ListItems({ id, name, price, description, date, children }) {

  const ItemCtx = useContext(ItemListContext);
  const authContext = useContext(AuthContext);

  const [Edit, setItem] = useState(false);

  const toggleEdit = () => {
    console.log("toggleEdit invoked");
    setItem((prevItems) => !prevItems);
  };

  function deleteClickHandler() {

    fetch(URL + '/api/v1/order/' + id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authContext.token}`
      },
    }).then((response) => {
      if (response.ok) {
        const fetchData = async () => {
          try {
            const response = await fetch(URL + '/api/v1/order/active', {
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
      {!Edit && (<div className="w-full p-4 sm:p-6 bg-stone-800 text-stone-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mb-6 relative">
        {/* Header with "Order by: root" at the top right */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-stone-100">Order</h3>
          <span className="text-xs sm:text-sm font-medium text-stone-400">Order by: root</span>
        </div>

        {/* Order details */}
        <div className="space-y-2 sm:space-y-3">
          {/* Name */}
          <div>
            <span className="text-xs sm:text-sm font-semibold text-stone-400">Name</span>
            <h4 className="text-base sm:text-lg font-medium text-stone-100">{name}</h4>
          </div>

          {/* Price */}
          <div>
            <span className="text-xs sm:text-sm font-semibold text-stone-400">Price</span>
            <h4 className="text-base sm:text-lg font-medium text-stone-100">${price}</h4>
          </div>

          {/* Description */}
          <div>
            <span className="text-xs sm:text-sm font-semibold text-stone-400">Description</span>
            <p className="text-sm sm:text-base text-stone-300 break-words">{description}</p>
          </div>
        </div>

        {/* Action buttons */}
        <menu className="flex items-center justify-start gap-4 pt-4 sm:pt-6 border-t border-stone-700 mt-4 sm:mt-6">
          <li>
            <button
              onClick={() => toggleEdit()}
              className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Edit
            </button>
          </li>
          <li>
            <button
              onClick={deleteClickHandler}
              className="px-3 py-1 sm:px-4 sm:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
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