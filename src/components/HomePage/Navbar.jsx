import styles from "./navbar.module.css";
import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CssBaseline from "@mui/material/CssBaseline";
import Loader from "../UI/Loader";

import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import { MyContext } from "../../context/authCTX";
import { useContext, useEffect } from "react";
import useFetch from "../../custom hooks/useFetch";

const pages = ["MY LIBRARY", "FIND NEW BOOKS"];
const settings = ["Change Password", "Logout"];

const NavBar = ({ username }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const ctx = useContext(MyContext);

  const [
    responseData,
    isLoading,
    getBooksByTitle,
    getBooksByAuthor,
    getBooksByCategory,
    getBookById,
    getBooks,
    resetResponseState,
    checkLogin,
    errorMessage
  ] = useFetch();

  useEffect(() => {
    if (errorMessage) {
      navigate("/");
    }
    if (!ctx.isLoggedIn) {
      checkLogin();
    }
  }, [ctx.isLoggedIn, errorMessage]);

  const [activeTab, setActiveTab] = useState("1");

  React.useEffect(() => {
    if (location.pathname === `/hp/${username}/search`) {
      setActiveTab("2");
    } else if (location.pathname === `/hp/${username}/lib`) {
      setActiveTab("1");
    }
  }, [location.pathname]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {

    setAnchorElNav(null);
    if (event.target.innerText === "MY LIBRARY") {
      
      setActiveTab("1");
      navigate(`/hp/${username}/lib`);
    } else {
      setActiveTab("2");
      navigate(`/hp/${username}/search`);
    }
  };

  const handleCloseUserMenu = (e) => {
    if (e.target.innerText === "Logout") {
      navigate("/");
      ctx.logout();
    } else if (e.target.innerText === "Change Password") {
      navigate(`/hp/${username}/auth/changePassword`)
    }
    setAnchorElUser(null);
  };

    return (
      isLoading? <Loader />:
      <>
        <CssBaseline />

        <AppBar position="fixed">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href={`/hp/${username}/lib`}
                sx={{
                  mr: 10,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "Berkshire Swash",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  "&:hover": {
                    color: "inherit"
                  }
                }}
              >
                My Reads
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "Berkshire Swash",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                My Reads
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <span
                    className={activeTab === "1" ? styles.active : undefined}
                  >
                    My Library
                  </span>
                </Button>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <span
                    className={activeTab === "2" ? styles.active : undefined}
                  >
                    Find new books
                  </span>
                </Button>
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <span>{`${username[0]}`}</span>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Outlet className={styles.outlet}/>
      </>
    );
  
};

export default NavBar;
