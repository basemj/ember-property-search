import Route from '@ember/routing/route';
import {inject} from '@ember/service';
import {get} from '@ember/object';

export default Route.extend({
  propertyData: inject(),
  store: inject(),

  pushRecords() {
    const propertyTypes = this.propertyData.fetchPropertyTypesList();
    this.store.pushPayload('propertyType', {propertyTypes});
  },

  beforeModel() {
    return this.pushRecords();
  },

  actions: {
    updatePropertySelection(property, e) {
      const checked = get(e, 'target.checked');
      this.propertyData.updatePropertySelection(property, checked);
    },
    updatePropertyTypesSelection(propertyType) {
      const value = get(propertyType, 'value');
      this.propertyData.updatePropertyTypesSelection(value);
    }
  }
});
