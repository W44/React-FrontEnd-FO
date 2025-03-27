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
import CurrentItems from './CurrentItems';

export default function Body() {

  const menuCtx = useContext(SidebarContext);
  return (
    <div className="h-screen w-3/4 px-8 bg-stone-400 overflow-y-auto">
      {menuCtx.Menu.MenuItem === MenuSelect.Add_New && <AddItem />}
      <ul>
        {menuCtx.Menu.MenuItem === MenuSelect.View_Current && (
          <>
            <CurrentItems></CurrentItems>
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