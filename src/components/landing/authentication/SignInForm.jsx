import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
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

import Spinner from "react-bootstrap/Spinner";

import usePost from "../../../custom hooks/usePost";
import { MyContext } from "../../../context/authCTX";
import Notifier from "../../UI/Toast";

import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

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

const SignIn = (props) => {
  const ctx = useContext(MyContext);
  const navigate = useNavigate();

  const [
    isLoading,
    response,
    errorMessage,
    signup,
    login,
    activateAccount,
    forgotPassword,
    resetErrorState
  ] = usePost();

  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordisValid, setPasswordIsValid] = useState(true);

  const hideNotifier = () => {
    resetErrorState();
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email === "") {
      setEmailIsValid(false);
    }
    if (password === "") {
      setPasswordIsValid(false);
    }

    if (!emailIsValid || !passwordisValid) {
      return;
    }
    const data = new FormData(event.currentTarget);

    await login(data.get("email"), data.get("password"));
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onForgotPassClickHandler = () => {
    props.onForgotPassClickHandler();
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
            Sign in
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
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              sx={{ border: "#3D2519" }}
              focusColor="#3D2519"
              onBlur={onEmailBLur}
              error={emailIsValid ? false : true}
              value={email}
              onChange={onEmailChangeHandler}
            />
            {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
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
                "Sign In"
              )}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  onClick={onForgotPassClickHandler}
                >
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {errorMessage && <Notifier message={errorMessage} hideNotifier={hideNotifier} />}
    </ThemeProvider>
  );
};

export default SignIn;
