import Component from '@ember/component';
import {get, set, computed} from '@ember/object';
import {inject} from '@ember/service';

export default Component.extend({
  propertyData: inject(),
  store: inject(),

  loading: false,
  properties: [],
  propertyTypes: [],
  searchQuery: '',

  init() {
    this._super();
    const propertyTypes = this.store.peekAll('propertyType');
    set(this, 'propertyTypes', propertyTypes);
  },

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
  selectedProperties: computed(
    'selectedProperties.@each.checked',
    function () {
      return this.store.peekAll('selectedProperty');
    }
  ),

  fetchNewData() {
    const address = get(this, 'searchQuery');
    const loading = get(this, 'loading');
    const propertyTypes = this.store.peekAll('propertyType');
    const type = propertyTypes.find((type) => type.checked === true);

    if (address && !loading) {
      set(this, 'loading', true);
      this.propertyData.fetchPropertyList(address, type && type.value)
        .then((response) => {
          const properties = response.properties;
          set(this, 'properties', properties);
          set(this, 'loading', false);
        });
    }
  },

  actions: {
    performSearch(e) {
      const address = get(e, 'target.elements.propertySearchBox.value');
      set(this, 'searchQuery', address);
      this.fetchNewData();
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
      this.fetchNewData();
    }
  },
});
