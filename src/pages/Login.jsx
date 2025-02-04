import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  InputLabel,
} from "@mui/material";
import useNoteStore from "../store";

const Login = () => {
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useNoteStore((state) => state.setUser);

  // TOKEN GENERATING ====================
  // ====================================
  // FUNCTION TO CONVERT STRING TO BASE64 WITH UNICODE SUPPORT
const toBase64 = (string) => {
    return btoa(unescape(encodeURIComponent(string)));
  };
  
  // TOKEN GENERATOR
  const generateToken = (username, password) => {
    const baseString = `${username}:${password}:${Date.now()}`;
    return toBase64(baseString) 
      .split("")
      .sort(() => Math.random() - 0.5) 
      .join(""); 
  };
  

  // LOGIN FUNCTION =================
  // ================================
  const handleLogin = (e) => {
    e.preventDefault();

    if (username && password) {
      const token = generateToken(username, password);
      setUser({ username }, token);

    } else {
      console.error("Username and password are required.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
      }}
    >
      {/* Left Side: Background Image */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "block" },
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding:'0px 2rem'
        }}
      >
        <img src='/note3.png' alt="banner"  style={{
      width: "100%", 
      height: "100%", 
      objectFit: "contain", 
      objectPosition: "center", 
    }}/>
      </Box>
      {/* Right Side: Form */}
      <Paper
        elevation={6}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: 4,
          py: 8,
        }}
      >
        <Box
          sx={{
            maxWidth: "400px",
            mx: "auto",
            textAlign: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 2, textAlign:'right', direction:'rtl' }}>
            به اپلیکیشن یادداشت های خود خوش آمدید!
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary", mb: 3 }}>
            لطفا وارد حساب خود شوید
          </Typography>
          <Box component="form" noValidate onSubmit={handleLogin}
           sx={{display:'flex', flexDirection:'column', direction: 'rtl', alignItems:'start'}}>
            {/* Email Field */}
            <InputLabel sx={{ textAlign:'right', width:'100%'}}>نام کاربری</InputLabel>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            {/* Password Field */}
            <InputLabel sx={{ textAlign:'right', width:'100%'}}>رمز عبور </InputLabel>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                background: "linear-gradient(to right, #6a11cb, #2575fc)",
              }}
            >
              ورود
            </Button>
          
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
