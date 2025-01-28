import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  TextField,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogActions,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const Profile = ({user, isNonMobileScreens}) => {

const isSmallScreen = useMediaQuery("(max-width: 435px)")
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("********");
  const [editField, setEditField] = useState(null);
  const [avatar, setAvatar] = useState("https://img.freepik.com/free-vector/gradient-avatar-illustration_52683-142426.jpg?t=st=1737935542~exp=1737939142~hmac=8a017ea441a19b6250c61a08b61204c8a0f5f6faccfa3cb9e8a69575f7a63884&w=740");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // Handle avatar menu
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarSelect = (url) => {
    setAvatar(url);
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{

        maxHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        direction:'rtl',
        minWidth:'100%',
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 500,
          boxShadow: 3,
          borderRadius: 4,
        }}
      >
        <CardContent>
          {/* Avatar Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              mb: 4,
            }}
          >
            <Avatar
              src={avatar}
              alt="Profile Avatar"
              sx={{ width: 100, height: 100, cursor: "pointer" }}
              onClick={handleAvatarClick}
            />
            <Typography variant="body2" color="text.secondary">
              برای تغییر آواتار، روی آن کلیک کنید
            </Typography>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                onClick={() =>
                  handleAvatarSelect("https://img.freepik.com/free-vector/gradient-avatar-illustration_52683-142441.jpg?ga=GA1.1.1289682780.1736595941")
                }
              >
                Avatar A
              </MenuItem>
              <MenuItem
                onClick={() =>
                  handleAvatarSelect("https://img.freepik.com/free-vector/gradient-avatar-illustration_23-2150891923.jpg?ga=GA1.1.1289682780.1736595941")
                }
              >
                Avatar B
              </MenuItem>
              <MenuItem
                onClick={() =>
                  handleAvatarSelect("https://img.freepik.com/premium-vector/gradient-avatar-illustration_52683-142423.jpg?ga=GA1.1.1289682780.1736595941")
                }
              >
                Avatar C
              </MenuItem>
            </Menu>
          </Box>

          {/* Editable Fields */}
          <Box sx={{ mb: 3 }}>
            {/* Username */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              {editField === "username" ? (
                <TextField
                  fullWidth
                  label="نام کاربری:"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  size="small"
                  sx={{ mr: 2 }}
                />
              ) : (
                <Box sx={{width:'100%'}}><Typography
                  variant="body1"
                  sx={{
                    flexGrow: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginBottom:'10px'
                  }}
                >
                  نام کاربری: 
                </Typography>
                <Typography
                  variant="body"
                  sx={{
                    flexGrow: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {username}
                </Typography>
                </Box>
                
              )}
              <IconButton
                onClick={() =>
                  setEditField(editField === "username" ? null : "username")
                }
              >
                <Edit />
              </IconButton>
            </Box>

            {/* Password */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {editField === "password" ? (
                <TextField
                  fullWidth
                  label="پسورد"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  size="small"
                  sx={{ mr: 2 }}
                />
              ) : (
                <Box sx={{width:'100%'}}><Typography
                variant="body1"
                sx={{
                  flexGrow: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                   marginBottom:'10px'
                }}
              >
              پسورد:
              </Typography>
              <Typography
                variant="body"
                sx={{
                  flexGrow: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                 {password}
              </Typography></Box>
                
              )}
              <IconButton
                onClick={() =>
                  setEditField(editField === "password" ? null : "password")
                }
              >
                <Edit />
              </IconButton>
            </Box>
          </Box>
        </CardContent>

        {/* Actions */}
        <CardActions
          sx={{ justifyContent: "center", flexDirection: "column", gap: 2 , margin:2}}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "80%",  borderRadius: 25 ,
                 background:  "linear-gradient(90deg, #2196f3, #6a1b9a)",
                 "&:hover": {
                    background: "linear-gradient(90deg, #6c2b94, #186eb4)",
                  },
                }}
            // startIcon={<ArrowDropDown />}
          >
            ذخیره تغییرات
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "80%",
              background: "linear-gradient(90deg, #fc142f, #ff5e5b)",
              color: "#fff",
              borderRadius:  25 ,
              "&:hover": {
                background: "linear-gradient(90deg, #ff4c5b, #ffae58)",
              },
            }}
            startIcon={ !isSmallScreen && <Delete />}
            onClick={() => setOpenDeleteDialog(true)}
          >
            حذف پروفایل 
          </Button>
        </CardActions>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>آیا از پاک کردن حساب خود اطمینان دارید؟</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            انصراف
          </Button>
          <Button onClick={() => alert("Account deleted!")} color="error">
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
