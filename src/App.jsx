import Dashboard from "./pages/Dashboard";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import useNoteStore from "./store";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";
import { ToastContainer } from "react-toastify";
const App = () => {

  const { user, token, mode } = useNoteStore()
  const isAuth = Boolean(user && token)
  console.log('isAuth', isAuth)

  return (
    <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <div className="min-h-screen bg-gray-50">
        <BrowserRouter>
          <Routes>
            {/* Public route for login */}
            <Route path="/login" element={isAuth ? <Navigate to="/" replace /> : <Login />} />

            <Route element={ <PrivateRoute />} >
            <Route path="/" element={ <Dashboard />}/>
            </Route>

            {/* Fallback route for undefined paths */}
            <Route path="*" element={<Navigate to={isAuth ? "/" : "/login"} replace />} />

          </Routes>
        </BrowserRouter>
        <ToastContainer position="bottom-right" autoClose={2500}/>
      </div>
    </ThemeProvider>
  );
};

export default App;
