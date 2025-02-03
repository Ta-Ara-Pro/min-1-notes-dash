import React, { useEffect, useState } from "react";
import { Box, IconButton, InputBase, Menu, MenuItem, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FilterList, Search, AccountCircle } from "@mui/icons-material";
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import useNoteStore from "../store";

const Navbar = ({ user, toggleViewMode, viewMode }) => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const isMobileScreen = useMediaQuery("(max-width: 530px)")
    const [anchorEl, setAnchorEl] = useState(null);
    const { searchNotes, searchedNotes, filterNotes } = useNoteStore()
    const isMenuOpen = Boolean(anchorEl);
    const { palette } = useTheme()

    // Open Filter Menu ==============
    // =================================
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const [searchQuery, setSearchQuery] = useState('')
    // Close Filter Menu ==============
    // =================================
    const handleMenuClose = (value) => {
        filterNotes(value)
        setSearchQuery(value)
        setAnchorEl(null);
    };

    // useEffect(() => {
    //     console.log('filter query', searchQuery)
    // }, [searchQuery])

    // Searching Function ==============
    // =================================
    const handleSearch = (event) => {
        searchNotes(event.target.value);
    };




    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: isMobileScreen && 'column',
                justifyContent: "space-between",
                alignItems: isMobileScreen ? "start" : "center",
                padding: isNonMobileScreens ? "1rem 2rem" : "0.5rem 1rem",
                background: palette.primary.light,
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                borderRadius: '15px',
                marginBottom: '2rem',
                gap: isMobileScreen ? '0px' : '16px',

                direction: 'rtl'
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: palette.background.default,
                    borderRadius: "25px",
                    padding: isNonMobileScreens ? "0.5rem 1rem" : "2px 10px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    flex: isNonMobileScreens ? "0.5" : "1",
                    direction: 'rtl'
                }}
            >
                <InputBase
                    placeholder="جست و جو..."
                    fullWidth
                    sx={{ flex: 1 }}
                    onChange={handleSearch}
                />
                <IconButton>
                    <Search />
                </IconButton>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'end',
                    gap: '5px',
                    marginTop: isMobileScreen ? '10px' : '0px'
                }}
            >
                {/* Filter Button */}
                <Box>
                <Tooltip title='فیلتر ها ' >
                    <IconButton
                        onClick={handleMenuOpen}
                        sx={{
                            backgroundColor: " #e0e0e0",
                            "&:hover": { backgroundColor: "#d5d5d5" },
                        }}
                    >
                        <FilterList />
                    </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                        sx={{ direction: "rtl" }}
                    >
                        <MenuItem onClick={() => handleMenuClose("فعال")}>فعال</MenuItem>
                        <MenuItem onClick={() => handleMenuClose("غیرفعال")}>غیر فعال</MenuItem>
                        <MenuItem onClick={() => handleMenuClose("آرشیو شده")}>آرشیو شده</MenuItem>
                        <MenuItem onClick={() => handleMenuClose(true)}>منتخب</MenuItem>

                    </Menu>
                </Box>

                {/* Display type Button */}
                <Box>
                    <Tooltip title='حالت نمایش' >
 <IconButton
                        onClick={toggleViewMode}
                        sx={{
                            backgroundColor: "#e0e0e0",
                            "&:hover": { backgroundColor: "#d5d5d5" },
                        }}
                    >
                        {viewMode === "row" ? <ViewModuleIcon /> : <ViewHeadlineIcon />}
                    </IconButton>
                    </Tooltip>
                   
                </Box>
            </Box>


        </Box>
    );
};

export default Navbar;
