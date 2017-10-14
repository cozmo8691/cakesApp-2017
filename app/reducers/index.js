import {combineReducers} from 'redux';

import ItemsReducer from './ItemsReducer';
import FormsReducer from './FormsReducer';

const reducers = combineReducers({
  itemsState: ItemsReducer,
  formsState: FormsReducer
});

export default reducers;
