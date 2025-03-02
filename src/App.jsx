import './App.css';
import Sidebar from './Components/Sidebar/Sidebar';
import { SidebarContextProvider, SidebarContext } from './Components/Contexts/SidebarContext.jsx';
import { useContext, useState, useEffect } from 'react';
import Body from './Components/Body/Body.jsx'
import { ItemListContextProvider } from './Components/Contexts/ItemListContext.jsx';
import { EditListItemContextProvider } from './Components/Contexts/EditListItemContext.jsx';
import AboutPopup from "./Components/Body/About.jsx"
import Header from "./Components/Header/Header.jsx"
import ErrorFallback from './Utilities/ErrorFallback.jsx';
import { ErrorBoundary } from "react-error-boundary";
import { AuthContextProvider } from './Components/Contexts/AuthContext.jsx';

function App() {
  
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow pt-16">
    <AboutPopup/>
    <AuthContextProvider>
    <ItemListContextProvider>
    <SidebarContextProvider>
    <Sidebar/>
    <Body/>
    </SidebarContextProvider>
    </ItemListContextProvider>
    </AuthContextProvider>
    </div>
    </div>
    </ErrorBoundary>
  );
}

export default App;
