import React from 'react';
import PropTypes from 'prop-types';

import ListItem from './ListItem';

//export default ({items, ...rest}) => (

export default class ItemList extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const {items} = this.props;

    return (<ul className='item-list'>
      {items.map((item, i) =>
        !item.hidden &&
        <ListItem key={i}
          item={item}
        />
      )}
    </ul>)
  }

}

