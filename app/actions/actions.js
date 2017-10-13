import * as Types from '../actions/actionTypes';


export function getItemsSuccess(items) {
  return dispatch => {
    dispatch(setItems(items));
  };
}

export function setItems(items) {
  return {
    type: Types.SET_ITEMS,
    items
  };
}
