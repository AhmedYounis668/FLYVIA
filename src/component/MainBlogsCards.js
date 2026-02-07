import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Pagination } from 'react-bootstrap';
import { 
  FaCalendar, FaUser, FaArrowRight, FaBookmark,
  FaEye, FaComment, FaHeart, FaTag
} from 'react-icons/fa';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLanguage } from './LanguageProvider'; // استيراد الـ hook
import { Link } from 'react-router-dom';
import { cleanupGSAP, initGSAP } from '../pages/initGSAP';
// import './MainBlogsCards.css'; // ملف CSS منفصل للأنماط

gsap.registerPlugin(ScrollTrigger);

export const MainBlogsCards = () => {
  const { currentLang } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const blogsPerPage = 9;
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const heroRef = useRef(null);
  useEffect(() => {
    initGSAP();
    
    return () => {
      cleanupGSAP();
    };
  }, []);
  // الترجمات
  const translations = {
    EN: {
      pageTitle: "Blogs",
      pageSubtitle: "Discover our latest Blogs and expert opinions",
      sectionTitle: "Our Blogs",
      sectionSubtitle: "Explore our latest articles, industry insights, and expert advice to stay ahead in today's dynamic business landscape",
      businessCategory: "Business",
      marketingCategory: "Marketing",
      technologyCategory: "Technology",
      brandingCategory: "Branding",
      teamworkCategory: "Teamwork",
      sustainabilityCategory: "Sustainability",
      financeCategory: "Finance",
      leadershipCategory: "Leadership",
      startupCategory: "Startup",
      designCategory: "Design",
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
      blog7Title: "Financial Planning for Startups: A Step-by-Step Guide",
      blog7Excerpt: "Essential financial planning strategies for startups to ensure sustainable growth and investor confidence.",
      blog8Title: "Effective Leadership in the Digital Age",
      blog8Excerpt: "Modern leadership approaches that inspire teams and drive innovation in fast-paced digital environments.",
      blog9Title: "UX/UI Design Principles for Better Conversion Rates",
      blog9Excerpt: "Key design principles that can significantly improve user experience and boost conversion rates.",
      blog10Title: "Scaling Your Business: When and How to Expand",
      blog10Excerpt: "Strategic insights on timing and methods for scaling your business operations effectively.",
      blog11Title: "Content Marketing Strategies That Actually Work",
      blog11Excerpt: "Proven content marketing strategies that generate leads and build brand authority.",
      blog12Title: "The Psychology of Consumer Decision Making",
      blog12Excerpt: "Understanding consumer psychology to create more effective marketing campaigns and product designs.",
      alexJohnson: "Alex Johnson",
      sarahWilliams: "Sarah Williams",
      michaelChen: "Michael Chen",
      emmaRodriguez: "Emma Rodriguez",
      davidWilson: "David Wilson",
      lisaThompson: "Lisa Thompson",
      robertBrown: "Robert Brown",
      sophiaLee: "Sophia Lee",
      jamesMiller: "James Miller",
      oliviaDavis: "Olivia Davis",
      chrisTaylor: "Chris Taylor",
      amandaClark: "Amanda Clark",
      blogDetails: "Blog Details",
      readFullArticle: "Read Full Article",
      previous: "Previous",
      next: "Next",
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
      finance: "Finance",
      leadership: "Leadership",
      startup: "Startup",
      ux: "UX/UI"
    },
    AR: {
      pageTitle: "المدونات",
      pageSubtitle: "اكتشف أحدث مقالاتنا ورؤى الخبراء وآرائهم",
      sectionTitle: "أحدث المقالات والرؤى",
      sectionSubtitle: "استكشف أحدث مقالاتنا ورؤى الصناعة ونصائح الخبراء للبقاء في المقدمة في المشهد التجاري الديناميكي اليوم",
      businessCategory: "أعمال",
      marketingCategory: "تسويق",
      technologyCategory: "تكنولوجيا",
      brandingCategory: "العلامة التجارية",
      teamworkCategory: "العمل الجماعي",
      sustainabilityCategory: "الاستدامة",
      financeCategory: "تمويل",
      leadershipCategory: "قيادة",
      startupCategory: "شركات ناشئة",
      designCategory: "تصميم",
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
      blog7Title: "التخطيط المالي للشركات الناشئة: دليل خطوة بخطوة",
      blog7Excerpt: "استراتيجيات التخطيط المالي الأساسية للشركات الناشئة لضمان النمو المستدام وثقة المستثمرين.",
      blog8Title: "القيادة الفعالة في العصر الرقمي",
      blog8Excerpt: "نهج القيادة الحديثة التي تلهم الفرق وتدفع الابتكار في البيئات الرقمية سريعة الخطى.",
      blog9Title: "مبادئ تصميم UX/UI لتحسين معدلات التحويل",
      blog9Excerpt: "مبادئ التصميم الرئيسية التي يمكن أن تحسن بشكل كبير تجربة المستخدم وتعزز معدلات التحويل.",
      blog10Title: "توسيع نطاق عملك: متى وكيف تتوسع",
      blog10Excerpt: "رؤى استراتيجية حول توقيت وطرق توسيع عمليات عملك بشكل فعال.",
      blog11Title: "استراتيجيات تسويق المحتوى التي تعمل بالفعل",
      blog11Excerpt: "استراتيجيات تسويق المحتوى المثبتة التي تولد العملاء المحتملين وتبني سلطة العلامة التجارية.",
      blog12Title: "سيكولوجية اتخاذ القرار لدى المستهلك",
      blog12Excerpt: "فهم سيكولوجية المستهلك لإنشاء حملات تسويقية وتصاميم منتجات أكثر فعالية.",
      alexJohnson: "أليكس جونسون",
      sarahWilliams: "سارة ويليامز",
      michaelChen: "مايكل تشين",
      emmaRodriguez: "إيما رودريجيز",
      davidWilson: "ديفيد ويلسون",
      lisaThompson: "ليسا تومسون",
      robertBrown: "روبرت براون",
      sophiaLee: "صوفيا لي",
      jamesMiller: "جيمس ميلر",
      oliviaDavis: "أوليفيا ديفيس",
      chrisTaylor: "كريس تايلور",
      amandaClark: "أماندا كلارك",
      blogDetails: "تفاصيل المدونة",
      readFullArticle: "اقرأ المقال الكامل",
      previous: "السابق",
      next: "التالي",
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
      finance: "تمويل",
      leadership: "قيادة",
      startup: "شركة ناشئة",
      ux: "UX/UI"
    }
  };

  // دالة الترجمة
  const t = (key) => {
    return translations[currentLang][key] || translations.EN[key];
  };

  // بيانات المدونات (12 مدونة)
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
    },
    {
      id: 7,
      title: t('blog7Title'),
      excerpt: t('blog7Excerpt'),
      category: t('financeCategory'),
      date: currentLang === 'AR' ? "١٠ فبراير ٢٠٢٤" : "February 10, 2024",
      author: t('robertBrown'),
      authorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      views: 1678,
      comments: 42,
      likes: 95,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: [t('finance'), t('startup'), t('business')]
    },
    {
      id: 8,
      title: t('blog8Title'),
      excerpt: t('blog8Excerpt'),
      category: t('leadershipCategory'),
      date: currentLang === 'AR' ? "٥ فبراير ٢٠٢٤" : "February 5, 2024",
      author: t('sophiaLee'),
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      views: 2345,
      comments: 87,
      likes: 156,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: [t('leadership'), t('management'), t('innovation')]
    },
    {
      id: 9,
      title: t('blog9Title'),
      excerpt: t('blog9Excerpt'),
      category: t('designCategory'),
      date: currentLang === 'AR' ? "٣٠ يناير ٢٠٢٤" : "January 30, 2024",
      author: t('jamesMiller'),
      authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      views: 1876,
      comments: 65,
      likes: 123,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: [t('design'), t('ux'), t('innovation')]
    },
    {
      id: 10,
      title: t('blog10Title'),
      excerpt: t('blog10Excerpt'),
      category: t('businessCategory'),
      date: currentLang === 'AR' ? "٢٥ يناير ٢٠٢٤" : "January 25, 2024",
      author: t('oliviaDavis'),
      authorAvatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      views: 2789,
      comments: 92,
      likes: 178,
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: [t('growth'), t('strategy'), t('business')]
    },
    {
      id: 11,
      title: t('blog11Title'),
      excerpt: t('blog11Excerpt'),
      category: t('marketingCategory'),
      date: currentLang === 'AR' ? "٢٠ يناير ٢٠٢٤" : "January 20, 2024",
      author: t('chrisTaylor'),
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      views: 1987,
      comments: 58,
      likes: 145,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: [t('marketing'), t('content'), t('strategy')]
    },
    {
      id: 12,
      title: t('blog12Title'),
      excerpt: t('blog12Excerpt'),
      category: t('marketingCategory'),
      date: currentLang === 'AR' ? "١٥ يناير ٢٠٢٤" : "January 15, 2024",
      author: t('amandaClark'),
      authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      views: 2234,
      comments: 76,
      likes: 167,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: [t('marketing'), t('psychology'), t('trends')]
    }
  ];

  // Pagination Logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogsData.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogsData.length / blogsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: sectionRef.current?.offsetTop - 100, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      console.log('Subscribed with email:', email);
      setSubscribed(true);
      setEmail('');
      
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    }
  };

  // GSAP Animations
  useEffect(() => {
    // Hero section animation
    gsap.fromTo(heroRef.current,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
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
        delay: 0.3,
        ease: 'back.out(1.7)'
      }
    );

    // Blog cards animation on page change
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach((card, index) => {
      gsap.fromTo(card,
        {
          y: 50,
          opacity: 0,
          rotationY: 10,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'back.out(1.7)'
        }
      );
    });

    // Blog card hover animations
    blogCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          duration: 0.3,
          ease: 'power2.out'
        });
        
        gsap.to(card.querySelector('.blog-image img'), {
          scale: 1.1,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        
        gsap.to(card.querySelector('.blog-image img'), {
          scale: 1,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [currentPage, currentLang]);

  // Generate pagination items
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item 
        key={number} 
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="main-blogs-page">
      {/* Hero Section with Full Width Image */}
      <section className="blogs-hero" ref={heroRef}>
        <div className="hero-overlay"></div>
        <div className="blogshero-content">
          <h1 className="blogshero-title">{t('pageTitle')}</h1>
          <p className="blogshero-subtitle">{t('pageSubtitle')}</p>
        </div>
      </section>

      {/* Main Blogs Section */}
      <section className="blogs-main-section" ref={sectionRef} id="blogs">
        <Container fluid="lg">
          {/* Section Header */}
          <Row className="justify-content-center mb-5">
            <Col xl={10} lg={11} md={12} className="text-center">
              <h2 className="blogssection-title" ref={titleRef} style={{ direction: currentLang === 'AR' ? 'rtl' : 'ltr' }}>
                {t('sectionTitle')}
              </h2>
              <p className="blogssection-subtitle" style={{ direction: currentLang === 'AR' ? 'rtl' : 'ltr' }}>
                {t('sectionSubtitle')}
              </p>
            </Col>
          </Row>

          {/* Blogs Grid - 3 cards per row */}
          <Row className="g-4">
            {currentBlogs.map((blog) => (
              <Col lg={4} md={6} sm={12} key={blog.id}>
                <div 
                  className="blog-card"
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
                    {/* <button className="bookmark-btn">
                      <FaBookmark />
                    </button> */}
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

                    {/* Blog Details Button */}
                    <div className="blog-actions">
                        {/* <Link to={`/BlogDetails/${blog.id}`} className="blog-details-link" style={{textdecoration: 'none'}}>
                      <Button className="blog-details-btn">
                        {t('blogDetails')}
                        <FaArrowRight style={{ marginLeft: currentLang === 'AR' ? '0' : '8px', marginRight: currentLang === 'AR' ? '8px' : '0' }} />
                      </Button>
                      </Link> */}
                        <Link to={`/BlogDetails/${blog.id}`} className="blog-details-link" style={{textdecoration: 'none'}}>
                        {t('readFullArticle')}
                      <FaArrowRight style={{ marginLeft: currentLang === 'AR' ? '0' : '8px', marginRight: currentLang === 'AR' ? '8px' : '0' }} />

                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          {totalPages > 1 && (
            <Row className="mt-5">
              <Col className="d-flex justify-content-center">
                <Pagination>
                  <Pagination.Prev 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                  >
                    {t('previous')}
                  </Pagination.Prev>
                  {paginationItems}
                  <Pagination.Next 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                  >
                    {t('next')}
                  </Pagination.Next>
                </Pagination>
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </div>
  );
};