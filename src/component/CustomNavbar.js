import React, { useState, useEffect } from 'react';
import logo from '../Images/Flyvia Logo.png';
import { FaGlobe } from 'react-icons/fa';
import { useLanguage } from '../component/LanguageProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Offcanvas, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const CustomNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const { currentLang, changeLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  
  // 🔥 التأكد أن أي صفحة جديدة تفتح من أولها
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [location.pathname]);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
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

  // 🔥 تحديد العنصر النشط بناءً على الـ path
  useEffect(() => {
    const path = location.pathname;
    
    if (path === '/') setActiveItem('home');
    else if (path === '/Aboutuspage') setActiveItem('about');
    else if (path === '/ourservicepage') setActiveItem('services');
    else if (path === '/MainBlogsCardspage') setActiveItem('blog');
    else setActiveItem(''); // لو مش من القائمة، مفيش active
  }, [location]);

  const toggleMenu = () => {
    if (isMobile) {
      setMenuOpen(!menuOpen);
    }
  };

  const handleNavigation = (path, id) => {
    setActiveItem(id);
    if (isMobile) {
      setMenuOpen(false);
    }
    
    if (path === '/#contact') {
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
        }, 300);
      }
    } else {
      navigate(path);
    }
  };

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    
    if (lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
  };

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
      <Navbar 
        expand="lg" 
        fixed="top"
        className={`simple-navbar ${scrolled ? 'scrolled' : ''}`}
        dir={currentLang === 'ar' ? 'rtl' : 'ltr'}
        style={{
          marginTop: '20px',
          marginLeft: '20px',
          marginRight: '20px',
          borderRadius: '15px'
        }}
      >
        <Container fluid className="nav-container">
          <Navbar.Brand 
            className="nav-logo" 
            onClick={() => handleNavigation('/', 'home')}
            style={{ cursor: 'pointer' }}
          >
            <img 
              src={logo} 
              alt="FLYVIA" 
              className="logo-img"
            />
          </Navbar.Brand>
          
          <Navbar.Collapse id="navbar-nav">
            <Nav className="nav-desktop-menu">
              {navItems.map((item) => (
                <Nav.Link
                  key={item.id}
                  href="#"
                  // 🔥🔥🔥 الحل السحري: منع bootstrap من إضافة active class
                  active={false}
                  className={`nav-link ${activeItem === item.id ? 'custom-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.path, item.id);
                  }}
                >
                  {getNavText(item.nameKey)}
                </Nav.Link>
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
            </Nav>
          </Navbar.Collapse>
          
          <button 
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            style={{ display: isMobile ? 'flex' : 'none' }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </Container>
      </Navbar>
      
      {isMobile && (
        <Offcanvas
          show={menuOpen}
          onHide={() => setMenuOpen(false)}
          placement={currentLang === 'ar' ? 'start' : 'end'}
          className="mobile-menu-offcanvas"
        >
          <Offcanvas.Header className="mobile-menu-header">
            <Offcanvas.Title className="mobile-logo">
              <img 
                src={logo} 
                alt="FLYVIA" 
                className="mobile-logo-img"
              />
            </Offcanvas.Title>
            <button className="mobile-close-btn" onClick={() => setMenuOpen(false)}>
              ✕
            </button>
          </Offcanvas.Header>
          
          <Offcanvas.Body className="mobile-menu-body">
            <Nav className="flex-column w-100">
              {navItems.map((item) => (
                <Nav.Link
                  key={item.id}
                  href="#"
                  // 🔥🔥🔥 منع bootstrap من إضافة active class في الموبايل كمان
                  active={false}
                  className={`mobile-nav-link ${activeItem === item.id ? 'custom-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.path, item.id);
                  }}
                >
                  <span className="mobile-nav-text">{getNavText(item.nameKey)}</span>
                  {activeItem === item.id && <span className="mobile-nav-indicator">●</span>}
                </Nav.Link>
              ))}
              
              <div className="mobile-language-selector mt-4">
                <Button
                  onClick={() => handleLanguageChange(currentLang === 'en' ? 'ar' : 'en')}
                  className="mobile-lang-btn w-100"
                >
                  <FaGlobe />
                  <span>{currentLang === 'en' ? 'العربية' : 'English'}</span>
                </Button>
              </div>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      )}

      <style>{`
        .simple-navbar {
          height: 70px !important;
          background: transparent !important;
          transition: all 0.3s ease !important;
          padding: 0 !important;
          max-width: calc(100% - 20px) !important;
          margin: 10px auto !important;
          border-radius: 15px !important;
        }
        
        .simple-navbar.scrolled {
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(10px) !important;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1) !important;
        }
        
        .simple-navbar:not(.scrolled) {
          background: rgba(0, 0, 0, 0.2) !important;
          backdrop-filter: blur(2px) !important;
        }
        
        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 25px !important;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between !important;
          width: 100%;
        }
        
        .nav-logo {
          padding: 0 !important;
          margin: 0 !important;
          cursor: pointer;
          display: flex;
          align-items: center;
          height: 100%;
          flex-shrink: 0;
        }
        
        .logo-img {
          height: 105px !important;
          width: auto !important;
          max-width: 250px !important;
          object-fit: contain !important;
          transition: all 0.3s ease;
        }
        
        .nav-logo:hover .logo-img {
          transform: scale(1.05);
        }
        
        .navbar-collapse {
          flex-grow: 0 !important;
        }
        
        .nav-desktop-menu {
          display: flex;
          align-items: center;
          gap: 30px;
          height: 100%;
        }
        
        /* 🔥🔥🔥 التعديل الجوهري - استخدام custom-active بدل active */
        .nav-link {
          text-decoration: none;
          color: var(--nav-link-color, white);
          font-weight: 500;
          font-size: 15px;
          padding: 5px 0 !important;
          position: relative;
          transition: all 0.3s ease;
          font-family: ${currentLang === 'ar' ? "'Cairo', 'Noto Sans Arabic', sans-serif" : "'Nunito', sans-serif"};
          background: transparent !important;
          border: none !important;
          white-space: nowrap;
        }
        
        .nav-link:hover {
          color: #e83e8c !important;
          transform: translateY(-1px);
        }
        
        /* 🔥 استخدام custom-active بدل active */
        .nav-link.custom-active {
          color: #e83e8c !important;
          font-weight: 600;
        }
        
        .nav-link.custom-active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: #e83e8c;
          border-radius: 2px;
        }
        
        /* 🔥 منع bootstrap من إظهار أي active class */
        .nav-link.active,
        .nav-link[aria-current="page"] {
          color: var(--nav-link-color, white) !important;
          background: transparent !important;
        }
        
        .nav-link.active::after,
        .nav-link[aria-current="page"]::after {
          display: none !important;
          content: none !important;
        }
        
        .language-selector {
          display: flex;
          align-items: center;
          margin-inline-start: 20px;
        }
        
        .lang-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--lang-btn-bg, rgba(255, 255, 255, 0.2));
          border: 1px solid var(--lang-btn-border, rgba(255, 255, 255, 0.3));
          padding: 6px 14px;
          border-radius: 20px;
          cursor: pointer;
          font-weight: 500;
          font-size: 14px;
          color: var(--lang-btn-color, white);
          transition: all 0.3s ease;
          font-family: ${currentLang === 'ar' ? "'Cairo', 'Noto Sans Arabic', sans-serif" : "'Nunito', sans-serif"};
        }
        
        .lang-btn:hover {
          background: var(--lang-btn-hover-bg, rgba(255, 255, 255, 0.3));
          transform: translateY(-2px);
        }
        
        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 4px;
          background: none;
          border: none !important;
          cursor: pointer;
          padding: 5px !important;
          z-index: 1001;
          box-shadow: none !important;
          flex-shrink: 0;
        }
        
        .hamburger span {
          width: 22px;
          height: 2px;
          background: var(--hamburger-color, white);
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        
        .mobile-menu-offcanvas {
          width: 85% !important;
          max-width: 320px !important;
        }
        
        .mobile-menu-header {
          padding: 15px 20px !important;
          border-bottom: 1px solid #eee;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          width: 100% !important;
        }
        
        .mobile-logo {
          margin: 0 !important;
          padding: 0 !important;
          flex-shrink: 0;
        }
        
        .mobile-logo-img {
          height: 105px !important;
          width: auto !important;
          max-width: 280px !important;
          object-fit: contain !important;
        }
        
        .mobile-close-btn {
          background: none !important;
          border: none !important;
          font-size: 24px !important;
          cursor: pointer !important;
          color: #333 !important;
          width: 30px !important;
          height: 30px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          flex-shrink: 0;
          padding: 0 !important;
          margin: 0 !important;
        }
        
        .mobile-menu-body {
          padding: 20px 0 !important;
        }
        
        .mobile-nav-link {
          padding: 15px 25px !important;
          border-bottom: 1px solid #f0f0f0 !important;
          font-family: ${currentLang === 'ar' ? "'Cairo', 'Noto Sans Arabic', sans-serif" : "'Nunito', sans-serif"};
          text-align: start;
          font-size: 16px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          color: #333 !important;
          transition: all 0.2s ease !important;
          position: relative;
          background: transparent !important;
          border: none !important;
          text-decoration: none !important;
        }
        
        .mobile-nav-link:hover {
          background-color: #f9f9f9 !important;
          color: #e83e8c !important;
        }
        
        /* 🔥 استخدام custom-active في الموبايل */
        .mobile-nav-link.custom-active {
          color: #e83e8c !important;
          font-weight: 600 !important;
        }
        
        .mobile-nav-link.custom-active::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 25px;
          right: 25px;
          height: 2px;
          background: #e83e8c;
          border-radius: 2px;
        }
        
        /* 🔥 منع bootstrap من التأثير */
        .mobile-nav-link.active,
        .mobile-nav-link[aria-current="page"] {
          color: #333 !important;
          background: transparent !important;
        }
        
        .mobile-nav-link.active::before,
        .mobile-nav-link[aria-current="page"]::before {
          display: none !important;
        }
        
        .mobile-nav-indicator {
          color: #e83e8c;
          font-size: 14px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .mobile-nav-link.custom-active .mobile-nav-indicator {
          opacity: 1;
        }
        
        .mobile-nav-text {
          flex-grow: 1;
        }
        
        .mobile-language-selector {
          padding: 25px !important;
          border-top: 1px solid #eee;
          margin-top: 10px !important;
        }
        
        .mobile-lang-btn {
          background: linear-gradient(135deg, #e83e8c, #ff6b9d) !important;
          color: white !important;
          border: none !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 10px !important;
          padding: 12px !important;
          border-radius: 10px !important;
          font-size: 16px !important;
          font-weight: 600 !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 4px 15px rgba(232, 62, 140, 0.2) !important;
        }
        
        .simple-navbar:not(.scrolled) {
          --nav-link-color: white;
          --lang-btn-bg: rgba(255, 255, 255, 0.2);
          --lang-btn-border: rgba(255, 255, 255, 0.3);
          --lang-btn-color: white;
          --lang-btn-hover-bg: rgba(255, 255, 255, 0.3);
          --hamburger-color: white;
        }
        
        .simple-navbar.scrolled {
          --nav-link-color: #333;
          --lang-btn-bg: #f0f0f0;
          --lang-btn-border: #ddd;
          --lang-btn-color: #333;
          --lang-btn-hover-bg: #e0e0e0;
          --hamburger-color: #333;
        }
        
        @media (min-width: 769px) {
          .simple-navbar {
            margin-top: 5px !important;
          }
          
          .hamburger {
            display: none !important;
          }
          
          .navbar-collapse {
            display: flex !important;
          }
        }
        
        @media (max-width: 768px) {
          .simple-navbar {
            margin-top: 15px !important;
            margin-left: 15px !important;
            margin-right: 15px !important;
          }
          
          .navbar-collapse {
            display: none !important;
          }
          
          .nav-container {
            justify-content: space-between !important;
            padding: 0 15px !important;
          }
          
          .nav-logo {
            position: static !important;
            transform: none !important;
            max-width: 240px;
            margin: 0 !important;
            flex-shrink: 0;
          }
          
          .nav-container {
            gap: 20px;
          }
          
          .logo-img {
            height: 105px !important;
            max-width: 240px !important;
          }
          
          @media (max-width: 480px) {
            .simple-navbar {
              margin-left: 10px !important;
              margin-right: 10px !important;
              margin-top: 10px !important;
            }
            
            .nav-container {
              padding: 0 10px !important;
              gap: 15px;
            }
            
            .logo-img {
              height: 105px !important;
              max-width: 220px !important;
            }
            
            .nav-logo {
              max-width: 220px;
            }
          }
          
          @media (min-width: 481px) and (max-width: 768px) {
            .logo-img {
              height: 105px !important;
              max-width: 200px !important;
            }
            
            .nav-logo {
              max-width: 200px;
            }
          }
        }
        
        [dir="rtl"] .mobile-nav-link {
          text-align: right;
        }
        
        [dir="rtl"] .mobile-menu-header {
          flex-direction: row-reverse;
        }
      `}</style>
    </>
  );
};