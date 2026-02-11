import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { useLanguage } from './LanguageProvider';

// استيراد Swiper بشكل مبسط
import { Swiper, SwiperSlide } from 'swiper/react';

// استيراد CSS فقط
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const ClientOpinion = () => {
  const { currentLang, isInitialized } = useLanguage();
  
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  // الترجمات
  const translations = {
    en: {
      sectionTitle: "What Our Clients Say",
      sectionSubtitle: "Don't just take our word for it - hear from some of our satisfied clients who have experienced success with FLYVIA",
      sarahJohnson: "Sarah Johnson",
      ceoTechcorp: "CEO, TechCorp Inc.",
      sarahText: "FLYVIA transformed our digital presence completely. Their team delivered exceptional results that exceeded our expectations. The growth in our online engagement has been phenomenal!",
      michaelChen: "Michael Chen",
      marketingDirector: "Marketing Director, InnovateCo",
      michaelText: "Working with FLYVIA was a game-changer for our business. Their strategic approach and attention to detail helped us achieve 300% growth in just 6 months. Highly recommended!",
      emilyRodriguez: "Emily Rodriguez",
      founderStartup: "Founder, StartupXYZ",
      emilyText: "The team at FLYVIA understood our vision perfectly. They delivered a solution that not only met but exceeded our expectations. Their support has been invaluable.",
      davidWilson: "David Wilson",
      operationsManager: "Operations Manager, GlobalTech",
      davidText: "Professional, efficient, and highly skilled. FLYVIA helped us streamline our processes and improve efficiency by 40%. Their expertise is unmatched.",
      lisaThompson: "Lisa Thompson",
      productManager: "Product Manager, NextGen Solutions",
      lisaText: "Outstanding service and exceptional results! FLYVIA's team worked closely with us to understand our needs and delivered a perfect solution. Truly partners in our success.",
      robertMartinez: "Robert Martinez",
      ctoFuturetech: "CTO, FutureTech Enterprises",
      robertText: "The expertise and dedication of FLYVIA's team are remarkable. They helped us implement cutting-edge solutions that put us ahead of our competitors.",
      trustedCompanies: "Trusted by Leading Companies"
    },
    ar: {
      sectionTitle: "ماذا يقول عملاؤنا",
      sectionSubtitle: "لا تأخذ كلمتنا فقط - استمع إلى بعض عملائنا الراضين الذين حققوا النجاح مع FLYVIA",
      sarahJohnson: "سارة جونسون",
      ceoTechcorp: "الرئيس التنفيذي، TechCorp Inc.",
      sarahText: "قامت FLYVIA بتحويل حضورنا الرقمي بالكامل. قدم فريقهم نتائج استثنائية تجاوزت توقعاتنا. كان النمو في مشاركتنا عبر الإنترنت مذهلاً!",
      michaelChen: "مايكل تشين",
      marketingDirector: "مدير التسويق، InnovateCo",
      michaelText: "كان العمل مع FLYVIA نقطة تحول في أعمالنا. ساعدنا منهجهم الاستراتيجي واهتمامهم بالتفاصيل في تحقيق نمو بنسبة 300٪ في 6 أشهر فقط. موصى به بشدة!",
      emilyRodriguez: "إيميلي رودريجيز",
      founderStartup: "المؤسس، StartupXYZ",
      emilyText: "فهم فريق FLYVIA رؤيتنا بشكل مثالي. قدموا حلاً لم يلبِ توقعاتنا فحسب، بل تجاوزها. كان دعمهم لا يقدر بثمن.",
      davidWilson: "ديفيد ويلسون",
      operationsManager: "مدير العمليات، GlobalTech",
      davidText: "محترفون، وكفؤون، ومهرة للغاية. ساعدتنا FLYVIA في تبسيط عملياتنا وتحسين الكفاءة بنسبة 40٪. خبرتهم لا مثيل لها.",
      lisaThompson: "ليسا تومسون",
      productManager: "مدير المنتج، NextGen Solutions",
      lisaText: "خدمة متميزة ونتائج استثنائية! عمل فريق FLYVIA عن كثب معنا لفهم احتياجاتنا وتقديم الحل المثالي. شركاء حقيقيون في نجاحنا.",
      robertMartinez: "روبرت مارتينيز",
      ctoFuturetech: "الرئيس التقني، FutureTech Enterprises",
      robertText: "خبرة وتفاني فريق FLYVIA ملحوظان. ساعدونا في تنفيذ حلول متطورة تضعنا أمام منافسينا.",
      trustedCompanies: "موثوق به من قبل الشركات الرائدة"
    }
  };

  const t = (key) => {
    try {
      const langKey = currentLang || 'en';
      return translations[langKey]?.[key] || translations.en[key] || key;
    } catch (error) {
      return translations.en[key] || key;
    }
  };

  const testimonials = useMemo(() => [
    {
      id: 1,
      name: t('sarahJohnson'),
      position: t('ceoTechcorp'),
      rating: 5,
      text: t('sarahText'),
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      name: t('michaelChen'),
      position: t('marketingDirector'),
      rating: 5,
      text: t('michaelText'),
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      name: t('emilyRodriguez'),
      position: t('founderStartup'),
      rating: 4,
      text: t('emilyText'),
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 4,
      name: t('davidWilson'),
      position: t('operationsManager'),
      rating: 5,
      text: t('davidText'),
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 5,
      name: t('lisaThompson'),
      position: t('productManager'),
      rating: 5,
      text: t('lisaText'),
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 6,
      name: t('robertMartinez'),
      position: t('ctoFuturetech'),
      rating: 4,
      text: t('robertText'),
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    }
  ], [currentLang]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar 
        key={index} 
        style={{ 
          color: index < rating ? '#ffc107' : '#e0e0e0',
          fontSize: '1rem',
          marginRight: '2px'
        }}
      />
    ));
  };

  if (!isMounted || !isInitialized) {
    return (
      <section style={{ padding: '80px 0', background: '#f8f9fa' }} id="testimonials">
        <Container fluid="lg">
          <Row className="justify-content-center">
            <Col className="text-center">
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>{t('sectionTitle')}</h2>
              <p style={{ fontSize: '1.1rem', color: '#666' }}>{t('sectionSubtitle')}</p>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef} 
      id="testimonials"
      style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden',
        direction: currentLang === 'ar' ? 'rtl' : 'ltr'
      }}
    >
      <Container fluid="lg">
        <Row className="justify-content-center">
          <Col xl={10} lg={11} md={12} className="text-center">
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              marginBottom: '1.5rem',
              color: '#1a1a1a',
              position: 'relative',
              display: 'inline-block',
              fontFamily: currentLang === 'ar' ? "'Cairo', sans-serif" : "'Poppins', sans-serif"
            }}>
              {t('sectionTitle')}
              <span style={{
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                background: 'linear-gradient(90deg, #2196F3, #4CAF50)',
                borderRadius: '2px'
              }}></span>
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#666',
              maxWidth: '700px',
              margin: '0 auto 50px',
              lineHeight: 1.8,
              fontFamily: currentLang === 'ar' ? "'Cairo', sans-serif" : "'Poppins', sans-serif"
            }}>
              {t('sectionSubtitle')}
            </p>
          </Col>
        </Row>

        {/* Swiper Slider - بدون modules معقدة */}
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          speed={800}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          style={{
            padding: '30px 15px 60px',
            margin: '0 -15px'
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '30px 25px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                margin: '10px 0',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(33, 150, 243, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.08)';
              }}
              >
                <FaQuoteLeft style={{
                  position: 'absolute',
                  top: '20px',
                  [currentLang === 'ar' ? 'left' : 'right']: '20px',
                  color: 'rgba(33, 150, 243, 0.1)',
                  fontSize: '2.5rem'
                }} />
                
                <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
                  {renderStars(testimonial.rating)}
                </div>
                
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.8,
                  color: '#555',
                  marginBottom: '25px',
                  flex: 1,
                  fontFamily: currentLang === 'ar' ? "'Cairo', sans-serif" : "'Poppins', sans-serif",
                  fontStyle: 'italic'
                }}>
                  {testimonial.text}
                </p>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                  paddingTop: '20px',
                  marginTop: 'auto'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '3px solid white',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
                  }}>
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      marginBottom: '5px',
                      color: '#1a1a1a',
                      fontFamily: currentLang === 'ar' ? "'Cairo', sans-serif" : "'Poppins', sans-serif"
                    }}>
                      {testimonial.name}
                    </h4>
                    <p style={{
                      fontSize: '0.85rem',
                      color: '#666',
                      margin: 0,
                      fontFamily: currentLang === 'ar' ? "'Cairo', sans-serif" : "'Poppins', sans-serif"
                    }}>
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};