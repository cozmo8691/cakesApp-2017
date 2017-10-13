import * as Types from '../actions/actionTypes';
import * as modes from '../config/modes';

const initialState = {
  items: [],
  mode: modes.IDLE
};

const ItemsReducer = function(state = initialState, action) {

  switch(action.type) {
    case Types.SET_ITEMS:
      return Object.assign({}, state, {items: action.items});
    }
  return state;
};

export default ItemsReducer;
