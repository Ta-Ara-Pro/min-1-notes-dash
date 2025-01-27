import AddNoteForm from "../components/AddNoteForm";
import useNoteStore from "../store";
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
  useMediaQuery,
} from '@mui/material';
import {
  Home as HomeIcon,
  Info as InfoIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { Link, useLocation } from "react-router-dom";
import Profile from "../components/Profile";
import NoteList from "../components/NoteList";

const Dashboard = () => {
    const location = useLocation()
    const [tab, setTab ] = useState('')
  const { notes, addNote, deleteNote } = useNoteStore();
  const [isOpen, setIsOpen] = useState(true);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  // GET QUERY FROM URL PATH ===============
  // =======================================
 
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)  //location.search is the query string part of the URL 
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search]);
  
  // Toggle Drawer
  const toggleDrawer = () => setIsOpen(!isOpen);

  // Adjust the drawer state on screen size change
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false); // Shrink sidebar on smaller screens
      } else {
        setIsOpen(true); // Expand sidebar on larger screens
      }
    };

    handleResize(); // Adjust on mount
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { text: 'ایجاد یادداشت', icon: <HomeIcon /> , path: '/?tab=create'},
    { text: 'یادداشت ها', icon: <InfoIcon /> , path: '/?tab=notes'},
    { text: 'پروفایل', icon: <SettingsIcon /> , path: '/?tab=profile'},
    { text: 'خروج', icon: <LogoutIcon /> },
  ];

  return (
    <Box
      sx={{  
        minHeight: '100vh',
        transition: 'margin-right 0.3s ease-in-out',
        marginRight: isOpen ? '240px' : '60px',
        padding: isNonMobileScreens ?'5rem' : '2rem',
        background: "linear-gradient(90deg, #2195f36d, #691b9a79)",
        // background: "linear-gradient(90deg, #2196f3, #6a1b9a)",
        
      }}
    >
      {/* Sidebar Drawer */}
      <Box  sx={{
          width: { xs: '100%', md: '15rem' },
          display: 'flex',
          justifyContent: 'flex-start',
        }}>
      <Drawer
        variant="permanent"
        anchor="right"
        open={isOpen}
        sx={{
          width: isOpen ? 240 : 60,
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
            p: '3',
          }}
        >
          {isOpen && <Typography variant="h6">داشبورد</Typography>}
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Box>
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <Tooltip title={!isOpen ? item.text : ''} placement="right">
                <Link to={item.path}>
                <ListItemButton >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {isOpen && <ListItemText primary={item.text} />}
                </ListItemButton>
                </Link>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Drawer>
      </Box>
      {/* Main Content */}
      <Box flexBasis={isNonMobileScreens ? '52%' : '62%'}>
        {tab === 'create' && <AddNoteForm addNote={addNote} />}
        {tab === 'notes' && <NoteList notes={notes} deleteNote={deleteNote} />}
        {tab === 'profile' && <Profile />}

        
        {/*  */}
      </Box>
    </Box>
  );
};

export default Dashboard;
