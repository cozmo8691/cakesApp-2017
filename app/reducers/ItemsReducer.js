import uuid from 'js-uuid';

import * as Types from '../actions/actionTypes';
import * as modes from '../config/modes';

const initialState = {
  items: [],
  requestStatus: modes.IDLE,
  itemId: null,
  showModal: false
};

const ItemsReducer = function(state = initialState, action) {

  switch(action.type) {
    case Types.LOAD_ITEMS:
      return Object.assign({}, state, {
        items: items(action.items, action)
      });

    case Types.BEGIN_EDIT_ITEM:
      return Object.assign({}, state, {
        itemId: action.itemId
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

    default:
      return state
  }
}

export default ItemsReducer;
