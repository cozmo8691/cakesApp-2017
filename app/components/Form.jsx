import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: props.item
    };
  }

  _updateValue = (key, nextValue) => {
    this.setState({item:
      Object.assign({}, this.state.item,
        {[key]: nextValue})
    });
  };

  _saveItem = (item) => {
    const {saveItem, cancelModal} = this.props;
    saveItem(item);
    cancelModal();
  };

  render() {
    const {item} = this.state;

    return (
      <form>
        {Object.keys(item).map(key =>
          <div className={`form-row ${key}`} key={key}>
            <label>{key}</label>
            <input value={item[key]}
              type='text'
              onChange={e => {this._updateValue(key, e.target.value);}}
            />
          </div>
        )}
        <div className='btn btn-save'
          onClick={this._saveItem.bind(null, item)}>Save</div>
      </form>
    );
  }
}

Form.propTypes = {
  saveItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  cancelModal: PropTypes.func.isRequired
};

Form.defaultProps = {
  item: {}
};

export default Form;
