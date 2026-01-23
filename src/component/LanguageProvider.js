// LanguageProvider.js
import React, { createContext, useState, useContext, useCallback } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState(() => {
    // جلب اللغة من localStorage إذا موجودة
    return localStorage.getItem('appLanguage') || 'EN';
  });
  
  const [updateKey, setUpdateKey] = useState(0);

  const changeLanguage = useCallback((lang) => {
    if (lang === currentLang) return;
    
    // حفظ في localStorage
    localStorage.setItem('appLanguage', lang);
    
    // تحديث الـ state
    setCurrentLang(lang);
    setUpdateKey(prev => prev + 1);
    
    // تغيير direction
    if (lang === 'AR') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
    
    // إرسال حدث لتحديث المكونات
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
    
  }, [currentLang]);

  const value = {
    currentLang,
    changeLanguage,
    updateKey
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};