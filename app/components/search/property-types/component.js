import Component from '@ember/component';
import {get, computed} from '@ember/object';

export default Component.extend({
  typeSelected: computed.filter('propertyTypes.@each.checked', function (type) {
    return type.checked === true;
  }),
  allActive: computed.empty('typeSelected'),
  actions: {
    onChangeTypeSelection(propertyType) {
      const onChangeTypeSelection = get(this, 'onChangeTypeSelection');
      if (onChangeTypeSelection) {
        onChangeTypeSelection(propertyType);
      }
    }
  }
});
