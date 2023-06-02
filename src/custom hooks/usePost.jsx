import { useState, useContext } from "react";
import { MyContext } from "../context/authCTX";
import { useNavigate } from "react-router-dom";

const domain = process.env.REACT_APP_SERVER_DOMAIN_NAME;

const usePost = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const CTX = useContext(MyContext);

  const navigate = useNavigate();

  const signup = async (fName, lName, email, password) => {
    setIsLoading(true);
    const response = await fetch(
      process.env.REACT_APP_SERVER_DOMAIN_NAME + "/auth/signup",
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          firstName: fName,
          lastName: lName,
          email: email,
          password: password,
        }),
      }
    );
    const resData = await response.json();
    if (response.status !== 200) {
      setErrorMessage(resData.message);
      setIsLoading(false);
      return;
    }

    setResponse(resData);
    setIsLoading(false);
  };

  const login = async (email, password) => {
    setErrorMessage(null);
    setIsLoading(true);

    const response = await fetch(
      process.env.REACT_APP_SERVER_DOMAIN_NAME + "/auth/login",
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    const resData = await response.json();
    if (!response.ok) {
      setErrorMessage(resData.message);
      setIsLoading(false);
      return;
    }
    CTX.login(resData.userData);
    setResponse(resData);
    setIsLoading(false);
    navigate(
      `/hp/${resData.userData.firstName}${resData.userData.lastName}/lib`
    );
  };

  const activateAccount = async (activationToken) => {
    setIsLoading(true);
    const response = await fetch(
      process.env.REACT_APP_SERVER_DOMAIN_NAME + "/auth/activateAccount",
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          activationToken: activationToken,
        }),
      }
    );
    const resData = await response.json();

    if (!response.ok) {
      setErrorMessage(resData.message);
      setIsLoading(false);
      return;
    }
    setResponse(resData);
    setIsLoading(false);
  };

  const forgotPassword = async (email) => {
    setIsLoading(true);
    const response = await fetch(
      process.env.REACT_APP_SERVER_DOMAIN_NAME + "/auth/forgot-password",
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          email: email,
        }),
      }
    );
    const resData = await response.json();
    if (!response.ok) {
      setErrorMessage(resData.message);
      setIsLoading(false);
      return;
    }
    setResponse(resData);
    setIsLoading(false);
  };

  const addToLibrary = async (shelfName, bookId) => {
    setIsLoading(true);
    const response = await fetch(
      process.env.REACT_APP_SERVER_DOMAIN_NAME + "/library/addBook",
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          shelfName,
          bookId,
        }),
      }
    );
    const resData = await response.json();
    if (!response.ok) {
      setErrorMessage(resData.message);
      setIsLoading(false);
      return;
    }
    setResponse(resData);
    setIsLoading(false);
    CTX.updateUsershelves(resData.updatedShelves);
  };

  const changePassword = async (newPassword, password) => {
   setIsLoading(true);
    const userId = CTX.user._id;
    const response = await fetch(
      process.env.REACT_APP_SERVER_DOMAIN_NAME +
        `/auth/changePassword`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          newPassword,
          password,
        }),
      }
    );
    const resData = await response.json();
    if (!response.ok) {
      setErrorMessage(resData.message);
      setIsLoading(false);
      return;
    }
    setResponse(resData);
    setIsLoading(false);
  };


  const editShelves = async(action, shelfName, userInput) => {
    setIsLoading(true);
    const response = await fetch(
      process.env.REACT_APP_SERVER_DOMAIN_NAME +
        `/library/editShelves`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          shelfName,
          action,
          userInput
        }),
      }
    );
    const resData = await response.json();
    if (!response.ok) {
      setErrorMessage(resData.message);
      setIsLoading(false);
      return;
    }
    setResponse(resData);
    CTX.updateUsershelves(resData.updatedShelves);
    setIsLoading(false);
  }

  const addNewShelf = async(shelfName) => {
    setIsLoading(true);
    const response = await fetch(
      process.env.REACT_APP_SERVER_DOMAIN_NAME +
        `/library/addNewShelf`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          shelfName
        }),
      }
    );
    const resData = await response.json();
    if (!response.ok) {
      setErrorMessage(resData.message);
      setIsLoading(false);
      return;
    }
    setResponse(resData);
    CTX.updateUsershelves(resData.updatedShelves);
    setIsLoading(false);

  }

  const changeBookShelf = async(bookId, targetShelf, oldShelf) => {
    setIsLoading(true);
    const response = await fetch(
      process.env.REACT_APP_SERVER_DOMAIN_NAME +
        `/library/changeBookShelf`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          bookId,
          targetShelf,
          oldShelf
        })
      }
    );
    const resData = await response.json();
    if (!response.ok) {
      setErrorMessage(resData.message);
      setIsLoading(false);
      return;
    }
    setResponse(resData);
    CTX.updateUsershelves(resData.updatedShelves);
    setIsLoading(false);
  }

  const removeBookFromShelf = async(bookId, bookShelf)=> {
    setIsLoading(true);
    const response = await fetch(
      process.env.REACT_APP_SERVER_DOMAIN_NAME +
        `/library/removeBookFromShelf`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          bookId,
          bookShelf
        })
      }
    );
    const resData = await response.json();
    if (!response.ok) {
      setErrorMessage(resData.message);
      setIsLoading(false);
      return;
    }
    setResponse(resData);
    CTX.updateUsershelves(resData.updatedShelves);
    setIsLoading(false);
  } 

  const resetErrorState = () => {
    setErrorMessage(null);
  };

  const resetResponseState = () => {
    setResponse(null);
  };

  return [
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
    changePassword,
    editShelves,
    addNewShelf,
    changeBookShelf,
    removeBookFromShelf
  ];
};

export default usePost;
