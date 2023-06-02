import * as React from 'react';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useState } from 'react';

export default function ShelfSpeedDial({onDeleteClickHandler,onEditClickHandler,onClearShelfClickHandler}) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const actions = [
        { icon: <DeleteIcon onClick={onDeleteClickHandler} sx={{"color": "#CF1B3A"}} />, name: 'Delete Shelf' },
        { icon: <EditIcon onClick={onEditClickHandler} />, name: 'Rename Shelf' },
        { icon: <LayersClearIcon onClick={onClearShelfClickHandler} />, name: 'Clear Shelf' },
      
      ];

    const onClickHandler = (e) => {
        e.stopPropagation();
    }
  return (

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{marginRight:"1.5vh", width:"1vh" }}
        icon={<MenuOpenIcon />}
        direction="left"
        onClick = {onClickHandler}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>

  );
}