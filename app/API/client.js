import 'whatwg-fetch';

import store from '../store';
import * as modes from '../config/modes';
import {
  getItemsSuccess,
  updateFetchItemsStatus
} from '../actions/actions';




function apiError (status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

// dispatch error action here
function filterAPIError(res) {
  if (res.status > 399) {
    store.dispatch(updateFetchItemsStatus(modes.DONE_FAIL));
    return res.json().then(function (json) {
      throw apiError(res.status, json.message);
    });
  }

  return res.json();
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function onAPIResponse (res) {



  // dispatch success action
  return res.json();
  //console.log(json);
  //store.dispatch(getItemsSuccess(json));

  // return {
  //   hello: json.hello.toUpperCase()
  // };
}


export const loadItems = (path) => {
  return fetch(path)
    //.then(filterAPIError);
    .then(onAPIResponse);
};