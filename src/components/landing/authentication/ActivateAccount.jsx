import { useEffect, useState } from "react";
import styles from "./activateAccount.module.css";
import { Link, useParams } from "react-router-dom";

import { Spinner } from "react-bootstrap";



import usePost from "../../../custom hooks/usePost";

const ActivateAccount = (props) => {
  const params = useParams();

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


  useEffect(() => {
    activateAccount(params.token);
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.welcome}>
        Welcome to <span className={styles.brand}>My Reads</span>:
      </p>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : response? (
        <p className={styles.bottomText}>
          Your account is activated you can <Link to={"/"}>signin now</Link>{" "}
        </p>
      ): errorMessage? (
        <p className={styles.bottomText}>
          We are sorry, account activation failed, please <Link to={"/"}>signup</Link> again{" "}
        </p>
      ): null}
  
    </div>
  );
};

export default ActivateAccount;
