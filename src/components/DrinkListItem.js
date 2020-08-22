import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 290,
    height: 350,
    [theme.breakpoints.down('sm')]: {
      height: 365,
    },
  },
  image: {
    height: 250,
    width: '100%',
  },
}));

function DrinkListItem({ drink }) {
  const classes = useStyles();

  return (
    <Grid item xs={6} md={3}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.image} image={drink.strDrinkThumb} />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {drink.strDrink}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default DrinkListItem;
