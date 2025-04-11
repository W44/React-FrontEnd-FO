import React, { useContext } from 'react'
import { ButtonStyle1, MenuSelect } from '../../Constants';
import { SidebarContext } from '../Contexts/SidebarContext';

export default function Sidebar() {

  const menuCtx = useContext(SidebarContext);
  console.log("Sidebar:", menuCtx);
  return (
    <aside className="h-screen w-1/4 px-8 bg-neutral-900 text-stone-50 md:w-72 flex flex-col">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Menu</h2>

      <div>
        <button
          onClick={() => menuCtx.setMenu({ type: MenuSelect.Add_New })}
          className={ButtonStyle1}
        >
          🛒 New Order
        </button>
      </div>
      <div>
        <button
          onClick={() => menuCtx.setMenu({ type: MenuSelect.View_Current })}
          className={ButtonStyle1}
        >
          📦 View Current Orders
        </button>
      </div>
      <div>
        <button
          onClick={() => menuCtx.setMenu({ type: MenuSelect.View_Past })}
          className={ButtonStyle1}
        >
          📜 View Past Orders
        </button>
      </div>
      <div>
        <button
          onClick={() => menuCtx.setMenu({ type: MenuSelect.View_Stat })}
          className={ButtonStyle1}
        >
          📉 User Stats
        </button>
      </div>

      <div className="flex-grow" />

      <img
        src={process.env.PUBLIC_URL + "/original-f73b3606cf45fb3b422805b88b96b58a.gif"}
        alt="Landing animation"
        className="mb-6 w-full object-contain"
      />
    </aside>
  );
}