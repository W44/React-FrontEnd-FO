import { createContext, useState, useEffect } from "react";
import { DummyList } from "../../Utilities/DummyData";




export const ItemListContext = createContext(
{
    Items : [],
    setCustomItems : () => {},
    setCustomItemsRefreshed : () => {}
})

export const ItemListContextProvider = ({ children }) => {
    const [Items, setItem] = useState([]);
   
    const setCustomItems = (newItem) => {
      setItem((prevItems) => [...prevItems, ...newItem]);
    };

    const setCustomItemsRefreshed = (newItem) => {
      setItem((prevItems) => [...newItem]);
    };

    
   
    return (
      <ItemListContext.Provider value={{ Items, setCustomItems, setCustomItemsRefreshed }}>
        {children}
      </ItemListContext.Provider>
    );
  }