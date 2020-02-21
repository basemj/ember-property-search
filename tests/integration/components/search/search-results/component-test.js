import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { set } from '@ember/object';

module('Integration | Component | search/search-results', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    set(this, 'properties', [
      {
        id: '1',
        address: 'an address',
        postcode: 'PO57',
        numberOfRooms: 5,
        propertyType: 'Flat',
        floorArea: 120
      }
    ]);
    await render(hbs`{{search/search-results properties=properties}}`);

    const table = this.element.querySelector('table');

    assert.ok(table, 'it generates a table');
    assert.ok(table.rows.length > 1, 'it generates at least one table record');
  });
});
