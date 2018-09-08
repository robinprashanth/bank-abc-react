import { GlobalType } from './ActionType';

export function toggleSideMenu() {
  return dispatch => {
    dispatch({
      type: GlobalType.TOGGLE_SIDEBAR
    });
  };
}

