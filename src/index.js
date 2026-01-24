import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LanguageProvider } from './component/LanguageProvider';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './Redux/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
 <LanguageProvider>
      <App />
    </LanguageProvider> 
     </Provider>
);

