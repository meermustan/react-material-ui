// CircularTabBar.js
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularTabItem from './CircularTabItem';

const useStyles = makeStyles({
  tabBar: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: '20px',
    width: '100%',
  },
  content: {
    textAlign: 'center', // Center align the content
  },
});

const CircularTabBar = ({ tabs }) => {
  const classes = useStyles();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const handleTabClick = (index) => {
    setSelectedTabIndex(index);
  };

  return (
    <div>
      <div className={classes.tabBar}>
        {tabs.map((tab, index) => (
          <CircularTabItem
            key={index}
            index={index}
            selected={index === selectedTabIndex}
            onClick={() => handleTabClick(index)}
          >
            {tab.content}
          </CircularTabItem>
        ))}
      </div>
      <div className={classes.content}>{tabs[selectedTabIndex].content}</div>
    </div>
  );
};

export default CircularTabBar;
