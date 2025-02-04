import React, { useEffect, useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Tooltip,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Home as HomeIcon,
  Info as InfoIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Link } from 'react-router-dom';
import useNoteStore from '../store';

const Sidebar = ({ isOpen, toggleDrawer, shrinkDrawer, isSmallScreen, mode }) => {
  const { toggleTheme } = useNoteStore()
  const { palette } = useTheme()

  // Adjust the drawer state on screen size change
  // =============================================
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        shrinkDrawer(false); // Shrink sidebar on smaller screens
      } else {
        shrinkDrawer(true); // Expand sidebar on larger screens
      }
    };

    handleResize(); // Adjust on mount
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { text: 'ایجاد یادداشت', icon: <BorderColorIcon />, path: '/?tab=create' },
    { text: 'یادداشت ها', icon: <FormatListBulletedIcon />, path: '/?tab=notes' },
    { text: 'پروفایل', icon: <AccountCircleIcon />, path: '/?tab=profile' },
    { text: 'خروج', icon: <LogoutIcon /> },
  ];
  const modeButton = [
    {
      text: { dark: 'حالت تاریک', light: 'حالت روشن' },
      icon: { dark: <DarkModeIcon />, light: <LightModeIcon /> }
    }
  ];



  return (
    <Box sx={{
      width: { xs: '100%', md: '15rem' },
      display: 'flex',
      justifyContent: 'flex-start',
      direction: 'rtl',
      position: 'relative'
    }}>
      <Drawer
        variant="permanent"
        // direction= 'rtl'
        anchor="right"
        open={isOpen}
        sx={{
          width: isOpen ? 240 : 60,
          '& .MuiDrawer-paper': {
            width: isSmallScreen ? (isOpen ? 240 : 0) : isOpen ? 240 : 60,
            overflowX: 'hidden',
            transition: 'width 0.3s ease-in-out',
            boxSizing: 'border-box',
            boxShadow: 5,
            borderTopLeftRadius: '15px',
            borderBottomLeftRadius: '10px',
            background: palette.primary.main,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: '3', 
          }}
        >
          {isOpen && <Typography variant="h6" sx={{ p: '10px' }}>داشبورد</Typography>}
          <IconButton onClick={toggleDrawer}>
            <MenuIcon sx={{display:'flex', mr: !isOpen && '10px'}}/>
          </IconButton>
        </Box>
        <Divider
          sx={{
            width: "100%",
            borderColor: "rgba(0, 0, 0, 0.09)",
            borderWidth: "1px",
          }}
        />
        <List>
          {modeButton.map((item, index) => (
            <ListItem key={index} disablePadding>
              <Tooltip title={!isOpen ? (mode === "light" ? item.text.light : item.text.dark) : ''} placement="right">
                <ListItemButton onClick={() => toggleTheme()}>
                  <ListItemIcon sx={{ marginY: 2 }}>
                    {mode === "light" ? item.icon.light : item.icon.dark}
                  </ListItemIcon>
                  {isOpen && <ListItemText primary={mode === "light" ? item.text.light : item.text.dark} />}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}


          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding >
              <Tooltip title={!isOpen ? item.text : ''} placement="right">
                <Link
                  to={item.path}
                  style={{ textDecoration: 'none', color: 'inherit', width: '100%'}} 
                >
                  <ListItemButton component="div">
                    <ListItemIcon sx={{ marginY: 2 }}>{item.icon}</ListItemIcon>
                    {isOpen && <ListItemText primary={item.text} />}
                  </ListItemButton>
                </Link>
              </Tooltip>
            </ListItem>

          ))}
        </List>
      </Drawer>

    </Box>


  );
};

export default Sidebar;
