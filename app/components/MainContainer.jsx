import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import find from 'lodash/find';
import {browserHistory} from 'react-router';

import {loadItems} from '../API/client';
import ItemList from './ItemList';
import Modal from './Modal';
import Form from './Form';
import {
  fetchItemsSuccess
} from '../actions/actions';

const itemTemplate = {title: '', desc: '', image: ''};


class MainContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //loadItems('http://localhost:3001/cakes')
    loadItems('https://gist.githubusercontent.com/hart88/198f29ec5114a3ec3460/raw/8dd19a88f9b8d24c23d9960f3300d0c917a4f07c/cake.json')
      .then((json) => {
        console.log(json);
        this.props.dispatch(fetchItemsSuccess(json));
      }
    );
  }

  _cancelEdit = () => {
    browserHistory.push('/');
  };

  render() {

    const {
      editItem
    } = this.props;

    return (
      <div>
        <header>Main Header</header>
        <ItemList {...this.props} />
        {
          editItem !== null &&
            <Modal
              item={editItem}
              onClose={this._cancelEdit}>
              <Form />
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
    return !id ? null : Object.assign(itemTemplate,
      find(store.itemsState.items,
        item => item.itemId === id
      )
    )
  }

  return {
    items: store.itemsState.items,
    editItem: getItemById(ownProps.params.id)
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    dispatch
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);

