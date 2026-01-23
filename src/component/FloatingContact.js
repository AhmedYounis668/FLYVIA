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
import { useLanguage } from './LanguageProvider';

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

  // ========== دالة تبديل اللغة البسيطة ==========
  const toggleLanguage = () => {
    if (isSwitchingLang) return;
    
    const newLang = currentLang === 'EN' ? 'AR' : 'EN';
    
    setIsSwitchingLang(true);
    
    // تنظيف GSAP animations قبل التغيير
    if (window.ScrollTrigger) {
      window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
    gsap.globalTimeline.clear();
    
    // حفظ اللغة الجديدة في localStorage أولاً
    localStorage.setItem('appLanguage', newLang);
    
    // Animation للزر
    if (langBtnRef.current) {
      gsap.to(langBtnRef.current, {
        rotation: 360,
        scale: 1.2,
        duration: 0.3,
        ease: 'back.out(1.7)',
        onComplete: () => {
          changeLanguage(newLang);
          setTimeout(() => {
            window.location.reload();
          }, 200);
        }
      });
    } else {
      changeLanguage(newLang);
      setTimeout(() => {
        window.location.reload();
      }, 200);
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
      {/* العلم الحالي */}
      {/* <span className="current-flag">
        {currentLang === 'EN' ? }
      </span> */}
      
      {/* نص التبديل */}
      <span className="toggle-text">
        {currentLang === 'EN' ? 'EN' : 'AR'}
        <FaExchangeAlt className="toggle-icon" />
        {currentLang === 'EN' ? 'AR' : 'EN'}
      </span>
      
      {/* أيقونة التبديل */}
      {/* <FaLanguage className="lang-icon" /> */}
    </div>
    
    <span className="floating-tooltip">
      Switch language
    </span>
  </button>
)}
        {/* ============================================================== */}
      </div>

      {/* Quick Contact Form */}
      <div 
        ref={formRef}
        className={`quick-contact-form ${showForm ? 'active' : ''} ${isMobile ? 'mobile-form' : ''}`}
      >
        <div className="quick-form-header">
          <h3 className="quick-form-title">Quick Contact</h3>
          <button 
            className="close-quick-form"
            onClick={() => setShowForm(false)}
            aria-label="Close form"
          >
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            className="quick-form-input"
            required
          />
          
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="quick-form-input"
            required
          />
          
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your Message (Optional)"
            className="quick-form-input"
            rows="3"
          />
          
          <button 
            type="submit" 
            className="quick-form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
            {!isSubmitting && <FaPaperPlane style={{ marginLeft: '10px' }} />}
          </button>
        </form>
      </div>
    </>
  );
};