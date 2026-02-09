import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLanguage } from './LanguageProvider'; // استيراد الـ hook

gsap.registerPlugin(ScrollTrigger);

export const ClientOpinion = () => {
  const { currentLang } = useLanguage(); // استخدام الـ hook
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const testimonialsRef = useRef([]);


  
  // الترجمات
  const translations = {
    EN: {
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
    AR: {
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

  // دالة الترجمة
  const t = (key) => {
    return translations[currentLang][key] || translations.EN[key];
  };

  const testimonials = [
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
  ];

  const companyLogos = [
    "https://cdn.worldvectorlogo.com/logos/google-2015.svg",
    "https://cdn.worldvectorlogo.com/logos/microsoft-6.svg",
    "https://cdn.worldvectorlogo.com/logos/amazon-2.svg",
    "https://cdn.worldvectorlogo.com/logos/ibm-1.svg",
    "https://cdn.worldvectorlogo.com/logos/netflix-3.svg",
    "https://cdn.worldvectorlogo.com/logos/facebook-3.svg",
    "https://cdn.worldvectorlogo.com/logos/apple-11.svg",
    "https://cdn.worldvectorlogo.com/logos/samsung-2.svg"
  ];

  const testimonialsPerView = 3;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setAnimate(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < testimonials.length - testimonialsPerView) {
      setCurrentIndex(prev => prev + 1);
      setAnimate(true);
    }
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setAnimate(true);
  };

  // GSAP Animations
  useEffect(() => {
    // Section animation
    gsap.fromTo(sectionRef.current,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Title animation
    gsap.fromTo(titleRef.current,
      {
        y: 60,
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          end: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Subtitle animation
    gsap.fromTo(subtitleRef.current,
      {
        y: 40,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Testimonials animation
    testimonialsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          {
            y: 80,
            opacity: 0,
            rotationY: 15,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            rotationY: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    // Company logos animation
    const logos = document.querySelectorAll('.company-logo');
    logos.forEach((logo, index) => {
      gsap.fromTo(logo,
        {
          y: 40,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.5 + (index * 0.1),
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: logo,
            start: 'top 90%',
            end: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [currentLang]); // أضف currentLang كـ dependency

  // Handle slide animation
  useEffect(() => {
    if (animate) {
      const track = document.querySelector('.testimonial-track');
      if (track) {
        gsap.to(track, {
          x: -currentIndex * (100 / testimonialsPerView) + '%',
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => setAnimate(false)
        });
      }
    }
  }, [currentIndex, animate]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar 
        key={index} 
        className={`star ${index < rating ? '' : 'empty'}`}
      />
    ));
  };

  return (
    <section className="client-opinion-section" ref={sectionRef} id="testimonials">
      <Container fluid="lg">
        <Row className="justify-content-center">
          <Col xl={10} lg={11} md={12} className="text-center">
            <h2 className="client-opinion-title" ref={titleRef}>
              {t('sectionTitle')}
            </h2>
            <p className="client-opinion-subtitle" ref={subtitleRef}>
              {t('sectionSubtitle')}
            </p>
          </Col>
        </Row>

        {/* Testimonials Slider */}
        <div className="testimonial-container">
          <div className="testimonial-track">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="testimonial-card"
                ref={el => testimonialsRef.current[index] = el}
              >
                <div className="testimonial-rating">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="testimonial-text">
                  {testimonial.text}
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <img src={testimonial.avatar} alt={testimonial.name} />
                  </div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="testimonial-nav">
          <button 
            className="nav-btn" 
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <FaChevronLeft />
          </button>
          
          <div className="testimonial-dots">
            {Array.from({ length: testimonials.length - testimonialsPerView + 1 }, (_, index) => (
              <div 
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
          
          <button 
            className="nav-btn" 
            onClick={handleNext}
            disabled={currentIndex >= testimonials.length - testimonialsPerView}
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Trusted Companies Section */}
        {/* <div className="companies-section">
          <h3 className="companies-title">{t('trustedCompanies')}</h3>
          <div className="companies-grid">
            {companyLogos.map((logo, index) => (
              <div key={index} className="company-logo">
                <img src={logo} alt={`Company ${index + 1}`} />
              </div>
            ))}
          </div>
        </div> */}
      </Container>
    </section>
  );
};