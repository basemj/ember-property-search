import DS from 'ember-data';

const {attr} = DS;

export default DS.Model.extend({
  address: attr('string'),
  propertyType: attr('string'),
  numberOfRooms: attr('number'),
  floorArea: attr('number'),
  postcode: attr('string')
});
