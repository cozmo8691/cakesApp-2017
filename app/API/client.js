import 'whatwg-fetch';

import store from '../store';
import { getItemsSuccess } from '../actions/actions';




function apiError (status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

// dispatch error action here
function filterAPIError(res) {
  if (res.status > 399) {
    return res.json().then(function (json) {
      throw apiError(res.status, json.message);
    });
  }

  return res.json();
}

function onAPIResponse (json) {

  // dispatch success action

  console.log(json);
  store.dispatch(getItemsSuccess(json));

  // return {
  //   hello: json.hello.toUpperCase()
  // };
}


export const loadItems = (path) => {
  return fetch(path)
    .then(filterAPIError);
    //.then(onAPIResponse);
};