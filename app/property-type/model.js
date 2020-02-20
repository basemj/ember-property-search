import DS from 'ember-data';

const {attr} = DS;

export default DS.Model.extend({
  label: attr('string'),
  value: attr('string'),
  checked: attr('boolean')
});
