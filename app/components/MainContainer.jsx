import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import store from '../store';
import {loadItems} from '../API/client';
import ItemList from './ItemList';
import {
  fetchItemsSuccess,
  beginEditItem
} from '../actions/actions';

class MainContainer extends Component {


  componentDidMount() {
    loadItems('http://localhost:3001/cakes')
    //loadItems('https://gist.githubusercontent.com/hart88/198f29ec5114a3ec3460/raw/8dd19a88f9b8d24c23d9960f3300d0c917a4f07c/cake.json')
      .then((json) => {
        console.log(json);
        store.dispatch(fetchItemsSuccess(json));
      }
    );
  }

  render() {
    return (
      <div>
        <header>Main Header</header>
        <ItemList {...this.props} />
      </div>
    );
  }
}

// MainContainer.propTypes = {
//   children: PropTypes.any.isRequired,
// };


const mapStateToProps = function(store) {
  return {
    items: store.itemsState.items,
    itemId: store.itemsState.itemId
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    dispatch,
    beginEditItem: (itemId) => {
      dispatch(beginEditItem(itemId));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);

