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
import { Ourservicepage } from "./pages/Ourservicepage";
import { MainBlogsCards } from "./component/MainBlogsCards";
import { BlogDetails } from "./component/BlogDetails";
function App() {
 

  
  return (
    <LanguageProvider>
  <HashRouter>
   
                            <CustomNavbar />
          <FloatingContact/>

      
            
      <Routes>

                    <Route path="/" element={ <HomePage  /> }/> 

            <Route path="/Login" element={ <Login /> }/> 
            <Route path="/dashboard" element={ <Dashboard /> }/> 
            <Route path="/Aboutuspage" element={ <AboutUsPage /> }/> 
            <Route path="/ourservicepage" element={ <Ourservicepage /> }/> 
            <Route path="/MainBlogsCardspage" element={ <MainBlogsCards /> }/> 
            <Route path="/BlogDetails/:id" element={ <BlogDetails /> }/> 


      </Routes>
    </HashRouter>

    <Footer/>
    </LanguageProvider>
  );
}

export default App;
