import './App.css';
import Sidebar from './Components/Sidebar/Sidebar';
import { SidebarContextProvider, SidebarContext } from './Components/Contexts/SidebarContext.jsx';
import { useContext, useState, useEffect } from 'react';
import Body from './Components/Body/Body.jsx'
import { ItemListContextProvider } from './Components/Contexts/ItemListContext.jsx';
import { EditListItemContextProvider } from './Components/Contexts/EditListItemContext.jsx';
import AboutPopup from "./Components/Body/About.jsx"

function App() {
  
  return (
    <main className='h-screen my-8 flex '>
    <AboutPopup></AboutPopup>
    <ItemListContextProvider>
    <SidebarContextProvider>
    <Sidebar/>
    <Body/>
    </SidebarContextProvider>
    </ItemListContextProvider>
    </main>
  );
}

export default App;
