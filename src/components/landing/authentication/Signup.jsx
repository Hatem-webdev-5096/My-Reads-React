import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import styled from "@emotion/styled";

import { Spinner } from "react-bootstrap";

import Notifier from "../../UI/Toast";

import { useState } from "react";

import usePost from "../../../custom hooks/usePost";

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

const SignUp = () => {
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
  ] = usePost();

  
  const hideNotifier = () => {
    resetErrorState();
    resetResponseState();
  }

  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordisValid, setPasswordIsValid] = useState(true);
  const [fNameIsValid, setFNameIsValid] = useState(true);
  const [lNameIsValid, setLNameIsValid] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!emailIsValid || !passwordisValid || !fNameIsValid || !lNameIsValid) {
      return;
    }
    const data = new FormData(event.currentTarget);

    await signup(
      data.get("firstName"),
      data.get("lastName"),
      data.get("email"),
      data.get("password")
    );
  };

  const onEmailBLur = (e) => {
    if (
      e.target.value.length < 3 ||
      !e.target.value.includes("@") ||
      !e.target.value.includes(".com")
    ) {
      setEmailIsValid(false);
    } else {
      setEmailIsValid(true);
    }
  };

  const onFNameBlur = (e) => {
    if (e.target.value.length < 3) {
      setFNameIsValid(false);
    } else {
      setFNameIsValid(true);
    }
  };

  const onLNameBLur = (e) => {
    if (e.target.value.length < 3) {
      setLNameIsValid(false);
    } else {
      setLNameIsValid(true);
    }
  };

  const onPasswordBlur = (e) => {
    if (e.target.value.length < 6) {
      setPasswordIsValid(false);
    } else {
      setPasswordIsValid(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CssTextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  focusColor="#3D2519"
                  onBlur={onFNameBlur}
                  error={fNameIsValid ? false : true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CssTextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  focusColor="#3D2519"
                  onBlur={onLNameBLur}
                  error={lNameIsValid ? false : true}
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  focusColor="#3D2519"
                  onBlur={onEmailBLur}
                  error={emailIsValid ? false : true}
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  helperText="your admin user password must be at least 6 characters long and alphanumeric"
                  type={showPassword ? "text" : "password"}
                  focusColor="#3D2519"
                  onBlur={onPasswordBlur}
                  error={passwordisValid ? false : true}
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
              </Grid>
            </Grid>
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
                "Signup"
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

export default SignUp;
