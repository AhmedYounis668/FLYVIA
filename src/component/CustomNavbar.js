import React, { useState, useEffect } from 'react';
import logo from '../Images/Flyvia Logo.png';
import { FaGlobe, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../component/LanguageProvider';
import { useLocation, useNavigate } from 'react-router-dom';

export const CustomNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  
  const { currentLang, changeLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  
  // ترجمات عناصر الـ navbar
  const navTranslations = {
    en: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      blog: 'Blog',
      contact: 'Contact'
    },
    ar: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'الخدمات',
      blog: 'المدونة',
      contact: 'اتصل بنا'
    }
  };

  // الحصول على الترجمة المناسبة للعنصر
  const getNavText = (key) => {
    return navTranslations[currentLang]?.[key] || navTranslations.en[key];
  };

  const navItems = [
    { id: 'home', path: '/', nameKey: 'home' },
    { id: 'about', path: '/Aboutuspage', nameKey: 'about' },
    { id: 'services', path: '/ourservicepage', nameKey: 'services' },
    { id: 'blog', path: '/MainBlogsCardspage', nameKey: 'blog' },
    { id: 'contact', path: '/#contact', nameKey: 'contact' }
  ];

  // تحقق من التمرير
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  useEffect(() => {
    const path = location.pathname;
    
    if (path === '/') setActiveItem('home');
    else if (path === '/Aboutuspage') setActiveItem('about');
    else if (path === '/ourservicepage') setActiveItem('services');
    else if (path === '/MainBlogsCardspage') setActiveItem('blog');
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (path, id) => {
    setActiveItem(id);
    setMenuOpen(false);
    
    if (path === '/#contact') {
      // إذا كان الرابط إلى contact، انتقل إلى القسم المحدد
      if (location.pathname === '/') {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      navigate(path);
    }
  };

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    
    // عند تغيير اللغة، قم بتحديث اتجاه الصفحة
    if (lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
  };

  // دعم RTL/LTR بناءً على اللغة
  useEffect(() => {
    if (currentLang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
  }, [currentLang]);

  return (
    <>
      <nav className={`simple-navbar ${scrolled ? 'scrolled' : ''} ${currentLang === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="nav-container">
          <div className="nav-logo" onClick={() => handleNavigation('/', 'home')}>
            <img 
              src={logo} 
              alt="FLYVIA" 
              className="logo-img"
            />
          </div>
          
          <div className={`nav-menu ${menuOpen ? 'open' : ''}`} style={{zIndex: 10000}}>
            {/* Mobile Header مع اللوجو وزر الإغلاق */}
            <div className="mobile-menu-header" style={{zIndex: 10000}}>
              <div className="mobile-logo" onClick={() => handleNavigation('/', 'home')}>
                <img 
                  src={logo} 
                  alt="FLYVIA" 
                  className="mobile-logo-img"
                />
              </div>
             <button className="mobile-close-btn blue-gradient-close" onClick={toggleMenu}>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18" stroke="url(#gradient1)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 6L18 18" stroke="url(#gradient1)" strokeWidth="2" strokeLinecap="round"/>
    <defs>
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
  </svg>
</button>
            </div>
            
            {navItems.map((item) => (
              <a
                key={item.id}
                href="#"
                className={`nav-link ${activeItem === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(item.path, item.id);
                }}
              >
                {getNavText(item.nameKey)}
              </a>
            ))}
            
            <div className="language-selector">
              <button
                onClick={() => handleLanguageChange(currentLang === 'en' ? 'ar' : 'en')}
                className="lang-btn"
              >
                <FaGlobe />
                <span>{currentLang === 'en' ? 'العربية' : 'English'}</span>
              </button>
            </div>
          </div>
          
          <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <style>{`
        /* Navbar ارتفاع منخفض */
        .simple-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 60px; /* ارتفاع منخفض */
          background: transparent; /* شفاف في البداية */
          z-index: 1000;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }
        
        /* عندما يبدأ التمرير */
        .simple-navbar.scrolled {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
          height: 65px; /* ارتفاع أكثر قليلاً بعد التمرير */
        }
        
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        /* تحسينات اللوجو */
        .nav-logo {
          cursor: pointer;
          z-index: 1001;
          transition: transform 0.3s ease;
          display: flex;
          align-items: center;
          height: 60px;
        }
        
        .logo-img {
          width: 100px;
          height: auto;
          max-height: 100px;
          object-fit: contain;
          transition: all 0.3s ease;
        }
        
        .nav-logo:hover .logo-img {
          transform: scale(1.05);
        }
        
        /* الروابط في حالة شفافية */
        .nav-menu {
          display: flex;
          gap: 30px;
          align-items: center;
        }
        
        /* دعم RTL للقائمة */
        .simple-navbar.rtl .nav-menu {
          flex-direction: row-reverse;
        }
        
        .nav-link {
          text-decoration: none;
          color: ${scrolled ? '#333' : 'white'}; /* أبيض في البداية، أسود بعد التمرير */
          font-weight: 500;
          font-size: 14px; /* خط أصغر */
          padding: 5px 0;
          position: relative;
          transition: all 0.3s ease;
          font-family: ${currentLang === 'ar' ? "'Cairo', 'Noto Sans Arabic', sans-serif" : "'Nunito', sans-serif"};
        }
        
        .nav-link:hover {
          color: #e83e8c;
          transform: translateY(-1px);
        }
        
        .nav-link.active {
          color: #e83e8c;
          font-weight: 600;
        }
        
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #e83e8c;
          transform: scaleX(1);
          transition: transform 0.3s ease;
        }
        
        .simple-navbar.rtl .nav-link.active::after {
          left: 0;
          right: 0;
        }
        
        /* زر اللغة */
        .lang-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          background: ${scrolled ? '#f0f0f0' : 'rgba(255, 255, 255, 0.2)'};
          border: 1px solid ${scrolled ? '#ddd' : 'rgba(255, 255, 255, 0.3)'};
          padding: 6px 12px; /* أصغر */
          border-radius: 20px;
          cursor: pointer;
          font-weight: 500;
          font-size: 14px;
          color: ${scrolled ? '#333' : 'white'};
          transition: all 0.3s ease;
          font-family: ${currentLang === 'ar' ? "'Cairo', 'Noto Sans Arabic', sans-serif" : "'Nunito', sans-serif"};
        }
        
        .lang-btn:hover {
          background: ${scrolled ? '#e0e0e0' : 'rgba(255, 255, 255, 0.3)'};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .lang-btn svg {
          font-size: 14px;
        }
        
        /* زر الهامبرجر */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
          z-index: 1001;
        }
        
        .hamburger span {
          width: 22px; /* أصغر */
          height: 2px; /* أنحف */
          background: ${scrolled ? '#333' : 'white'};
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        
        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }
        
        /* Mobile Responsive */
        @media (max-width: 768px) {
          .hamburger {
            display: flex;
          }
          
          .nav-menu {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: white;
            flex-direction: column;
            padding: 80px 20px 20px;
            gap: 0;
            display: none;
            z-index: 1000;
            overflow-y: auto;
          }
          
          .simple-navbar.rtl .nav-menu {
            text-align: right;
          }
          
          .nav-menu.open {
            display: flex;
          }
          
          /* Mobile Header - محسّن */
          .mobile-menu-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 70px; /* ارتفاع أكبر */
            background: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            border-bottom: 1px solid #eee;
            z-index: 1002;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          
          .mobile-logo {
            cursor: pointer;
            display: flex;
            align-items: center;
            height: 100%;
            padding: 20px 0;
          }
          
          .mobile-logo-img {
            width: 100px;
            height: auto;
            max-height: 80px;
            object-fit: contain;
          }
          
          .mobile-close-btn {
            background: none;
            border: none;
            font-size: 28px; /* أكبر حجم */
            color: #333;
            cursor: pointer;
            width: 50px; /* عرض أكبر */
            height: 50px; /* ارتفاع أكبر */
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          
          .mobile-close-btn:hover {
            background: #f5f5f5;
            color: #e83e8c;
            transform: scale(1.1);
          }
          
          .nav-menu.open .nav-link {
            width: 100%;
            text-align: ${currentLang === 'ar' ? 'right' : 'left'};
            padding: 18px 15px;
            color: #333;
            border-bottom: 1px solid #f0f0f0;
            font-size: 16px;
            font-weight: 500;
            margin-top: 0;
          }
          
          .nav-menu.open .nav-link:hover,
          .nav-menu.open .nav-link.active {
            background: rgba(232, 62, 140, 0.1);
            color: #e83e8c;
          }
          
          .nav-menu.open .nav-link.active::after {
            display: none;
          }
          
          .nav-menu.open .language-selector {
            margin-top: 30px;
            width: 100%;
            display: flex;
            justify-content: center;
            padding: 15px;
          }
          
          .nav-menu.open .lang-btn {
            background: #f0f0f0;
            color: #333;
            border-color: #ddd;
            padding: 12px 24px;
            font-size: 16px;
            width: 100%;
            max-width: 200px;
            justify-content: center;
          }
          
          /* تحسين عرض اللوجو على الموبايل */
          .simple-navbar:not(.scrolled) .logo-img {
            filter: brightness(0) invert(1);
            -webkit-filter: brightness(0) invert(1);
          }
          
          /* ضمان وضوح اللوجو في القائمة المفتوحة */
          .nav-menu.open .mobile-logo-img {
            filter: none !important;
            -webkit-filter: none !important;
          }
          
          /* تحسين للقائمة في وضع RTL على الموبايل */
          .simple-navbar.rtl .hamburger {
            margin-left: 0;
            margin-right: auto;
          }
          
          /* تعديل padding للقائمة بعد إضافة الهيدر */
          .nav-menu.open {
            padding-top: 90px; /* أقل ليكون تحت الهيدر مباشرة */
          }
          
          /* ضمان عدم تقطيع اللوجو */
          .logo-img, .mobile-logo-img {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
            image-rendering: pixelated;
          }
          
          /* تحسين للشاشات عالية الدقة */
          @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            .logo-img, .mobile-logo-img {
              image-rendering: auto;
            }
          }
        }
        
        /* تحسينات إضافية للـ desktop */
        @media (min-width: 769px) {
          .mobile-menu-header {
            display: none;
          }
          
          .simple-navbar:not(.scrolled) .nav-link:hover {
            color: rgba(255, 255, 255, 0.9);
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
          
          .simple-navbar:not(.scrolled) .lang-btn:hover {
            background: rgba(255, 255, 255, 0.3);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }
          
          /* تحسين الترتيب في وضع RTL */
          .simple-navbar.rtl .nav-container {
            flex-direction: row-reverse;
          }
          
          .simple-navbar.rtl .hamburger {
            margin-left: auto;
            margin-right: 0;
          }
        }
        
        /* تحسينات للأجهزة اللوحية */
        @media (max-width: 1024px) and (min-width: 769px) {
          .nav-menu {
            gap: 20px;
          }
          
          .nav-link {
            font-size: 13px;
          }
        }
      `}</style>
    </>
  );
};