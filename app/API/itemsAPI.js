import $ from 'jquery';
import settings from '../config/settings';

export default {

  loadData() {
    return $.ajax({
      method: 'GET',
      url: settings.itemsURL,
      dataType: 'json'
    });
  }

};