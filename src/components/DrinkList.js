import React, { useEffect, useCallback } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import DrinkListItem from './DrinkListItem';
import { useSelector, useDispatch } from 'react-redux';
import { drinksSelector, fetchDrinks } from '../slices/drinksSlice';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  loadingIcon: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(3),
  },
}));

const LoadingMessage = ({ classIcon }) => {
  return (
    <>
      <h1>Loading...</h1>
      <div className={classIcon}>
        <CircularProgress size='2rem' />
      </div>
    </>
  );
};

const renderDrinkList = (drinks) => {
  return drinks.map((drink, i) => <DrinkListItem key={i} drink={drink} />);
};

function DrinkList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { drinks, loading } = useSelector(drinksSelector);

  const fetchDrinksCallback = useCallback(() => {
    dispatch(fetchDrinks());
  }, [dispatch]);

  useEffect(() => {
    fetchDrinksCallback();
  }, [fetchDrinksCallback]);

  return (
    <Grid container spacing={3}>
      {loading ? (
        <LoadingMessage classIcon={classes.loadingIcon} />
      ) : (
        renderDrinkList(drinks)
      )}
    </Grid>
  );
}

export default DrinkList;
