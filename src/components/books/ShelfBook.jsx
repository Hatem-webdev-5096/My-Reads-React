import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

import { MyContext } from "../../context/authCTX";
import { useContext, useEffect, useState } from "react";
import styles from "./shelfBook.module.css";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import { Link } from "react-router-dom";
import Divider from '@mui/material/Divider';

import usePost from "../../custom hooks/usePost";

const ShelfBook = ({ bookData }) => {
  const ctx = useContext(MyContext);

  const [bookShelf, setBookShelf] = useState(null);

  useEffect(() => {
    ctx.user.shelves.forEach((shelf) => {
      shelf.books.forEach((book) => {
        if (book === bookData.id) {
          setBookShelf(shelf.name);
        }
      });
    });
  }, []);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  window.addEventListener("resize", () => {
    setScreenWidth(window.innerWidth);
  });
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
    addToLibrary,
    changePassword,
    editShelves,
    addNewShelf,
    changeBookShelf,
    removeBookFromShelf
  ] = usePost();

  // useEffect(() => {
  //   if (response) {
  //     showNotifier(response.message);
  //   }
  // }, [response]);

  const imageURL = `http://books.google.com/books/content?id=${bookData.id}&printsec=frontcover&img=1&source=gbs_api&format=png`;

  const changeShelfHandler = (e) => {
    if(bookShelf === e.target.innerHTML) {
      return;
    }
    changeBookShelf(bookData.id, e.target.innerHTML, bookShelf);

    };

  const removeFromShelfHandler = () => {
   removeBookFromShelf(bookData.id, bookShelf);
  }  

  return (
    <div key={bookData.id} className={styles.shelfBookContainer}>
      <Tooltip title={bookData.volumeInfo.title}>
        <Card
          sx={{
            maxWidth: screenWidth > 500 ? 150 : 100,
            maxHeight: screenWidth > 500 ? 200 : 150,
          }}
          aria-controls={open ? "positioned-demo-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <CardMedia
            component="img"
            alt={bookData.title}
            height={screenWidth > 540 ? "200vh" : "140vh"}
            image={bookData.volumeInfo.imageLinks.thumbnail}
            sx={{
              "&:hover": {
                cursor: "pointer",
                border: "1px solid #5a3726",
              },
            }}
            // onClick={onGetDetails}
          />
        </Card>
      </Tooltip>
      <Menu
        id="positioned-demo-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        aria-labelledby="positioned-demo-button"
        placement="bottom-end"
      >
        <span className={styles.menuTitle}>
          <Link to={`/hp/${ctx.user.firstName}/details/${bookData.id}`}>
            Book Details
          </Link>
        </span>
            <Divider sx={{ my: 0.5, borderColor:"#5a3726" }}></Divider>
        {ctx.user.shelves.map((shelf) => {
          return (
            <MenuItem
              key={shelf.name}
              onClick={changeShelfHandler}
              sx={{
                backgroundColor: shelf.name === bookShelf ? "#DDD9D9" : null,
              }}
            >
              {shelf.name}
            </MenuItem>
          );
        })}
        <Divider sx={{ my: 0.5, borderColor:"#5a3726" }}></Divider>
        <MenuItem onClick={removeFromShelfHandler}>
          <span style={{ color: "red" }}>Remove from shelf</span>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ShelfBook;
