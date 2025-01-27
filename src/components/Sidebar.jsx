import React, { useState } from 'react';
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
} from '@mui/material';
import {
  Home as HomeIcon,
  Info as InfoIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { text: 'ایجاد یادداشت', icon: <HomeIcon /> },
    { text: 'یادداشت ها', icon: <InfoIcon /> },
    { text: 'پروفایل', icon: <SettingsIcon /> },
    { text: 'خروج', icon: <LogoutIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
    {/* Sidebar Drawer */}
    <Drawer
      variant="permanent" 
      anchor="right"
      open={isOpen}
      sx={{
        width: isOpen ? 240 : 60,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isOpen ? 240 : 60,
          overflowX: 'hidden', 
          transition: 'width 0.3s ease-in-out',
          boxSizing: 'border-box',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        {isOpen && <Typography variant="h6">داشبورد </Typography>}
        <IconButton onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <Tooltip title={!isOpen ? item.text : ''} placement="right">
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {isOpen && <ListItemText primary={item.text} />}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Drawer>

    {/* Floating Toggle Button */}
    {/* {!isOpen && (
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: 'fixed',
          top: 20,
          left: 10,
          zIndex: 1200,
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.1)',
          },
        }}
      >
        <MenuIcon />
      </IconButton>
    )} */}

      {/* Main Content */}
      {/* <Box
        sx={{
          flexGrow: 1,
          p: 3,
          transition: 'margin-left 0.3s ease-in-out',
          ml: isOpen ? 240 : 60,
        }}
      >
        <Typography variant="h4">Welcome to the App!</Typography>
        <Typography>
          This is the main content area. You can add your application content here.
        </Typography>
      </Box> */}
    </Box>
  );
};

export default Sidebar;
