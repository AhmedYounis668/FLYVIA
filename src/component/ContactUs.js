import React, { useEffect, useRef, useState } from 'react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const infoCardsRef = useRef([]);
  const formRef = useRef(null);
  const mapRef = useRef(null);

  // دالة مساعدة للـ direction
  const getDirection = () => {
    return currentLang === 'ar' ? 'rtl' : 'ltr';
  };

  // دالة مساعدة للـ text-align
  const getTextAlign = () => {
    return currentLang === 'ar' ? 'right' : 'left';
  };

  // الترجمات
  const translations = {
    EN: {
      sectionTitle: "Contact Us",
      sectionSubtitle: "Get in touch with us for any questions or inquiries",
      locationTitle: "Location",
      locationDetails: ["123 Business Avenue", "New York, NY 10001", "United States"],
      phoneTitle: "Phone",
      phoneDetails: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
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
      requiredFields: "Please fill in all required fields"
    },
    AR: {
      sectionTitle: "اتصل بنا",
      sectionSubtitle: "تواصل معنا لأي استفسارات أو استعلامات",
      locationTitle: "الموقع",
      locationDetails: ["123 شارع الأعمال", "نيويورك، نيويورك 10001", "الولايات المتحدة"],
      phoneTitle: "الهاتف",
      phoneDetails: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      emailTitle: "البريد الإلكتروني",
      emailDetails: ["info@flyvia.com", "support@flyvia.com"],
      hoursTitle: "ساعات العمل",
      hoursDetails: ["الاثنين-الجمعة: 9 صباحاً-6 مساءً", "السبت: 10 صباحاً-4 مساءً"],
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
      requiredFields: "يرجى ملء جميع الحقول المطلوبة"
    }
  };

  // دالة الترجمة المحسنة
  const t = (key) => {
    // تحويل currentLang إلى أحرف كبيرة
    const langKey = currentLang.toUpperCase();
    const translation = translations[langKey]?.[key];
    
    if (!translation) {
      // إذا لم توجد الترجمة، استخدام الإنجليزية
      return translations.EN[key] || key;
    }
    
    return translation;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const dispatch = useDispatch();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.phone) {
      alert(t('requiredFields'));
      return;
    }
      
    await dispatch(Add_Client_Action({
      name: formData.name,
      email: formData.email || 'No Email',
      phone: formData.phone,
      whatsappNumber: formData.phone,
      jobTitle: formData.subject,
      message: 'register from send a message' + ' ' + (formData.message || 'No Message'),
      countryName: 'No Country',
    }));
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  // استخدام useMemo لـ contactInfo لمنع إعادة التصيير
  const contactInfo = React.useMemo(() => [
    {
      id: 1,
      icon: <FaMapMarkerAlt />,
      title: t('locationTitle'),
      details: t('locationDetails')
    },
    {
      id: 2,
      icon: <FaPhone />,
      title: t('phoneTitle'),
      details: t('phoneDetails')
    },
    {
      id: 3,
      icon: <FaEnvelope />,
      title: t('emailTitle'),
      details: t('emailDetails')
    },
    {
      id: 4,
      icon: <FaClock />,
      title: t('hoursTitle'),
      details: t('hoursDetails')
    }
  ], [currentLang]); // إعادة حساب عند تغيير اللغة

  const socialMedia = [
    { icon: <FaFacebook />, name: "Facebook", color: "#1877F2" },
    { icon: <FaTwitter />, name: "Twitter", color: "#1DA1F2" },
    { icon: <FaLinkedin />, name: "LinkedIn", color: "#0A66C2" },
    { icon: <FaInstagram />, name: "Instagram", color: "#E4405F" },
    { icon: <FaYoutube />, name: "YouTube", color: "#FF0000" },
    { icon: <FaWhatsapp />, name: "WhatsApp", color: "#25D366" }
  ];

  // تنظيف الـ refs القديمة
  useEffect(() => {
    infoCardsRef.current = infoCardsRef.current.slice(0, contactInfo.length);
  }, [contactInfo]);

  // Intersection Observer للكشف عن ظهور القسم
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1, // عندما يكون 10% من العنصر مرئي
        rootMargin: '0px 0px -100px 0px' // تحسين عند التمرير لأعلى
      }
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

        {/* Contact Grid */}
        <div className="contact-grid">
          {/* Left Column: Info Cards + Map */}
          <div className="contact-left">
            {/* Contact Info Cards Grid */}
            <div className="contact-info-grid">
              {contactInfo.map((info, index) => (
                <div 
                  key={info.id} 
                  className="contact-info-card"
                  ref={el => infoCardsRef.current[index] = el}
                  style={{ direction: getDirection() }}
                >
                  <div className="contact-icon">
                    {info.icon}
                  </div>
                  <h4 className="contact-info-title">{info.title}</h4>
                  <div className="contact-info-details">
                    {Array.isArray(info.details) ? 
                      info.details.map((detail, idx) => (
                        <div key={idx} className="contact-detail">
                          {info.icon}
                          <span>{detail}</span>
                        </div>
                      ))
                      : null}
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
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
              style={{ direction: getDirection() }}
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
                  />
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
                    dir={getDirection()}
                  />
                </Form.Group>

                <Form.Group controlId="formPhone">
                  <Form.Label>{t('phoneTitle')}</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('phoneDetails')}
                    required
                    dir={getDirection()}
                  />
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
                  />
                </Form.Group>

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
                  <div 
                    className="success-message" 
                    style={{ direction: getDirection() }}
                  >
                    {t('successMessage')}
                  </div>
                )}
              </Form>
            </div>

            {/* WhatsApp Quick Contact */}
            <div className="whatsapp-quick">
              <a 
                href="https://wa.me/15551234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="whatsapp-btn-compact"
                style={{ direction: getDirection() }}
              >
                <FaWhatsapp />
                {t('chatWhatsApp')}
              </a>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="social-media-compact">
          <h4 
            className="social-title-compact" 
            style={{ direction: getDirection() }}
          >
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
    </section>
  );
};