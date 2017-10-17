import React from 'react';
import PropTypes from 'prop-types';
import settings from '../config/settings';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: props.item
    };
  }

  componentWillMount() {
    window.addEventListener('keydown', this._handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleKeyDown);
  }

  _handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this._saveItem(this.state.item);
    }
  };

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
    const {title} = this.props.item;
    const heading = title ? `Editing ${title}`
      : `Adding a New ${settings.entity}`;

    return (
      <form>
        <legend>{heading}</legend>
        {Object.keys(item)
          .filter(key => key !== 'hidden')
          .map((key, i) =>
            <div className={`form-row ${key}`} key={key}>
              <label>{key}</label>
              <input value={item[key]}
                type='text'
                onChange={e => {
                 this._updateValue(key, e.target.value);
                }}
                autoFocus={i === 0}
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
