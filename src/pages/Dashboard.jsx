
import AddNoteForm from "../components/AddNoteForm";
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import useNoteStore from "../store";
import React, { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useLocation } from "react-router-dom";
import Profile from "../components/Profile";
import NoteList from "../components/NoteList";
import ViewNote from "../components/ViewNote";
import EditNote from "../components/EditNote";

const Dashboard = () => {
  const location = useLocation()
  const [tab, setTab] = useState('')
  const { notes, user, addNote, deleteNote, mode, searchedNotes } = useNoteStore();
  const { palette } = useTheme()
  const [isOpen, setIsOpen] = useState(true);
  const [viewMode, setViewMode] = useState('row')
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isMobileScreen = useMediaQuery("(max-width: 530px)")
  const isSmallScreen = useMediaQuery("(max-width: 390px)")

  // GET QUERY FROM URL PATH ===============
  // =======================================

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
    console.log('tab', tab)
  }, [location.search]);

  // DRAWER FUCNTIONS ==============
  // ===============================
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


  // UPDATE SEARCH QUERY ===========
  // ===============================
  // useEffect(() => {

  // },[searchedNotes])



  return (
    <Box
      sx={{
        minHeight: '100vh',
        padding: isMobileScreen ? '1rem' : '2rem',
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
          overflowX: 'hidden',
          minHeight: '100vh',
          minWidth: '200px',
          width: isSmallScreen ? '100%' : 'auto',
          transition: 'margin-right 0.3s ease-in-out , width 0.5s ease-in-out',
          marginRight: isOpen ? '240px' : isMobileScreen ? '50px' : '45px',
          borderRadius: '15px',
          paddingX: isNonMobileScreens ? '3rem' : isMobileScreen ? '1rem' : '2rem',
          paddingY: isNonMobileScreens ? '2rem' : '1rem',
          background: palette.primary.main,
          marginTop: isSmallScreen ? '2rem' : '0'

        }}
      >
        {/* Sidebar Drawer */}
        <Sidebar
          isOpen={isOpen}
          toggleDrawer={toggleDrawer} shrinkDrawer={shrinkDrawer}
          isSmallScreen={isSmallScreen} mode={mode}
        />

        {/* Main Content */}
        <Box flexBasis={isNonMobileScreens ? '52%' : '62%'}>
          {tab === 'create' && <AddNoteForm addNote={addNote} />}
          {tab === 'notes' &&
            <>
              <Navbar user={user} toggleViewMode={toggleViewMode} viewMode={viewMode} />
              <NoteList
                notes={notes}
                deleteNote={deleteNote}
                isMobileScreen={isMobileScreen}
                isSmallScreen={isSmallScreen}
                viewMode={viewMode}
                tab={tab}
                searchedNotes={searchedNotes}
              />
            </>
          }
          {tab === 'profile' && <Profile user={user} isNonMobileScreens={isNonMobileScreens} />}
          {tab && tab.startsWith("view/") && <ViewNote isNonMobileScreens={isNonMobileScreens} />}
          {tab && tab.startsWith("edit/") && <EditNote />}

        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;



