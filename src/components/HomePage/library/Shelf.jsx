import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import ShelfSpeedDial from "../../UI/SpeedDial";
import Prompt from "../../UI/Prompt";

import ShelfBook from "../../books/ShelfBook";
import { Link } from "react-router-dom";

import { useEffect, useState, useContext } from "react";
import useFetch from "../../../custom hooks/useFetch";
import usePost from "../../../custom hooks/usePost";
import { MyContext } from "../../../context/authCTX";

import styles from "./shelf.module.css";

const Shelf = ({ shelfName }) => {
  const [accordionOpened, setAccordionOpened] = useState(false);
  const [showPrompt, setShowPrompt] = useState({ show: false, props: null });

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const [showNotifier, setShowNotifier] = useState(false);

  const [
    getResponse,
    isLoading,
    getBooksByTitle,
    getBooksByAuthor,
    getBooksByCategory,
    getBookById,
    getBooks,
    resetResponseStateFetch
  ] = useFetch();

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
  ] = usePost();

  const ctx = useContext(MyContext);

  const shelfIndex = ctx.user.shelves.findIndex(
    (shelf) => shelf.name === shelfName
  );
  const shelfBooks = ctx.user.shelves[shelfIndex].books;

  const accordionHeaderClickHandler = async (e) => {
    setAccordionOpened((prevState) => {
      return !prevState;
    });
  };

  const onDeleteClickHandler = (e) => {
    setShowPrompt({
      show: true,
      props: {
        action: "delete",
        dialogueText: `Are you sure you want to permenantly delete ${shelfName} shelf?`,
        showInput: false,
        yesButtonText: "Delete",
        dialogueTitle: "Delete Shelf",
      },
    }); 
  };

  const onEditClickHandler = (e) => {
    setShowPrompt({
      show: true,
      props: {
        action: "editName",
        dialogueText: `Enter new shelf name:`,
        showInput: true,
        inputLabel: "New shelf name",
        yesButtonText: "Submit",
        dialogueTitle: "Edit shelf name",
      },
    });
  };

  const onClearShelfClickHandler = (e) => {
    setShowPrompt({
      show: true,
      props: {
        action: "clear",
        dialogueText: `Are you shure you want to remove all books from (${shelfName})?`,
        showInput: false,
        yesButtonText: "Clear Shelf",
        dialogueTitle: "Clear shelf",
      },
    });
  };

  const closePrompt = () => {
    setShowPrompt({ show: false, props: null });
  };

  const handlePromptSubmit = (userInput) => {
    editShelves(showPrompt.props.action, shelfName, userInput);
  };

  useEffect(() => {
    if (shelfBooks.length > 0) {
      getBooks(shelfBooks);
    } else {
      resetResponseStateFetch();
    }
  }, [ctx.user.shelves]);



  const handleNotifierClose = () => {
    setShowNotifier(false);
  }

  useEffect(() => {
    if(postResponse) {
      setShowNotifier(true);
      setShowPrompt(prevState => {
        return {...prevState, show: false}
      })
    }
  }, [postResponse])

  return (
    <>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={accordionHeaderClickHandler}
          sx={{
            "&:hover": {
              backgroundColor: "#E7E7E7",
            },
          }}
        >
          <div className={styles.accordionHeader}>
            <Typography>{shelfName}</Typography>
            <ShelfSpeedDial
              onDeleteClickHandler={onDeleteClickHandler}
              onEditClickHandler={onEditClickHandler}
              onClearShelfClickHandler={onClearShelfClickHandler}
            />
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "#EFECE0" }}>
          <Typography>
            {(getResponse && (
              <Grid container rowSpacing={5} columnSpacing={2}>
                {getResponse.map((book) => {
                  return (
                    <Grid item lg={2} md={3} s={4} xs={4} key={book.id}>
                      <ShelfBook bookData={book} />
                    </Grid>
                  );
                })}
              </Grid>
            )) ||
              `This shelf is empty, `}{ !getResponse && <Link to={`/hp/${ctx.user.firstname}/search`}>add some new books now!</Link>}
          </Typography>
        </AccordionDetails>
      </Accordion>
      {showPrompt.show ? (
        <Prompt
          dialogueTitle={showPrompt.props.dialogueTitle}
          dialogueText={showPrompt.props.dialogueText}
          showInput={showPrompt.props.showInput}
          inputLabel={showPrompt.props.inputLabel}
          yesButtonText={showPrompt.props.yesButtonText}
          closePrompt={closePrompt}
          handlePromptSubmit={handlePromptSubmit}
          disabled={isPostLoading ? true : false}
        />
      ) : null}
      {postResponse && (
        <Snackbar open={showNotifier} autoHideDuration={6000} onClose={handleNotifierClose}>
          <Alert severity="success">
            {postResponse.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Shelf;
