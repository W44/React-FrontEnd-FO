import { SidebarContext } from '../Contexts/SidebarContext';
import { useContext } from 'react';
import ListItems from './ListItems';
import AddItem from './AddItem';
import { ItemListContext } from '../Contexts/ItemListContext';

export default function Body()
{
    
    const menuCtx = useContext(SidebarContext);
    const ItemCtx = useContext(ItemListContext);
    console.log("Body",ItemCtx)
    return (
        <div className='w-3/4 px-8 py-16 bg-stone-400 rounded-r-xl rounded-l-xl'>
        {menuCtx.Menu.MenuItem ==="new" && <AddItem/>}
        {menuCtx.Menu.MenuItem ==="viewCurrent" && ItemCtx.Items.map((item) => {
            return ( <div className=''> 
            <ListItems name={item.name} price={item.price} description={item.description}/>
            </div>);
        })}
        {menuCtx.Menu.MenuItem ==="viewPast" && <ListItems name={'Past'} price={30} description={'testing description'}/>}
        </div>
    );
}