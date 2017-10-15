import React from 'react';
import {expect} from 'chai';
import {describe, it} from 'mocha';
import {mount} from 'enzyme';
import {Provider, connect} from 'react-redux';
import store from '../app/store';
import find from 'lodash/find';

import {MainContainer} from '../app/components/MainContainer';

import {
  fetchItems,
  saveItem,
  filterItems,
  updateFetchItemsStatus,
  updateEditItemId
} from '../app/actions/actions';

const itemTemplate = {title: '', desc: '', image: '', itemId: ''};

const itemData = [
  {
    "title":"Lemon cheesecake",
    "desc":"A cheesecake made of lemon.",
    "image":"cake.jpg"
  },
  {
    "title":"Chocolate cake",
    "desc":"There goes my diet.",
    "image":"cake.jpg"
  },
  {
    "title":"Carrot cake",
    "desc":"A healthier option.",
    "image":"cake.jpg"
  }
];


describe('MainContainer', function() {

  let server;
  let wrapper;
  let TestMainContainer;

  before(function() {
    server = sinon.fakeServer.create();

    const mapStateToProps = function(store) {
      function getEditItem(id) {
        if (!id) {
          return null;
        }
        // set up default item template object
        const editItem = Object.assign({}, itemTemplate, {itemId: id});
        //if we can find it we're editing so return the item object
        return Object.assign({}, editItem,
          find(store.itemsState.items,
            item => item.itemId === id
          )
        )
      }

      return {
        items: store.itemsState.items,
        item: getEditItem(store.itemsState.editItemId),
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
        },
        updateEditItemId: itemId => {
          dispatch(updateEditItemId(itemId))
        }
      }
    };

    TestMainContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(MainContainer);

    wrapper = mount(
      <Provider store={store}>
        <TestMainContainer />
      </Provider>);

    server.requests[0].respond(200,
      { "Content-Type": "application/json" },
      JSON.stringify(itemData)
    );
  });

  after(function() {
    server.restore();
  });

  it('Bootstraps with remote data', function(done) {
    expect(wrapper.find('ul li').length, 'should be a list of items').to.equal(itemData.length);
    done();
  });

  it('Filters items', function(done) {
    let ev = {target: {value: 'lemon'}};
    const searchInput = wrapper.find('.search-input').at(0);

    searchInput.simulate('change', ev);
    expect(wrapper.find('ul li').length, 'should have filtered the list of items').to.equal(1);

    ev = {target: {value: ''}};
    searchInput.simulate('change', ev);
    expect(wrapper.find('ul li').length, 'should be a list of items').to.equal(itemData.length);

    done();
  });

  it('Edits an item', function(done) {
    const newValue = 'success';
    const ev = {target: {value: newValue}};
    expect(wrapper.find('.modal-wrapper').length, 'modal should now be there').to.equal(0);

    const editBtn = wrapper.find('.btn-edit').at(0);
    editBtn.simulate('click', {});

    expect(wrapper.find('.modal-wrapper').length, 'modal should now be there').to.equal(1);

    const titleInput = wrapper.find('form input').at(0);

    titleInput.simulate('change', ev);

    const saveBtn = wrapper.find('.btn-save').at(0);
    saveBtn.simulate('click', {});

    const updatedTitle = wrapper.find('h2').at(0);
    expect(updatedTitle.text()).to.equal(newValue);

    expect(wrapper.find('.modal-wrapper').length, 'modal should now be there').to.equal(0);

    done();
  });

  it('Adds an item', function(done) {
    const newValue = 'success';
    const ev = {target: {value: newValue}};

    const addBtn = wrapper.find('.btn-add').at(0);
    addBtn.simulate('click', {});

    expect(wrapper.find('.modal-wrapper').length, 'modal should now be there').to.equal(1);

    const titleInput = wrapper.find('form input').at(0);

    titleInput.simulate('change', ev);

    const saveBtn = wrapper.find('.btn-save').at(0);
    saveBtn.simulate('click', {});

    expect(wrapper.find('ul li').length, 'should be a list of items').to.equal(itemData.length + 1);

    const updatedTitle = wrapper.find('h2').at(itemData.length);
    expect(updatedTitle.text()).to.equal(newValue);

    done();
  });


});
