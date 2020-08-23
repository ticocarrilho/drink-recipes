import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DrinkDialog from './DrinkDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 290,
    height: 350,
    [theme.breakpoints.down('sm')]: {
      height: 365,
    },
  },
  image: {
    height: 275,
    width: '100%',
    marginTop: -10,
    [theme.breakpoints.down('sm')]:  {
      marginTop: -20
    }
  },
}));

function DrinkListItem({ drink }) {
  const [openDialog, setOpenDialog] = useState(false);
  const classes = useStyles();

  const toggleDialog = () => setOpenDialog(!openDialog);

  return (
    <Grid item xs={6} md={3}>
      <DrinkDialog drink={drink} isOpen={openDialog} handleClose={toggleDialog}/>
      <Card>
        <CardActionArea className={classes.root} onClick={toggleDialog}>
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
