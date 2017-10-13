import { combineReducers } from 'redux';

// Reducers
import ItemsReducer from './ItemsReducer';

// Combine Reducers
var reducers = combineReducers({
  itemsState: ItemsReducer,
});

export default reducers;
