
import AddNoteForm from "../components/AddNoteForm";
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
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
  Divider,
} from '@mui/material';
import {
  Home as HomeIcon,
  Info as InfoIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useLocation } from "react-router-dom";
import Profile from "../components/Profile";
import NoteList from "../components/NoteList";
import NoteGrid from '../components/NoteGrid'

const Dashboard = () => {
  const location = useLocation()
  const [tab, setTab] = useState('')
  const { notes, addNote, deleteNote } = useNoteStore();
  const [isOpen, setIsOpen] = useState(true);
  const [viewMode, setViewMode] = useState('row')
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isMobileScreen = useMediaQuery("(max-width: 530px)")
  const isSmallScreen = useMediaQuery("(max-width: 390px)")

  // GET QUERY FROM URL PATH ===============
  // =======================================

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)  //location.search is the query string part of the URL 
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search]);


  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const shrinkDrawer = (state) => {
    setIsOpen(state);
  };

  // TOGGLE VIEW MODE ==============
  // ===============================
  const toggleViewMode = () => {
    setViewMode((prev) => prev === 'row' ? 'grid' : 'row')
  }

  // USER INFO ===================
  // =============================
  const { user } = useNoteStore()
  console.log('user', user)



  return (
    <Box
      sx={{
        // display:'flex', justifyItems:"center",alignItems:'center',
        minHeight: '100vh',
        padding: '2rem',
        background: "linear-gradient(90deg,rgba(33, 149, 243, 0.21),rgba(105, 27, 154, 0.32))",
        // background: "linear-gradient(90deg, #2196f3, #6a1b9a)",

      }}
    >
        {/* Floating Toggle Button */}
    {isSmallScreen && (
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: 'absolute',
          top: 5,
          right: 5,
          zIndex: 1200,
          backgroundColor: 'rgba(158, 158, 158, 0.25)',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.1)',
          },
        }}
      >
        <MenuIcon />
      </IconButton>
    )}
      <Box
        sx={{
          // display:'flex', justifyItems:"center",alignItems:'center',
          overflowX:'hidden',
          minHeight: '100vh',
          minWidth: '200px',
          transition: 'margin-right 0.3s ease-in-out',
          marginRight: isOpen ? '240px' : '45px',
          borderRadius: '15px',
          paddingX: isNonMobileScreens ? '3rem' : '2rem',
          paddingY: isNonMobileScreens ? '2rem' : '1rem',
          background: "linear-gradient(90deg, #2195f36d, #691b9a79)",
          marginTop: isSmallScreen && '1rem'
          // background: "linear-gradient(90deg, #2196f3, #6a1b9a)",

        }}
      >
        {tab === 'notes' && <Navbar user={user} toggleViewMode={toggleViewMode} viewMode={viewMode}/>}
        {/* Sidebar Drawer */}
        <Sidebar isOpen={isOpen} toggleDrawer={toggleDrawer} shrinkDrawer={shrinkDrawer} isSmallScreen={isSmallScreen}/>

        {/* Main Content */}
        <Box flexBasis={isNonMobileScreens ? '52%' : '62%'}>
          {tab === 'create' && <AddNoteForm addNote={addNote} />}
          {tab === 'notes' &&
            viewMode === 'row' ? <NoteList notes={notes} deleteNote={deleteNote} />
            : <NoteGrid />
          }
          {tab === 'profile' && <Profile user={user} isNonMobileScreens={isNonMobileScreens} />}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
