import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { Tab, Tabs } from '@material-ui/core';
import Icon from '@material-ui/core/Icon'; // Import Icon component

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  tabs: {
    display: 'flex',
    justifyContent: 'space-between', 
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#000000',
  },
  tab: {
    width: 'fit',
    minWidth: 'fit-content',
    paddintTop: 8,
    paddingBottom: 8,
    color: '#3C3C4399',
    '&.Mui-selected': { 
      backgroundColor: '#0000',
      color: '#000',
    }
  },
  icon: {
    marginRight: 5,
  },
});

const SwipeableTabs = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <Tabs TabIndicatorProps={{style:{backgroundColor: '#000'}}} value={value} onChange={handleChange} className={classes.tabs}>
        <Tab className={classes.tab} label={<p>Tab 1</p>} icon={<Icon className={classes.icon}>H </Icon>} />
        <Tab className={classes.tab} label={<p>Tab 1</p>} icon={<Icon className={classes.icon}>H </Icon>} />
        <Tab className={classes.tab} label={<p>Tab 1</p>} icon={<Icon className={classes.icon}>H </Icon>} />
      </Tabs>
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <div>Content of Tab 1</div>
        <div>Content of Tab 2</div>
        <div>Content of Tab 3</div>
      </SwipeableViews>
    </div>
  );
};

export default SwipeableTabs;
