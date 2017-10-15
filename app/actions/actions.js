import * as Types from '../actions/actionTypes';
import * as modes from '../config/modes';
import itemsAPI from '../API/itemsAPI';


export function fetchItems() {
  return dispatch => {
    itemsAPI.loadData()
      .done((response) => {
        dispatch(fetchItemsSuccess(response));
      })
      .fail((response) => {
        dispatch(updateFetchItemsStatus(modes.DONE_FAIL));
      });
  }
}

export function updateFetchItemsStatus(nextStatus) {
  return {
    type: Types.UPDATE_FETCH_ITEMS_STATUS,
    nextStatus
  };
}


export function fetchItemsSuccess(items) {
  return dispatch => {
    dispatch(loadItems(items));
    dispatch(updateFetchItemsStatus(modes.DONE_SUCCESS));
  };
}

export function loadItems(items) {
  return {
    type: Types.LOAD_ITEMS,
    items
  };
}

export function saveItem(item) {
  return {
    type: Types.SAVE_ITEM,
    item
  };
}

export function filterItems(searchTerm) {
  return {
    type: Types.FILTER_ITEMS,
    searchTerm
  };
}

export function updateEditItemId(itemId) {
  return {
    type: Types.UPDATE_EDIT_ITEM_ID,
    itemId
  };
}
