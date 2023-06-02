import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import styled from "@emotion/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Spinner from "react-bootstrap/Spinner";

import usePost from "../../../custom hooks/usePost";
import { MyContext } from "../../../context/authCTX";
import Notifier from "../../UI/Toast";

import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./changePassword.module.css";

const theme = createTheme();

const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
  // input label when focused
  "& label.Mui-focused": {
    color: p.focusColor,
  },
  // focused color for input with variant='standard'
  "& .MuiInput-underline:after": {
    borderBottomColor: p.focusColor,
  },
  // focused color for input with variant='filled'
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: p.focusColor,
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: p.focusColor,
    },
  },
}));

const ChangePassword = (props) => {
  const ctx = useContext(MyContext);
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };


  const [
    isLoading,
    response,
    errorMessage,
    signup,
    login,
    activateAccount,
    forgotPassword,
    resetErrorState,
    resetResponseState,
    addToLibrary,
    changePassword
  ] = usePost();

  const [newPasswordIsValid, setNewPasswordIsValid] = useState(true);
  const [passwordisValid, setPasswordIsValid] = useState(true);

  const hideNotifier = () => {
    resetErrorState();
    resetResponseState();
  };

  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");

  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const onNewPasswordChangeHandler = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword.length < 6) {
      setNewPasswordIsValid(false);
    }

    if (password === "") {
      setPasswordIsValid(false);
    }

    if (!newPasswordIsValid || !passwordisValid) {
      return;
    }
    const data = new FormData(event.currentTarget);

    await changePassword(data.get("newPassword"), data.get("password"));
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onPasswordBlur = (e) => {
    if (e.target.value.length < 6) {
      setPasswordIsValid(false);
    } else {
      setPasswordIsValid(true);
    }
  };

  const onNewPasswordBlur = (e) => {
    if (e.target.value.length < 6) {
      setNewPasswordIsValid(false);
    } else {
      setNewPasswordIsValid(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
                <div className={styles.backButton}>
          <IconButton
            className={styles.customButton}
            variant="contained"
            color="primary"
            onClick={onBack}
          >
            <ArrowBackIcon />
          </IconButton>
        </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <CssTextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              focusColor="#3D2519"
              onBlur={onPasswordBlur}
              error={passwordisValid ? false : true}
              value={password}
              onChange={onPasswordChangeHandler}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <CssTextField
              margin="normal"
              required
              fullWidth
              id="newPassword"
              name="newPassword"
              label="New Password"
              type={showPassword ? "text" : "password"}
              focusColor="#3D2519"
              onBlur={onNewPasswordBlur}
              error={newPasswordIsValid ? false : true}
              value={newPassword}
              onChange={onNewPasswordChangeHandler}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#5a3726",
                "&:hover": { backgroundColor: "#8d573c" },
              }}
            >
              {isLoading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "Reset"
              )}
            </Button>
          </Box>
        </Box>
      </Container>
      {errorMessage && (
        <Notifier message={errorMessage} hideNotifier={hideNotifier} />
      )}
      {response && (
        <Notifier message={response.message} hideNotifier={hideNotifier} />
      )}
    </ThemeProvider>
  );
};

export default ChangePassword;
