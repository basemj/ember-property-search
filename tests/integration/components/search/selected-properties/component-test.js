import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | search/selected-properties', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{search/selected-properties}}`);

    assert.equal(this.element.querySelector('h2').textContent.trim(), 'Selected properties', 'it renders the header');
  });
});
