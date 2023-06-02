import styles from "./googleButton.module.css";
import { GoogleLogin } from "@react-oauth/google";


const GoogleButton = () => {

  const handleSuccess = async(response) => {
    console.log(response.credential);
    await fetch(process.env.REACT_APP_SERVER_DOMAIN_NAME + "/auth/googleSignin", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({token:response.credential}),
      mode: "cors"
    });
  };


  const handleFailure = (error) => {
    console.error(error);
  };

  return (
    <div id="googleButtonContainer" className={styles.googleBtnContainer}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleFailure}
      />
    </div>
  );
};

export default GoogleButton;
