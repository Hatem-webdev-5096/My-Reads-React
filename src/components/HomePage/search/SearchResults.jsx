import styles from "./searchResults.module.css";
import Book from "../../books/Book";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Notifier from "../../UI/Toast";

import { useEffect, useContext, useState } from "react";

import { MyContext } from "../../../context/authCTX";


const SearchResults = (props) => {

const ctx = useContext(MyContext);

const [showNotifier, setShowNotifier] = useState(false);
const [notifierMessage, setNotifierMessage] = useState(null);

const showNotifierHandler = (message) => {
  setShowNotifier(true);
  setNotifierMessage(message);
}

const hideNotifierHandler = () => {
  setShowNotifier(false);
}


  return (
    <>
      <Box sx={{ flexGrow: 1, padding: "5%" }}>
        <Grid container spacing={5} rowSpacing={10}>
          {props.responseData &&
            props.responseData.booksList.map((b) => {
              return (
                <Grid item lg={3} md={4} s={6} xs={12} key={b.id}>
                  <Book bookData={b} key={b.id} showNotifier={showNotifierHandler} />
                </Grid>
              );
            })}
        </Grid>
      </Box>
      {showNotifier && <Notifier message={notifierMessage}hideNotifier={hideNotifierHandler}/>}
    </>
  );
};

export default SearchResults;
