import axios from 'axios';
import settings from '../config/settings';

export default {

  loadData() {
    return axios.get(settings.itemsURL);
  }

};