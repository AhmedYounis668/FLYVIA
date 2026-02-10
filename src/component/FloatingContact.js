import React, { useState, useEffect, useRef } from 'react';
import { 
  FaWhatsapp, 
  FaPhone, 
  FaBell,
  FaArrowUp
} from 'react-icons/fa';

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
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const containerRef = useRef(null);
  const whatsappBtnRef = useRef(null);
  const callBtnRef = useRef(null);
  const backToTopRef = useRef(null);
  const formRef = useRef(null);

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

  // Show buttons with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonsVisible(true);
    }, 1000); // تأخير 1 ثانية
    
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle form visibility
  useEffect(() => {
    if (showForm) {
      setFormVisible(true);
    } else {
      const timer = setTimeout(() => {
        setFormVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showForm]);

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
    
    if (whatsappBtnRef.current) {
      whatsappBtnRef.current.classList.add('click-animation');
      setTimeout(() => {
        whatsappBtnRef.current.classList.remove('click-animation');
      }, 300);
    }
    
    setShowNotification(false);
  };

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
    
    if (callBtnRef.current) {
      callBtnRef.current.classList.add('click-animation');
      setTimeout(() => {
        callBtnRef.current.classList.remove('click-animation');
      }, 300);
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    if (backToTopRef.current) {
      backToTopRef.current.classList.add('click-animation');
      setTimeout(() => {
        backToTopRef.current.classList.remove('click-animation');
      }, 300);
    }
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

  // Pulse animation toggle
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulseAnimation(prev => !prev);
    }, 4000);

    const notificationTimeout = setTimeout(() => {
      setShowNotification(false);
    }, 30000);

    return () => {
      clearInterval(pulseInterval);
      clearTimeout(notificationTimeout);
    };
  }, []);

  return (
    <>
      {/* Floating Buttons Container */}
      <div className={`floating-contact-container ${isMobile ? 'mobile-view' : ''}`} ref={containerRef}>
        {/* Back to Top Button - Desktop (فوق الأزرار) */}
        {!isMobile && showBackToTop && (
          <button
            ref={backToTopRef}
            className="floating-btn back-to-top-btn"
            onClick={handleBackToTop}
            aria-label="Back to top"
          >
            <FaArrowUp />
            <span className="floating-tooltip">
              Back to top
            </span>
          </button>
        )}

        {/* WhatsApp Button */}
        <button
          ref={whatsappBtnRef}
          className={`floating-btn whatsapp-btn ${buttonsVisible ? 'visible' : ''} ${pulseAnimation ? 'pulse' : ''}`}
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
          className={`floating-btn call-btn ${buttonsVisible ? 'visible' : ''} ${pulseAnimation ? 'pulse' : ''}`}
          onClick={handleCallClick}
          aria-label="Call us"
        >
          <FaPhone />
          <span className="floating-tooltip">
            Call us now
          </span>
        </button>

        {/* Back to Top Button - Mobile (مع الأزرار) */}
        {isMobile && showBackToTop && (
          <button
            ref={backToTopRef}
            className={`floating-btn back-to-top-btn ${buttonsVisible ? 'visible' : ''}`}
            onClick={handleBackToTop}
            aria-label="Back to top"
          >
            <FaArrowUp />
            <span className="floating-tooltip">
              Back to top
            </span>
          </button>
        )}
      </div>

      <style jsx>{`
        /* Base Styles - Desktop */
        .floating-contact-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          display: flex;
          flex-direction: column-reverse; /* لجعل زر Back to Top فوق */
          gap: 15px;
          align-items: flex-end;
        }
        
        /* Mobile Styles - الأيقونات جنبًا إلى جنب */
        .floating-contact-container.mobile-view {
          bottom: 20px;
          right: 20px;
          flex-direction: row; /* تغيير إلى row لجعل الأيقونات جنبًا إلى جنب */
          gap: 10px;
          align-items: center;
        }
        
        /* Floating Buttons */
        .floating-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: white;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          position: relative;
          opacity: 0;
          transform: translateY(100px) rotate(180deg) scale(0);
        }
        
        .floating-btn.visible {
          opacity: 1;
          transform: translateY(0) rotate(0) scale(1);
          animation: floatIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        
        /* Back to Top Button */
        .back-to-top-btn {
          background: linear-gradient(135deg, #8B5CF6, #7C3AED); /* لون أرجواني */
          animation-delay: 0.1s;
        }
        
        .back-to-top-btn:hover {
          background: linear-gradient(135deg, #7C3AED, #8B5CF6);
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
        }
        
        /* WhatsApp Button */
        .whatsapp-btn {
          background: linear-gradient(135deg, #25D366, #128C7E);
          animation-delay: 0.2s;
        }
        
        .whatsapp-btn:hover {
          background: linear-gradient(135deg, #128C7E, #25D366);
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
        }
        
        /* Call Button */
        .call-btn {
          background: linear-gradient(135deg, #3B82F6, #1D4ED8);
          animation-delay: 0.3s;
        }
        
        .call-btn:hover {
          background: linear-gradient(135deg, #1D4ED8, #3B82F6);
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
        }
        
        /* Mobile view adjustments */
        .mobile-view .floating-btn {
          width: 55px;
          height: 55px;
          font-size: 22px;
          transform: translateY(100px) rotate(180deg) scale(0);
        }
        
        .mobile-view .floating-btn.visible {
          transform: translateY(0) rotate(0) scale(1);
        }
        
        /* تأخير ظهور الأيقونات في الموبايل */
        .mobile-view .call-btn.visible {
          animation-delay: 0.2s;
        }
        
        .mobile-view .back-to-top-btn.visible {
          animation-delay: 0.3s;
        }
        
        /* Pulse Animation */
        .floating-btn.pulse::before {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border-radius: 50%;
          border: 2px solid;
          opacity: 0;
          animation: pulseRing 4s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        
        .whatsapp-btn.pulse::before {
          border-color: #25D366;
        }
        
        .call-btn.pulse::before {
          border-color: #3B82F6;
        }
        
        .back-to-top-btn.pulse::before {
          border-color: #8B5CF6;
        }
        
        /* Click Animation */
        .click-animation {
          animation: clickEffect 0.3s ease;
        }
        
        /* Tooltip */
        .floating-tooltip {
          position: absolute;
          right: 70px;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 8px 15px;
          border-radius: 4px;
          font-size: 14px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 1001;
        }
        
        .floating-btn:hover .floating-tooltip {
          opacity: 1;
        }
        
        /* Mobile tooltip - أعلى الأيقونة */
        .mobile-view .floating-tooltip {
          right: auto;
          left: 50%;
          top: -45px;
          transform: translateX(-50%);
          white-space: nowrap;
          text-align: center;
        }
        
        /* Notification Badge */
        .notification-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #FF6B6B;
          color: white;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: bounce 2s ease infinite;
        }
        
        /* Keyframe Animations */
        @keyframes floatIn {
          0% {
            opacity: 0;
            transform: translateY(100px) rotate(180deg) scale(0);
          }
          70% {
            transform: translateY(-10px) rotate(-10deg) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(0) scale(1);
          }
        }
        
        @keyframes pulseRing {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          25% {
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 0;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
        
        @keyframes clickEffect {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.8);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        /* Back to Top Button Entrance Animation */
        @keyframes slideInFromBottom {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .back-to-top-btn {
          animation: slideInFromBottom 0.4s ease-out forwards;
        }
        
        /* Responsive Adjustments */
        @media (max-width: 480px) {
          .floating-contact-container.mobile-view {
            bottom: 15px;
            right: 15px;
            gap: 8px;
          }
          
          .mobile-view .floating-btn {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }
          
          .mobile-view .floating-tooltip {
            font-size: 12px;
            padding: 6px 10px;
            top: -40px;
          }
          
          .notification-badge {
            width: 18px;
            height: 18px;
            font-size: 9px;
          }
          
          /* إخفاء زر Back to Top إذا كان هناك أكثر من 3 أزرار وشاشة صغيرة جدًا */
          @media (max-width: 350px) {
            .floating-contact-container.mobile-view {
              gap: 6px;
            }
            
            .mobile-view .floating-btn {
              width: 45px;
              height: 45px;
              font-size: 18px;
            }
            
            .mobile-view .floating-tooltip {
              display: none; /* إخفاء الـ tooltip في الشاشات الصغيرة جدًا */
            }
          }
        }
        
        @media (max-width: 360px) {
          .floating-contact-container.mobile-view {
            bottom: 10px;
            right: 10px;
            gap: 6px;
          }
          
          .mobile-view .floating-btn {
            width: 45px;
            height: 45px;
            font-size: 18px;
          }
          
          .mobile-view .floating-tooltip {
            font-size: 11px;
            padding: 5px 8px;
            top: -35px;
          }
        }
        
        /* Small devices - مثل iPhone SE */
        @media (max-width: 320px) {
          .floating-contact-container.mobile-view {
            bottom: 8px;
            right: 8px;
            gap: 5px;
          }
          
          .mobile-view .floating-btn {
            width: 42px;
            height: 42px;
            font-size: 17px;
          }
          
          .mobile-view .back-to-top-btn {
            display: none; /* إخفاء زر Back to Top في الشاشات الصغيرة جدًا */
          }
        }
        
        /* تحسين لشاشات كبيرة لكن في وضع mobile (عرض بين 768 و 1024) */
        @media (min-width: 769px) and (max-width: 1024px) {
          .floating-btn {
            width: 65px;
            height: 65px;
            font-size: 26px;
          }
          
          .floating-tooltip {
            font-size: 15px;
            padding: 10px 18px;
          }
        }
        
        /* تحسين لشاشات كبيرة جدًا */
        @media (min-width: 1440px) {
          .floating-contact-container {
            bottom: 30px;
            right: 30px;
          }
          
          .floating-btn {
            width: 70px;
            height: 70px;
            font-size: 28px;
          }
        }
      `}</style>
    </>
  );
};