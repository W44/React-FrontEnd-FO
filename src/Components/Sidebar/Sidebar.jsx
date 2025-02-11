import React, { useContext } from 'react'
import { ButtonStyle1, MenuSelect } from '../../Constants';
import { SidebarContext } from '../Contexts/SidebarContext';

export default function Sidebar()
{
    
    const menuCtx = useContext(SidebarContext);
    console.log("Sidebar:", menuCtx);
return (
  <aside className="h-screen w-1/4 px-8 bg-stone-900 text-stone-50 md:w-72">
    <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Menu</h2>
    <div>
      <button
        onClick={() => menuCtx.setMenu({ type: MenuSelect.Add_New })}
        className={ButtonStyle1}
      >
        + New Order
      </button>
    </div>
    <div>
      <button
        onClick={() => menuCtx.setMenu({ type: MenuSelect.View_Current })}
        className={ButtonStyle1}
      >
        View Current Orders
      </button>
    </div>
    <div>
      <button
        onClick={() => menuCtx.setMenu({ type: MenuSelect.View_Past })}
        className={ButtonStyle1}
      >
        View Past Orders
      </button>
    </div>
  </aside>
);

}