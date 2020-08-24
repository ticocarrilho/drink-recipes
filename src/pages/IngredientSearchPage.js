import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Navbar from '../components/Navbar';
import DrinkList from '../components/DrinkList';

const useStyles = makeStyles((theme) => ({
  root: {
      marginTop: theme.spacing(3)
    },
}));

function IngredientSearchPage() {
  const classes = useStyles();
  return (
    <>
      <Navbar ingredient />
      <Container className={classes.root}>
        <DrinkList />
      </Container>
    </>
  );
}

export default IngredientSearchPage;
