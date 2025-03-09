import { createContext, useState } from "react";
import { DummyList } from "../../Utilities/DummyData";




export const ItemListContext = createContext(
{
    Items : [],
    pastItems:[],
    setCustomItems : () => {},
    setCustomItemsRefreshed : () => {},
    setCustomPastItems : () => {},
    setCustomPastItemsRefreshed : () => {}
})

export const ItemListContextProvider = ({ children }) => {
    const [Items, setItem] = useState([]);
    const [pastItems, setPastItems] = useState([]);
   
    const setCustomItems = (newItem) => {
      setItem((prevItems) => [...prevItems, ...newItem]);
    };

    const setCustomItemsRefreshed = (newItem) => {
      setItem((prevItems) => [...newItem]);
    };

    const setCustomPastItems = (newItem) => {
      setPastItems((prevItems) => [...prevItems, ...newItem]);
    };

    const setCustomPastItemsRefreshed = (newItem) => {
      setPastItems((prevItems) => [...newItem]);
    };
    
   
    return (
      <ItemListContext.Provider value={{ Items, pastItems, setCustomItems, setCustomItemsRefreshed, setCustomPastItemsRefreshed, setCustomPastItems }}>
        {children}
      </ItemListContext.Provider>
    );
  }