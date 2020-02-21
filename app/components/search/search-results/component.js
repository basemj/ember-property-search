import Component from '@ember/component';
import {get, computed} from '@ember/object';

export default Component.extend({
  properties: [],
  errorMessage: '',
  resultsMessage: computed(
    'errorMessage',
    function () {
      return get(this, 'errorMessage') || 'No results to display';
    }
  ),
  actions: {
    onChangePropertySelection(property, e) {
      const onChangePropertySelection = get(this, 'onChangePropertySelection');
      if (onChangePropertySelection) {
        onChangePropertySelection(property, e);
      }
    }
  }
});
