import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | page-header', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{page-header}}`);

    assert.equal(
      this.element.textContent.trim(),
      'Property search tool',
      'Page header appears correctly'
    );

    assert.ok(
      this.element.querySelector('#logo'),
      'Page header appears correctly'
    );
  });
});
