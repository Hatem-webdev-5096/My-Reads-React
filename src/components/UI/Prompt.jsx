import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Prompt({
  dialogueText,
  inputLabel,
  handlePromptSubmit,
  yesButtonText,
  showInput,
  closePrompt,
  dialogueTitle,
  disabled
}) {
  const [userInput, setInput] = React.useState();

  const handleClose = () => {
    closePrompt();
  };

  const handleSubmit = () => {
    handlePromptSubmit(userInput);
  };

  const onInputChangeHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>{dialogueTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogueText}</DialogContentText>
          {showInput && (
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={inputLabel}
              type="text"
              fullWidth
              variant="standard"
              value={userInput}
              onChange={onInputChangeHandler}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button disabled={disabled} onClick={handleClose}>Cancel</Button>
          <Button disabled={disabled} onClick={handleSubmit}>{yesButtonText}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
