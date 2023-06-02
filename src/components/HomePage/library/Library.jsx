import styles from "./library.module.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../../context/authCTX";
import Shelf from "./Shelf";
import { Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Prompt from "../../UI/Prompt";
import usePost from "../../../custom hooks/usePost";

const Library = ({ shelves }) => {
  const ctx = useContext(MyContext);
  const navigate = useNavigate();
  const [showPrompt, setShowPrompt] = useState({ show: false, props: null });

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
    addNewShelf
  ]= usePost();

  const addToShelfHandler = async () => {
    setShowPrompt({
      show: true,
      props: {
        action: "addShelf",
        dialogueText: `Enter new shelf name:`,
        showInput: true,
        inputLabel: "New shelf name",
        yesButtonText: "Submit",
        dialogueTitle: "Add new shelf",
      },
    });
  };

  const closePrompt = () => {
    setShowPrompt(prevState => {
      return {...prevState, show:false}
    });
  }

  const handlePromptSubmit = (userInput) => {
    addNewShelf(userInput);
  }

  useEffect(() => {
    if(response) {
      setShowPrompt(prevState => {
        return {...prevState, show:false}
      })
    }
  }, [response])

  return (
    <div className={styles.shelvesContainer}>
      <div className={styles.header}>
        <Typography
          variant="h5"
          sx={{
            padding: "0 4vh 0 2vh",
          }}
        >
          My Shelves
        </Typography>
        <Tooltip
          title="Add Shelf"
          placement="right-start"
          onClick={addToShelfHandler}
        >
          <IconButton>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </div>

      {shelves.map((shelf) => {
        return <Shelf shelfName={shelf.name} />;
      })}
      {showPrompt.show ? (
        <Prompt
          dialogueTitle={showPrompt.props.dialogueTitle}
          dialogueText={showPrompt.props.dialogueText}
          showInput={showPrompt.props.showInput}
          inputLabel={showPrompt.props.inputLabel}
          yesButtonText={showPrompt.props.yesButtonText}
          closePrompt={closePrompt}
          handlePromptSubmit={handlePromptSubmit}
          disabled={isLoading ? true : false}
        />
      ) : null}
    </div>
  );
};

export default Library;
