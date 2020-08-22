import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import api from '../services/api'
import DrinkListItem from './DrinkListItem';

const renderDrinkList = (drinks) => {
    return drinks.map((drink, i) => <DrinkListItem key={i} drink={drink}/>)
}

function DrinkList() {
    const [drinks, setDrinks] = useState([])
    useEffect(() => {
        const getDrinks = async () => {
            const result = await api.get('/filter.php', { params: { a: 'Alcoholic' }})
            setDrinks(result.data.drinks);
            console.log(result.data.drinks)
        }
        getDrinks();
        console.log(drinks)
    }, [])

  return (
    <Grid container spacing={3}>
    {renderDrinkList(drinks)}
    </Grid>
  );
}

export default DrinkList;
