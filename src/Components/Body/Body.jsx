import { SidebarContext } from '../Contexts/SidebarContext';
import { useContext } from 'react';
import ListItems from './ListItems';
import AddItem from './AddItem';

export default function Sidebar()
{
    
    const menuCtx = useContext(SidebarContext);
    console.log("Body",menuCtx)
    return (
        <div className='w-3/4 px-8 py-16 bg-stone-400 flex rounded-r-xl rounded-l-xl'>
        {menuCtx.Menu.MenuItem ==="new" && <AddItem/>}
        {menuCtx.Menu.MenuItem ==="viewCurrent" && <ListItems name={'Current'} price={20} description={'testing description'}/>}
        {menuCtx.Menu.MenuItem ==="viewPast" && <ListItems name={'Past'} price={30} description={'testing description'}/>}
        </div>
    );
}