import React from 'react';


export default class Form extends React.Component {
  constructor(props) {
    super(props);

    console.log(props)

    this.state = {
      item: props.item.itemId !== '' ? props.item : Object.assign({}, props.item, {
        itemId: props.itemId
      })
    };
  }

  _updateValue = (key, nextValue) => {
    this.setState({item:
      Object.assign({}, this.state.item,
        {[key]: nextValue})
    })
  };

  _saveItem = (item) => {
    const {saveItem, cancelModal} = this.props;
    saveItem(item);
    cancelModal();
  };

  render() {
    const {item} = this.state;
    const {saveItem} = this.props;

    return (
      <form>
        {Object.keys(item).map(key =>
          <input key={key}
            value={item[key]}
            onChange={e => {this._updateValue(key, e.target.value)}}
          />
        )}
        <div onClick={this._saveItem.bind(null, item)}>Save</div>
      </form>
    )
  }
}
