import * as React from "react";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import AddIcon from "@mui/icons-material/Add";

import styles from "./bookmenue.module.css";
import { MyContext } from "../../context/authCTX";
import { useContext } from "react";

const BookMenu = (props) => {
  const ctx = useContext(MyContext);
  

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const addToLibraryHandler = (e) => {
    setAnchorEl(null);
    props.addToLibrary(e.target.innerHTML);
  }
  const onHoverHandler = (e) => {
    e.stopPropagation();
  }

  return (
    <div className={styles.bookMenuContainer} onMouseOver={onHoverHandler}>
      <IconButton
        id="positioned-demo-button"
        aria-controls={open ? "positioned-demo-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        color="neutral"
        onClick={handleClick}
        onMouseOver={onHoverHandler}
      >
        <AddIcon />
      </IconButton>
      <Menu
        id="positioned-demo-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        aria-labelledby="positioned-demo-button"
        placement="bottom-end"
      >
        <span className={styles.menuTitle}>Add to:</span>

        {ctx.user.shelves.map((shelf) => {
            return (
                <MenuItem key={shelf.name} onClick={addToLibraryHandler}>
                {shelf.name}
              </MenuItem>
            )
        })}
      </Menu>
    </div>
  );
};

export default BookMenu;
