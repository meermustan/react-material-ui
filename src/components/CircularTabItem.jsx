// CircularTabItem.js
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';

const useStyles = makeStyles({
  fab: {
    margin: '0 10px',
    backgroundColor: 'transparent',
    border: '2px solid transparent',
    boxShadow: 'none',
    borderRadius: 50,
    transition: 'border-color 0.3s ease-in-out',
  },
  selected: {
    boxShadow: "4px 4px 8px #0000001F ",
  },
});

const CircularTabItem = ({ selected, onClick, children }) => {
  const classes = useStyles();

  return (
    <Fab
      size="large"
      className={`${classes.fab} ${selected ? classes.selected : ''}`}
      onClick={onClick}
    >
      {children}
    </Fab>
  );
};

export default CircularTabItem;
