import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Get_All_Client_Action } from '../Redux/Actions/ClientAction';
// أضف import لمكتبة xlsx
import * as XLSX from 'xlsx';

// Material UI Components
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Tooltip,
  Stack,
  alpha,
  AppBar,
  Toolbar,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';

// Material UI Icons
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Person as PersonIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
  Phone as PhoneIcon,
  WhatsApp as WhatsAppIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  CalendarToday as DateIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Menu as MenuIcon,
  AccountCircle as AccountIcon,
  Message as MessageIcon
} from '@mui/icons-material';

export const Dashboard = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClients, setFilteredClients] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [mobileOpen, setMobileOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [messageDialogOpen, setMessageDialogOpen] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    
    const res = useSelector(state => state.AllClients.client);
    const clients = res?.data?.clients || [];
    const pagination = res?.pagination || { currentPage: 1, limit: 5, totalItems: 0, totalPages: 1 };

    const getallclients = async () => {
        setLoading(true);
        await dispatch(Get_All_Client_Action(`limit=${limit}&page=${page}`));
        setLoading(false);
    };

    useEffect(() => {
        getallclients();
    }, [dispatch, page, limit]);

    useEffect(() => {
        let result = clients;
        
        if (searchTerm) {
            result = result.filter(client => 
                client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.phone?.includes(searchTerm) ||
                client.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (activeFilter === 'active') {
            result = result.filter(client => client.isActive === true);
        } else if (activeFilter === 'inactive') {
            result = result.filter(client => client.isActive === false);
        }
        
        setFilteredClients(result);
    }, [clients, searchTerm, activeFilter]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatDateForExcel = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
        setPage(1);
    };

    const handleMessageClick = (message) => {
        setSelectedMessage(message);
        setMessageDialogOpen(true);
    };

    const handleMessageDialogClose = () => {
        setMessageDialogOpen(false);
        setSelectedMessage('');
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // دالة تصدير البيانات إلى Excel
    const exportToExcel = () => {
        try {
            // تحضير البيانات للتصدير
            const exportData = filteredClients.map(client => ({
                'ID': client._id || '',
                'Name': client.name || 'No Name',
                'Email': client.email || 'No Email',
                'Phone': client.phone || 'No Phone',
                'WhatsApp': client.whatsappNumber || 'No WhatsApp',
                'Country': client.countryName || 'No Country',
                'Job Title': client.jobTitle || 'No Job Title',
                'Status': client.isActive ? 'Active' : 'Inactive',
                'Registered Date': formatDateForExcel(client.createdAt),
                'Message': client.message || '',
                'Has Message': client.message ? 'Yes' : 'No'
            }));

            if (exportData.length === 0) {
                setSnackbarMessage('No data to export');
                setSnackbarSeverity('warning');
                setSnackbarOpen(true);
                return;
            }

            // إنشاء ورقة عمل
            const ws = XLSX.utils.json_to_sheet(exportData);
            
            // ضبط عرض الأعمدة
            const wscols = [
                { wch: 20 }, // ID
                { wch: 25 }, // Name
                { wch: 30 }, // Email
                { wch: 20 }, // Phone
                { wch: 20 }, // WhatsApp
                { wch: 15 }, // Country
                { wch: 20 }, // Job Title
                { wch: 10 }, // Status
                { wch: 15 }, // Registered Date
                { wch: 50 }, // Message
                { wch: 12 }  // Has Message
            ];
            ws['!cols'] = wscols;

            // إنشاء مصنف وإضافة الورقة
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Clients');

            // إنشاء اسم الملف مع التاريخ
            const date = new Date();
            const dateStr = date.toISOString().split('T')[0];
            const timeStr = date.getHours().toString().padStart(2, '0') + 
                          date.getMinutes().toString().padStart(2, '0');
            const fileName = `clients_export_${dateStr}_${timeStr}.xlsx`;

            // حفظ الملف
            XLSX.writeFile(wb, fileName);

            setSnackbarMessage(`Exported ${exportData.length} clients to Excel successfully!`);
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

        } catch (error) {
            console.error('Error exporting to Excel:', error);
            setSnackbarMessage('Failed to export data. Please try again.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    // دالة لتصدير جميع البيانات (بدون تصفية)
    const exportAllToExcel = async () => {
        try {
            setSnackbarMessage('Fetching all data for export...');
            setSnackbarSeverity('info');
            setSnackbarOpen(true);

            // جلب جميع البيانات بدون حدود
            const allClientsResponse = await dispatch(Get_All_Client_Action('limit=1000&page=1'));
            const allClients = allClientsResponse?.data?.clients || [];

            if (allClients.length === 0) {
                setSnackbarMessage('No data to export');
                setSnackbarSeverity('warning');
                setSnackbarOpen(true);
                return;
            }

            // تحضير البيانات للتصدير
            const exportData = allClients.map(client => ({
                'ID': client._id || '',
                'Name': client.name || 'No Name',
                'Email': client.email || 'No Email',
                'Phone': client.phone || 'No Phone',
                'WhatsApp': client.whatsappNumber || 'No WhatsApp',
                'Country': client.countryName || 'No Country',
                'Job Title': client.jobTitle || 'No Job Title',
                'Status': client.isActive ? 'Active' : 'Inactive',
                'Registered Date': formatDateForExcel(client.createdAt),
                'Message': client.message || '',
                'Has Message': client.message ? 'Yes' : 'No'
            }));

            // إنشاء ورقة عمل
            const ws = XLSX.utils.json_to_sheet(exportData);
            
            // ضبط عرض الأعمدة
            const wscols = [
                { wch: 20 }, { wch: 25 }, { wch: 30 }, { wch: 20 }, 
                { wch: 20 }, { wch: 15 }, { wch: 20 }, { wch: 10 }, 
                { wch: 15 }, { wch: 50 }, { wch: 12 }
            ];
            ws['!cols'] = wscols;

            // إنشاء مصنف وإضافة الورقة
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'All Clients');

            // إنشاء اسم الملف
            const date = new Date();
            const dateStr = date.toISOString().split('T')[0];
            const fileName = `all_clients_${dateStr}.xlsx`;

            // حفظ الملف
            XLSX.writeFile(wb, fileName);

            setSnackbarMessage(`Exported ${exportData.length} clients to Excel successfully!`);
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            // إعادة تحميل البيانات الأصلية
            await getallclients();

        } catch (error) {
            console.error('Error exporting all to Excel:', error);
            setSnackbarMessage('Failed to export all data. Please try again.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const drawerWidth = 260;

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, active: true },
        { text: 'Settings', icon: <SettingsIcon /> },
    ];

    const drawer = (
        <Box sx={{ 
            height: '100%', 
            bgcolor: '#1a237e',
            background: 'linear-gradient(180deg, #1a237e 0%, #283593 100%)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box sx={{ p: 3, pb: 2 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ bgcolor: 'white', color: '#1a237e', width: 32, height: 32 }}>
                        FV
                    </Avatar>
                    FLYVIA
                </Typography>
            </Box>
            
            <Divider sx={{ borderColor: alpha('#fff', 0.1), mx: 2 }} />
            
            <List sx={{ flex: 1, px: 2, pt: 2 }}>
                {menuItems.map((item) => (
                    <ListItem 
                        button 
                        key={item.text}
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                            bgcolor: item.active ? alpha('#fff', 0.15) : 'transparent',
                            '&:hover': {
                                bgcolor: alpha('#fff', 0.1),
                            },
                        }}
                    >
                        <ListItemIcon sx={{ 
                            color: item.active ? 'white' : alpha('#fff', 0.8),
                            minWidth: 40 
                        }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText 
                            primary={item.text} 
                            primaryTypographyProps={{
                                fontWeight: item.active ? 'bold' : 'normal'
                            }}
                        />
                    </ListItem>
                ))}
            </List>
            
            <Box sx={{ p: 2, borderTop: `1px solid ${alpha('#fff', 0.1)}` }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'white', color: '#1a237e' }}>
                        <AccountIcon />
                    </Avatar>
                    <Box sx={{ overflow: 'hidden' }}>
                        <Typography variant="body2" fontWeight="medium" noWrap>
                            Admin User
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.7 }} noWrap>
                            admin@flyvia.com
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );

    if (loading) {
        return (
            <Box 
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                minHeight="100vh"
                flexDirection="column"
                gap={2}
            >
                <CircularProgress size={60} />
                <Typography variant="h6" color="text.secondary">
                    Loading dashboard...
                </Typography>
            </Box>
        );
    }

    // Mobile Card View Component
    const MobileClientCard = ({ client }) => (
        <Card sx={{ 
            mb: 2, 
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            border: '1px solid #e2e8f0',
            mx: 0
        }}>
            <CardContent sx={{ p: 2 }}>
                <Box display="flex" alignItems="flex-start" gap={2} sx={{ mb: 2 }}>
                    <Avatar sx={{ 
                        bgcolor: client.isActive ? 'primary.main' : 'grey.400',
                        width: 44,
                        height: 44
                    }}>
                        {client.name?.charAt(0).toUpperCase() || '?'}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                        <Typography fontWeight="bold" sx={{ mb: 0.5, fontSize: '1rem' }}>
                            {client.name || 'No Name'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 0.5,
                            fontSize: '0.8rem'
                        }}>
                            <EmailIcon fontSize="small" />
                            {client.email || 'No Email'}
                        </Typography>
                    </Box>
                    <Chip
                        icon={client.isActive ? <ActiveIcon /> : <InactiveIcon />}
                        label={client.isActive ? 'Active' : 'Inactive'}
                        color={client.isActive ? 'success' : 'default'}
                        size="small"
                        sx={{ 
                            borderRadius: 1,
                            fontSize: '0.7rem',
                            height: 24
                        }}
                    />
                </Box>

                <Stack spacing={1.5}>
                 <Box 
  display="flex" 
  alignItems="center" 
  gap={1}
  sx={{ 
    cursor: client.phone && client.phone !== 'No Phone' ? 'pointer' : 'default',
    '&:hover': {
      backgroundColor: client.phone && client.phone !== 'No Phone'
        ? 'rgba(33, 150, 243, 0.08)'
        : 'transparent',
      borderRadius: 1,
      padding: '2px 4px',
      transition: 'background-color 0.2s'
    }
  }}
  onClick={() => {
    if (client.phone && client.phone !== 'No Phone') {
      // تنظيف الرقم من الأحرف غير الرقمية
      const cleanNumber = client.phone.replace(/[^\d+]/g, '');
      // فتح تطبيق الاتصال
      window.location.href = `tel:${cleanNumber}`;
    }
  }}
>
  <PhoneIcon 
    fontSize="small" 
    color={
      client.phone && client.phone !== 'No Phone'
        ? 'primary'
        : 'disabled'
    } 
  />
  <Typography 
    variant="body2" 
    sx={{ 
      fontSize: '0.85rem',
      textDecoration: client.phone && client.phone !== 'No Phone' 
        ? 'underline' 
        : 'none',
      color: client.phone && client.phone !== 'No Phone'
        ? 'primary.main'
        : 'text.secondary',
      fontWeight: client.phone && client.phone !== 'No Phone'
        ? 500
        : 400,
      '&:hover': {
        color: client.phone && client.phone !== 'No Phone'
          ? 'primary.dark'
          : 'text.secondary'
      }
    }}
  >
    {client.phone || 'No Phone'}
  </Typography>
</Box>
                   <Box 
  display="flex" 
  alignItems="center" 
  gap={1}
  sx={{ 
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(76, 175, 80, 0.08)',
      borderRadius: 1,
      padding: '2px 4px'
    }
  }}
  onClick={() => {
    if (client.whatsappNumber && client.whatsappNumber !== 'No WhatsApp') {
      const phoneNumber = client.whatsappNumber.replace('+', '');
      const whatsappUrl = `https://wa.me/${phoneNumber}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  }}
>
  <WhatsAppIcon fontSize="small" color="success" />
  <Typography 
    variant="body2" 
    sx={{ 
      fontSize: '0.85rem',
      textDecoration: (client.whatsappNumber && client.whatsappNumber !== 'No WhatsApp') 
        ? 'underline' 
        : 'none',
      color: (client.whatsappNumber && client.whatsappNumber !== 'No WhatsApp')
        ? 'success.main'
        : 'text.secondary'
    }}
  >
    {client.whatsappNumber || 'No WhatsApp'}
  </Typography>
</Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <LocationIcon fontSize="small" color="action" />
                        <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                            {client.countryName || 'No Country'}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <WorkIcon fontSize="small" color="action" />
                        <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                            {client.jobTitle || 'No Job Title'}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <DateIcon fontSize="small" color="action" />
                        <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                            {formatDate(client.createdAt)}
                        </Typography>
                    </Box>
                    {client.message && (
                        <Button
                            size="small"
                            startIcon={<MessageIcon />}
                            onClick={() => handleMessageClick(client.message)}
                            sx={{ 
                                justifyContent: 'flex-start',
                                fontSize: '0.8rem',
                                px: 0,
                                textTransform: 'none'
                            }}
                        >
                            View Message
                        </Button>
                    )}
                </Stack>

                <Divider sx={{ my: 2 }} />
                
                <Stack direction="row" spacing={1} justifyContent="center">
                  
                    <Tooltip title="Edit">
                        <IconButton size="small" color="info" sx={{ p: 0.5 }}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                  
                    <Tooltip title="Delete">
                        <IconButton size="small" color="error" sx={{ p: 0.5 }}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </CardContent>
        </Card>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
            {/* Snackbar for notifications */}
            <Snackbar 
                open={snackbarOpen} 
                autoHideDuration={4000} 
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert 
                    onClose={handleSnackbarClose} 
                    severity={snackbarSeverity} 
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            {/* Message Dialog */}
            <Dialog 
                open={messageDialogOpen} 
                onClose={handleMessageDialogClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    <Box display="flex" alignItems="center" gap={1}>
                        <MessageIcon color="primary" />
                        Client Message
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Paper sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                        <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                            {selectedMessage || 'No message content available'}
                        </Typography>
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleMessageDialogClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Mobile App Bar */}
            {!isDesktop && (
                <AppBar 
                    position="fixed" 
                    sx={{ 
                        bgcolor: '#1a237e',
                        zIndex: theme.zIndex.drawer + 1
                    }}
                >
                    <Toolbar sx={{ minHeight: 56 }}>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 1 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap sx={{ flexGrow: 1, fontSize: '1.1rem' }}>
                            Client Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
            )}
            
            {/* Spacer for AppBar */}
            {!isDesktop && <Box sx={{ height: 56 }} />}

            {/* Sidebar Drawer */}
            <Drawer
                variant={!isDesktop ? "temporary" : "permanent"}
                open={!isDesktop ? mobileOpen : true}
                onClose={handleDrawerToggle}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        border: 'none',
                        boxShadow: isDesktop ? '2px 0 8px rgba(0,0,0,0.1)' : 'none',
                        height: '100%',
                        position: 'relative'
                    },
                }}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                {drawer}
            </Drawer>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: isMobile ? 1 : { sm: 2, md: 3 },
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    maxWidth: '100%',
                    overflowX: 'hidden',
                    boxSizing: 'border-box'
                }}
            >
                {/* Header Section */}
                <Box sx={{ mb: isMobile ? 2 : 3 }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ 
                        fontSize: isMobile ? '1.25rem' : { sm: '1.5rem', md: '2rem' },
                        mt: !isDesktop ? 0 : undefined
                    }}>
                        Client Dashboard
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ 
                        fontSize: isMobile ? '0.75rem' : { sm: '0.875rem', md: '1rem' } 
                    }}>
                        Manage and monitor your clients efficiently
                    </Typography>
                </Box>

                {/* Stats Cards */}
                <Grid container spacing={isMobile ? 1 : 2} sx={{ mb: isMobile ? 2 : 3 }}>
                    <Grid item xs={6}>
                        <Card sx={{ 
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            border: '1px solid #e2e8f0',
                            height: '100%',
                            minHeight: isMobile ? 100 : 120
                        }}>
                            <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
                                <Box display="flex" alignItems="center" gap={isMobile ? 1 : 2}>
                                    <Avatar sx={{ 
                                        bgcolor: 'primary.light', 
                                        color: 'primary.main',
                                        width: isMobile ? 36 : 40,
                                        height: isMobile ? 36 : 40
                                    }}>
                                        <PeopleIcon fontSize={isMobile ? "small" : "medium"} />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ 
                                            mb: 0.5,
                                            fontSize: isMobile ? '0.7rem' : '0.875rem'
                                        }}>
                                            Total Clients
                                        </Typography>
                                        <Typography variant="h5" fontWeight="bold" sx={{ 
                                            fontSize: isMobile ? '1.25rem' : '1.5rem'
                                        }}>
                                            {pagination.totalItems || 0}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card sx={{ 
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            border: '1px solid #e2e8f0',
                            height: '100%',
                            minHeight: isMobile ? 100 : 120
                        }}>
                            <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
                                <Box display="flex" alignItems="center" gap={isMobile ? 1 : 2}>
                                    <Avatar sx={{ 
                                        bgcolor: 'success.light', 
                                        color: 'success.main',
                                        width: isMobile ? 36 : 40,
                                        height: isMobile ? 36 : 40
                                    }}>
                                        <ActiveIcon fontSize={isMobile ? "small" : "medium"} />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ 
                                            mb: 0.5,
                                            fontSize: isMobile ? '0.7rem' : '0.875rem'
                                        }}>
                                            Active Clients
                                        </Typography>
                                        <Typography variant="h5" fontWeight="bold" sx={{ 
                                            fontSize: isMobile ? '1.25rem' : '1.5rem'
                                        }}>
                                            {clients.filter(c => c.isActive).length}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card sx={{ 
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            border: '1px solid #e2e8f0',
                            height: '100%',
                            minHeight: isMobile ? 100 : 120
                        }}>
                            <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
                                <Box display="flex" alignItems="center" gap={isMobile ? 1 : 2}>
                                    <Avatar sx={{ 
                                        bgcolor: 'info.light', 
                                        color: 'info.main',
                                        width: isMobile ? 36 : 40,
                                        height: isMobile ? 36 : 40
                                    }}>
                                        <WhatsAppIcon fontSize={isMobile ? "small" : "medium"} />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ 
                                            mb: 0.5,
                                            fontSize: isMobile ? '0.7rem' : '0.875rem'
                                        }}>
                                            WhatsApp users
                                        </Typography>
                                        <Typography variant="h5" fontWeight="bold" sx={{ 
                                            fontSize: isMobile ? '1.25rem' : '1.5rem'
                                        }}>
                                            {clients.filter(c => c.whatsappNumber && c.whatsappNumber !== 'No Phone').length}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card sx={{ 
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            border: '1px solid #e2e8f0',
                            height: '100%',
                            minHeight: isMobile ? 100 : 120
                        }}>
                            <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
                                <Box display="flex" alignItems="center" gap={isMobile ? 1 : 2}>
                                    <Avatar sx={{ 
                                        bgcolor: 'warning.light', 
                                        color: 'warning.main',
                                        width: isMobile ? 36 : 40,
                                        height: isMobile ? 36 : 40
                                    }}>
                                        <InactiveIcon fontSize={isMobile ? "small" : "medium"} />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ 
                                            mb: 0.5,
                                            fontSize: isMobile ? '0.7rem' : '0.875rem'
                                        }}>
                                            Inactive Clients
                                        </Typography>
                                        <Typography variant="h5" fontWeight="bold" sx={{ 
                                            fontSize: isMobile ? '1.25rem' : '1.5rem'
                                        }}>
                                            {clients.filter(c => !c.isActive).length}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Filters and Search */}
                <Paper sx={{ 
                    p: isMobile ? 1.5 : 2, 
                    mb: 2, 
                    borderRadius: 2,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                }}>
                    <Grid container spacing={1.5} alignItems="center">
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                placeholder="Search clients..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 1.5,
                                        bgcolor: 'white',
                                        fontSize: isMobile ? '0.9rem' : '1rem'
                                    }
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon fontSize={isMobile ? "small" : "medium"} color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Stack 
                                direction="row" 
                                spacing={0.5}
                                flexWrap="wrap"
                                gap={0.5}
                                justifyContent="flex-start"
                            >
                                <Button
                                    variant={activeFilter === 'all' ? "contained" : "outlined"}
                                    onClick={() => setActiveFilter('all')}
                                    size="small"
                                    sx={{ 
                                        borderRadius: 1.5,
                                        fontSize: isMobile ? '0.7rem' : '0.8rem',
                                        px: isMobile ? 1 : 1.5,
                                        minWidth: 'auto'
                                    }}
                                >
                                    All
                                </Button>
                                <Button
                                    variant={activeFilter === 'active' ? "contained" : "outlined"}
                                    onClick={() => setActiveFilter('active')}
                                    color="success"
                                    size="small"
                                    sx={{ 
                                        borderRadius: 1.5,
                                        fontSize: isMobile ? '0.7rem' : '0.8rem',
                                        px: isMobile ? 1 : 1.5,
                                        minWidth: 'auto'
                                    }}
                                >
                                    Active
                                </Button>
                                <Button
                                    variant={activeFilter === 'inactive' ? "contained" : "outlined"}
                                    onClick={() => setActiveFilter('inactive')}
                                    color="warning"
                                    size="small"
                                    sx={{ 
                                        borderRadius: 1.5,
                                        fontSize: isMobile ? '0.7rem' : '0.8rem',
                                        px: isMobile ? 1 : 1.5,
                                        minWidth: 'auto'
                                    }}
                                >
                                    Inactive
                                </Button>
                                <Tooltip title="Export filtered data to Excel">
                                    <Button
                                        variant="outlined"
                                        startIcon={<DownloadIcon fontSize={isMobile ? "small" : "medium"} />}
                                        onClick={exportToExcel}
                                        size="small"
                                        sx={{ 
                                            borderRadius: 1.5,
                                            fontSize: isMobile ? '0.7rem' : '0.8rem',
                                            px: isMobile ? 1 : 1.5,
                                            minWidth: 'auto'
                                        }}
                                    >
                                        Export
                                    </Button>
                                </Tooltip>
                                
                                <IconButton 
                                    onClick={getallclients} 
                                    size="small"
                                    sx={{ 
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 1.5,
                                        p: 0.5
                                    }}
                                >
                                    <RefreshIcon fontSize={isMobile ? "small" : "medium"} />
                                </IconButton>
                            </Stack>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Clients List */}
                <Paper sx={{ 
                    borderRadius: 2, 
                    overflow: 'hidden',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                }}>
                    <Box sx={{ 
                        p: isMobile ? 1.5 : 2, 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 1
                    }}>
                        <Typography variant="h6" sx={{ 
                            fontSize: isMobile ? '1rem' : '1.25rem',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            Clients List
                            <Chip 
                                label={filteredClients.length} 
                                size="small" 
                                color="primary" 
                                sx={{ 
                                    ml: 1,
                                    fontSize: isMobile ? '0.65rem' : '0.75rem',
                                    height: 22
                                }}
                            />
                        </Typography>
                    </Box>
                    
                    <Divider />
                    
                    {/* Mobile View - Cards */}
                    {isMobile ? (
                        <Box sx={{ p: 1 }}>
                            {filteredClients.length === 0 ? (
                                <Box sx={{ textAlign: 'center', py: 4 }}>
                                    <SearchIcon sx={{ fontSize: 36, color: 'grey.300', mb: 1.5 }} />
                                    <Typography color="text.secondary" gutterBottom sx={{ fontSize: '0.9rem' }}>
                                        No clients found
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                        Try a different search or filter
                                    </Typography>
                                </Box>
                            ) : (
                                filteredClients.map((client) => (
                                    <MobileClientCard key={client._id} client={client} />
                                ))
                            )}
                        </Box>
                    ) : (
                        /* Desktop View - Table */
                        <TableContainer sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                                        <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Client Info</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Contact Details</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Status</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Registered</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold', py: 2 }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredClients.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                                                <Box sx={{ textAlign: 'center' }}>
                                                    <SearchIcon sx={{ fontSize: 48, color: 'grey.300', mb: 2 }} />
                                                    <Typography color="text.secondary" gutterBottom>
                                                        No clients found
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Try a different search or filter
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredClients.map((client) => (
                                            <TableRow 
                                                key={client._id} 
                                                hover
                                                sx={{ 
                                                    '&:last-child td, &:last-child th': { border: 0 },
                                                    '&:hover': { bgcolor: 'action.hover' }
                                                }}
                                            >
                                                <TableCell sx={{ py: 2 }}>
                                                    <Box display="flex" alignItems="flex-start" gap={2}>
                                                        <Avatar sx={{ 
                                                            bgcolor: client.isActive ? 'primary.main' : 'grey.400',
                                                            width: 40,
                                                            height: 40
                                                        }}>
                                                            {client.name?.charAt(0).toUpperCase() || '?'}
                                                        </Avatar>
                                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                                            <Typography fontWeight="medium" sx={{ mb: 0.5 }}>
                                                                {client.name || 'No Name'}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary" sx={{ 
                                                                display: 'flex', 
                                                                alignItems: 'center', 
                                                                gap: 0.5,
                                                                mb: 0.5
                                                            }}>
                                                                <EmailIcon fontSize="small" />
                                                                {client.email || 'No Email'}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary" sx={{ 
                                                                display: 'flex', 
                                                                alignItems: 'center', 
                                                                gap: 0.5 
                                                            }}>
                                                                <WorkIcon fontSize="small" />
                                                                {client.jobTitle || 'No Job Title'}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                
                                                <TableCell sx={{ py: 2 }}>
                                                    <Stack spacing={1}>
                                                 <Box display="flex" alignItems="center" gap={1}>
    <PhoneIcon fontSize="small" color="action" />
    <Typography 
        variant="body2"
        sx={{
            cursor: client.phone && client.phone !== 'No Phone' ? 'pointer' : 'default',
            color: client.phone && client.phone !== 'No Phone' ? 'primary.main' : 'text.secondary',
            '&:hover': client.phone && client.phone !== 'No Phone' ? {
                textDecoration: 'underline',
                color: 'primary.dark'
            } : {},
            transition: 'color 0.2s ease'
        }}
        onClick={() => {
            if (client.phone && client.phone !== 'No Phone') {
                const cleanNumber = client.phone.replace(/[^\d+]/g, '');
                window.location.href = `tel:${cleanNumber}`;
            }
        }}
    >
        {client.phone || 'No Phone'}
    </Typography>
</Box>
<Box display="flex" alignItems="center" gap={1}>
    <WhatsAppIcon fontSize="small" color="success" />
    <Typography 
        variant="body2"
        sx={{
            cursor: client.whatsappNumber && client.whatsappNumber !== 'No WhatsApp' ? 'pointer' : 'default',
            color: client.whatsappNumber && client.whatsappNumber !== 'No WhatsApp' ? 'success.main' : 'text.secondary',
            '&:hover': client.whatsappNumber && client.whatsappNumber !== 'No WhatsApp' ? {
                textDecoration: 'underline',
                color: 'success.dark'
            } : {},
            transition: 'color 0.2s ease'
        }}
        onClick={() => {
            if (client.whatsappNumber && client.whatsappNumber !== 'No WhatsApp') {
                const cleanNumber = client.whatsappNumber.replace(/[^\d+]/g, '');
                const whatsappUrl = `https://wa.me/${cleanNumber.replace('+', '')}`;
                window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            }
        }}
    >
        {client.whatsappNumber || 'No WhatsApp'}
    </Typography>
</Box>
                                                        <Box display="flex" alignItems="center" gap={1}>
                                                            <LocationIcon fontSize="small" color="action" />
                                                            <Typography variant="body2">
                                                                {client.countryName || 'No Country'}
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                </TableCell>
                                                
                                                <TableCell sx={{ py: 2 }}>
                                                    <Chip
                                                        icon={client.isActive ? <ActiveIcon /> : <InactiveIcon />}
                                                        label={client.isActive ? 'Active' : 'Inactive'}
                                                        color={client.isActive ? 'success' : 'default'}
                                                        size="small"
                                                        sx={{ borderRadius: 1 }}
                                                    />
                                                </TableCell>
                                                
                                                <TableCell sx={{ py: 2 }}>
                                                    <Box>
                                                        <Typography variant="body2" sx={{ 
                                                            display: 'flex', 
                                                            alignItems: 'center', 
                                                            gap: 0.5,
                                                            mb: 0.5
                                                        }}>
                                                            <DateIcon fontSize="small" />
                                                            {formatDate(client.createdAt)}
                                                        </Typography>
                                                        {client.message && (
                                                            <Chip
                                                                icon={<MessageIcon />}
                                                                label="Has Message"
                                                                size="small"
                                                                variant="outlined"
                                                                onClick={() => handleMessageClick(client.message)}
                                                                clickable
                                                                sx={{ 
                                                                    fontSize: '0.7rem', 
                                                                    height: 24,
                                                                    cursor: 'pointer'
                                                                }}
                                                            />
                                                        )}
                                                    </Box>
                                                </TableCell>
                                                
                                                <TableCell align="right" sx={{ py: 2 }}>
                                                    <Stack 
                                                        direction="row" 
                                                        spacing={0.5} 
                                                        justifyContent="flex-end"
                                                    >
                                                      
                                                        <Tooltip title="Edit">
                                                            <IconButton size="small" color="info">
                                                                <EditIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        
                                                        <Tooltip title="Delete">
                                                            <IconButton size="small" color="error">
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Paper>

                {/* Pagination Controls */}
                <Paper sx={{ 
                    p: isMobile ? 1.5 : 2, 
                    mt: 2, 
                    borderRadius: 2,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                }}>
                    <Grid container alignItems="center" justifyContent="space-between" spacing={isMobile ? 1 : 2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl size="small" fullWidth>
                                <InputLabel sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>Items per page</InputLabel>
                                <Select
                                    value={limit}
                                    label="Items per page"
                                    onChange={handleLimitChange}
                                    sx={{ 
                                        borderRadius: 1.5,
                                        fontSize: isMobile ? '0.8rem' : '0.875rem'
                                    }}
                                >
                                    <MenuItem value={5} sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>5</MenuItem>
                                    <MenuItem value={10} sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>10</MenuItem>
                                    <MenuItem value={20} sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>20</MenuItem>
                                    <MenuItem value={50} sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>50</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Pagination
                                    count={pagination.totalPages}
                                    page={page}
                                    onChange={handlePageChange}
                                    color="primary"
                                    showFirstButton
                                    showLastButton
                                    size={isMobile ? "small" : "medium"}
                                />
                            </Box>
                        </Grid>
                        
                        <Grid item xs={12} md={4}>
                            <Typography variant="body2" color="text.secondary" align="right" sx={{ 
                                fontSize: isMobile ? '0.75rem' : '0.875rem'
                            }}>
                                Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, pagination.totalItems)} of {pagination.totalItems} clients
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Footer Summary */}
                <Box sx={{ 
                    mt: 2, 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 1,
                    textAlign: { xs: 'center', sm: 'left' }
                }}>
                    <Typography variant="body2" color="text.secondary" sx={{ 
                        fontSize: isMobile ? '0.75rem' : '0.875rem'
                    }}>
                        Showing <strong>{filteredClients.length}</strong> of <strong>{pagination.totalItems}</strong> clients
                        {searchTerm && ` matching "${searchTerm}"`}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ 
                        fontSize: isMobile ? '0.65rem' : '0.75rem'
                    }}>
                        Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};