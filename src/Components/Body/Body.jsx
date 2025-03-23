import { SidebarContext } from '../Contexts/SidebarContext';
import { useContext, useEffect, useState } from 'react';
import ListItems from './ListItems';
import AddItem from './AddItem';
import { ItemListContext } from '../Contexts/ItemListContext';
import "./BodyStyles.css"
import { MenuSelect } from '../../Constants';
import AuthContext from '../Contexts/AuthContext';
import { URL } from '../../Constants';
import PastListItems from './PastListItems';
import Stats from './Stats';
import PastItems from './PastItems';

export default function Body()
{
    
    const menuCtx = useContext(SidebarContext);
    const ItemCtx = useContext(ItemListContext);
    const authContext = useContext(AuthContext);

    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(URL+'/api/v1/order/active', {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${authContext.token}`
                  },
              });
            if (!response.ok) {
              throw new Error('Server response caused an error');
            }
            const jsonData = await response.json();
            
            ItemCtx.setCustomItems(jsonData); 
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []); 

      function SearchInputHandler(value)
      {
        setSearchInput(value);
      }
      const filteredItems = ItemCtx.Items.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase()));  

      //const filteredPastItems = ItemCtx.pastItems.filter((item) =>
      //  item.name.toLowerCase().includes(searchInput.toLowerCase()));  
          
      console.log("Body", ItemCtx);
      return (
        <div className="h-screen w-3/4 px-8 bg-stone-400 overflow-y-auto">
          {menuCtx.Menu.MenuItem === MenuSelect.Add_New && <AddItem />}
          <ul>
          {menuCtx.Menu.MenuItem === MenuSelect.View_Current && (
                <>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search items..."
                            value={searchInput}
                            onChange={(e) => SearchInputHandler(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center placeholder-gray-500"
                        />
                    </div>

                    <ul>
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <li key={item.id}>
                                    <ListItems
                                        id={item.id}
                                        name={item.name}
                                        price={item.price}
                                        description={item.description}
                                        date={item.date}
                                        username={item.username}
                                        disableEdit={item.userId != authContext.userId}
                                    />
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-700">No items found.</p>
                        )}
                    </ul>
                </>
            )}
          </ul>
          {menuCtx.Menu.MenuItem === MenuSelect.View_Past && (<>
            <PastItems></PastItems>
            </>
          )}
          {menuCtx.Menu.MenuItem === MenuSelect.View_Stat && (<>
          <Stats></Stats>
          </>
          )}
        </div>
      );
      
}