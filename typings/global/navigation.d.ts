import { RootNavigationParamList } from '../../src/types/navigationTypes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNavigationParamList {}
  }
}
