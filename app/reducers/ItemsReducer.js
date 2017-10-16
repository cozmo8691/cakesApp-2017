import uuid from 'js-uuid';
import find from 'lodash/find';

import * as Types from '../actions/actionTypes';
import * as modes from '../config/modes';

const initialState = {
  items: [],
  editItemId: null,
  requestStatus: modes.IDLE
};

const ItemsReducer = function(state = initialState, action) {

  switch(action.type) {
    case Types.UPDATE_FETCH_ITEMS_STATUS:
      return Object.assign({}, state, {
        requestStatus: action.nextStatus
      });

    case Types.UPDATE_EDIT_ITEM_ID:
      return Object.assign({}, state, {
        editItemId: action.itemId
      });

    case Types.LOAD_ITEMS:
      return Object.assign({}, state, {
        items: items(action.items, action)
      });

    case Types.SAVE_ITEM:
    case Types.FILTER_ITEMS:
      return Object.assign({}, state, {
        items: items(state.items, action)
      });
  }

  return state;
};

function items(state = [], action) {
  switch (action.type) {
    case Types.LOAD_ITEMS:
      return state
        .map(item => (
          Object.assign({}, item, {
            itemId: uuid()
          })
        ));

    case Types.SAVE_ITEM:
      if (find(state, item => item.itemId === action.item.itemId)) {
        return state
          .map(item => (
            item.itemId === action.item.itemId ?
              Object.assign({}, item, action.item)
              : item
          ));
      }

      return [...state, action.item];

    case Types.FILTER_ITEMS:
      return state
        .map(item => Object.assign({}, item, {
            hidden: item.title.toLowerCase()
              .indexOf(action.searchTerm.toLowerCase()) === -1
          }
        ));

    default:
      return state;
  }
}

export default ItemsReducer;
