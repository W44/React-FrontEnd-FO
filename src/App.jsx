import './App.css';
import Sidebar from './Components/Sidebar/Sidebar';
import { SidebarContextProvider, SidebarContext } from './Components/Contexts/SidebarContext.jsx';
import { useContext, useState, useEffect } from 'react';
import Body from './Components/Body/Body.jsx'

function App() {
  //const menuCtx = useContext(SidebarContext);
  //console.log("app:",menuCtx)
  //const [forceUpdate, setForceUpdate] = useState(false);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Toggle the dummy state to force re-render
  //     setForceUpdate(prevState => !prevState);
  //   }, 5000); // Re-render every 5 seconds (5000 milliseconds)

  //   // Cleanup interval on component unmount
  //   return () => clearInterval(interval);
  // }, []); // Empty dependency array to run effect only once
  return (
    <main className='h-screen my-8 flex gap-8'>
    <SidebarContextProvider>
    <Sidebar/>
    <Body/>
    </SidebarContextProvider>  
    </main>
  );
}

export default App;
