import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Box, 
  Chip, 
  Stack,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Pagination,
  Menu,
  MenuItem,
  Tooltip,
  Paper
} from '@mui/material'
import {
  Edit,
  Delete,
  Visibility,
  CalendarToday,
  Person,
  Category,
  Tag,
  Image as ImageIcon,
  Article,
  Search,
  FilterList,
  Sort,
  Language,
  BrokenImage
} from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { Get_All_Blogs_Action } from '../Redux/Actions/BlogsAction'
import { useNavigate } from 'react-router-dom'

// Styled Components
const BlogCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  borderRadius: '16px',
  overflow: 'hidden',
  border: '1px solid',
  borderColor: theme.palette.divider,
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  width: '100%',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
    borderColor: theme.palette.primary.main
  }
}))

const BlogImage = styled(Box)({
  height: 220,
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const BlogContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column'
}))

const BlogActions = styled(CardActions)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  backgroundColor: theme.palette.grey[50],
  borderTop: '1px solid',
  borderColor: theme.palette.divider
}))

const LanguageBadge = styled(Chip)(({ theme, lang }) => ({
  position: 'absolute',
  top: 12,
  left: 12,
  zIndex: 1,
  fontWeight: 'bold',
  backgroundColor: lang === 'ar' ? '#102dff' : '#2196f3',
  color: 'white',
  '& .MuiChip-icon': {
    color: 'white'
  }
}))

export const AdminAllblogs = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [filterAnchor, setFilterAnchor] = useState(null)
  const [sortAnchor, setSortAnchor] = useState(null)
  const [filterBy, setFilterBy] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [imageErrors, setImageErrors] = useState({})

  const resblogs = useSelector(state => state.AllBlogs.Blog)
  const loading = useSelector(state => state.AllBlogs.loading)
  const error = useSelector(state => state.AllBlogs.error)

  // البيانات الحقيقية من الـ API
  const blogsData = resblogs?.data?.blogs || []
  const latestBlogs = resblogs?.data?.latestBlogs || []
  const pagination = resblogs?.pagination || {}

  console.log('API Response:', resblogs)
  console.log('Blogs Data:', blogsData)
  console.log('First Blog:', blogsData[0])

  // أضف هذا للتحقق من الصور
  useEffect(() => {
    if (blogsData.length > 0) {
      console.log('=== Image URLs Debug ===')
      blogsData.forEach((blog, index) => {
        const blogId = getSafeValue(blog, '_id', `blog-${index}`)
        const originalImage = getSafeValue(blog, 'profileImg')
        const processedUrl = getImageUrl(originalImage)
        console.log(`Blog ${index + 1} (ID: ${blogId}):`)
        console.log('  Original Image:', originalImage)
        console.log('  Processed URL:', processedUrl)
        
        // Test the image
        if (processedUrl) {
          const img = new Image()
          img.onload = () => console.log(`  ✅ Image loads successfully`)
          img.onerror = () => console.log(`  ❌ Image failed to load`)
          img.src = processedUrl
        }
      })
    }
  }, [blogsData])

  const getallblogs = async () => {
    await dispatch(Get_All_Blogs_Action(`page=${page}&limit=12`))
  }

  useEffect(() => {
    getallblogs()
  }, [dispatch, page])

  const handleDeleteClick = (blog) => {
    setSelectedBlog(blog)
    setDeleteDialog(true)
  }

  const handleDeleteConfirm = () => {
    console.log('Deleting blog:', selectedBlog?._id)
    setDeleteDialog(false)
    setSelectedBlog(null)
  }

  const handleEdit = (blog) => {
    navigate(`/edit-blog/${blog?._id}`)
  }

  const handleView = (blog) => {
    navigate(`/blog/${blog?._id}`)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  // دالة محسنة لضمان أن الرابط صالح للصورة
  const getImageUrl = (url) => {
    if (!url || typeof url !== 'string') {
      console.log('No URL provided')
      return null
    }
    
    console.log('Original URL from API:', url)
    
    // الحالة 1: إذا كان الرابط يبدأ بـ "undefined/"
    if (url.startsWith('undefined/')) {
      console.log('Fixing undefined/ prefix')
      // إزالة "undefined/" من البداية
      const cleanUrl = url.replace(/^undefined\//, '')
      const fullUrl = `https://apirender-3.onrender.com/${cleanUrl}`
      console.log('Fixed URL:', fullUrl)
      return fullUrl
    }
    
    // الحالة 2: إذا كان الرابط يحتوي على "undefined/" في المنتصف
    if (url.includes('undefined/')) {
      console.log('Fixing undefined/ in middle')
      // إزالة جميع ظهورات "undefined/"
      const cleanUrl = url.replace(/undefined\//g, '')
      
      // إذا أصبح الرابط يبدأ بـ "http" فهو كامل
      if (cleanUrl.startsWith('http')) {
        console.log('Fixed to full URL:', cleanUrl)
        return cleanUrl
      }
      
      // إذا كان يبدأ بـ "/" فهو مسار مطلق
      if (cleanUrl.startsWith('/')) {
        const fullUrl = `https://apirender-3.onrender.com${cleanUrl}`
        console.log('Fixed to absolute path:', fullUrl)
        return fullUrl
      }
      
      // وإلا فهو مسار نسبي
      const fullUrl = `https://apirender-3.onrender.com/${cleanUrl}`
      console.log('Fixed to relative path:', fullUrl)
      return fullUrl
    }
    
    // الحالة 3: الرابط العادي
    if (url.startsWith('http://') || url.startsWith('https://')) {
      console.log('Already full URL')
      return url
    }
    
    if (url.startsWith('/')) {
      const fullUrl = `https://apirender-3.onrender.com${url}`
      console.log('Absolute path to full URL:', fullUrl)
      return fullUrl
    }
    
    const fullUrl = `https://apirender-3.onrender.com/${url}`
    console.log('Relative path to full URL:', fullUrl)
    return fullUrl
  }

  // دالة للتعامل مع أخطاء الصور
  const handleImageError = (blogId) => {
    console.log(`Image error for blog ${blogId}`)
    setImageErrors(prev => ({
      ...prev,
      [blogId]: true
    }))
  }

  // دالة آمنة لجلب البيانات
  const getSafeValue = (obj, path, defaultValue = '') => {
    if (!obj) return defaultValue
    try {
      const keys = path.split('.')
      let result = obj
      for (const key of keys) {
        result = result?.[key]
        if (result === undefined || result === null) return defaultValue
      }
      return result || defaultValue
    } catch (error) {
      console.error(`Error getting ${path}:`, error)
      return defaultValue
    }
  }

  const filteredBlogs = blogsData.filter(blog => {
    if (!blog) return false
    
    const titleAr = getSafeValue(blog, 'title.ar', '').toLowerCase()
    const titleEn = getSafeValue(blog, 'title.en', '').toLowerCase()
    const author = getSafeValue(blog, 'author', '').toLowerCase()
    
    const matchesSearch = searchTerm === '' || 
      titleAr.includes(searchTerm.toLowerCase()) ||
      titleEn.includes(searchTerm.toLowerCase()) ||
      author.includes(searchTerm.toLowerCase())

    const matchesFilter = filterBy === 'all' || 
      (filterBy === 'published' && getSafeValue(blog, 'is_published', false)) ||
      (filterBy === 'draft' && !getSafeValue(blog, 'is_published', false))

    return matchesSearch && matchesFilter
  })

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    const dateA = new Date(getSafeValue(a, 'createdAt', new Date()))
    const dateB = new Date(getSafeValue(b, 'createdAt', new Date()))
    const titleArA = getSafeValue(a, 'title.ar', '')
    const titleArB = getSafeValue(b, 'title.ar', '')

    switch(sortBy) {
      case 'newest':
        return dateB - dateA
      case 'oldest':
        return dateA - dateB
      case 'title-az':
        return titleArA.localeCompare(titleArB)
      case 'title-za':
        return titleArB.localeCompare(titleArA)
      default:
        return 0
    }
  })

  const truncateText = (text, maxLength = 100) => {
    if (!text || typeof text !== 'string') return ''
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'غير محدد'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch (e) {
      return 'غير محدد'
    }
  }

  const cleanTag = (tag) => {
    if (!tag) return ''
    if (typeof tag === 'string') {
      // تحويل JSON string إلى array
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

  const getTagsArray = (tags) => {
    if (!tags) return []
    if (Array.isArray(tags)) return tags.slice(0, 3)
    if (typeof tags === 'string') {
      try {
        const parsed = JSON.parse(tags)
        if (Array.isArray(parsed)) return parsed.slice(0, 3)
        return [parsed]
      } catch {
        return [tags.replace(/[\[\]"]+/g, '')]
      }
    }
    return []
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
        py: 4, 
        px: { xs: 2, md: 3 },
        width: '100%',
        maxWidth: '100% !important'
      }}
    >
      {/* Header Section */}
      <Paper elevation={0} sx={{ 
        p: 3, 
        mb: 4, 
        borderRadius: 3,
        bgcolor: 'background.default',
        border: '1px solid',
        borderColor: 'divider',
        width: '100%'
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
              📝 إدارة المقالات
            </Typography>
            <Typography variant="body1" color="text.secondary">
              عرض وإدارة جميع المقالات في نظامك
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            startIcon={<Article />}
            onClick={() => navigate('/AddBlogsPage')}
            sx={{
              bgcolor: '#102dff',
              background: 'linear-gradient(45deg, #102dff, #6c8eff)',
              borderRadius: '10px',
              px: 4,
              py: 1.2,
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: '#0a25d6',
                background: 'linear-gradient(45deg, #0a25d6, #5a7bff)'
              }
            }}
          >
            إضافة مقال جديد
          </Button>
        </Box>

        {/* Search and Filters */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr auto auto' },
          gap: 2,
          alignItems: 'center',
          mb: 3
        }}>
          <TextField
            placeholder="🔍 ابحث عن مقال بالعنوان أو المؤلف..."
            variant="outlined"
            size="medium"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                backgroundColor: 'white'
              }
            }}
          />
          
          <Button
            startIcon={<FilterList />}
            onClick={(e) => setFilterAnchor(e.currentTarget)}
            variant="outlined"
            sx={{ borderRadius: '10px', height: '56px' }}
          >
            {filterBy === 'all' ? 'الكل' : filterBy === 'published' ? 'منشور' : 'مسودة'}
          </Button>

          <Button
            startIcon={<Sort />}
            onClick={(e) => setSortAnchor(e.currentTarget)}
            variant="outlined"
            sx={{ borderRadius: '10px', height: '56px' }}
          >
            {sortBy === 'newest' ? 'الأحدث' : 
             sortBy === 'oldest' ? 'الأقدم' : 
             sortBy === 'title-az' ? 'أ-ي' : 'ي-أ'}
          </Button>
        </Box>

        {/* Stats */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: 2
        }}>
          <Paper sx={{ 
            p: 3, 
            textAlign: 'center',
            bgcolor: 'primary.50',
            border: '2px solid',
            borderColor: 'primary.100'
          }}>
            <Typography variant="h3" fontWeight="bold" color="primary">
              {pagination.totalItems || 0}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              إجمالي المقالات
            </Typography>
          </Paper>
          
        
        </Box>
      </Paper>

      {/* Blogs Grid */}
      {sortedBlogs.length === 0 ? (
        <Paper sx={{ 
          textAlign: 'center', 
          py: 10,
          borderRadius: 3,
          bgcolor: 'background.paper'
        }}>
          <ImageIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 3, opacity: 0.5 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {searchTerm ? 'لم يتم العثور على مقالات' : 'لا توجد مقالات'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {searchTerm ? 'حاول البحث بكلمات أخرى' : 'ابدأ بإضافة مقال جديد'}
          </Typography>
          {!searchTerm && (
            <Button
              variant="contained"
              startIcon={<Article />}
              onClick={() => navigate('/AddBlogsPage')}
              sx={{ borderRadius: '10px', px: 4 }}
            >
              إضافة أول مقال
            </Button>
          )}
        </Paper>
      ) : (
        <>
          <Grid container spacing={3}>
            {sortedBlogs.map((blog) => {
              if (!blog) return null
              
              const blogId = getSafeValue(blog, '_id', '')
              const blogTitleAr = getSafeValue(blog, 'title.ar', 'بدون عنوان')
              const blogTitleEn = getSafeValue(blog, 'title.en', 'No Title')
              const blogAuthor = getSafeValue(blog, 'author', 'مجهول')
              const blogCategoryAr = getSafeValue(blog, 'category.ar', 'عام')
              const blogCategoryEn = getSafeValue(blog, 'category.en', 'General')
              const blogDescriptionAr = getSafeValue(blog, 'short_description.ar', '')
              const blogDescriptionEn = getSafeValue(blog, 'short_description.en', '')
              const blogContentAr = getSafeValue(blog, 'content.ar', '')
              const blogContentEn = getSafeValue(blog, 'content.en', '')
              const blogImage = getSafeValue(blog, 'profileImg')
              const blogTagsAr = getTagsArray(getSafeValue(blog, 'tags.ar', []))
              const blogTagsEn = getTagsArray(getSafeValue(blog, 'tags.en', []))
              const isPublished = getSafeValue(blog, 'is_published', false)
              const createdAt = getSafeValue(blog, 'createdAt')
              
              const imageUrl = getImageUrl(blogImage)
              const hasImageError = imageErrors[blogId] || false

              return (
                <Grid item xs={12} key={blogId} sx={{ width: '100%' }}>
                  <BlogCard>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', md: 'row' }, 
                      height: '100%',
                      width: '100%'
                    }}>
                      {/* Image Section */}
                      <Box sx={{ 
                        width: { xs: '100%', md: '300px' },
                        height: { xs: '200px', md: 'auto' },
                        minHeight: { xs: '200px', md: '220px' },
                        position: 'relative',
                        flexShrink: 0
                      }}>
                        <BlogImage
                          sx={{
                            backgroundImage: imageUrl && !hasImageError 
                              ? `url(${imageUrl})`  // ✅ تم التصحيح هنا
                              : 'none',
                            backgroundColor: !imageUrl || hasImageError ? 'grey.100' : 'transparent',
                            height: '100%'
                          }}
                        >
                          {imageUrl && !hasImageError ? (
                            <>
                              {/* Fallback image tag for better loading */}
                              <img 
                                src={imageUrl} 
                                alt={blogTitleAr}
                                style={{ 
                                  display: 'none',
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover'
                                }}
                                onError={() => handleImageError(blogId)}
                              />
                              
                              <LanguageBadge 
                                size="small" 
                                icon={<Language />}
                                label="AR/EN"
                              />
                             
                            </>
                          ) : (
                            <>
                              {hasImageError ? (
                                <BrokenImage sx={{ fontSize: 60, color: 'grey.400' }} />
                              ) : (
                                <ImageIcon sx={{ fontSize: 60, color: 'grey.400' }} />
                              )}
                              <Typography variant="caption" color="grey.600" sx={{ mt: 1 }}>
                                {hasImageError ? 'فشل تحميل الصورة' : 'لا توجد صورة'}
                              </Typography>
                              
                              <LanguageBadge 
                                size="small" 
                                icon={<Language />}
                                label="AR/EN"
                              />
                             
                            </>
                          )}
                        </BlogImage>
                      </Box>

                      {/* Content Section */}
                      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <BlogContent>
                          {/* Title Section */}
                          <Box sx={{ mb: 2 }}>
                            <Typography 
                              variant="h5" 
                              fontWeight="bold" 
                              gutterBottom
                              color="primary"
                            >
                              🇸🇦 {blogTitleAr}
                            </Typography>
                            <Typography 
                              variant="subtitle1" 
                              color="text.secondary"
                              gutterBottom
                              sx={{ 
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                              }}
                            >
                              🇬🇧 {blogTitleEn}
                            </Typography>
                          </Box>

                          {/* Meta Information */}
                          <Stack direction="row" spacing={3} sx={{ mb: 3, flexWrap: 'wrap', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Person sx={{ color: 'text.secondary' }} />
                              <Typography variant="body2">
                                <strong>المؤلف:</strong> {blogAuthor}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CalendarToday sx={{ color: 'text.secondary' }} />
                              <Typography variant="body2">
                                <strong>التاريخ:</strong> {formatDate(createdAt)}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Category sx={{ color: 'text.secondary' }} />
                              <Typography variant="body2">
                                <strong>التصنيف:</strong> {blogCategoryAr} / {blogCategoryEn}
                              </Typography>
                            </Box>
                          </Stack>

                          {/* Description */}
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              الوصف المختصر:
                            </Typography>
                            <Box sx={{ 
                              display: 'grid',
                              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                              gap: 2,
                              mb: 2
                            }}>
                              <Paper variant="outlined" sx={{ p: 2, width: '100%' }}>
                                <Typography variant="body2" color="text.primary">
                                  🇸🇦 {truncateText(blogDescriptionAr, 120)}
                                </Typography>
                              </Paper>
                              <Paper variant="outlined" sx={{ p: 2, width: '100%' }}>
                                <Typography variant="body2" color="text.primary">
                                  🇬🇧 {truncateText(blogDescriptionEn, 120)}
                                </Typography>
                              </Paper>
                            </Box>
                          </Box>

                          {/* Tags */}
                          {(blogTagsAr.length > 0 || blogTagsEn.length > 0) && (
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Tag /> الوسوم:
                              </Typography>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, width: '100%' }}>
                                {blogTagsAr.map((tag, index) => (
                                  <Chip
                                    key={`ar-${index}`}
                                    label={`🇸🇦 ${cleanTag(tag)}`}
                                    size="small"
                                    variant="outlined"
                                    color="primary"
                                  />
                                ))}
                               {blogTagsEn.map((tag, index) => (
  <Chip
    key={`en-${index}`}
    label={`🇬🇧 ${cleanTag(tag)}`}
    size="small"  // ⚠️ إزالة الفاصلة هنا
    variant="outlined"
    color="secondary"
  />
))}
                              </Box>
                            </Box>
                          )}

                          {/* Content Preview */}
                          <Box sx={{ mt: 'auto' }}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              نظرة على المحتوى:
                            </Typography>
                            <Box sx={{ 
                              display: 'grid',
                              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                              gap: 2,
                              width: '100%'
                            }}>
                              <Paper variant="outlined" sx={{ p: 2, maxHeight: '80px', overflow: 'hidden', width: '100%' }}>
                                <Typography variant="body2" color="text.primary">
                                  🇸🇦 {truncateText(blogContentAr, 80)}
                                </Typography>
                              </Paper>
                              <Paper variant="outlined" sx={{ p: 2, maxHeight: '80px', overflow: 'hidden', width: '100%' }}>
                                <Typography variant="body2" color="text.primary">
                                  🇬🇧 {truncateText(blogContentEn, 80)}
                                </Typography>
                              </Paper>
                            </Box>
                          </Box>
                        </BlogContent>

                        {/* Actions */}
                        <BlogActions>
                          <Stack direction="row" spacing={2} sx={{ width: '100%', justifyContent: 'flex-end' }}>
                           
                            
                           
                            
                            <Tooltip title="حذف المقال">
                              <Button
                                variant="outlined"
                                color="error"
                                startIcon={<Delete />}
                                onClick={() => handleDeleteClick(blog)}
                                size="small"
                              >
                                حذف
                              </Button>
                            </Tooltip>
                          </Stack>
                        </BlogActions>
                      </Box>
                    </Box>
                  </BlogCard>
                </Grid>
              )
            })}
          </Grid>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, width: '100%' }}>
              <Pagination
                count={pagination.totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                sx={{
                  '& .MuiPaginationItem-root': {
                    borderRadius: '8px'
                  }
                }}
              />
            </Box>
          )}
        </>
      )}

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchor}
        open={Boolean(filterAnchor)}
        onClose={() => setFilterAnchor(null)}
      >
        <MenuItem onClick={() => { setFilterBy('all'); setFilterAnchor(null); }}>
          الكل
        </MenuItem>
  
      </Menu>

      {/* Sort Menu */}
      <Menu
        anchorEl={sortAnchor}
        open={Boolean(sortAnchor)}
        onClose={() => setSortAnchor(null)}
      >
        <MenuItem onClick={() => { setSortBy('newest'); setSortAnchor(null); }}>
          الأحدث أولاً
        </MenuItem>
        <MenuItem onClick={() => { setSortBy('oldest'); setSortAnchor(null); }}>
          الأقدم أولاً
        </MenuItem>
        <MenuItem onClick={() => { setSortBy('title-az'); setSortAnchor(null); }}>
          بالعنوان (أ-ي)
        </MenuItem>
        <MenuItem onClick={() => { setSortBy('title-za'); setSortAnchor(null); }}>
          بالعنوان (ي-أ)
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={deleteDialog} 
        onClose={() => setDeleteDialog(false)}
        PaperProps={{ sx: { borderRadius: '12px' } }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', color: 'error.main' }}>
          ⚠️ تأكيد الحذف
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            هل أنت متأكد من حذف المقال:
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, my: 2, bgcolor: 'grey.50' }}>
            <Typography variant="h6" color="primary">
              {getSafeValue(selectedBlog, 'title.ar', '')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {getSafeValue(selectedBlog, 'title.en', '')}
            </Typography>
          </Paper>
          <Typography variant="body2" color="error">
            ⚠️ تحذير: لا يمكن التراجع عن هذا الإجراء
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialog(false)}
            variant="outlined"
            sx={{ borderRadius: '8px' }}
          >
            إلغاء
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained"
            startIcon={<Delete />}
            sx={{ borderRadius: '8px' }}
          >
            تأكيد الحذف
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}