import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { set } from '@ember/object';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | search/property-types', function (hooks) {
  setupRenderingTest(hooks);

  const propertyTypes = [
    {
      id: 'a',
      value: 'type1',
      label: 'type one',
      checked: false
    },
    {
      id: 'b',
      value: 'type2',
      label: 'type two',
      checked: false
    },
    {
      id: 'c',
      value: 'type3',
      label: 'type three',
      checked: false
    }
  ];

  test('it renders', async function (assert) {
    assert.expect(10);

    set(this, 'propertyTypes', propertyTypes);
    set(this, 'propertyTypeSelectAction', (type) => {
      assert.ok(type, 'a type is passed to action');
      assert.deepEqual(type, propertyTypes[0], 'the correct property type is passed to action');
    });

    await render(hbs`{{search/property-types
      propertyTypes=propertyTypes
      onChangeTypeSelection=propertyTypeSelectAction
    }}`);

    const headers = this.element.getElementsByTagName('h2');
    const typesList = this.element.getElementsByTagName('button');

    assert.ok(headers.length, 'it has a header');
    assert.ok(headers[0].innerText.includes('Property types'), 'it has the correct header');
    assert.equal(typesList[1].nodeName, 'BUTTON', 'it generates buttons');
    assert.equal(typesList.length, 4, 'it generates the correct number of buttons');
    assert.ok(typesList[1].innerText.includes('type one'), 'it renders button with propertyType.label');
    assert.ok(typesList[0].className.includes('active'), 'the default button is set to active when none of the peoperty types are checked');

    await click(typesList[1]);

    set(propertyTypes, 'lastObject.checked', true);
    set(this, 'propertyTypes', propertyTypes);
    await render(hbs`{{search/property-types propertyTypes=propertyTypes}}`);

    assert.notOk(typesList[0].className.includes('active'), 'the default button is set to active when none of the peoperty types are checked');
    assert.ok(typesList[3].className.includes('active'), 'the button with checked property has active css class');
  });
});
