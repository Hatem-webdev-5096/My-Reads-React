import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import  ReactDOM  from "react-dom";
import styles from "./toast.module.css";

function Notifier(props) {

  const notification = (
    <div className={styles.notifictaionContainer}>
      <Toast show={true} onClose={props.hideNotifier}>
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>{props.message}</Toast.Body>
      </Toast>
    </div>
  );
  const targetElement = document.getElementById("notifier");
  return ReactDOM.createPortal(notification, targetElement);
}

export default Notifier;
