import categoriesReducer, {
  CategoriesState,
} from './modules/Categories/categoriesReducer';

export interface StoreState {
  catalog: CategoriesState;
}

export const createRootReducer = (): any => ({
  categories: categoriesReducer,
});
