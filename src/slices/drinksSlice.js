import { createSlice } from '@reduxjs/toolkit';
import api from '../services/api';

export const initialState = {
    loading: false,
    drinks: [],
}

const drinksSlice = createSlice({
    name: 'drinks',
    initialState,
    reducers: {
        getAllProdutos: (state) => {
            state.loading = true;
        },
        getAllProdutosSucess: (state, { payload }) => {
            state.drinks = payload
            state.loading = false;
        }
    }
})

export const { getAllProdutos, getAllProdutosSucess } = drinksSlice.actions;
export const drinksSelector = (state) => state;
export default drinksSlice.reducer;

export function fetchDrinks(){
    return async (dispatch) => {
        dispatch(getAllProdutos());
        try {
            const response = await api.get('/filter.php', { params: { a: 'Alcoholic' }});
            dispatch(getAllProdutosSucess(response.data.drinks));
        } catch (error) {
            
        }
    }
}