import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import logo from '../Images/Flyvia Logo.png';
import { FaGlobe, FaExchangeAlt } from 'react-icons/fa';
import { useLanguage } from '../component/LanguageProvider';
import { useLocation, useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export const CustomNavbar = () => {
  const navbarRef = useRef(null);
  const brandRef = useRef(null);
  const hamburgerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  
  const { currentLang, changeLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [isSwitchingLang, setIsSwitchingLang] = useState(false);
  const langDropdownRef = useRef(null);
  const langSwitchRef = useRef(null);

  const translations = {
    EN: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      testimonials: 'Testimonials',
      blog: 'Blog Entries',
      contact: 'Contact Us',
      changeLanguage: 'Change Language',
      english: 'English',
      arabic: 'Arabic'
    },
    AR: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      testimonials: 'آراء العملاء',
      blog: 'المدونة',
      contact: 'اتصل بنا',
      changeLanguage: 'تغيير اللغة',
      english: 'الإنجليزية',
      arabic: 'العربية'
    }
  };

  // تعريف navItems مع الـ routes الجديدة
  const navItems = [
    { id: 'home', path: '/', name: 'home' },
    { id: 'about', path: '/Aboutuspage', name: 'about' },
    { id: 'services', path: '/ourservicepage', name: 'services' },
    { id: 'blog', path: '/MainBlogsCardspage', name: 'blog' },
    { id: 'contact', path: '/#contact', name: 'contact' }
  ];

  const getText = (id) => {
    return translations[currentLang][id];
  };

  useEffect(() => {
    // تحديث الـ active item بناء على الـ URL الحالي
    const path = location.pathname;
    
    if (path === '/') {
      setActiveItem('home');
    } else if (path === '/Aboutuspage') {
      setActiveItem('about');
    } else if (path === '/ourservicepage') {
      setActiveItem('services');
    } else if (path === '/MainBlogsCardspage') {
      setActiveItem('blog');
    } else if (path.includes('/BlogDetails')) {
      setActiveItem('blog');
    } else if (path === '/Login' || path === '/dashboard') {
      setActiveItem('');
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
        
        if (isScrolled) {
          navbarRef.current?.classList.add('scrolled');
        } else {
          navbarRef.current?.classList.remove('scrolled');
        }
      }
    };

    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.fromTo(navbarRef.current,
      {
        y: -100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }
    );

    tl.fromTo(brandRef.current,
      {
        x: -30,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.7)'
      },
      '-=0.5'
    );

    const navLinks = document.querySelectorAll('.nav-link-custom');
    navLinks.forEach((link, index) => {
      gsap.fromTo(link,
        {
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.8 + (index * 0.1),
          ease: 'back.out(1.7)'
        }
      );
    });

    const langNavItem = document.querySelector('.lang-nav-item');
    if (langNavItem) {
      gsap.fromTo(langNavItem,
        {
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 1.3,
          ease: 'back.out(1.7)'
        }
      );
    }

    gsap.fromTo(hamburgerRef.current,
      {
        rotation: -180,
        opacity: 0,
        scale: 0.5
      },
      {
        rotation: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: 1.2,
        ease: 'back.out(1.7)'
      }
    );

    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          scale: 1.05,
          duration: 0.2,
          ease: 'power2.out'
        });
      });

      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out'
        });
      });
    });

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, currentLang, location.pathname]);

  const toggleMenu = () => {
    const newMenuState = !menuOpen;
    setMenuOpen(newMenuState);
    
    if (newMenuState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    const lines = document.querySelectorAll('.hamburger-line');
    
    if (newMenuState) {
      gsap.to(lines[0], {
        rotation: 45,
        y: 7,
        x: 0,
        width: 30,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      gsap.to(lines[1], {
        opacity: 0,
        x: -10,
        duration: 0.2,
        ease: 'power2.out'
      });
      
      gsap.to(lines[2], {
        rotation: -45,
        y: -7,
        x: 0,
        width: 30,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(lines[0], {
        rotation: 0,
        y: 0,
        x: 0,
        width: 25,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      gsap.to(lines[1], {
        opacity: 1,
        x: 0,
        duration: 0.2,
        delay: 0.1,
        ease: 'power2.out'
      });
      
      gsap.to(lines[2], {
        rotation: 0,
        y: 0,
        x: 0,
        width: 30,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleChangeLanguage = (lang, closeMenu = true) => {
    if (lang === currentLang || isSwitchingLang) return;
    
    setIsSwitchingLang(true);
    
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.globalTimeline.clear();
    
    localStorage.setItem('appLanguage', lang);
    
    setShowLangDropdown(false);
    
    if (closeMenu && menuOpen) {
      setMenuOpen(false);
      document.body.style.overflow = 'auto';
    }
    
    changeLanguage(lang);
    
    setTimeout(() => {
      setIsSwitchingLang(false);
    }, 500);
  };

  const toggleLangDropdown = (e) => {
    e.stopPropagation();
    setShowLangDropdown(!showLangDropdown);
    
    if (!showLangDropdown && langDropdownRef.current) {
      gsap.fromTo(langDropdownRef.current,
        {
          scaleY: 0,
          opacity: 0,
          y: -20
        },
        {
          scaleY: 1,
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'back.out(1.7)'
        }
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        const langNavItem = document.querySelector('.lang-nav-item');
        if (langNavItem && !langNavItem.contains(event.target)) {
          setShowLangDropdown(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // دالة للتنقل بين الصفحات
  const navigateToPage = (path, itemId, e) => {
    if (e) {
      e.preventDefault();
    }
    
    setActiveItem(itemId);
    
    // إغلاق القائمة المتنقلة إذا كانت مفتوحة
    if (menuOpen) {
      setMenuOpen(false);
      document.body.style.overflow = 'auto';
    }
    
    // إذا كان path يبدأ بـ /# فهو section في نفس الصفحة
    if (path.startsWith('/#')) {
      const sectionId = path.replace('/#', '');
      scrollToSection(sectionId);
    } else {
      // إذا كان route عادي، اذهب للصفحة
      navigate(path);
      
      // إذا كان Home، اذهب للأعلى
      if (path === '/') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  };

  // دالة للعودة للرئيسية
  const navigateToHome = (e) => {
    if (e) {
      e.preventDefault();
    }
    
    setActiveItem('home');
    navigate('/');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // دالة للتنقل إلى السكاشن (مازالت محفوظة لـ contact)
  const scrollToSection = (sectionId) => {
    // البحث عن العنصر
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // ارتفاع الـ navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // تحديث الـ URL بدون إعادة تحميل الصفحة
      window.history.pushState(null, '', `/#${sectionId}`);
    }
  };

  return (
    <>
      <div className="custom-navbar-wrapper">
        <nav className={`custom-navbar ${scrolled ? 'scrolled' : ''}`} ref={navbarRef}>
          <a 
            href="/" 
            className="navbar-brand-link"
            onClick={navigateToHome}
          >
            <img 
              className='navbar-brand-custom' 
              ref={brandRef} 
              style={{width:'120px',height:'120px'}} 
              src={logo} 
              alt='logo'
            />
          </a>
          
          {/* Desktop Menu - للشاشات الكبيرة فقط */}
          <div className="nav-menu">
            {navItems.map((item, index) => (
              <a 
                key={index}
                href={item.path}
                className={`nav-link-custom ${activeItem === item.id ? 'active' : ''}`}
                onClick={(e) => navigateToPage(item.path, item.id, e)}
              >
                {getText(item.name)}
              </a>
            ))}
            
            <div className="lang-nav-item desktop-only" onClick={toggleLangDropdown}>
              <button 
                className="lang-nav-btn"
                aria-label="Select language"
                disabled={isSwitchingLang}
              >
                <FaGlobe className="lang-nav-icon" />
                <span className="lang-nav-text">{currentLang}</span>
                <span className="lang-nav-arrow">▼</span>
              </button>
              
              {showLangDropdown && (
                <div className="lang-dropdown" ref={langDropdownRef}>
                  <button 
                    className={`lang-option ${currentLang === 'EN' ? 'active' : ''}`}
                    onClick={() => handleChangeLanguage('EN', false)}
                  >
                    <span className="lang-flag">🇬🇧</span>
                    <span>{getText('english')}</span>
                  </button>
                  <button 
                    className={`lang-option ${currentLang === 'AR' ? 'active' : ''}`}
                    onClick={() => handleChangeLanguage('AR', false)}
                  >
                    <span className="lang-flag">🇸🇦</span>
                    <span>{getText('arabic')}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <button 
            className={`hamburger-btn-custom ${menuOpen ? 'active' : ''}`}
            ref={hamburgerRef}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </nav>
      </div>
      
      <div 
        className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      />
      
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navItems.map((item, index) => (
          <a 
            key={index}
            href={item.path}
            className={`nav-link-custom ${activeItem === item.id ? 'active' : ''}`}
            onClick={(e) => {
              navigateToPage(item.path, item.id, e);
              toggleMenu();
            }}
          >
            {getText(item.name)}
          </a>
        ))}
        
        <div className="mobile-language-switch">
          <div className="modern-language-toggle">
            <button
              className={`modern-toggle-btn ${isSwitchingLang ? 'switching' : ''}`}
              onClick={() => {
                const newLang = currentLang === 'EN' ? 'AR' : 'EN';
                handleChangeLanguage(newLang, true);
              }}
              disabled={isSwitchingLang}
            >
              <div className="toggle-background">
                <div className={`toggle-slider ${currentLang === 'EN' ? 'left' : 'right'}`}>
                  <span className="slider-flag">
                    {currentLang === 'EN' ? '🇬🇧' : '🇸🇦'}
                  </span>
                </div>
                
                <div className="toggle-labels">
                  <span className={`label-left ${currentLang === 'EN' ? 'active' : ''}`}>
                    EN
                  </span>
                  <span className={`label-right ${currentLang === 'AR' ? 'active' : ''}`}>
                    AR
                  </span>
                </div>
              </div>
              
              <div className="toggle-text">
                <span className="current-lang-name">
                  {getText(currentLang === 'EN' ? 'english' : 'arabic')}
                </span>
                <FaExchangeAlt className="toggle-icon" />
                <span className="target-lang-name">
                  {getText(currentLang === 'EN' ? 'arabic' : 'english')}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};