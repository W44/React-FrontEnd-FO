import { useReducer,createContext, useState } from "react";



export const SidebarContext = createContext(
    {
        MenuItem : "new",
        setMenu : () => {}
    })
    
function MenuReducer(state,action)
{
  console.log("Menureducer",state,action);
    if (action.type === "new")
        return {
      ...state,
    MenuItem : 'new'
    }
    if (action.type === "viewCurrent")
        return {
      ...state,
    MenuItem : 'viewCurrent'
    }
    if (action.type === "viewPast")
        return {
      ...state,
    MenuItem : 'viewPast'
    }


}
    
export const SidebarContextProvider = ({ children }) => {
  const [Menu, setMenu] = useReducer(MenuReducer,{
    MenuItem : "new"
});
 
  
 
  return (
    <SidebarContext.Provider value={{ Menu, setMenu }}>
      {children}
    </SidebarContext.Provider>
  );
}

