import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Container, Row, Col, Button, Pagination } from 'react-bootstrap';
import { 
  FaCalendar, FaUser, FaArrowRight, FaBookmark,
  FaEye, FaComment, FaHeart, FaTag
} from 'react-icons/fa';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLanguage } from './LanguageProvider';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Get_All_Blogs_Action } from '../Redux/Actions/BlogsAction';

gsap.registerPlugin(ScrollTrigger);

export const MainBlogsCards = () => {
  const { currentLang } = useLanguage();
  const dispatch = useDispatch();
  
  // State للـ pagination والبيانات
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const blogsPerPage = 6;
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const heroRef = useRef(null);

  // دالة مساعدة للـ direction
  const getDirection = () => {
    return currentLang === 'ar' ? 'rtl' : 'ltr';
  };

  // الحصول على البيانات من Redux
  const resblogs = useSelector(state => state.AllBlogs.Blog);
  const blogsLoading = useSelector(state => state.AllBlogs.loading);

  // دالة لمعالجة رابط الصورة
  const getImageUrl = (url) => {
    if (!url || typeof url !== 'string') return null
    
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
    
    if (tags[lang]) {
      const tagValue = tags[lang]
      if (Array.isArray(tagValue)) {
        return tagValue.slice(0, 2).map(tag => cleanTag(tag))
      }
    }
    
    return []
  }

  // جلب المدونات من الـ API
  const getAllBlogs = async (pageNum = 1) => {
    setLoading(true);
    try {
      await dispatch(Get_All_Blogs_Action(`page=${pageNum}&limit=${blogsPerPage}`));
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  // عند تغيير الصفحة
  useEffect(() => {
    getAllBlogs(currentPage);
  }, [currentPage]);

  // تحديث البيانات عند استلامها من الـ API
  useEffect(() => {
    if (resblogs) {
      console.log('Blogs data from API:', resblogs);
      setTotalPages(resblogs?.pagination?.totalPages || 1);
      setTotalItems(resblogs?.pagination?.totalItems || 0);
    }
  }, [resblogs]);

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
      readFullArticle: "Read Full Article",
      blogDetails: "Blog Details",
      previous: "Previous",
      next: "Next",
      newsletterTitle: "Stay Updated",
      newsletterSubtitle: "Subscribe to our newsletter and never miss our latest articles and insights",
      placeholderEmail: "Enter your email",
      subscribeButton: "Subscribe",
      subscribedMessage: "Thank you for subscribing!",
      defaultAuthor: "Admin",
      loading: "Loading...",
      noBlogs: "No blogs found",
      showing: "Showing",
      of: "of",
      articles: "articles",
      page: "Page"
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
      readFullArticle: "اقرأ المقال الكامل",
      blogDetails: "تفاصيل المدونة",
      previous: "السابق",
      next: "التالي",
      newsletterTitle: "ابق على اطلاع",
      newsletterSubtitle: "اشترك في نشرتنا الإخبارية ولا تفوت أبدًا أحدث مقالاتنا ورؤىنا",
      placeholderEmail: "أدخل بريدك الإلكتروني",
      subscribeButton: "اشترك",
      subscribedMessage: "شكراً لك على الاشتراك!",
      defaultAuthor: "المدير",
      loading: "جاري التحميل...",
      noBlogs: "لا توجد مقالات",
      showing: "عرض",
      of: "من",
      articles: "مقال",
      page: "صفحة"
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

  // دالة لاستخراج البيانات حسب اللغة
  const getLocalizedData = (blog) => {
    const lang = currentLang.toLowerCase()
    
    return {
      id: blog?._id || '',
      title: blog?.title?.[lang] || blog?.title?.ar || blog?.title?.en || t('noBlogs'),
      excerpt: blog?.short_description?.[lang] || blog?.short_description?.ar || blog?.short_description?.en || '',
      author: blog?.author || t('defaultAuthor'),
      createdAt: blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) : (lang === 'ar' ? '١ يناير ٢٠٢٤' : 'January 1, 2024'),
      tags: getTagsArray(blog?.tags, lang === 'ar' ? 'ar' : 'en'),
      slug: blog?.slug?.[lang] || blog?.slug?.ar || blog?.slug?.en || blog?._id,
      category: blog?.category?.[lang] || blog?.category?.ar || blog?.category?.en || t('businessCategory')
    }
  }

  // التعامل مع تغيير الصفحة
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (sectionRef.current) {
      window.scrollTo({ top: sectionRef.current.offsetTop - 100, behavior: 'smooth' });
    }
  };

  // عرض المدونات
  const renderBlogs = () => {
    if (loading || blogsLoading) {
      return (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">{t('loading')}</span>
          </div>
          <p className="mt-3">{t('loading')}</p>
        </div>
      );
    }

    const blogs = resblogs?.data?.blogs || [];
    
    if (blogs.length === 0) {
      return (
        <div className="text-center py-5">
          <p className="text-muted">{t('noBlogs')}</p>
        </div>
      );
    }

    return blogs.map((blog) => {
      const localizedData = getLocalizedData(blog);
      const blogId = blog?._id || '';
      
      const authorAvatar = blog?.authorAvatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80";
      
      const blogImageRaw = blog?.profileImg || blog?.image || null;
      const blogImage = blogImageRaw ? getImageUrl(blogImageRaw) : "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";

      return (
        <Col lg={4} md={6} sm={12} key={blogId} className="mb-4">
          <div 
            className="blog-card"
            style={{ direction: getDirection() }}
          >
            {/* Blog Image */}
            <div className="blog-image">
              <img 
                src={blogImage} 
                alt={localizedData.title} 
                className="img-fluid"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
                }} 
              />
              <div className="blog-overlay"></div>
              <span className="blog-category">{localizedData.category}</span>
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

              {/* Blog Tags */}
              {localizedData.tags.length > 0 && (
                <div className="blog-tags">
                  {localizedData.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span key={tagIndex} className="blog-tag">
                      <FaTag style={{ marginRight: '5px', fontSize: '0.8rem' }} />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Blog Details Button */}
              <div className="blog-actions">
                <Link 
                  to={`/BlogDetails/${blogId}`} 
                  className="blog-details-link" 
                  style={{ textDecoration: 'none' }}
                >
                  {t('readFullArticle')}
                  <FaArrowRight style={{ 
                    marginLeft: currentLang === 'ar' ? '0' : '8px', 
                    marginRight: currentLang === 'ar' ? '8px' : '0' 
                  }} />
                </Link>
              </div>
            </div>
          </div>
        </Col>
      );
    });
  };

  // Generate pagination items
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    items.push(
      <Pagination.First 
        key="first" 
        onClick={() => handlePageChange(1)} 
        disabled={currentPage === 1}
      />
    );
    
    items.push(
      <Pagination.Prev 
        key="prev" 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        {t('previous')}
      </Pagination.Prev>
    );

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    items.push(
      <Pagination.Next 
        key="next" 
        onClick={() => handlePageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        {t('next')}
      </Pagination.Next>
    );
    
    items.push(
      <Pagination.Last 
        key="last" 
        onClick={() => handlePageChange(totalPages)} 
        disabled={currentPage === totalPages}
      />
    );

    return (
      <Row className="mt-5">
        <Col className="d-flex flex-column align-items-center">
          <div className="mb-3 text-center">
            <span className="text-muted">
              {t('showing')} {Math.min((currentPage - 1) * blogsPerPage + 1, totalItems)} - {Math.min(currentPage * blogsPerPage, totalItems)} {t('of')} {totalItems} {t('articles')}
            </span>
          </div>
          
          <Pagination>
            {items}
          </Pagination>
        </Col>
      </Row>
    );
  };

  // GSAP Animations
  useEffect(() => {
    // Hero section animation
    if (heroRef.current) {
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
    }

    // Title animation
    if (titleRef.current) {
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
    }

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
        
        const image = card.querySelector('.blog-image img');
        if (image) {
          gsap.to(image, {
            scale: 1.1,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        
        const image = card.querySelector('.blog-image img');
        if (image) {
          gsap.to(image, {
            scale: 1,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [currentPage, currentLang, resblogs]);

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
              <h2 
                className="blogssection-title" 
                ref={titleRef} 
                style={{ direction: getDirection() }}
              >
                {t('sectionTitle')}
              </h2>
              <p 
                className="blogssection-subtitle" 
                style={{ direction: getDirection() }}
              >
                {t('sectionSubtitle')}
              </p>
            </Col>
          </Row>

          {/* Blogs Grid - 3 cards per row */}
          <Row className="g-4">
            {renderBlogs()}
          </Row>

          {/* Pagination */}
          {renderPagination()}
        </Container>
      </section>
    </div>
  );
};

// CSS Styles
const styles = `
.main-blogs-page {
  background: linear-gradient(135deg, #fff 0%, #fff 100%);
  min-height: 100vh;
  box-shadow: inset 0 0 50px rgba(24, 15, 15, 0.05);
}

.blogs-hero {
  position: relative;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
              url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  border-radius: 0 0 50px 50px;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8));
}

.blogshero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  padding: 20px;
}

.blogshero-title {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.blogshero-subtitle {
  font-size: 1.5rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.blogs-main-section {
  padding: 100px 0;
  background: white;
  border-radius: 50px 50px 0 0;
  margin-top: -50px;
  position: relative;
}

.blogssection-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: #333;
}

.blogssection-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.blog-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(50,50,93,0.1), 0 5px 15px rgba(0,0,0,0.07);
  transition: all 0.4s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 50px rgba(50,50,93,0.15), 0 10px 25px rgba(0,0,0,0.1);
}

.blog-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.blog-card:hover .blog-image img {
  transform: scale(1.1);
}

.blog-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7) 100%);
}

.blog-category {
  position: absolute;
  top: 20px;
  left: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 1;
}

.blog-date {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(255,255,255,0.9);
  color: #333;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  z-index: 1;
}

.blog-content {
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.blog-author {
  display: flex;
  align-items: center;
  gap: 10px;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #f0f0f0;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-author span {
  font-weight: 600;
  color: #555;
}

.blog-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #333;
  line-height: 1.4;
}

.blog-excerpt {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
}

.blog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.blog-tag {
  background: #f0f0f0;
  color: #667eea;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.blog-actions {
  margin-top: auto;
}

.blog-details-link {
  display: inline-flex;
  align-items: center;
  color: #667eea;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.blog-details-link:hover {
  color: #764ba2;
  transform: translateX(5px);
}

.pagination {
  margin-bottom: 0;
}

.page-item.active .page-link {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
}

.page-link {
  color: #667eea;
  border: none;
  margin: 0 5px;
  border-radius: 10px;
  padding: 10px 15px;
}

.page-link:hover {
  background: #f0f0f0;
  color: #764ba2;
}

@media (max-width: 768px) {
  .blogshero-title {
    font-size: 2.5rem;
  }
  
  .blogshero-subtitle {
    font-size: 1.2rem;
  }
  
  .blogssection-title {
    font-size: 2.2rem;
  }
  
  .blogs-main-section {
    padding: 60px 0;
  }
}
`;

// إضافة الـ styles إلى document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}