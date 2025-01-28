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
} from '@mui/material';
import {
  Home as HomeIcon,
  Info as InfoIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleDrawer, shrinkDrawer, isSmallScreen}) => {

   // Adjust the drawer state on screen size change
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
    { text: 'ایجاد یادداشت', icon: <HomeIcon />, path: '/?tab=create' },
    { text: 'یادداشت ها', icon: <InfoIcon />, path: '/?tab=notes' },
    { text: 'پروفایل', icon: <SettingsIcon />, path: '/?tab=profile' },
    { text: 'خروج', icon: <LogoutIcon /> },
  ];


  return (
    <Box sx={{
      width: { xs: '100%', md: '15rem' },
      display: 'flex',
      justifyContent: 'flex-start',
      direction:'rtl',
      background: 'red',
      position:'relative'
    }}>
      <Drawer
        variant="permanent"
        anchor="right"
        open={isOpen}
        sx={{ 
          width: isOpen ? 240 : 60,
          '& .MuiDrawer-paper': {
            width: isSmallScreen ? (isOpen ? 240 : 0) : isOpen ? 240 :60,
            overflowX: 'hidden',
            transition: 'width 0.3s ease-in-out',
            boxSizing: 'border-box',
            boxShadow: 5,
            borderTopLeftRadius:'15px',
            borderBottomLeftRadius:'10px',
            background: isOpen ? "rgb(194, 194, 194)" : "rgba(208, 240, 250, 0.23)",
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
          {isOpen && <Typography variant="h6" sx={{p:'10px'}}>داشبورد</Typography>}
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
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
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <Tooltip title={!isOpen ? item.text : ''} placement="right">
                <Link to={item.path}>
                  <ListItemButton >
                    <ListItemIcon sx={{marginY:2}}>{item.icon}</ListItemIcon>
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
