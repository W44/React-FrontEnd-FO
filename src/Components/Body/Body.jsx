import { SidebarContext } from '../Contexts/SidebarContext';
import { useContext } from 'react';

export default function Sidebar()
{
    
    const menuCtx = useContext(SidebarContext);
    console.log("Body",menuCtx)
    return (
        <>
        {menuCtx.Menu.MenuItem ==="new" && <h2>new</h2>}
        {menuCtx.Menu.MenuItem ==="viewCurrent" && <h2>Current</h2>}
        {menuCtx.Menu.MenuItem ==="viewPast" && <h2>Past</h2>}
        </>
    );
}