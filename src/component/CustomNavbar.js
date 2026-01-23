import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import logo from '../Images/Flyvia Logo.png';
import { FaGlobe, FaExchangeAlt } from 'react-icons/fa';
import { useLanguage } from '../component/LanguageProvider';

gsap.registerPlugin(ScrollTrigger);

export const CustomNavbar = () => {
  const navbarRef = useRef(null);
  const brandRef = useRef(null);
  const hamburgerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const { currentLang, changeLanguage } = useLanguage();
  
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [isSwitchingLang, setIsSwitchingLang] = useState(false);
  const langDropdownRef = useRef(null);
  const langSwitchRef = useRef(null);

  const translations = {
    EN: {
      home: 'Home',
      about: 'About',
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
      testimonials: 'آراء العملاء',
      blog: 'المدونة',
      contact: 'اتصل بنا',
      changeLanguage: 'تغيير اللغة',
      english: 'الإنجليزية',
      arabic: 'العربية'
    }
  };

  const navItems = [
    { href: '#home', id: 'home' },
    { href: '#about', id: 'about' },
    { href: '#testimonials', id: 'testimonials' },
    { href: '#blog', id: 'blog' },
    { href: '#contact', id: 'contact' }
  ];

  const getText = (id) => {
    return translations[currentLang][id];
  };

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

    // زر اللغة في الديسكتوب (للسكرينات الكبيرة فقط)
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
  }, [scrolled, currentLang]);

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

  const handleChangeLanguage = (lang) => {
    if (lang === currentLang || isSwitchingLang) return;
    
    setIsSwitchingLang(true);
    
    // تنظيف GSAP animations قبل التغيير
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.globalTimeline.clear();
    
    // حفظ اللغة الجديدة في localStorage أولاً
    localStorage.setItem('appLanguage', lang);
    
    // إغلاق القائمة المنسدلة إذا كانت مفتوحة
    setShowLangDropdown(false);
    
    // إغلاق القائمة المتنقلة إذا كانت مفتوحة
    if (menuOpen) {
      setMenuOpen(false);
      document.body.style.overflow = 'auto';
    }
    
    // تغيير اللغة مع انيميشن سريع
    changeLanguage(lang);
    
    // بعد 200ms ثانية، عمل refresh للصفحة
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  const toggleLanguageSwitch = () => {
    const newLang = currentLang === 'EN' ? 'AR' : 'EN';
    handleChangeLanguage(newLang);
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

  return (
    <>
      <div className="custom-navbar-wrapper">
        <nav className={`custom-navbar ${scrolled ? 'scrolled' : ''}`} ref={navbarRef}>
          <img 
            className='navbar-brand-custom' 
            ref={brandRef} 
            style={{width:'120px',height:'120px'}} 
            src={logo} 
            alt='logo'
          />
          
          {/* Desktop Menu - للشاشات الكبيرة فقط */}
          <div className="nav-menu">
            {navItems.map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className={`nav-link-custom ${index === 0 ? 'active' : ''}`}
              >
                {getText(item.id)}
              </a>
            ))}
            
            {/* زر اللغة للديسكتوب فقط (للسكرينات الكبيرة) */}
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
                    onClick={() => handleChangeLanguage('EN')}
                  >
                    <span className="lang-flag">🇬🇧</span>
                    <span>{getText('english')}</span>
                  </button>
                  <button 
                    className={`lang-option ${currentLang === 'AR' ? 'active' : ''}`}
                    onClick={() => handleChangeLanguage('AR')}
                  >
                    <span className="lang-flag">🇸🇦</span>
                    <span>{getText('arabic')}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Hamburger Button */}
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
      
      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      />
      
      {/* Mobile Menu - للشاشات الصغيرة */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navItems.map((item, index) => (
          <a 
            key={index}
            href={item.href} 
            className={`nav-link-custom ${index === 0 ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            {getText(item.id)}
          </a>
        ))}
        
        {/* زر اللغة في القائمة المتنقلة (Mobile Menu) */}
       <div className="mobile-language-switch">
  {/* <div className="mobile-language-header">
    <FaGlobe className="mobile-language-icon" />
    <span className="mobile-language-title">{getText('changeLanguage')}</span>
  </div> */}
  
  {/* تصميم التبديل الحديث */}
  <div className="modern-language-toggle">
    {/* زر التبديل */}
    <button
      className={`modern-toggle-btn ${isSwitchingLang ? 'switching' : ''}`}
      onClick={() => {
        const newLang = currentLang === 'EN' ? 'AR' : 'EN';
        handleChangeLanguage(newLang);
        toggleMenu();
      }}
      disabled={isSwitchingLang}
    >
      {/* الجزء الخلفي المتحرك */}
      <div className="toggle-background">
        {/* الدائرة المنزلقة */}
        <div className={`toggle-slider ${currentLang === 'EN' ? 'left' : 'right'}`}>
          <span className="slider-flag">
            {currentLang === 'EN' ? 'EN' : 'AR'}
          </span>
        </div>
        
        {/* العلامات الثابتة */}
        <div className="toggle-labels">
          <span className={`label-left ${currentLang === 'EN' ? 'active' : ''}`}>
            🇬🇧
          </span>
          <span className={`label-right ${currentLang === 'AR' ? 'active' : ''}`}>
            🇸🇦
          </span>
        </div>
      </div>
      
      {/* النص التوضيحي */}
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