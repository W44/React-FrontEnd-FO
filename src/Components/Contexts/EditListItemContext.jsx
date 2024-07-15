import { createContext, useState, useEffect } from "react";




export const EditListItemContext = createContext(
{
    Edit : [],
    toggleEdit : () => {},
})

export const EditListItemContextProvider = ({ children }) => {
    const [Edit, setItem] = useState(false);
   
    const toggleEdit = () => {
        console.log("toggleEdit invoked");
      setItem((prevItems) => !prevItems);
    };

    
   
    return (
      <EditListItemContext.Provider value={{ Edit, toggleEdit }}>
        {children}
      </EditListItemContext.Provider>
    );
  }