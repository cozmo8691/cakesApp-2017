import React from 'react';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    window.addEventListener('keydown', this._handleModalKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleModalKeyDown);
  }

  _handleModalKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.props.onClose();
    }
  };

  render() {
    const {
      children,
      heading,
      onClose
    } = this.props;

    return (
      <div className='modal-show'>
        <div className='modal'>
          <h3>{heading}</h3>
          <button
            className="close-button"
            onKeyDown={this._handleKeyDown}
            onClick={onClose}>x</button>
          <div className='modal-content'>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
