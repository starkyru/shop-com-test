import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShopCategory } from '../../types';

export type SetCategoriesListAction = PayloadAction<ShopCategory[]>;

export interface CategoriesState {
  list: ShopCategory[] | null;
}

export const counterSlice = createSlice({
  name: 'categories',
  initialState: {
    list: [],
  },
  reducers: {
    setCategoriesList: (
      state: CategoriesState,
      action: SetCategoriesListAction,
    ) => {
      state.list = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategoriesList } = counterSlice.actions;

export default counterSlice.reducer;
