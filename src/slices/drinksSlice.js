import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const initialState = {
  loading: false,
  drinks: [],
  searchDrinkInput: '',
};

export const getDrinkByName = createAsyncThunk(
  'drinks/getDrinkByName',
  async (drinkName, { dispatch }) => {
    try {
       dispatch(setLoading());
      const {
        data: { drinks },
      } = await api.get('/search.php', { params: { s: drinkName } });
      return drinks;
    } catch (error) {}
  }
);

export const getDrinkByIngredient = createAsyncThunk(
  'drinks/getDrinkByIngredient',
  async (ingredient, { dispatch }) => {
    try {
      dispatch(setLoading());
      const {
        data: { drinks },
      } = await api.get('/filter.php', { params: { i: ingredient } });
      const filteredDrinksPromises = drinks.map((drink) => {
        return api.get('/lookup.php', { params: { i: drink.idDrink } }).then(response => response.data.drinks);
      });
      const response = await Promise.all(filteredDrinksPromises);
      const filteredDrinks = response.map(item => item[0])
      return filteredDrinks;
    } catch (error) {}
  }
);

const drinksSlice = createSlice({
  name: 'drinks',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    getAllDrinksSuccess: (state, { payload }) => {
      state.drinks = payload;
      state.loading = false;
    },
    updateDrinkInput: (state, { payload }) => {
      state.searchDrinkInput = payload;
    },
  },
  extraReducers: {
    [getDrinkByName.fulfilled]: (state, { payload }) => {
      state.drinks = payload;
      state.loading = false;
    },
    [getDrinkByIngredient.fulfilled]: (state, { payload }) => {
        state.drinks = payload;
        state.loading = false;
    }
  },
});

export const {
  updateDrinkInput, setLoading, getAllDrinksSuccess
} = drinksSlice.actions;
export const drinksSelector = (state) => state;
export default drinksSlice.reducer;

export function fetchDrinks() {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const response = await api.get('/search.php', { params: { f: 'a' } });
      dispatch(getAllDrinksSuccess(response.data.drinks));
    } catch (error) {}
  };
}
