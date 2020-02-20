import Component from '@ember/component';
import {get, set, computed, observer} from '@ember/object';
import {inject} from '@ember/service';

export default Component.extend({
  propertyData: inject(),
  store: inject(),

  loading: false,
  properties: [],
  searchQuery: '',

  computedPropertyList: computed(
    'properties.[]',
    'selectedProperties.[]',
    function () {
      const properties = get(this, 'properties');
      const selectedProperties = get(this, 'selectedProperties');
      return properties.map((property) => {
        const isInSelectedList = !!selectedProperties
          .findBy('id', property.id);

        return isInSelectedList ?
          {...property, checked: true} :
          {...property, checked: false};
      });
    }
  ),
  propertyTypes: computed(function () {
    return this.store.peekAll('propertyType');
  }),
  selectedProperties: computed(
    'selectedProperties.@each.checked',
    function () {
      return this.store.peekAll('selectedProperty');
    }
  ),

  searchProperties: observer(
    'propertyTypes.@each.checked',
    'searchQuery',
    function () {
      const address = get(this, 'searchQuery');
      const type = get(this, 'propertyTypes')
        .find((type) => type.checked);

      if (address) {
        set(this, 'loading', true);
        this.propertyData.fetchPropertyList(address, type && type.value)
          .then((response) => {
            const properties = response.properties;
            set(this, 'properties', properties);
            set(this, 'loading', false);
          });
      }
    }
  ),

  actions: {
    performSearch(e) {
      const address = get(e, 'target.elements.propertySearchBox.value');
      set(this, 'searchQuery', address);
    },
    onChangePropertySelection(property, e) {
      const onChangePropertySelection = get(this, 'onChangePropertySelection');
      if (onChangePropertySelection) {
        onChangePropertySelection(property, e);
      }
    },
    onChangeTypeSelection(propertyType) {
      const onChangeTypeSelection = get(this, 'onChangeTypeSelection');
      if (onChangeTypeSelection) {
        onChangeTypeSelection(propertyType);
      }
    }
  }
});
