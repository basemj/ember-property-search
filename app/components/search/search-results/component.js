import Component from '@ember/component';
import {get} from '@ember/object';

export default Component.extend({
  actions: {
    onChangePropertySelection(property, e) {
      const onChangePropertySelection = get(this, 'onChangePropertySelection');
      if (onChangePropertySelection) {
        onChangePropertySelection(property, e);
      }
    }
  }
});
