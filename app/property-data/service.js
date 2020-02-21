import Service, {inject} from '@ember/service';
import {setProperties} from '@ember/object';

import {
  fetchProperties,
  fetchPropertyDetails,
  getAvailablePropertyTypes
} from '../utils/api';

export default Service.extend({
  store: inject(),

  fetchPropertyList(address, propertyType) {
    return fetchProperties({address, propertyType})
      .then((response) => {
        const propertyIds = response.properties &&
          response.properties.map((property) => property.id);
        return fetchPropertyDetails(propertyIds);
      });
  },

  fetchPropertyTypesList() {
    return getAvailablePropertyTypes().map((propertyType) => {
      setProperties(propertyType, {
        checked: false,
        id: propertyType.value
      });
      return propertyType;
    });
  },

  updatePropertySelection(property, checked) {
    if (checked) {
      this.store.pushPayload('selectedProperty', {selectedProperties: [property]});
    } else {
      const record = this.store.peekRecord('selectedProperty', property.id);
      record.unloadRecord();
    }
  },

  updatePropertyTypesSelection(val) {
    const currentPropertyTypes = this.store.peekAll('propertyType');
    const propertyTypes = currentPropertyTypes.map(({id, label, value}) => {
      return {
        id,
        label,
        value,
        checked: value === val
      };
    });

    this.store.pushPayload('propertyType', {propertyTypes});
  },
});
