import React, { Component } from 'react';
import PropTypes from 'prop-types';

import store from '../store';
import { getItemsSuccess } from '../actions/actions';

import {loadItems} from '../API/client';

export default class MainContainer extends Component {


  componentDidMount() {
    loadItems('http://localhost:3001/cakes')
      .then((json) => {
        console.log(json);
        store.dispatch(getItemsSuccess(json));
      }
  );
    //client('https://gist.githubusercontent.com/hart88/198f29ec5114a3ec3460/raw/8dd19a88f9b8d24c23d9960f3300d0c917a4f07c/cake.json');
  }

  render() {
    return (
      <div>
        MainContainer - success
        {this.props.children}
      </div>
    );
  }
}

MainContainer.propTypes = {
  children: PropTypes.any.isRequired,
};
