import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { 
  FaCalendar, FaUser, FaEye, FaComment, FaHeart,
  FaArrowRight, FaPaperPlane, FaTag, FaBookmark
} from 'react-icons/fa';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLanguage } from './LanguageProvider';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export const Blogs = ({threeblogs}) => {
  const { currentLang } = useLanguage();
  
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const blogCardsRef = useRef([]);
  const newsletterRef = useRef(null);

  // دالة لمعالجة رابط الصورة
  const getImageUrl = (url) => {
    if (!url || typeof url !== 'string') return null
    
    // تنظيف الرابط من undefined
    let cleanUrl = url.replace(/^undefined\//, '')
    
    if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
      return cleanUrl
    }
    
    if (cleanUrl.startsWith('/')) {
      return `http://localhost:8000${cleanUrl}`
    }
    
    return `http://localhost:8000/${cleanUrl}`
  }

  // دالة لاختصار النص
  const truncateText = (text, maxLength = 100) => {
    if (!text || typeof text !== 'string') return ''
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  // دالة لتنظيف التاغات
  const cleanTag = (tag) => {
    if (!tag) return ''
    if (typeof tag === 'string') {
      try {
        const parsed = JSON.parse(tag)
        if (Array.isArray(parsed)) {
          return parsed[0] || ''
        }
        return parsed || tag.replace(/[\[\]"]+/g, '')
      } catch {
        return tag.replace(/[\[\]"]+/g, '')
      }
    }
    return String(tag)
  }

  // دالة لاستخراج التاغات من البيانات
  const getTagsArray = (tags, lang) => {
    if (!tags) return []
    
    // إذا كانت التاغات كائن يحتوي على ar و en
    if (tags[lang]) {
      const tagValue = tags[lang]
      if (Array.isArray(tagValue)) {
        return tagValue.slice(0, 2).map(tag => cleanTag(tag))
      }
    }
    
    return []
  }
  
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
      green: "Green",
      defaultAuthor: "Admin"
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
      green: "أخضر",
      defaultAuthor: "المدير"
    }
  };

  // دالة الترجمة
  const t = (key) => {
    return translations[currentLang][key] || translations.EN[key];
  };

  const blogsData = [
    {
      id: 1,
      title: {
        EN: "10 Strategies to Boost Your Business Growth in 2024",
        AR: "10 استراتيجيات لتعزيز نمو أعمالك في 2024"
      },
      excerpt: {
        EN: "Discover the most effective strategies that successful businesses are using to achieve exponential growth in today's competitive market.",
        AR: "اكتشف الاستراتيجيات الأكثر فعالية التي تستخدمها الشركات الناجحة لتحقيق نمو هائل في سوق اليوم التنافسي."
      },
      category: t('businessCategory'),
      date: currentLang === 'AR' ? "١٥ مارس ٢٠٢٤" : "March 15, 2024",
      author: "Alex Johnson",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      views: 1247,
      comments: 42,
      likes: 89,
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: [t('growth'), t('strategy'), t('business')]
    },
    {
      id: 2,
      title: {
        EN: "The Future of Digital Marketing: Trends You Can't Ignore",
        AR: "مستقبل التسويق الرقمي: اتجاهات لا يمكنك تجاهلها"
      },
      excerpt: {
        EN: "Explore the latest digital marketing trends that are shaping the industry and learn how to stay ahead of the curve.",
        AR: "استكشف أحدث اتجاهات التسويق الرقمي التي تشكل الصناعة وتعلم كيفية البقاء في المقدمة."
      },
      category: t('marketingCategory'),
      date: currentLang === 'AR' ? "١٠ مارس ٢٠٢٤" : "March 10, 2024",
      author: "Sarah Williams",
      authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      views: 2156,
      comments: 68,
      likes: 142,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: [t('digital'), t('marketing'), t('trends')]
    },
    {
      id: 3,
      title: {
        EN: "How AI is Transforming Business Operations in 2024",
        AR: "كيف يغير الذكاء الاصطناعي عمليات الأعمال في 2024"
      },
      excerpt: {
        EN: "Learn how artificial intelligence is revolutionizing business operations and creating new opportunities for efficiency and growth.",
        AR: "تعرف على كيفية ثورة الذكاء الاصطناعي في عمليات الأعمال وخلق فرص جديدة للكفاءة والنمو."
      },
      category: t('technologyCategory'),
      date: currentLang === 'AR' ? "٥ مارس ٢٠٢٤" : "March 5, 2024",
      author: "Michael Chen",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      views: 3125,
      comments: 124,
      likes: 256,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: [t('ai'), t('technology'), t('innovation')]
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
  }, [currentLang, threeblogs]);

  // دالة لاستخراج البيانات حسب اللغة
  const getLocalizedData = (blog) => {
    const lang = currentLang.toLowerCase()
    
    return {
      title: blog?.title?.[lang] || blog?.title?.ar || blog?.title?.en || 'بدون عنوان',
      excerpt: blog?.short_description?.[lang] || blog?.short_description?.ar || blog?.short_description?.en || '',
      author: blog?.author || t('defaultAuthor'),
      createdAt: blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) : (lang === 'ar' ? '١ يناير ٢٠٢٤' : 'January 1, 2024'),
      tags: getTagsArray(blog?.tags, lang === 'ar' ? 'ar' : 'en'),
      slug: blog?.slug?.[lang] || blog?.slug?.ar || blog?.slug?.en || blog?._id
    }
  }

  // عرض المدونات الحقيقية من الـ API أو البيانات الافتراضية
  const renderBlogs = () => {
    console.log('Three blogs data:', threeblogs) // للتحقق من البيانات
    
    // إذا كانت هناك بيانات حقيقية من الـ API
    if (threeblogs && threeblogs.length > 0) {
      return threeblogs.slice(0, 3).map((blog, index) => {
        const blogId = blog?._id || `blog-${index}`
        
        // الحصول على البيانات المترجمة
        const localizedData = getLocalizedData(blog)
        
        // معالجة صورة الملف الشخصي للمؤلف
        const authorAvatar = blog?.authorAvatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        
        // معالجة صورة المدونة
        const blogImageRaw = blog?.profileImg || blog?.image || null
        const blogImage = blogImageRaw ? getImageUrl(blogImageRaw) : blogsData[index]?.image
        
        console.log(`Blog ${index} - Title: ${localizedData.title}, Image: ${blogImage}`)

        return (
          <div 
            key={blogId} 
            className="blog-card"
            ref={el => blogCardsRef.current[index] = el}
            style={{ direction: currentLang === 'AR' ? 'rtl' : 'ltr' }}
          >
            {/* Blog Image */}
            <div className="blog-image">
              <img 
                src={blogImage} 
                alt={localizedData.title} 
                onError={(e) => {
                  console.log('Image failed to load:', blogImage)
                  e.target.src = blogsData[index]?.image || "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                }} 
              />
              <div className="blog-overlay"></div>
              <span className="blog-category">{t('businessCategory')}</span>
              <span className="blog-date">
                <FaCalendar style={{ marginRight: '5px' }} />
                {localizedData.createdAt}
              </span>
            </div>

            {/* Blog Content */}
            <div className="blog-content">
              {/* Blog Meta */}
              <div className="blog-meta">
                <div className="blog-author">
                  <div className="author-avatar">
                    <img src={authorAvatar} alt={localizedData.author} />
                  </div>
                  <span>{localizedData.author}</span>
                </div>
              </div>

              {/* Blog Title */}
              <h3 className="blog-title">{localizedData.title}</h3>

              {/* Blog Excerpt */}
              <p className="blog-excerpt">{truncateText(localizedData.excerpt, 120)}</p>

              {/* Blog Tags - يمكنك تفعيلها إذا أردت */}
              {/* {localizedData.tags.length > 0 && (
                <div className="blog-tags">
                  {localizedData.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span key={tagIndex} className="blog-tag">
                      <FaTag style={{ marginRight: '5px', fontSize: '0.8rem' }} />
                      {tag}
                    </span>
                  ))}
                </div>
              )} */}

              <Link to={`/blog/${blogId}`} className="read-more">
                {t('readFullArticle')}
                <FaArrowRight style={{ 
                  marginRight: currentLang === 'AR' ? '10px' : '0', 
                  marginLeft: currentLang === 'AR' ? '0' : '10px' 
                }} />
              </Link>
            </div>
          </div>
        )
      })
    } else {
      // إذا لم تكن هناك بيانات، عرض البيانات الافتراضية
      return blogsData.map((blog, index) => {
        const title = blog.title[currentLang] || blog.title.EN
        const excerpt = blog.excerpt[currentLang] || blog.excerpt.EN
        
        return (
          <div 
            key={blog.id} 
            className="blog-card"
            ref={el => blogCardsRef.current[index] = el}
            style={{ direction: currentLang === 'AR' ? 'rtl' : 'ltr' }}
          >
            {/* Blog Image */}
            <div className="blog-image">
              <img src={blog.image} alt={title} />
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
              </div>

              {/* Blog Title */}
              <h3 className="blog-title">{title}</h3>

              {/* Blog Excerpt */}
              <p className="blog-excerpt">{excerpt}</p>

              <Link to={`/MainBlogsCardspage`} className="read-more"> 
                {t('readFullArticle')}
                <FaArrowRight style={{ 
                  marginRight: currentLang === 'AR' ? '10px' : '0', 
                  marginLeft: currentLang === 'AR' ? '0' : '10px' 
                }} />
              </Link>
            </div>
          </div>
        )
      })
    }
  }

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
          {renderBlogs()}
        </div>

        {/* View All Button */}
        <div className="blogs-cta">
          <Link to="/MainBlogsCardspage">
            <Button className="view-all-btn">
              {t('viewAllArticles')}
              <FaArrowRight style={{ 
                marginLeft: currentLang === 'AR' ? '0' : '10px', 
                marginRight: currentLang === 'AR' ? '10px' : '0' 
              }} />
            </Button>
          </Link>
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