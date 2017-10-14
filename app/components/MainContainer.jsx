import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import find from 'lodash/find';
import {browserHistory, Link} from 'react-router';
import uuid from 'js-uuid';

import * as modes from '../config/modes';
import {loadItems} from '../API/client';
import ItemList from './ItemList';
import Modal from './Modal';
import Form from './Form';
import {
  fetchItemsSuccess,
  saveItem,
  filterItems,
  updateFetchItemsStatus
} from '../actions/actions';

const itemTemplate = {title: '', desc: '', image: '', itemId: ''};


class MainContainer extends Component {

  constructor(props) {
    super(props);

    const {dispatch} = props;
    dispatch(updateFetchItemsStatus(modes.PENDING));

    //loadItems('http://localhost:3001/cakes')
    loadItems('https://gist.githubusercontent.com/hart88/198f29ec5114a3ec3460/raw/8dd19a88f9b8d24c23d9960f3300d0c917a4f07c/cake.json')
      .then((json) => {
        dispatch(fetchItemsSuccess(json));
      })
      .catch(() => {
        dispatch(updateFetchItemsStatus(modes.DONE_FAIL));
      });
  }

  componentDidMount() {

  }

  _cancelModal = () => {
    browserHistory.push('/');
  };

  render() {
    const {
      item,
      requestStatus,
      filterItems
    } = this.props;

    const {items, ...props} = this.props;
    // todo: debounce search

    return (
      <div>
        <header>
          <Link to={`/${uuid()}`}>Add new item</Link>
          <input type='text'
            onChange={e => {filterItems(e.target.value)}}
          />
        </header>
        <div>{requestStatus}</div>
        <ItemList items={items} />
        {
          item !== null &&
            <Modal
              onClose={this._cancelModal}>
              <Form
                {...props}
                cancelModal={this._cancelModal}
              />
            </Modal>
        }
      </div>
    );
  }
}

// MainContainer.propTypes = {
//   children: PropTypes.any.isRequired,
// };


const mapStateToProps = function(store, ownProps) {

  function getItemById(id) {
    return !id ? null : Object.assign({}, itemTemplate,
      find(store.itemsState.items,
        item => item.itemId === id
      )
    )
  }

  return {
    items: store.itemsState.items,
    item: getItemById(ownProps.params.id),
    requestStatus: store.itemsState.requestStatus
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    dispatch,
    saveItem: item => {
      dispatch(saveItem(item))
    },
    filterItems: searchTerm => {
      dispatch(filterItems(searchTerm))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);