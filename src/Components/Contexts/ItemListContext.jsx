import { createContext, useState, useEffect } from "react";
import { DummyList } from "../../Utilities/DummyData";




export const ItemListContext = createContext(
{
    Items : [],
    setCustomItems : () => {}
})

export const ItemListContextProvider = ({ children }) => {
    const [Items, setItem] = useState([]);
   
    const setCustomItems = (newItem) => {
      setItem((prevItems) => [...prevItems, ...newItem]);
    };

    
   
    return (
      <ItemListContext.Provider value={{ Items, setCustomItems }}>
        {children}
      </ItemListContext.Provider>
    );
  }