import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { FaCalendar, FaUser, FaArrowLeft, FaClock, FaTag, FaShareAlt } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageProvider';
import { useDispatch, useSelector } from 'react-redux';
import { Get_one_Blog_Action } from '../Redux/Actions/BlogsAction';

export const BlogDetails = () => {
  const { id } = useParams();
  const { currentLang } = useLanguage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);
  const [contentLang, setContentLang] = useState('ar'); // لغة عرض المحتوى

  // جلب البيانات من Redux
  const selectblog = useSelector(state => state.AllBlogs?.Blog);

  const getselectedblog = async () => {
    try {
      setLoading(true);
      await dispatch(Get_one_Blog_Action(id));
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getselectedblog();
  }, [dispatch, id]);

  useEffect(() => {
    if (selectblog && selectblog.success) {
      setBlog(selectblog.data);
    }
  }, [selectblog]);

  // دالة لاستخراج البيانات حسب اللغة
  const getByLanguage = (data, lang) => {
    if (!data) return '';
    if (typeof data === 'string') return data;
    if (data[lang] !== undefined) return data[lang];
    if (data.ar) return data.ar; // Fallback للعربي
    return '';
  };

  // دالة لتحويل التايمزتاب
  const formatDate = (dateString, lang) => {
    const date = new Date(dateString);
    if (lang === 'ar') {
      return date.toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  // دالة لمعالجة التاجات
  const parseTags = (tagsData, lang) => {
    try {
      const tagsString = getByLanguage(tagsData, lang);
      const tagsArray = JSON.parse(tagsString);
      return Array.isArray(tagsArray) ? tagsArray : [tagsArray];
    } catch {
      const tagsString = getByLanguage(tagsData, lang);
      if (Array.isArray(tagsString)) return tagsString;
      return tagsString ? [tagsString] : [];
    }
  };

  // الترجمات
  const translations = {
    EN: {
      backToBlogs: "Back to Blogs",
      publishedOn: "Published on",
      updatedOn: "Updated on",
      readTime: "min read",
      by: "by",
      loading: "Loading...",
      noBlogFound: "Blog post not found",
      goBack: "Go Back",
      tags: "Tags",
      content: "Content",
      summary: "Summary",
      switchToArabic: "العربية",
      switchToEnglish: "English",
      share: "Share"
    },
    AR: {
      backToBlogs: "العودة إلى المدونات",
      publishedOn: "نُشر في",
      updatedOn: "تم التحديث في",
      readTime: "دقيقة للقراءة",
      by: "بواسطة",
      loading: "جارٍ التحميل...",
      noBlogFound: "المدونة غير موجودة",
      goBack: "العودة",
      tags: "الكلمات المفتاحية",
      content: "المحتوى",
      summary: "ملخص",
      switchToArabic: "العربية",
      switchToEnglish: "English",
      share: "مشاركة"
    }
  };

  // دالة الترجمة المحسنة
  const t = (key) => {
    const lang = currentLang.toUpperCase(); // تحويل 'en' إلى 'EN', 'ar' إلى 'AR'
    return translations[lang]?.[key] || translations.EN[key] || key;
  };

  // تقدير وقت القراءة
  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const handleBack = () => {
    navigate(-1);
  };

  // تبديل لغة المحتوى
  const toggleContentLang = () => {
    setContentLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  // مشاركة المدونة
  const handleShare = () => {
    if (navigator.share && blog) {
      navigator.share({
        title: getByLanguage(blog?.title, contentLang),
        text: getByLanguage(blog?.short_description, contentLang),
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(currentLang === 'ar' ? 'تم نسخ الرابط' : 'Link copied to clipboard');
    }
  };

  // إضافة style للعربية
  const arabicStyles = currentLang === 'ar' ? {
    textAlign: 'right',
    direction: 'rtl'
  } : {};

  // عرض حالة التحميل
  if (loading) {
    return (
      <div className="loading-container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="primary" className="mb-3" />
        <h4 style={arabicStyles}>{t('loading')}</h4>
      </div>
    );
  }

  // عرض حالة عدم العثور على المدونة
  if (!blog || !selectblog?.success) {
    return (
      <div className="not-found-container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh', ...arabicStyles }}>
        <h3 className="mb-4 text-danger">{t('noBlogFound')}</h3>
        <Button variant="primary" onClick={handleBack}>
          <FaArrowLeft style={{ 
            marginLeft: currentLang === 'ar' ? '8px' : 0, 
            marginRight: currentLang === 'en' ? '8px' : 0 
          }} />
          {t('goBack')}
        </Button>
      </div>
    );
  }

  // حساب وقت القراءة
  const readTime = calculateReadTime(getByLanguage(blog?.content, contentLang));
  const tags = parseTags(blog?.tags, contentLang);

  return (
    <div className="blog-details-page" style={arabicStyles}>
      {/* صورة المدونة الرئيسية */}
      {blog?.profileImg && (
        <div className="blog-main-image-container mb-4" style={{borderRadius:'20px'}}>
          <img 
            src={blog.profileImg} 
            alt={getByLanguage(blog?.title, contentLang)} 
            className="blog-main-image w-100 rounded"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80';
            }}
          />
        </div>
      )}

      {/* محتوى المدونة */}
      <div className="blog-content-full-width">
        {/* عنوان المدونة */}
        <h1 className="blog-detail-title mb-4">
          {getByLanguage(blog?.title, contentLang)}
        </h1>

        {/* معلومات المدونة */}
        <div className="blog-meta-info mb-4 p-3 bg-light rounded">
          <div className="d-flex flex-wrap justify-content-between align-items-center">
            {/* معلومات النشر */}
            <div className="d-flex flex-wrap gap-3 mb-2 mb-md-0">
              <div className="d-flex align-items-center">
                <FaCalendar className="me-2 text-muted" />
                <span className="me-3">
                  <strong>{t('publishedOn')}:</strong> {formatDate(blog?.createdAt, contentLang)}
                </span>
              </div>
              
              <div className="d-flex align-items-center">
                <FaClock className="me-2 text-muted" />
                <span>
                  <strong>{readTime}</strong> {t('readTime')}
                </span>
              </div>
            </div>

            {/* معلومات الكاتب */}
            {blog?.author && (
              <div className="d-flex align-items-center">
                <FaUser className="me-2 text-muted" />
                <span>
                  {t('by')} <strong>{blog.author}</strong>
                </span>
              </div>
            )}
          </div>

          {/* تاريخ التحديث */}
          {blog?.updatedAt && (
            <div className="mt-2 text-muted small">
              <FaCalendar className="me-1" />
              <strong>{t('updatedOn')}:</strong> {formatDate(blog.updatedAt, contentLang)}
            </div>
          )}
        </div>

        {/* التاجات */}
        {tags.length > 0 && (
          <div className="blog-tags mb-4">
            <h5 className="d-flex align-items-center mb-3">
              <FaTag className="me-2" />
              {t('tags')}:
            </h5>
            <div className="d-flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="badge bg-primary bg-gradient"
                  style={{ fontSize: '0.9rem', padding: '8px 12px' }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* الملخص */}
        {blog?.short_description && (
          <div className="blog-summary mb-5 p-4 bg-info bg-opacity-10 rounded border-start border-4 border-info">
            <h4 className="mb-3">{t('summary')}</h4>
            <p className="lead mb-0">
              {getByLanguage(blog.short_description, contentLang)}
            </p>
          </div>
        )}

        {/* المحتوى الكامل */}
        <div className="blog-full-content">
          <h3 className="mb-4 pb-2 border-bottom">{t('content')}</h3>
          <div className="article-content" style={{ 
            lineHeight: '1.8',
            fontSize: '1.1rem'
          }}>
            {getByLanguage(blog?.content, contentLang) || (
              <div className="text-muted text-center py-5">
                {currentLang === 'ar' ? 'لا يوجد محتوى' : 'No content available'}
              </div>
            )}
          </div>
        </div>

        {/* أزرار التحكم في الأسفل */}
        <div className="d-flex justify-content-between align-items-center mt-5 pt-4">
          <Button 
            variant="outline-secondary" 
            onClick={handleBack}
            className="d-flex align-items-center"
          >
            <FaArrowLeft style={{ 
              marginLeft: currentLang === 'ar' ? '8px' : 0, 
              marginRight: currentLang === 'en' ? '8px' : 0 
            }} />
            {t('backToBlogs')}
          </Button>

          <div className="d-flex gap-2">
            <Button 
              variant="outline-info" 
              onClick={toggleContentLang}
            >
              {contentLang === 'ar' ? t('switchToEnglish') : t('switchToArabic')}
            </Button>
            
            <Button 
              variant="primary" 
              onClick={handleShare}
            >
              <FaShareAlt className="me-2" />
              {t('share')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};