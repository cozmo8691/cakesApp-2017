import * as Types from '../actions/actionTypes';


export function fetchItemsSuccess(items) {
  return dispatch => {
    dispatch(loadItems(items));
  };
}

export function loadItems(items) {
  return {
    type: Types.LOAD_ITEMS,
    items
  };
}

export function beginEditItem(itemId) {
  return {
    type: Types.BEGIN_EDIT_ITEM,
    itemId
  };
}

export function cancelEditItem() {
  return {
    type: Types.CANCEL_EDIT_ITEM
  };
}
