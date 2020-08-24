import React from 'react';
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  instructionsContainer: {
    clear: 'both',
    marginTop: theme.spacing(2)
  },
  image: {
    float: 'left',
    width: '10vw',
    borderRadius: '50%',
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: '15vw',
    },
    [theme.breakpoints.down('xs')]: {
      width: '20vw',
    },
  },
}));

const renderIngredients = (drink) => {
  return Object.entries(drink).map((entry) => {
    if (entry[0].includes('strIngredient') && entry[1]) {
      return <Typography>{entry[1]}</Typography>;
    }
  });
};

function DrinkDialog({ drink, handleClose, isOpen }) {
  const classes = useStyles();

  return (
    <Dialog fullWidth open={isOpen} onClose={handleClose}>
      <DialogTitle>{drink.strDrink}</DialogTitle>
      <DialogContent dividers>
        <img
          className={classes.image}
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
        />
        <div>
          <Typography variant='h5'>Ingredients</Typography>
          {renderIngredients(drink)}
        </div>
        <div className={classes.instructionsContainer}>
          <Typography variant='h5'>Instructions</Typography>
          <Typography>{drink.strInstructions}</Typography>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DrinkDialog;
