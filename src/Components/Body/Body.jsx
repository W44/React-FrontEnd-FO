import { SidebarContext } from '../Contexts/SidebarContext';
import { useContext, useEffect } from 'react';
import ListItems from './ListItems';
import AddItem from './AddItem';
import { ItemListContext } from '../Contexts/ItemListContext';

export default function Body()
{
    
    const menuCtx = useContext(SidebarContext);
    const ItemCtx = useContext(ItemListContext);

    useEffect(() => {
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
            
            ItemCtx.setCustomItems(jsonData); 
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []); 
    console.log("Body",ItemCtx)
    return (
        <div className='w-3/4 px-8 py-16 bg-stone-400 rounded-r-xl rounded-l-xl'>
        {menuCtx.Menu.MenuItem ==="new" && <AddItem/>}
        <ul>
        {menuCtx.Menu.MenuItem ==="viewCurrent" && ItemCtx.Items.map((item) => {
            return ( <li key={item.id} className=''> 
            <ListItems id={item.id} name={item.name} price={item.price} description={item.description} date={item.date}/>
            </li>);
        })}
        </ul>
        {menuCtx.Menu.MenuItem ==="viewPast" && <ListItems name={'Past'} price={30} description={'testing description'}/>}
        </div>
    );
}