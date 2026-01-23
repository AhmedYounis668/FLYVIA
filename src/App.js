import { useState } from "react";
import { CustomNavbar } from "./component/CustomNavbar";
import { HomePage } from "./pages/HomePage";
import { LanguageProvider } from "./component/LanguageProvider";
function App() {
 
  return (
    <LanguageProvider>
    <CustomNavbar />
      <HomePage  />
          

    </LanguageProvider>
  );
}

export default App;
