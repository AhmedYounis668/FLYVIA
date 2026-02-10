import React, { useState, useEffect, useRef } from 'react';
import { 
  FaWhatsapp, 
  FaPhone, 
  FaTimes,
  FaPaperPlane,
  FaBell,
  FaGlobe,
  FaExchangeAlt,
  FaLanguage
} from 'react-icons/fa';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger'; // أضف هذا السطر
import { useLanguage } from './LanguageProvider';

gsap.registerPlugin(ScrollTrigger); // سجل الـ plugin

export const FloatingContact = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [pulseAnimation, setPulseAnimation] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isSwitchingLang, setIsSwitchingLang] = useState(false);
  
  const containerRef = useRef(null);
  const whatsappBtnRef = useRef(null);
  const callBtnRef = useRef(null);
  const formRef = useRef(null);
  const langBtnRef = useRef(null);

  const { currentLang, changeLanguage } = useLanguage();

  const phoneNumber = "+201234567890";
  const whatsappNumber = "+201234567890";
  const whatsappMessage = "Hello! I'm interested in your services.";

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
    
    gsap.to(whatsappBtnRef.current, {
      scale: 0.8,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });
    
    setShowNotification(false);
  };

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
    
    gsap.to(callBtnRef.current, {
      scale: 0.8,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      alert('Please fill in your name and phone number');
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Quick form submitted:', formData);
      
      gsap.fromTo('.quick-success-message',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );
      
      setIsSubmitting(false);
      setShowForm(false);
      setFormData({ name: '', phone: '', message: '' });
      
      setTimeout(() => {
        setShowNotification(true);
      }, 10000);
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ========== دالة تبديل اللغة بدون reload ==========
  const toggleLanguage = () => {
    if (isSwitchingLang) return;
    
    const newLang = currentLang === 'EN' ? 'AR' : 'EN';
    
    setIsSwitchingLang(true);
    
    // تنظيف GSAP animations قبل التغيير
    if (ScrollTrigger) {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
    gsap.globalTimeline.clear();
    
    // حفظ اللغة الجديدة في localStorage
    localStorage.setItem('appLanguage', newLang);
    
    // Animation للزر
    if (langBtnRef.current) {
      gsap.to(langBtnRef.current, {
        rotation: 360,
        scale: 1.2,
        duration: 0.3,
        ease: 'back.out(1.7)',
        onComplete: () => {
          // تغيير direction بدون reload
          if (newLang === 'AR') {
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
          
          // تغيير اللغة
          changeLanguage(newLang);
          
          // إرسال حدث لتحديث الصفحة
          window.dispatchEvent(new CustomEvent('languageChanged', { detail: newLang }));
          
          // إعادة تحميل الـ ScrollTrigger بعد تغيير اللغة
          setTimeout(() => {
            if (ScrollTrigger) {
              ScrollTrigger.refresh();
            }
            setIsSwitchingLang(false);
          }, 300);
        }
      });
    } else {
      // تغيير direction بدون reload
      if (newLang === 'AR') {
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
      
      changeLanguage(newLang);
      
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: newLang }));
      
      setTimeout(() => {
        if (ScrollTrigger) {
          ScrollTrigger.refresh();
        }
        setIsSwitchingLang(false);
      }, 300);
    }
  };

  // GSAP Animations
  useEffect(() => {
    // Adjust animation based on screen size
    const fromY = isMobile ? -100 : 100;
    
    const tl = gsap.timeline({ delay: 1 });
    
    // Animation للأزرار الأساسية
    tl.fromTo(whatsappBtnRef.current,
      {
        y: fromY,
        opacity: 0,
        rotation: isMobile ? -180 : 180,
        scale: 0
      },
      {
        y: 0,
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)'
      }
    )
    .fromTo(callBtnRef.current,
      {
        y: fromY,
        opacity: 0,
        rotation: isMobile ? 180 : -180,
        scale: 0
      },
      {
        y: 0,
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)'
      },
      '-=0.5'
    );

    // ========== Animation لزر اللغة في الموبايل فقط ==========
    if (isMobile && langBtnRef.current) {
      gsap.fromTo(langBtnRef.current,
        {
          y: fromY,
          opacity: 0,
          rotation: 90,
          scale: 0
        },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'back.out(1.7)'
        }
      );
    }
    // =========================================================

    // Form animation
    if (showForm && formRef.current) {
      gsap.fromTo(formRef.current,
        {
          x: isMobile ? 0 : 100,
          y: isMobile ? 100 : 0,
          opacity: 0,
          scale: 0.8
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)'
        }
      );
    }

    // Pulse animation toggle
    const pulseInterval = setInterval(() => {
      setPulseAnimation(prev => !prev);
    }, 4000);

    // Auto-hide notification after 30 seconds
    const notificationTimeout = setTimeout(() => {
      setShowNotification(false);
    }, 30000);

    return () => {
      clearInterval(pulseInterval);
      clearTimeout(notificationTimeout);
    };
  }, [showForm, isMobile]);

  // Handle form close animation
  useEffect(() => {
    if (!showForm && formRef.current) {
      gsap.to(formRef.current, {
        x: isMobile ? 0 : 100,
        y: isMobile ? 100 : 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [showForm, isMobile]);

  return (
    <>
      {/* Floating Buttons Container */}
      <div className={`floating-contact-container ${isMobile ? 'mobile-view' : ''}`} ref={containerRef}>
        {/* WhatsApp Button */}
        <button
          ref={whatsappBtnRef}
          className={`floating-btn whatsapp-btn ${pulseAnimation ? 'pulse' : ''}`}
          onClick={handleWhatsAppClick}
          aria-label="Contact via WhatsApp"
        >
          <FaWhatsapp />
          <span className="floating-tooltip">
            Chat on WhatsApp
          </span>
          {showNotification && (
            <div className="notification-badge">
              <FaBell />
            </div>
          )}
        </button>

        {/* Call Button */}
        <button
          ref={callBtnRef}
          className={`floating-btn call-btn ${pulseAnimation ? 'pulse' : ''}`}
          onClick={handleCallClick}
          aria-label="Call us"
        >
          <FaPhone />
          <span className="floating-tooltip">
            Call us now
          </span>
        </button>

        {/* ========== زر تبديل اللغة البسيط للشاشات الصغيرة فقط ========== */}
        {isMobile && (
          <button
            ref={langBtnRef}
            className="floating-lang-toggle"
            onClick={toggleLanguage}
            disabled={isSwitchingLang}
          >
            <div className="lang-toggle-inner">
              <span className="toggle-text">
                {currentLang === 'EN' ? 'EN' : 'AR'}
                <FaExchangeAlt className="toggle-icon" />
                {currentLang === 'EN' ? 'AR' : 'EN'}
              </span>
            </div>
            
            <span className="floating-tooltip">
              Switch language
            </span>
          </button>
        )}
        {/* ============================================================== */}
      </div>

     
    </>
  );
};