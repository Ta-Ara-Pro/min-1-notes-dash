import React, { useState } from "react";
import { Box, IconButton, InputBase, Menu, MenuItem, Typography, useMediaQuery } from "@mui/material";
import { FilterList, Search, AccountCircle } from "@mui/icons-material";
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';

const Navbar = ({ user, toggleViewMode, viewMode }) => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const isMobileScreen = useMediaQuery("(max-width: 530px)")
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    // Open Filter Menu
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Close Filter Menu
    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: isMobileScreen && 'column',
                justifyContent: "space-between",
                alignItems: isMobileScreen ? "start" : "center",
                padding: isNonMobileScreens ? "1rem 2rem" : "0.5rem 1rem",
                background: "rgba(208, 240, 250, 0.23)",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                borderRadius: '15px',
                marginBottom: '2rem',
                gap: !isMobileScreen && '16px',
                direction: 'rtl'
            }}
        >
            {/* User Widget */}
            {/* {!isMobileScreen &&
                <Box display="flex" alignItems="center" gap="1rem">
                    <AccountCircle sx={{ fontSize: "2rem" }} />
                    {isNonMobileScreens && <Typography variant="h6">{user.username}</Typography>}
                </Box>} */}

            {/* Search Bar */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#fff",
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
                    marginTop: isMobileScreen && '10px'
                }}
            >
                {/* Filter Button */}
                <Box>
                    <IconButton
                        onClick={handleMenuOpen}
                        sx={{
                            backgroundColor: " #e0e0e0",
                            "&:hover": { backgroundColor: "#d5d5d5" },
                        }}
                    >
                        <FilterList />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                        sx={{ direction: "rtl" }}
                    >
                        <MenuItem onClick={handleMenuClose}>فعال</MenuItem>
                        <MenuItem onClick={handleMenuClose}>غیر فعال</MenuItem>
                        <MenuItem onClick={handleMenuClose}>آرشیو شده</MenuItem>
                    </Menu>
                </Box>

                {/* Display type Button */}
                <Box>
                    <IconButton
                        onClick={toggleViewMode}
                        sx={{
                            backgroundColor: "#e0e0e0",
                            "&:hover": { backgroundColor: "#d5d5d5" },
                        }}
                    >
                        {viewMode === "row" ? <ViewModuleIcon /> : <ViewHeadlineIcon />}
                    </IconButton>
                </Box>
            </Box>


        </Box>
    );
};

export default Navbar;
