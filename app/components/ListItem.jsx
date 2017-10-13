import React from 'react';
import PropTypes from 'prop-types';


const ListItem = ({item, onEdit}) => (
  <li>
    <img src={item.image} alt={item.title} />
    <h2>{item.title}</h2>
    <p>{item.desc}</p>
    <button onClick={onEdit} className='btn-edit'>Edit</button>
  </li>
);

// ListItem.propTypes = {
//   item: PropTypes.,
// };

export default ListItem;
