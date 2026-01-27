import { CustomNavbar } from "./component/CustomNavbar";
import { HomePage } from "./pages/HomePage";
import { LanguageProvider } from "./component/LanguageProvider";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";

function App() {
 
  return (
    <LanguageProvider>
   
          
  <HashRouter>

      
            
      <Routes>

                    <Route path="/" element={ <HomePage  /> }/> 

            <Route path="/Login" element={ <Login /> }/> 
                        <Route path="/dashboard" element={ <Dashboard /> }/> 

      </Routes>
    </HashRouter>
    </LanguageProvider>
  );
}

export default App;
