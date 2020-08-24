import React, { useState } from 'react';
import {
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  InputBase,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getDrinkByName, getDrinkByIngredient } from '../slices/drinksSlice';
import Drawer from './Drawer';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '100%',
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '18ch',
      '&:focus': {
        width: '25ch',
      },
    },
  },
}));

function Navbar({ ingredient }) {
  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (ingredient) {
      dispatch(getDrinkByIngredient(data.ingredient));
    } else {
      dispatch(getDrinkByName(data.drinkname));
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const optionsDrawer = [
    ['Search Drinks', '/'],
    ['Search Drinks by Ingredients', '/ingredients'],
  ];

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton
          onClick={handleOpenDrawer}
          className={classes.menuButton}
          edge='start'
          color='inherit'
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant='h6' noWrap>
          Drink API
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputBase
              name={ingredient ? 'ingredient' : 'drinkname'}
              placeholder={
                ingredient ? 'Search Ingredient...' : 'Search Drink…'
              }
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputRef={register()}
            />
          </form>
        </div>
      </Toolbar>
      <Drawer
        open={isDrawerOpen}
        handleClose={handleCloseDrawer}
        handleOpen={handleOpenDrawer}
        options={optionsDrawer}
      />
    </AppBar>
  );
}

export default Navbar;
