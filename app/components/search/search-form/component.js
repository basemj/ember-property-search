import Component from '@ember/component';
import {get} from '@ember/object';

export default Component.extend({
  actions: {
    onFormSubmit(e) {
      e.preventDefault();
      const onFormSubmit = get(this, 'onFormSubmit');
      if (onFormSubmit) {
        onFormSubmit(e);
      }
    }
  }
});
