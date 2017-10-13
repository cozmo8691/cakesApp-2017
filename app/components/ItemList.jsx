import React from 'react';
import PropTypes from 'prop-types';

import ListItem from './ListItem';

export default ({items, ...rest}) => (
  <ul className='item-list'>
    {items.map((item, i) =>
      !item.hidden &&
        <ListItem 
          key={i}
          item={item}
        />
    )}
  </ul>
);

