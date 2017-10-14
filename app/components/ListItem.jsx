import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

const ListItem = ({item, beginEditItem}) => (
  <li>
    <img src={item.image} alt={item.title} />
    <h2>{item.title}</h2>
    <p>{item.desc}</p>
    <Link to={`/${item.itemId}`}>Edit</Link>
  </li>
);

// ListItem.propTypes = {
//   item: PropTypes.,
// };

//<button onClick={beginEditItem.bind(null, item.itemId)} className='btn-edit'>Edit</button>

export default ListItem;
