import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { 
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock,
  FaPaperPlane, FaFacebook, FaTwitter, FaLinkedin,
  FaInstagram, FaYoutube, FaWhatsapp
} from 'react-icons/fa';
import { useLanguage } from './LanguageProvider';
import { useDispatch } from 'react-redux';
import { Add_Client_Action } from '../Redux/Actions/ClientAction';

export const ContactUs = () => {
  const { currentLang } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const infoCardsRef = useRef([]);
  const formRef = useRef(null);
  const mapRef = useRef(null);

  const dispatch = useDispatch();

  // دالة تحويل الأرقام الإنجليزية إلى عربية (للعرض فقط)
  const convertToArabicNumbers = useCallback((text) => {
    if (!text) return text;
    const arabicNumbers = {
      '0': '٠', '1': '١', '2': '٢', '3': '٣', '4': '٤',
      '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩'
    };
    return text.replace(/[0-9]/g, (match) => arabicNumbers[match]);
  }, []);

  // دالة تحويل الأرقام العربية إلى إنجليزية (للتخزين)
  const convertToEnglishNumbers = useCallback((text) => {
    if (!text) return text;
    const englishNumbers = {
      '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
      '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9'
    };
    return text.replace(/[٠-٩]/g, (match) => englishNumbers[match]);
  }, []);

  // الترجمات - مصححة بالكامل
  const translations = {
    EN: {
      sectionTitle: "Contact Us",
      sectionSubtitle: "Get in touch with us for any questions or inquiries",
      locationTitle: "Location",
      locationDetails: ["123 Business Avenue", "New York, NY 10001", "United States"],
      phoneTitle: "Phone",
      phoneDetails: ["+971502133623", "+971502145888"],
      emailTitle: "Email",
      emailDetails: ["info@flyvia.com", "support@flyvia.com"],
      hoursTitle: "Hours",
      hoursDetails: ["Mon-Fri: 9AM-6PM", "Sat: 10AM-4PM"],
      formTitle: "Send a Message",
      fullNameLabel: "Full Name *",
      fullNamePlaceholder: "Your name",
      emailLabel: "Email *",
      emailPlaceholder: "Your email",
      subjectLabel: "Subject",
      subjectPlaceholder: "Message subject",
      messageLabel: "Message *",
      messagePlaceholder: "Your message...",
      sendMessage: "Send Message",
      sending: "Sending...",
      successMessage: "Thank you! We'll contact you soon.",
      followUs: "Follow Us",
      chatWhatsApp: "Chat on WhatsApp",
      requiredFields: "Please fill in all required fields",
      nameError: "Name must contain only letters",
      phoneError: "Phone number must contain only numbers and +",
      emailError: "Invalid email format",
      nameRequired: "Name is required",
      emailRequired: "Email is required",
      phoneRequired: "Phone number is required",
      messageRequired: "Message is required",
      submitError: "Something went wrong. Please try again.",
      phoneExample: "Example: +971502133623"
    },
    AR: {
      sectionTitle: "اتصل بنا",
      sectionSubtitle: "تواصل معنا لأي استفسارات أو استعلامات",
      locationTitle: "الموقع",
      locationDetails: ["١٢٣ شارع الأعمال", "نيويورك، نيويورك ١٠٠٠١", "الولايات المتحدة"],
      phoneTitle: "الهاتف",
      phoneDetails: ["+971502133623", "+971502145888"], // هتتحول لـ 00 في العرض
      emailTitle: "البريد الإلكتروني",
      emailDetails: ["info@flyvia.com", "support@flyvia.com"],
      hoursTitle: "ساعات العمل",
      hoursDetails: ["الاثنين - الجمعة: ٩ صباحاً - ٦ مساءً", "السبت: ١٠ صباحاً - ٤ مساءً"],
      formTitle: "أرسل رسالة",
      fullNameLabel: "الاسم الكامل *",
      fullNamePlaceholder: "اسمك",
      emailLabel: "البريد الإلكتروني *",
      emailPlaceholder: "بريدك الإلكتروني",
      subjectLabel: "الموضوع",
      subjectPlaceholder: "موضوع الرسالة",
      messageLabel: "الرسالة *",
      messagePlaceholder: "رسالتك...",
      sendMessage: "أرسل الرسالة",
      sending: "جاري الإرسال...",
      successMessage: "شكراً لك! سنتواصل معك قريباً.",
      followUs: "تابعنا",
      chatWhatsApp: "محادثة على واتساب",
      requiredFields: "يرجى ملء جميع الحقول المطلوبة",
      nameError: "الاسم يجب أن يحتوي على حروف فقط",
      phoneError: "رقم الهاتف يجب أن يحتوي على أرقام فقط",
      emailError: "البريد الإلكتروني غير صحيح",
      nameRequired: "الاسم مطلوب",
      emailRequired: "البريد الإلكتروني مطلوب",
      phoneRequired: "رقم الهاتف مطلوب",
      messageRequired: "الرسالة مطلوبة",
      submitError: "حدث خطأ. يرجى المحاولة مرة أخرى",
      phoneExample: "مثال: ٠٠٩٧١٥٠٢١٣٣٦٢٣"
    }
  };

  // دالة الترجمة
  const t = useCallback((key) => {
    const langKey = currentLang === 'ar' ? 'AR' : 'EN';
    return translations[langKey]?.[key] || translations.EN[key] || key;
  }, [currentLang]);

  // دوال التحقق
  const validateEmail = useCallback((email) => {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validatePhone = useCallback((phone) => {
    if (!phone) return false;
    // يسمح فقط بالأرقام وعلامة + في البداية
    const phoneRegex = /^\+[0-9]+$/;
    return phoneRegex.test(phone);
  }, []);

  const validateName = useCallback((name) => {
    if (!name) return false;
    const nameRegex = /^[A-Za-z\u0600-\u06FF\s]+$/;
    return nameRegex.test(name);
  }, []);

  // دالة لتنظيف رقم الهاتف
  const cleanPhoneNumber = useCallback((phone) => {
    if (!phone) return '';
    let cleaned = phone.replace(/[^0-9+]/g, '');
    if (cleaned.indexOf('+') > 0) {
      cleaned = '+' + cleaned.replace(/\+/g, '');
    }
    return cleaned;
  }, []);

  // contactInfo - معالجة كاملة لكل العناصر
 // contactInfo - معالجة كاملة لكل العناصر (بما فيها الهاتف)
const contactInfo = useMemo(() => {
  const isArabic = currentLang === 'ar';
  const enTranslations = translations.EN;
  const arTranslations = translations.AR;
  
  // ✅ الموقع - أرقام عربية + RTL
  let locationDetails = isArabic ? [...arTranslations.locationDetails] : [...enTranslations.locationDetails];
  if (isArabic) {
    locationDetails = locationDetails.map(text => convertToArabicNumbers(text));
  }
  
  // ✅ الهاتف - 00 بدل + وأرقام عربية + LTR (زي الموقع بالضبط)
  let phoneDetails = isArabic ? [...arTranslations.phoneDetails] : [...enTranslations.phoneDetails];
  if (isArabic) {
    phoneDetails = phoneDetails.map(phone => {
      const withoutPlus = phone.replace('+', '');
      return '٠٠' + convertToArabicNumbers(withoutPlus);
    });
  }
  
  // ✅ ساعات العمل - أرقام عربية + RTL
  let hoursDetails = isArabic ? [...arTranslations.hoursDetails] : [...enTranslations.hoursDetails];
  if (isArabic) {
    hoursDetails = hoursDetails.map(text => convertToArabicNumbers(text));
  }
  
  return [
    {
      id: 1,
      icon: <FaMapMarkerAlt />,
      title: t('locationTitle'),
      details: locationDetails,
      type: 'location',
      isRTL: isArabic // RTL في العربية
    },
    {
      id: 2,
      icon: <FaPhone />,
      title: t('phoneTitle'),
      details: phoneDetails,
      type: 'phone',
      isRTL: false // LTR دائماً (زي الموقع بالضبط)
    },
    {
      id: 3,
      icon: <FaEnvelope />,
      title: t('emailTitle'),
      details: isArabic ? arTranslations.emailDetails : enTranslations.emailDetails,
      type: 'email',
      isRTL: false // LTR دائماً
    },
    {
      id: 4,
      icon: <FaClock />,
      title: t('hoursTitle'),
      details: hoursDetails,
      type: 'hours',
      isRTL: isArabic // RTL في العربية
    }
  ];
}, [currentLang, t, convertToArabicNumbers]);

  const socialMedia = [
    { icon: <FaFacebook />, name: "Facebook", color: "#1877F2" },
    { icon: <FaTwitter />, name: "Twitter", color: "#1DA1F2" },
    { icon: <FaLinkedin />, name: "LinkedIn", color: "#0A66C2" },
    { icon: <FaInstagram />, name: "Instagram", color: "#E4405F" },
    { icon: <FaYoutube />, name: "YouTube", color: "#FF0000" },
    { icon: <FaWhatsapp />, name: "WhatsApp", color: "#25D366" }
  ];

  // دالة مساعدة للـ direction
  const getDirection = useCallback(() => {
    return currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [currentLang]);

  // دوال التحقق من الحقول
  const validateField = useCallback((name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = t('nameRequired');
        } else if (!validateName(value)) {
          error = t('nameError');
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = t('emailRequired');
        } else if (!validateEmail(value)) {
          error = t('emailError');
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = t('phoneRequired');
        } else if (!validatePhone(value)) {
          error = t('phoneError');
        }
        break;
      case 'message':
        if (!value.trim()) {
          error = t('messageRequired');
        }
        break;
      default:
        break;
    }
    
    return error;
  }, [t, validateName, validateEmail, validatePhone]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const cleanedValue = cleanPhoneNumber(value);
      setFormData(prev => ({ ...prev, [name]: cleanedValue }));
      const error = validateField(name, cleanedValue);
      setErrors(prev => ({ ...prev, [name]: error }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
    
    if (submitError) setSubmitError('');
  }, [validateField, cleanPhoneNumber, submitError]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      message: validateField('message', formData.message),
      subject: ''
    };
    
    setErrors(newErrors);
    
    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const cleanPhone = convertToEnglishNumbers(formData.phone);
      
      await dispatch(Add_Client_Action({
        name: formData.name,
        email: formData.email || 'No Email',
        phone: cleanPhone,
        whatsappNumber: cleanPhone,
        jobTitle: formData.subject || 'No Subject',
        message: 'Register from contact form: ' + (formData.message || 'No Message'),
        countryName: 'No Country',
      }));
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setErrors({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
      setSubmitError(t('submitError'));
    }
  };

  useEffect(() => {
    infoCardsRef.current = infoCardsRef.current.slice(0, contactInfo.length);
  }, [contactInfo]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="contact-section" ref={sectionRef} id="contact">
      <Container>
        <div className="text-center">
          <h2 
            className={`contact-title animated-title ${isVisible ? 'visible' : ''}`}
            ref={titleRef}
          >
            {t('sectionTitle')}
          </h2>
          <p 
            className={`contact-subtitle animated-subtitle ${isVisible ? 'visible' : ''}`}
            ref={subtitleRef}
          >
            {t('sectionSubtitle')}
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Info Cards + Map */}
          <div className="contact-left">
            <div className="contact-info-grid">
              {contactInfo.map((info, index) => (
                <div 
                  key={info.id} 
                  className="contact-info-card"
                  ref={el => infoCardsRef.current[index] = el}
                  dir={info.isRTL ? 'rtl' : 'ltr'}
                  data-type={info.type}
                >
                  <div className="contact-icon">
                    {info.icon}
                  </div>
                  <h4 className="contact-info-title">{info.title}</h4>
                  <div className="contact-info-details">
                    {Array.isArray(info.details) && info.details.map((detail, idx) => (
                      <div 
                        key={idx} 
                        className="contact-detail"
                        style={{
                          flexDirection: currentLang === 'ar' && info.isRTL ? 'row-reverse' : 'row'
                        }}
                      >
                        {React.cloneElement(info.icon, { style: { fontSize: '14px' } })}
                        <span 
                          style={{ 
                            direction: info.type === 'phone' || info.type === 'email' ? 'ltr' : (info.isRTL ? 'rtl' : 'ltr'),
                            textAlign: info.type === 'phone' || info.type === 'email' ? 'left' : (info.isRTL ? 'right' : 'left'),
                            display: 'inline-block',
                            width: '100%',
                            unicodeBidi: 'bidi-override'
                          }}
                        >
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="map-container-compact" ref={mapRef}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.183948656365!2d-73.98773172436667!3d40.75797873894841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1648149123456!5m2!1sen!2sus"
                title={t('locationTitle')}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-right">
            <div 
              className="contact-form-container-compact" 
              ref={formRef}
              dir={getDirection()}
            >
              <h3 className="form-title">{t('formTitle')}</h3>
              
              <Form onSubmit={handleSubmit} className="contact-form">
                <Form.Group controlId="formName">
                  <Form.Label>{t('fullNameLabel')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('fullNamePlaceholder')}
                    required
                    dir={getDirection()}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>{t('emailLabel')}</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('emailPlaceholder')}
                    required
                    dir="ltr"
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formPhone">
                  <Form.Label>{t('phoneTitle')}</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={currentLang === 'ar' ? '٠٠٩٧١٥٠٢١٣٣٦٢٣' : '+971502133623'}
                    required
                    dir="ltr"
                    isInvalid={!!errors.phone}
                    style={{ textAlign: 'left' }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                  <Form.Text 
                    className="text-muted" 
                    style={{ direction: 'ltr', display: 'block', textAlign: 'left' }}
                  >
                    {t('phoneExample')}
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formSubject">
                  <Form.Label>{t('subjectLabel')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t('subjectPlaceholder')}
                    dir={getDirection()}
                  />
                </Form.Group>

                <Form.Group controlId="formMessage">
                  <Form.Label>{t('messageLabel')}</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('messagePlaceholder')}
                    rows={4}
                    required
                    dir={getDirection()}
                    isInvalid={!!errors.message}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {submitError && (
                  <div className="error-message" dir={getDirection()}>
                    {submitError}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('sending') : t('sendMessage')}
                  {!isSubmitting && <FaPaperPlane style={{ 
                    marginLeft: currentLang === 'ar' ? '0' : '10px', 
                    marginRight: currentLang === 'ar' ? '10px' : '0' 
                  }} />}
                </Button>
                
                {isSubmitted && (
                  <div className="success-message" dir={getDirection()}>
                    {t('successMessage')}
                  </div>
                )}
              </Form>
            </div>

            <div className="whatsapp-quick">
              <a 
                href="https://wa.me/971502133623" 
                target="_blank" 
                rel="noopener noreferrer"
                className="whatsapp-btn-compact"
                dir={getDirection()}
              >
                <FaWhatsapp />
                {t('chatWhatsApp')}
              </a>
            </div>
          </div>
        </div>

        <div className="social-media-compact">
          <h4 className="social-title-compact" dir={getDirection()}>
            {t('followUs')}
          </h4>
          <div className="social-icons-compact">
            {socialMedia.map((social, index) => (
              <a 
                key={index}
                href="#" 
                className="social-icon-compact"
                title={social.name}
                style={{ color: social.color }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </Container>

      <style jsx>{`
        .contact-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          position: relative;
          overflow: hidden;
        }

        .contact-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: #1a1a1a;
          position: relative;
          display: inline-block;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .contact-title.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .contact-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #ff4081, #7c4dff);
          border-radius: 2px;
        }

        .contact-subtitle {
          font-size: 1.1rem;
          color: #666;
          max-width: 700px;
          margin: 30px auto 50px;
          line-height: 1.8;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease 0.2s;
        }

        .contact-subtitle.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 50px;
        }

        .contact-info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }

        .contact-info-card {
          background: white;
          padding: 25px 20px;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .contact-info-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(255, 64, 129, 0.1);
        }

        .contact-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #ff4081, #7c4dff);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          margin-bottom: 15px;
        }

        [dir="rtl"] .contact-icon {
          margin-left: 0;
          margin-right: 0;
        }

        .contact-info-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 15px;
          color: #1a1a1a;
        }

        [dir="rtl"] .contact-info-title {
          text-align: right;
        }

        .contact-detail {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 10px;
          color: #666;
          font-size: 0.9rem;
        }

        .contact-detail svg {
          color: #ff4081;
          min-width: 16px;
          margin-top: 3px;
        }

        [dir="rtl"] .contact-detail {
          flex-direction: row-reverse;
        }

        .contact-detail span {
          display: inline-block;
          word-break: break-word;
          flex: 1;
        }

        .map-container-compact {
          width: 100%;
          height: 250px;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
        }

        .map-container-compact iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        .contact-form-container-compact {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
          margin-bottom: 20px;
        }

        .form-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 25px;
          color: #1a1a1a;
          position: relative;
        }

        .form-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 50px;
          height: 3px;
          background: linear-gradient(90deg, #ff4081, #7c4dff);
          border-radius: 2px;
        }

        [dir="rtl"] .form-title::after {
          left: auto;
          right: 0;
        }

        .contact-form .form-group {
          margin-bottom: 20px;
        }

        .contact-form .form-label {
          font-weight: 600;
          color: #444;
          margin-bottom: 8px;
          display: block;
        }

        [dir="rtl"] .contact-form .form-label {
          text-align: right;
        }

        .contact-form .form-control {
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          padding: 12px 15px;
          transition: all 0.3s ease;
        }

        .contact-form .form-control:focus {
          border-color: #ff4081;
          box-shadow: 0 0 0 3px rgba(255, 64, 129, 0.1);
        }

        .contact-form .form-control.is-invalid {
          border-color: #dc3545;
        }

        .invalid-feedback {
          color: #dc3545;
          font-size: 0.85rem;
          margin-top: 5px;
          display: block;
        }

        [dir="rtl"] .invalid-feedback {
          text-align: right;
        }

        .error-message {
          background: #f8d7da;
          color: #721c24;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 15px;
          text-align: center;
          border: 1px solid #f5c6cb;
        }

        .submit-btn {
          background: linear-gradient(135deg, #ff4081, #7c4dff);
          border: none;
          border-radius: 10px;
          padding: 12px 30px;
          font-weight: 600;
          width: 100%;
          margin-top: 10px;
          transition: all 0.3s ease;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 64, 129, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .success-message {
          background: #d4edda;
          color: #155724;
          padding: 15px;
          border-radius: 10px;
          margin-top: 20px;
          text-align: center;
          border: 1px solid #c3e6cb;
        }

        .whatsapp-quick {
          margin-top: 20px;
        }

        .whatsapp-btn-compact {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #25D366;
          color: white;
          padding: 15px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .whatsapp-btn-compact:hover {
          background: #128C7E;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(37, 211, 102, 0.3);
          color: white;
        }

        [dir="rtl"] .whatsapp-btn-compact {
          flex-direction: row-reverse;
        }

        .social-media-compact {
          text-align: center;
          margin-top: 50px;
        }

        .social-title-compact {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 20px;
          color: #1a1a1a;
        }

        [dir="rtl"] .social-title-compact {
          text-align: center;
        }

        .social-icons-compact {
          display: flex;
          gap: 15px;
          justify-content: center;
        }

        .social-icon-compact {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          transition: all 0.3s ease;
          border: 1px solid #e0e0e0;
          background: white;
          text-decoration: none;
        }

        .social-icon-compact:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        @media (max-width: 768px) {
          .contact-section {
            padding: 60px 0;
          }

          .contact-title {
            font-size: 2rem;
          }

          .contact-info-grid {
            grid-template-columns: 1fr;
          }

          .contact-form-container-compact {
            padding: 20px;
          }
        }

        @media (max-width: 480px) {
          .contact-title {
            font-size: 1.75rem;
          }

          .social-icons-compact {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </section>
  );
};