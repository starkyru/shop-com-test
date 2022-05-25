import { AppState } from '../../store';

export const selectAllCategories = (state: AppState) => state.categories.list;
export const selectFetchCategoriesStatus = (state: AppState) =>
  state.categories.status;
