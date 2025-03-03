import React, { useContext } from "react";
import AuthContext from "../Contexts/AuthContext.jsx";
import Sidebar from '../Sidebar/Sidebar.jsx'
import { SidebarContextProvider } from "../Contexts/SidebarContext.jsx";
import Body from "./Body.jsx";
import { ItemListContextProvider } from "../Contexts/ItemListContext.jsx";
import { EditListItemContextProvider } from '../Contexts/EditListItemContext.jsx';
import AboutPopup from "./About.jsx"
import Header from "../Header/Header.jsx"
import ErrorFallback from '../../Utilities/ErrorFallback.jsx';
import { ErrorBoundary } from "react-error-boundary";

const Dashboard = () => {
  const { logout, user } = useContext(AuthContext);

  return (
    
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow pt-16">
    <AboutPopup/>
    {/*<AuthContextProvider>*/}
    <ItemListContextProvider>
    <SidebarContextProvider>
    <Sidebar/>
    <Body/>
    </SidebarContextProvider>
    </ItemListContextProvider>
    {/*</AuthContextProvider>*/}
    </div>
    </div>
    </ErrorBoundary>
  );
};

export default Dashboard;
