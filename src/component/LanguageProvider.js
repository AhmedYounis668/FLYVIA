import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState(() => {
    // جلب اللغة من localStorage مع default 'en'
    const savedLang = localStorage.getItem('appLanguage');
    // التأكد من أن اللغة تكون أحرف صغيرة دائمًا
    return (savedLang || 'en').toLowerCase();
  });
  
  const [updateKey, setUpdateKey] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // دالة لتطبيق إعدادات اللغة
  const applyLanguageSettings = useCallback((lang) => {
    if (lang === 'ar') {
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
  }, []);

  // تهيئة اللغة عند تحميل الموقع لأول مرة
  useEffect(() => {
    const initializeLanguage = () => {
      const savedLang = localStorage.getItem('appLanguage');
      
      // إذا كان أول زيارة، نستخدم الإنجليزية
      if (!savedLang) {
        const defaultLang = 'en';
        localStorage.setItem('appLanguage', defaultLang);
        setCurrentLang(defaultLang);
        applyLanguageSettings(defaultLang);
      } else {
        const normalizedLang = savedLang.toLowerCase();
        setCurrentLang(normalizedLang);
        applyLanguageSettings(normalizedLang);
      }
      
      setIsInitialized(true);
      setUpdateKey(prev => prev + 1);
    };

    initializeLanguage();
  }, [applyLanguageSettings]);

  const changeLanguage = useCallback((lang) => {
    // تحويل إلى أحرف صغيرة
    const normalizedLang = lang.toLowerCase();
    
    if (normalizedLang === currentLang) return;
    
    // حفظ في localStorage
    localStorage.setItem('appLanguage', normalizedLang);
    
    // تحديث الـ state
    setCurrentLang(normalizedLang);
    setUpdateKey(prev => prev + 1);
    
    // تطبيق إعدادات اللغة
    applyLanguageSettings(normalizedLang);
    
  }, [currentLang, applyLanguageSettings]);

  const value = {
    currentLang,
    changeLanguage,
    updateKey,
    isInitialized
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