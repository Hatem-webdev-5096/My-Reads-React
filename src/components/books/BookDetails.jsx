import React from "react";
import styles from "./bookDetails.module.css";

import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import useFetch from "../../custom hooks/useFetch";

import { MyContext } from "../../context/authCTX";
import { useContext, useState } from "react";

import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuButton from "../UI/BookDetailsMenuButton";
import usePost from "../../custom hooks/usePost";

const BookDetails = (props) => {
  const ctx = useContext(MyContext);
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);
  const [bookShelf, setBookShelf] = useState(null);

  
  const [
    isPostLoading,
    postResponse,
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
    changeBookShelf
  ] = usePost();

  useEffect(() => {
    ctx.user.shelves.forEach(shelf=> {
      shelf.books.forEach(book => {
        if(book === params.bookId){
          setIsAdded(true);
          setBookShelf(shelf.name);
        }
      })
    })
  }, [ctx.user, postResponse]);


  const params = useParams();
  const [
    responseData,
    isLoading,
    getBooksByTitle,
    getBooksByAuthor,
    getBooksByCategory,
    getBookById,
  ] = useFetch();

  useEffect(() => {
    getBookById(params.bookId);
  }, []);

  const formatAuthors = () => {
    if (responseData && responseData.volumeInfo.authors) {
      return responseData.volumeInfo.authors.join(", ");
    }
    return "";
  };

  const formatPublishInfo = () => {
    if (
      responseData &&
      responseData.volumeInfo.publisher &&
      responseData.volumeInfo.publishedDate
    ) {
      return `${responseData.volumeInfo.publisher} |  ${responseData.volumeInfo.publishedDate}`;
    }
    return "";
  };

  const onPreview = () => {
    navigate(`/hp/Hatem/details/${params.bookId}/preview`);
  };

  const addToLibraryHandler = (targetShelf) => {
    addToLibrary(targetShelf, params.bookId);
  };

  const changeShelfHandler = (targetShelf) => {
    changeBookShelf(params.bookId,targetShelf, bookShelf );
  }

  const onBack = () => {
    navigate(-1);
  };


  const imageURL =responseData &&  `http://books.google.com/books/content?id=${responseData.id}&printsec=frontcover&img=1&source=gbs_api`;


  return isLoading ? (
    <div>
      <p>Loading...</p>
    </div>
  ) : (
    responseData && (
      <div className={styles.container}>
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
        <div className={styles.bookDetailsContainer}>
          <div className={styles.bookInfo}>
            <div className={styles.bookImage}>
              <img
                src={responseData.volumeInfo.imageLinks.thumbnail}
                alt={responseData.volumeInfo.title}
              />
            </div>
            <div className={styles.right}>
              <h2 className={styles.bookTitle}>
                {responseData.volumeInfo.title}
              </h2>
              <p className={styles.bookSubTitle}>
                <span style={{ fontWeight: "700" }}>Authors:</span>{" "}
                <span className={styles.bookAuthor}>{formatAuthors()}</span>
              </p>
              <p className={styles.bookSubTitle}>
                <span style={{ fontWeight: "700" }}>Publish Info:</span>{" "}
                <span className={styles.bookPublishInfo}>
                  {formatPublishInfo()}
                </span>
              </p>
              <p>
                <span style={{ fontWeight: "700" }}>Page count:</span>{" "}
                {responseData.volumeInfo.pageCount}
              </p>

              <p>
                <span style={{ fontWeight: "700" }}>Languages:</span>{" "}
                {responseData.volumeInfo.language}
              </p>
            </div>
          </div>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Description</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                dangerouslySetInnerHTML={{
                  __html:
                    responseData.volumeInfo.description ||
                    "<p>Description is not available for this book.</p>",
                }}
              ></Typography>
            </AccordionDetails>
          </Accordion>
          <div className={styles.actions}>
            <MenuButton isAdded={isAdded} addToLibraryHandler={addToLibraryHandler} changeShelfHandler={changeShelfHandler} bookShelf={bookShelf}/>
            <Button
              className={styles.customButton}
              variant="outlined"
              color="primary"
              onClick={onPreview}
            >
              Preview
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default BookDetails;
