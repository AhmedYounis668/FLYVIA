import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Alert,
  CircularProgress,
  InputAdornment,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  PhotoCamera,
  Add,
  Save,
  Publish,
  ArrowBack,
  Language
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArticleIcon from '@mui/icons-material/Article';

const AddBlogsPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  // Initial state for blog data
  const [blogData, setBlogData] = useState({
    title: { ar: '', en: '' },
    content: { ar: '', en: '' },
    short_description: { ar: '', en: '' },
    author: '',
    tags: { ar: [], en: [] },
    profileImg: null,
    category: { ar: 'عام', en: 'General' },
    is_published: false
  });

  // State for tag input
  const [tagInput, setTagInput] = useState({ ar: '', en: '' });

  // Categories options
  const categories = [
    { ar: 'عام', en: 'General' },
    { ar: 'التكنولوجيا', en: 'Technology' },
    { ar: 'التسويق', en: 'Marketing' },
    { ar: 'التطوير', en: 'Development' },
    { ar: 'الأعمال', en: 'Business' }
  ];

  const steps = ['المعلومات الأساسية', 'المحتوى', 'الإضافات', 'المراجعة'];

  // Handle text field changes
  const handleChange = (field, lang = null) => (e) => {
    if (lang) {
      setBlogData(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          [lang]: e.target.value
        }
      }));
    } else {
      setBlogData(prev => ({
        ...prev,
        [field]: e.target.value
      }));
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image
      if (!file.type.startsWith('image/')) {
        setError('الرجاء اختيار ملف صورة فقط');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('حجم الصورة يجب أن يكون أقل من 5MB');
        return;
      }

      setBlogData(prev => ({ ...prev, profileImg: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  // Handle tag addition
  const handleAddTag = (lang) => {
    if (tagInput[lang].trim() === '') return;

    setBlogData(prev => ({
      ...prev,
      tags: {
        ...prev.tags,
        [lang]: [...prev.tags[lang], tagInput[lang].trim()]
      }
    }));
    setTagInput(prev => ({ ...prev, [lang]: '' }));
  };

  // Handle tag removal
  const handleRemoveTag = (lang, index) => {
    setBlogData(prev => ({
      ...prev,
      tags: {
        ...prev.tags,
        [lang]: prev.tags[lang].filter((_, i) => i !== index)
      }
    }));
  };

  // Handle tag input key press
  const handleTagKeyPress = (lang, e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag(lang);
    }
  };

  // Handle form submission
  const handleSubmit = async (isPublished = false) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const formData = new FormData();

      // Append text fields
      formData.append('title[ar]', blogData.title.ar);
      formData.append('title[en]', blogData.title.en);
      formData.append('content[ar]', blogData.content.ar);
      formData.append('content[en]', blogData.content.en);
      formData.append('short_description[ar]', blogData.short_description.ar);
      formData.append('short_description[en]', blogData.short_description.en);
      formData.append('author', blogData.author);
      formData.append('category[ar]', blogData.category.ar);
      formData.append('category[en]', blogData.category.en);
      formData.append('is_published', isPublished);

       // Append tags كـ JSON arrays مباشرة
    formData.append('tags[ar]', JSON.stringify(blogData.tags.ar));
    formData.append('tags[en]', JSON.stringify(blogData.tags.en));

      // Append image if exists
      if (blogData.profileImg) {
        formData.append('profileImg', blogData.profileImg);
      }

      // API call
      await axios.post(
        'https://apirender-3.onrender.com/api/v1/blogs',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setSuccess(`تم ${isPublished ? 'نشر' : 'حفظ'} المقال بنجاح!`);
      setTimeout(() => {
        navigate('/AddBlogsPage');
      }, 2000);

    } catch (err) {
      console.error('Error creating blog:', err);
      setError(err.response?.data?.message || 'حدث خطأ أثناء إنشاء المقال');
    } finally {
      setLoading(false);
    }
  };

  // Stepper handlers
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Render step content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Stack spacing={3}>
            {/* Arabic Title */}
            <Box>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                🇸🇦 عنوان المقال (العربية) *
              </Typography>
              <TextField
                fullWidth
                value={blogData.title.ar}
                onChange={handleChange('title', 'ar')}
                required
                error={!blogData.title.ar}
                helperText={!blogData.title.ar ? 'هذا الحقل مطلوب' : 'أدخل عنوان المقال باللغة العربية'}
                placeholder="أدخل عنوان المقال باللغة العربية"
                size="medium"
              />
            </Box>

            {/* English Title */}
            <Box>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                🇬🇧 Blog Title (English) *
              </Typography>
              <TextField
                fullWidth
                value={blogData.title.en}
                onChange={handleChange('title', 'en')}
                required
                error={!blogData.title.en}
                helperText={!blogData.title.en ? 'This field is required' : 'Enter the blog title in English'}
                placeholder="Enter the blog title in English"
                size="medium"
              />
            </Box>

            {/* Author */}
            <Box>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                👤 اسم المؤلف *
              </Typography>
              <TextField
                fullWidth
                value={blogData.author}
                onChange={handleChange('author')}
                required
                error={!blogData.author}
                helperText={!blogData.author ? 'هذا الحقل مطلوب' : 'أدخل اسم كاتب المقال'}
                placeholder="أدخل اسم المؤلف"
                size="medium"
              />
            </Box>

            {/* Category */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom color="text.secondary">
                  🇸🇦 التصنيف (العربية)
                </Typography>
                <FormControl fullWidth size="medium">
                  <Select
                    value={blogData.category.ar}
                    onChange={handleChange('category', 'ar')}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat.ar} value={cat.ar}>
                        {cat.ar}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>اختر تصنيف المقال باللغة العربية</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom color="text.secondary">
                  🇬🇧 Category (English)
                </Typography>
                <FormControl fullWidth size="medium">
                  <Select
                    value={blogData.category.en}
                    onChange={handleChange('category', 'en')}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat.en} value={cat.en}>
                        {cat.en}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Select the blog category in English</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </Stack>
        );

      case 1:
        return (
          <Stack spacing={3}>
            {/* Arabic Short Description */}
            <Box>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                🇸🇦 الوصف المختصر (العربية) *
              </Typography>
              <TextField
                fullWidth
                value={blogData.short_description.ar}
                onChange={handleChange('short_description', 'ar')}
                multiline
                rows={3}
                required
                error={blogData.short_description.ar.length > 300}
                helperText={`${blogData.short_description.ar.length}/300 - لا تتجاوز 300 حرف`}
                placeholder="أدخل وصف مختصر للمقال باللغة العربية"
              />
            </Box>

            {/* English Short Description */}
            <Box>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                🇬🇧 Short Description (English) *
              </Typography>
              <TextField
                fullWidth
                value={blogData.short_description.en}
                onChange={handleChange('short_description', 'en')}
                multiline
                rows={3}
                required
                error={blogData.short_description.en.length > 300}
                helperText={`${blogData.short_description.en.length}/300 - Maximum 300 characters`}
                placeholder="Enter a short description of the blog in English"
              />
            </Box>

            {/* Arabic Content */}
            <Box>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                🇸🇦 محتوى المقال (العربية) *
              </Typography>
              <TextField
                fullWidth
                value={blogData.content.ar}
                onChange={handleChange('content', 'ar')}
                multiline
                rows={8}
                required
                error={!blogData.content.ar}
                helperText={!blogData.content.ar ? 'هذا الحقل مطلوب' : 'اكتب محتوى المقال بالكامل هنا باللغة العربية'}
                placeholder="اكتب محتوى المقال هنا..."
              />
            </Box>

            {/* English Content */}
            <Box>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                🇬🇧 Blog Content (English) *
              </Typography>
              <TextField
                fullWidth
                value={blogData.content.en}
                onChange={handleChange('content', 'en')}
                multiline
                rows={8}
                required
                error={!blogData.content.en}
                helperText={!blogData.content.en ? 'This field is required' : 'Write the complete blog content here in English'}
                placeholder="Write the blog content here..."
              />
            </Box>
          </Stack>
        );

      case 2:
        return (
          <Stack spacing={4}>
            {/* Image Upload */}
            <Box>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                🖼️ صورة المقال (اختياري)
              </Typography>
              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: 'grey.300',
                  borderRadius: 2,
                  p: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  bgcolor: 'background.paper',
                  transition: 'all 0.3s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'action.hover'
                  }
                }}
                onClick={() => document.getElementById('image-upload').click()}
              >
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                
                {imagePreview ? (
                  <Stack spacing={2} alignItems="center">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '250px',
                        borderRadius: '8px',
                        objectFit: 'cover'
                      }}
                    />
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById('image-upload').click();
                      }}
                    >
                      تغيير الصورة
                    </Button>
                  </Stack>
                ) : (
                  <Stack spacing={2} alignItems="center">
                    <PhotoCamera sx={{ fontSize: 48, color: 'grey.500' }} />
                    <Box>
                      <Typography variant="body1" gutterBottom>
                        انقر لرفع صورة للمقال
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        PNG, JPG أو GIF. الحد الأقصى 5MB
                      </Typography>
                    </Box>
                    <Button variant="contained" size="small">
                      اختر صورة
                    </Button>
                  </Stack>
                )}
              </Box>
            </Box>

            {/* Tags Section */}
            <Grid container spacing={3}>
              {/* Arabic Tags */}
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="subtitle2" gutterBottom color="text.secondary">
                    🇸🇦 الوسوم (العربية)
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <TextField
                        fullWidth
                        placeholder="أضف وسم جديد..."
                        value={tagInput.ar}
                        onChange={(e) => setTagInput(prev => ({ ...prev, ar: e.target.value }))}
                        onKeyPress={(e) => handleTagKeyPress('ar', e)}
                        size="small"
                      />
                      <Button
                        variant="contained"
                        onClick={() => handleAddTag('ar')}
                        disabled={!tagInput.ar.trim()}
                        startIcon={<Add />}
                        size="medium"
                      >
                        إضافة
                      </Button>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, minHeight: '40px' }}>
                      {blogData.tags.ar.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          onDelete={() => handleRemoveTag('ar', index)}
                          color="primary"
                          size="small"
                        />
                      ))}
                      {blogData.tags.ar.length === 0 && (
                        <Typography variant="caption" color="text.secondary">
                          لا توجد وسوم مضافة
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </Box>
              </Grid>

              {/* English Tags */}
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="subtitle2" gutterBottom color="text.secondary">
                    🇬🇧 Tags (English)
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <TextField
                        fullWidth
                        placeholder="Add new tag..."
                        value={tagInput.en}
                        onChange={(e) => setTagInput(prev => ({ ...prev, en: e.target.value }))}
                        onKeyPress={(e) => handleTagKeyPress('en', e)}
                        size="small"
                      />
                      <Button
                        variant="contained"
                        onClick={() => handleAddTag('en')}
                        disabled={!tagInput.en.trim()}
                        startIcon={<Add />}
                        size="medium"
                      >
                        Add
                      </Button>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, minHeight: '40px' }}>
                      {blogData.tags.en.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          onDelete={() => handleRemoveTag('en', index)}
                          color="primary"
                          variant="outlined"
                          size="small"
                        />
                      ))}
                      {blogData.tags.en.length === 0 && (
                        <Typography variant="caption" color="text.secondary">
                          No tags added
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Stack>
        );

      case 3:
        return (
          <Stack spacing={3}>
            <Paper sx={{ p: 3, bgcolor: 'background.default' }}>
              <Typography variant="h6" gutterBottom color="primary">
                📋 معاينة المقال
              </Typography>
              
              <Stack spacing={2}>
                {/* Title Preview */}
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    العنوان
                  </Typography>
                  <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
                    <Typography variant="body1" paragraph>
                      <strong>🇸🇦 العربية:</strong> {blogData.title.ar || 'لم يتم إدخال عنوان'}
                    </Typography>
                    <Typography variant="body1">
                      <strong>🇬🇧 English:</strong> {blogData.title.en || 'No title entered'}
                    </Typography>
                  </Box>
                </Box>

                {/* Author & Category */}
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      المؤلف
                    </Typography>
                    <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
                      <Typography variant="body1">
                        {blogData.author || 'لم يتم إدخال اسم المؤلف'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      التصنيف
                    </Typography>
                    <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
                      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                        <Chip 
                          label={blogData.category.ar} 
                          size="small" 
                          color="primary" 
                        />
                        <Chip 
                          label={blogData.category.en} 
                          size="small" 
                          variant="outlined" 
                        />
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>

                {/* Short Description */}
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    الوصف المختصر
                  </Typography>
                  <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
                    <Typography variant="body2" paragraph sx={{ whiteSpace: 'pre-wrap' }}>
                      <strong>🇸🇦 العربية:</strong><br />
                      {blogData.short_description.ar || 'لم يتم إدخال وصف مختصر'}
                    </Typography>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                      <strong>🇬🇧 English:</strong><br />
                      {blogData.short_description.en || 'No short description entered'}
                    </Typography>
                  </Box>
                </Box>

                {/* Tags */}
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    الوسوم
                  </Typography>
                  <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                      {blogData.tags.ar.length === 0 && blogData.tags.en.length === 0 ? (
                        <Typography variant="caption" color="text.secondary">
                          لا توجد وسوم مضافة
                        </Typography>
                      ) : (
                        <>
                          {blogData.tags.ar.map((tag, index) => (
                            <Chip 
                              key={`ar-${index}`} 
                              label={`🇸🇦 ${tag}`} 
                              size="small" 
                              color="primary" 
                            />
                          ))}
                          {blogData.tags.en.map((tag, index) => (
                            <Chip 
                              key={`en-${index}`} 
                              label={`🇬🇧 ${tag}`} 
                              size="small" 
                              variant="outlined" 
                            />
                          ))}
                        </>
                      )}
                    </Stack>
                  </Box>
                </Box>

                {/* Image Preview */}
                {imagePreview && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      صورة المقال
                    </Typography>
                    <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ 
                          maxWidth: '100%',
                          maxHeight: '250px',
                          borderRadius: '8px',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                  </Box>
                )}

                {/* Content Preview */}
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    محتوى المقال
                  </Typography>
                  <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1, maxHeight: '200px', overflowY: 'auto' }}>
                    <Typography variant="body2" paragraph sx={{ whiteSpace: 'pre-wrap' }}>
                      <strong>🇸🇦 العربية:</strong><br />
                      {blogData.content.ar.substring(0, 500) || 'لم يتم إدخال محتوى'}
                      {blogData.content.ar.length > 500 && '...'}
                    </Typography>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                      <strong>🇬🇧 English:</strong><br />
                      {blogData.content.en.substring(0, 500) || 'No content entered'}
                      {blogData.content.en.length > 500 && '...'}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Paper>
          </Stack>
        );

      default:
        return 'خطأ: خطوة غير معروفة';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
        {/* Header */}
      <Stack 
  direction="row" 
  justifyContent="space-between" 
  alignItems="center" 
  sx={{ 
    mb: 4,
    flexWrap: 'wrap',
    gap: 2 
  }}
>
  {/* الجزء الأيسر: العودة والعنوان */}
  <Stack direction="row" alignItems="center" spacing={2}>
    <IconButton 
      onClick={() => navigate(-1)} 
      sx={{ 
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        '&:hover': { 
          bgcolor: 'action.hover',
          transform: 'translateX(-2px)',
          transition: 'transform 0.2s'
        }
      }}
    >
      <ArrowBack />
    </IconButton>
    <Typography variant="h4" component="h1" fontWeight="bold">
      إضافة مقال جديد
    </Typography>
  </Stack>

  {/* الجزء الأيمن: زر كل المقالات */}
  <Button
    onClick={() => navigate('/AdminAllBlogs')}
    variant="contained"
    startIcon={<ArticleIcon />}
    sx={{
      bgcolor: '#102dff',
      background: 'linear-gradient(45deg, #102dff, #6c8eff)',
      color: 'white',
      fontWeight: 'bold',
      fontSize: { xs: '0.9rem', md: '1rem' },
      py: 1.2,
      px: 3.5,
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(16, 45, 255, 0.25)',
      textTransform: 'none',
      transition: 'all 0.3s ease',
      minWidth: '150px',
      '&:hover': {
        bgcolor: '#0a25d6',
        background: 'linear-gradient(45deg, #0a25d6, #5a7bff)',
        boxShadow: '0 6px 18px rgba(16, 45, 255, 0.4)',
        transform: 'translateY(-2px)'
      },
      '&:active': {
        transform: 'translateY(0)',
        boxShadow: '0 2px 8px rgba(16, 45, 255, 0.25)'
      }
    }}
  >
    كل المقالات
  </Button>
</Stack>

        {/* Stepper */}
        <Stepper 
          activeStep={activeStep} 
          sx={{ 
            mb: 4,
            '& .MuiStepLabel-label': {
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Error/Success Messages */}
        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 3 }}
            onClose={() => setError('')}
          >
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert 
            severity="success" 
            sx={{ mb: 3 }}
            onClose={() => setSuccess('')}
          >
            {success}
          </Alert>
        )}

        {/* Step Content */}
        <Box sx={{ 
          mb: 4, 
          minHeight: '400px',
          p: { xs: 2, md: 3 },
          bgcolor: 'background.paper',
          borderRadius: 2
        }}>
          {getStepContent(activeStep)}
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between', 
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 2,
          pt: 3,
          borderTop: '1px solid',
          borderColor: 'divider'
        }}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0 || loading}
            startIcon={<ArrowBack />}
            variant="outlined"
            fullWidth={isMobile}
            sx={{ minWidth: { xs: '100%', sm: '120px' } }}
          >
            السابق
          </Button>

          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            {activeStep === steps.length - 1 ? (
              <>
               
                <Button
                  variant="contained"
                  onClick={() => handleSubmit(true)}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <Publish />}
                  fullWidth={isMobile}
                  sx={{ minWidth: { xs: '100%', sm: '150px' } }}
                >
                  {loading ? 'جاري الحفظ...' : 'نشر المقال'}
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={
                  (activeStep === 0 && (!blogData.title.ar || !blogData.title.en || !blogData.author)) ||
                  (activeStep === 1 && (!blogData.content.ar || !blogData.content.en))
                }
                fullWidth={isMobile}
                sx={{ minWidth: { xs: '100%', sm: '120px' } }}
              >
                التالي
              </Button>
            )}
          </Stack>


           {success && (
          <Alert 
            severity="success" 
            sx={{ mb: 3 }}
            onClose={() => setSuccess('')}
          >
            {success}
          </Alert>
        )}
        </Box>
      </Paper>
    </Container>
  );
};

export default AddBlogsPage;