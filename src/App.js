import { CustomNavbar } from "./component/CustomNavbar";
import { HomePage } from "./pages/HomePage";
import { LanguageProvider } from "./component/LanguageProvider";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { AboutUsPage } from "./pages/AboutUsPage";
// في App.js أو index.js أضف:
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Footer } from "./component/Footer";
import { FloatingContact } from "./component/FloatingContact";
function App() {
 
  return (
    <LanguageProvider>
   
                            <CustomNavbar />
          <FloatingContact/>
  <HashRouter>

      
            
      <Routes>

                    <Route path="/" element={ <HomePage  /> }/> 

            <Route path="/Login" element={ <Login /> }/> 
                        <Route path="/dashboard" element={ <Dashboard /> }/> 
                        <Route path="/Aboutuspage" element={ <AboutUsPage /> }/> 

      </Routes>
    </HashRouter>

    <Footer/>
    </LanguageProvider>
  );
}

export default App;
