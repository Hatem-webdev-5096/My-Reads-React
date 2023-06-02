import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "@emotion/styled";
import usePost from "../../../custom hooks/usePost";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";

import Notifier from "../../UI/Toast";

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

const ForgotPassword = (props) => {
  const [
    isLoading,
    response,
    errorMessage,
    signup,
    login,
    activateAccount,
    forgotPassword,
    resetErrorState,
    resetResponseState
  ] = usePost();

  const [emailIsValid, setEmailIsValid] = useState(true);
  const [email, setEmail] = useState("");

  const hideNotifier = () => {
    resetErrorState();
    resetResponseState();
  }

  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const onEmailBlurHandler = (e) => {
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

  const handleSubmit = (event) => {

    event.preventDefault();

    if (email === "") {
      setEmailIsValid(false);
    }
    if (!emailIsValid) {
      return;
    }

    const data = new FormData(event.currentTarget);
    forgotPassword(data.get("email"));
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
            Forgot Password
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
              autoComplete="email"
              autoFocus
              sx={{ border: "#3D2519" }}
              focusColor="#3D2519"
              onChange={onEmailChangeHandler}
              value={email}
              onBlur={onEmailBlurHandler}
              error={emailIsValid ? false : true}
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
                " retreive password"
              )}
             
            </Button>
          </Box>
        </Box>
      </Container>
      {errorMessage && <Notifier message={errorMessage} hideNotifier={hideNotifier} />}
      {response && <Notifier message={response.message} hideNotifier={hideNotifier} />}
    </ThemeProvider>
  );
};

export default ForgotPassword;
