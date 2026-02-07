import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { 
  FaCalendar, FaUser, FaEye, FaComment, FaHeart,
  FaArrowRight, FaPaperPlane, FaTag, FaBookmark
} from 'react-icons/fa';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLanguage } from './LanguageProvider'; // استيراد الـ hook
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export const Blogs = () => {
  const { currentLang } = useLanguage(); // استخدام الـ hook
  
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const blogCardsRef = useRef([]);
  const newsletterRef = useRef(null);

  // الترجمات
  const translations = {
    EN: {
      sectionTitle: "Our Blogs",
      sectionSubtitle: "Explore our latest articles, industry insights, and expert advice to stay ahead in today's dynamic business landscape",
      businessCategory: "Business",
      marketingCategory: "Marketing",
      technologyCategory: "Technology",
      brandingCategory: "Branding",
      teamworkCategory: "Teamwork",
      sustainabilityCategory: "Sustainability",
      blog1Title: "10 Strategies to Boost Your Business Growth in 2024",
      blog1Excerpt: "Discover the most effective strategies that successful businesses are using to achieve exponential growth in today's competitive market.",
      blog2Title: "The Future of Digital Marketing: Trends You Can't Ignore",
      blog2Excerpt: "Explore the latest digital marketing trends that are shaping the industry and learn how to stay ahead of the curve.",
      blog3Title: "How AI is Transforming Business Operations in 2024",
      blog3Excerpt: "Learn how artificial intelligence is revolutionizing business operations and creating new opportunities for efficiency and growth.",
      blog4Title: "Building a Strong Brand Identity: A Complete Guide",
      blog4Excerpt: "A comprehensive guide to creating a memorable brand identity that resonates with your target audience and drives loyalty.",
      blog5Title: "Remote Team Collaboration: Tools and Best Practices",
      blog5Excerpt: "Discover the best tools and practices for effective remote team collaboration and maintaining productivity.",
      blog6Title: "Sustainable Business Practices for Long-Term Success",
      blog6Excerpt: "How implementing sustainable practices can lead to long-term business success and positive social impact.",
      alexJohnson: "Alex Johnson",
      sarahWilliams: "Sarah Williams",
      michaelChen: "Michael Chen",
      emmaRodriguez: "Emma Rodriguez",
      davidWilson: "David Wilson",
      lisaThompson: "Lisa Thompson",
      readFullArticle: "Read Full Article",
      viewAllArticles: "View All Articles",
      newsletterTitle: "Stay Updated",
      newsletterSubtitle: "Subscribe to our newsletter and never miss our latest articles and insights",
      placeholderEmail: "Enter your email",
      subscribeButton: "Subscribe",
      subscribedMessage: "Thank you for subscribing!",
      growth: "Growth",
      strategy: "Strategy",
      business: "Business",
      digital: "Digital",
      marketing: "Marketing",
      trends: "Trends",
      ai: "AI",
      technology: "Technology",
      innovation: "Innovation",
      branding: "Branding",
      identity: "Identity",
      design: "Design",
      remote: "Remote",
      collaboration: "Collaboration",
      productivity: "Productivity",
      sustainability: "Sustainability",
      green: "Green"
    },
    AR: {
      sectionTitle: "أحدث المقالات والرؤى",
      sectionSubtitle: "استكشف أحدث مقالاتنا ورؤى الصناعة ونصائح الخبراء للبقاء في المقدمة في المشهد التجاري الديناميكي اليوم",
      businessCategory: "أعمال",
      marketingCategory: "تسويق",
      technologyCategory: "تكنولوجيا",
      brandingCategory: "العلامة التجارية",
      teamworkCategory: "العمل الجماعي",
      sustainabilityCategory: "الاستدامة",
      blog1Title: "10 استراتيجيات لتعزيز نمو أعمالك في 2024",
      blog1Excerpt: "اكتشف الاستراتيجيات الأكثر فعالية التي تستخدمها الشركات الناجحة لتحقيق نمو هائل في سوق اليوم التنافسي.",
      blog2Title: "مستقبل التسويق الرقمي: اتجاهات لا يمكنك تجاهلها",
      blog2Excerpt: "استكشف أحدث اتجاهات التسويق الرقمي التي تشكل الصناعة وتعلم كيفية البقاء في المقدمة.",
      blog3Title: "كيف يغير الذكاء الاصطناعي عمليات الأعمال في 2024",
      blog3Excerpt: "تعرف على كيفية ثورة الذكاء الاصطناعي في عمليات الأعمال وخلق فرص جديدة للكفاءة والنمو.",
      blog4Title: "بناء هوية علامة تجارية قوية: دليل شامل",
      blog4Excerpt: "دليل شامل لإنشاء هوية علامة تجارية لا تنسى تتردد صداها مع جمهورك المستهدف وتدفع الولاء.",
      blog5Title: "تعاون الفريق عن بعد: الأدوات وأفضل الممارسات",
      blog5Excerpt: "اكتشف أفضل الأدوات والممارسات للتعاون الفعال للفرق عن بعد والحفاظ على الإنتاجية.",
      blog6Title: "ممارسات الأعمال المستدامة للنجاح على المدى الطويل",
      blog6Excerpt: "كيف يمكن لتطبيق الممارسات المستدامة أن يؤدي إلى نجاح الأعمال على المدى الطويل والتأثير الاجتماعي الإيجابي.",
      alexJohnson: "أليكس جونسون",
      sarahWilliams: "سارة ويليامز",
      michaelChen: "مايكل تشين",
      emmaRodriguez: "إيما رودريجيز",
      davidWilson: "ديفيد ويلسون",
      lisaThompson: "ليسا تومسون",
      readFullArticle: "اقرأ المقال الكامل",
      viewAllArticles: "عرض جميع المقالات",
      newsletterTitle: "ابق على اطلاع",
      newsletterSubtitle: "اشترك في نشرتنا الإخبارية ولا تفوت أبدًا أحدث مقالاتنا ورؤىنا",
      placeholderEmail: "أدخل بريدك الإلكتروني",
      subscribeButton: "اشترك",
      subscribedMessage: "شكراً لك على الاشتراك!",
      growth: "نمو",
      strategy: "استراتيجية",
      business: "أعمال",
      digital: "رقمي",
      marketing: "تسويق",
      trends: "اتجاهات",
      ai: "ذكاء اصطناعي",
      technology: "تكنولوجيا",
      innovation: "ابتكار",
      branding: "علامة تجارية",
      identity: "هوية",
      design: "تصميم",
      remote: "عن بعد",
      collaboration: "تعاون",
      productivity: "إنتاجية",
      sustainability: "استدامة",
      green: "أخضر"
    }
  };

  // دالة الترجمة
  const t = (key) => {
    return translations[currentLang][key] || translations.EN[key];
  };

  const blogsData = [
    {
      id: 1,
      title: t('blog1Title'),
      excerpt: t('blog1Excerpt'),
      category: t('businessCategory'),
      date: currentLang === 'AR' ? "١٥ مارس ٢٠٢٤" : "March 15, 2024",
      author: t('alexJohnson'),
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      views: 1247,
      comments: 42,
      likes: 89,
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: [t('growth'), t('strategy'), t('business')]
    },
    {
      id: 2,
      title: t('blog2Title'),
      excerpt: t('blog2Excerpt'),
      category: t('marketingCategory'),
      date: currentLang === 'AR' ? "١٠ مارس ٢٠٢٤" : "March 10, 2024",
      author: t('sarahWilliams'),
      authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      views: 2156,
      comments: 68,
      likes: 142,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: [t('digital'), t('marketing'), t('trends')]
    },
    {
      id: 3,
      title: t('blog3Title'),
      excerpt: t('blog3Excerpt'),
      category: t('technologyCategory'),
      date: currentLang === 'AR' ? "٥ مارس ٢٠٢٤" : "March 5, 2024",
      author: t('michaelChen'),
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      views: 3125,
      comments: 124,
      likes: 256,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: [t('ai'), t('technology'), t('innovation')]
    },
    {
      id: 4,
      title: t('blog4Title'),
      excerpt: t('blog4Excerpt'),
      category: t('brandingCategory'),
      date: currentLang === 'AR' ? "٢٨ فبراير ٢٠٢٤" : "February 28, 2024",
      author: t('emmaRodriguez'),
      authorAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      views: 1789,
      comments: 35,
      likes: 98,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: [t('branding'), t('identity'), t('design')]
    },
    {
      id: 5,
      title: t('blog5Title'),
      excerpt: t('blog5Excerpt'),
      category: t('teamworkCategory'),
      date: currentLang === 'AR' ? "٢٠ فبراير ٢٠٢٤" : "February 20, 2024",
      author: t('davidWilson'),
      authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      views: 2456,
      comments: 78,
      likes: 167,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: [t('remote'), t('collaboration'), t('productivity')]
    },
    {
      id: 6,
      title: t('blog6Title'),
      excerpt: t('blog6Excerpt'),
      category: t('sustainabilityCategory'),
      date: currentLang === 'AR' ? "١٥ فبراير ٢٠٢٤" : "February 15, 2024",
      author: t('lisaThompson'),
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      views: 1987,
      comments: 56,
      likes: 134,
      image: "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: [t('sustainability'), t('green'), t('business')]
    }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      console.log('Subscribed with email:', email);
      
      // Animation for success
      gsap.fromTo('.newsletter-success',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );
      
      setSubscribed(true);
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    }
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

    // Blog cards animation
    blogCardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          {
            y: 100,
            opacity: 0,
            rotationY: 15,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            rotationY: 0,
            scale: 1,
            duration: 1,
            delay: index * 0.15,
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

    // Newsletter animation
    if (newsletterRef.current) {
      gsap.fromTo(newsletterRef.current,
        {
          y: 80,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: newsletterRef.current,
            start: 'top 85%',
            end: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Blog card hover animations
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -15,
          duration: 0.4,
          ease: 'power2.out'
        });
        
        gsap.to(card.querySelector('.blog-image img'), {
          scale: 1.05,
          duration: 0.6,
          ease: 'power2.out'
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
        
        gsap.to(card.querySelector('.blog-image img'), {
          scale: 1,
          duration: 0.6,
          ease: 'power2.out'
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [currentLang]); // أضف currentLang كـ dependency

  return (
    <section className="blogs-section" ref={sectionRef} id="blog">
      <Container fluid="lg">
        <Row className="justify-content-center">
          <Col xl={10} lg={11} md={12} className="text-center">
            <h2 className="blogs-title" ref={titleRef} style={{ direction: currentLang === 'AR' ? 'rtl' : 'ltr' }}>
              {t('sectionTitle')}
            </h2>
            <p className="blogs-subtitle" ref={subtitleRef} style={{ direction: currentLang === 'AR' ? 'rtl' : 'ltr' }}>
              {t('sectionSubtitle')}
            </p>
          </Col>
        </Row>

        {/* Blogs Grid */}
        <div className="blogs-grid">
          {blogsData.map((blog, index) => (
            <div 
              key={blog.id} 
              className="blog-card"
              ref={el => blogCardsRef.current[index] = el}
              style={{ direction: currentLang === 'AR' ? 'rtl' : 'ltr' }}
            >
              {/* Blog Image */}
              <div className="blog-image">
                <img src={blog.image} alt={blog.title} />
                <div className="blog-overlay"></div>
                <span className="blog-category">{blog.category}</span>
                <span className="blog-date">
                  <FaCalendar style={{ marginRight: '5px' }} />
                  {blog.date}
                </span>
              </div>

              {/* Blog Content */}
              <div className="blog-content">
                {/* Blog Meta */}
                <div className="blog-meta">
                  <div className="blog-author">
                    <div className="author-avatar">
                      <img src={blog.authorAvatar} alt={blog.author} />
                    </div>
                    <span>{blog.author}</span>
                  </div>
                  
                  {/* <div className="blog-stats">
                    <div className="blog-stat">
                      <FaEye />
                      <span>{blog.views.toLocaleString(currentLang === 'AR' ? 'ar-SA' : 'en-US')}</span>
                    </div>
                    <div className="blog-stat">
                      <FaComment />
                      <span>{blog.comments}</span>
                    </div>
                    <div className="blog-stat">
                      <FaHeart />
                      <span>{blog.likes}</span>
                    </div>
                  </div> */}
                </div>

                {/* Blog Title */}
                <h3 className="blog-title">{blog.title}</h3>

                {/* Blog Excerpt */}
                <p className="blog-excerpt">{blog.excerpt}</p>

                {/* Blog Tags */}
                {/* <div className="blog-tags">
                  {blog.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="blog-tag">
                      <FaTag style={{ marginRight: '5px', fontSize: '0.8rem' }} />
                      {tag}
                    </span>
                  ))}
                </div> */}

<Link to={`/MainBlogsCardspage`} className="read-more"> 
                {/* Read More */}
                  {t('readFullArticle')}
                  <FaArrowRight style={{ marginRight: currentLang === 'AR' ? '10px' : '0', marginLeft: currentLang === 'AR' ? '0' : '10px' }} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="blogs-cta">
          <Button className="view-all-btn">
            {t('viewAllArticles')}
            <FaArrowRight style={{ marginLeft: currentLang === 'AR' ? '0' : '10px', marginRight: currentLang === 'AR' ? '10px' : '0' }} />
          </Button>
        </div>

        {/* Newsletter Section */}
        {/* <Row className="justify-content-center mt-5 pt-5">
          <Col md={8} lg={6}>
            <div className="newsletter-card" ref={newsletterRef}>
              <div className="newsletter-content">
                <h3>{t('newsletterTitle')}</h3>
                <p>{t('newsletterSubtitle')}</p>
                
                <Form onSubmit={handleSubscribe} className="newsletter-form">
                  <Form.Group controlId="newsletterEmail">
                    <Form.Control
                      type="email"
                      placeholder={t('placeholderEmail')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="newsletter-input"
                    />
                    <Button type="submit" className="subscribe-btn">
                      <FaPaperPlane style={{ marginRight: '8px' }} />
                      {t('subscribeButton')}
                    </Button>
                  </Form.Group>
                </Form>
                
                {subscribed && (
                  <div className="newsletter-success">
                    <FaPaperPlane />
                    <span>{t('subscribedMessage')}</span>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row> */}
      </Container>
    </section>
  );
};