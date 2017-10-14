import * as Types from '../actions/actionTypes';


const initialState = {
  forms: []
};

const FormsReducer = function(state = initialState, action) {

  switch(action.type) {
    case Types.INIT_FORM:
      return Object.assign({}, state, {
        forms: [...state.forms, {...action.item}]
      });
  }

  return state;
};

export default FormsReducer;
