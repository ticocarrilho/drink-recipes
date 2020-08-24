import React from 'react';
import { SwipeableDrawer, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    list: {
      width: 250,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
  });


  
function Drawer({ open, handleClose, handleOpen, options }) {
    const classes = useStyles();
    const renderOptions = () => {
        return options.map((option) => (
            <Link className={classes.link} key={option[0]} to={option[1]}>
                <ListItem button>
                    <ListItemText primary={option[0]}/>
                </ListItem>
            </Link>
        ))
      };
  return (
    <SwipeableDrawer
            anchor='left'
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
    >
        <div className={classes.list}>
        <List>
           {renderOptions()}
          </List>
        </div>
        
    </SwipeableDrawer>
  );
}

export default Drawer;
