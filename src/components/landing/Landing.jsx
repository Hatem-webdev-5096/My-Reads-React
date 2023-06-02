import styles from "./landing.module.css";
import ActionTabs from "./ActionsTabs";
import SignIn from "./authentication/SignInForm";
import GoogleButton from "./authentication/GoogleButton";
import SignUp from "./authentication/Signup";
import ForgotPassword from "./authentication/ForgotPasswordForm";

import { useState } from "react";

const Landing = (props) => {
  const [shownForm, setShownForm] = useState("Login");
  const setShownFormToSignup = () => {
    setShownForm("signup");
  };
  const setShownFormToLogin = () => {
    setShownForm("Login");
  };

  const onForgotPassClickHandler = () => {
    setShownForm("forgotPass");
  };

  return (
    <div className={styles.landingContainer}>
      <div className={styles.logoContainer}>
        {/* <div className={styles.bgimg}></div> */}
        <img src={require("./images/My Reads-nobg-new.png")} />
        <p className={styles.description}>
          At our online book library, we believe that reading is an essential
          part of personal growth and development. Our platform is here to
          support your reading journey and make it easier for you to manage your
          book collection.
          <br /> <br />{" "}
          <span>Join us today and start organizing your books like a pro!</span>
        </p>
      </div>
      <div className={styles.actions}>
        <ActionTabs
          setShownFormToSignup={setShownFormToSignup}
          setShownFormToLogin={setShownFormToLogin}
        />
        {shownForm === "Login" ? (
          <SignIn onForgotPassClickHandler={onForgotPassClickHandler} />
        ) : shownForm === "signup" ? (
          <SignUp />
        ) : shownForm === "forgotPass" ? (
          <ForgotPassword />
        ) : null}

        <GoogleButton />
      </div>
    </div>
  );
};

export default Landing;
