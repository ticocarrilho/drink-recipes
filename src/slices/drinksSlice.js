import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const initialState = {
    loading: false,
    drinks: [],
    searchDrinkInput: ''
}

export const getDrinkByName = createAsyncThunk(
    'drinks/getDrinkByName',
    async (drinkName, thunkAPI) => {
        try {
            const response = await api.get('/search.php', { params: { s: drinkName } });
            return response.data.drinks
        } catch (error) {
            
        }
    }
);

const drinksSlice = createSlice({
    name: 'drinks',
    initialState,
    reducers: {
        getAllDrinks: (state) => {
            state.loading = true;
        },
        getAllDrinksSuccess: (state, { payload }) => {
            state.drinks = payload
            state.loading = false;
        },
        updateDrinkInput: (state, { payload }) => {
            state.searchDrinkInput = payload;
        },
    },
    extraReducers: {
        [getDrinkByName.fulfilled]: (state, { payload }) => {
            state.drinks = payload;
        }
    }
})

export const { getAllDrinks, getAllDrinksSuccess, updateDrinkInput } = drinksSlice.actions;
export const drinksSelector = (state) => state;
export default drinksSlice.reducer;

export function fetchDrinks(){
    return async (dispatch) => {
        dispatch(getAllDrinks());
        try {
            const response = await api.get('/filter.php', { params: { a: 'Alcoholic' }});
            dispatch(getAllDrinksSuccess(response.data.drinks));
        } catch (error) {
            
        }
    }
}