import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Menu from "../UI/BookMenu";
import Tooltip from "@mui/material/Tooltip";

import { MyContext } from "../../context/authCTX";
import { useContext, useEffect, useState } from "react";

import usePost from "../../custom hooks/usePost";

const Book = ({ bookData, showNotifier }) => {
  const navigate = useNavigate();
  const ctx = useContext(MyContext);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
  ] = usePost();

  useEffect(() => {
    if (response) {
      showNotifier(response.message);
    }
  }, [response]);

  const onGetDetails = () => {
    navigate(`/hp/Hatem/details/${bookData.id}`);
  };
  const imageURL = `http://books.google.com/books/content?id=${bookData.id}&printsec=frontcover&img=1&imgtk=AFLRE711riSOzH6-1a6TkO-jQmBgGF1nqLFfF3FaZS5GjiXwXXyJqMCh2jnn5LJ-3IiiQi_k7X8xrY66fCVBa_uvqijoRhX5ov6NCIZN7Ug0H10TraFGs-cDiO-l0LEQP_iEuoo9tJBV&source=gbs_api`;

  const addToLibraryHandler = (shelfName) => {
    addToLibrary(shelfName, bookData.id);
  };
  

  return (
    <div key={bookData.id}>
      <Tooltip title={bookData.title}>
        <Card
          sx={{
            maxWidth: 250,
          }}
        >
          <CardMedia
            component="img"
            alt={bookData.title}
            height={"300vh"}
            image={bookData.imageUrl && bookData.imageUrl}
            sx={{
              "&:hover": {
                cursor: "pointer",
                border: "1px solid #5a3726",
              },
            }}
            onClick={onGetDetails}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ fontSize: screenWidth > 540 ? "3vh" : "2.5vh" }}
            >
              {bookData.title.slice(0, 18) ||
                bookData.volumeInfo.title.slice(0, 10)}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
            {bookData.description && bookData.description.slice(0, 30) + " ..."}
          </Typography> */}
          </CardContent>
          <CardActions>
            <Button
              sx={{
                "&:hover": {
                  backgroundColor: "rgb(148, 93, 64, 0.1)",
                },
                color: "#5a3726",
              }}
              size="small"
              onClick={onGetDetails}
            >
              Learn More
            </Button>
            <Menu addToLibrary={addToLibraryHandler} />
          </CardActions>
        </Card>
      </Tooltip>
    </div>
  );
};

export default Book;

