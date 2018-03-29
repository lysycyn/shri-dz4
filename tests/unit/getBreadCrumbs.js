/* eslint-disable func-names */
/* eslint-disable no-undef */
const { expect, assert } = require('chai');
const { getBreadcrumbs } = require('../../utils/helpers');

describe('Функция utils/helpers/getBreadcrumbs', () => {
  let result;
  const string = '/dir1/dir2/anotherDir/file.txt';

  it('Должна возвращать массив объектов', () => {
    result = getBreadcrumbs(string);
    expect(result).to.be.a('array');
    result.map((branch) => {
      expect(branch).to.be.a('object');
    });
  });

  it('Каждый объект имеет 2 поля - path, name', () => {
    result = getBreadcrumbs(string);
    result.map((breadcrumb) => {
      expect(Object.keys(breadcrumb).length).to.equal(2);
      assert.hasAllKeys(breadcrumb, ['path', 'name']);
    });
  });

  it('Первый элемент имеет вид {path: \'\', name: \'/\'}', () => {
    result = getBreadcrumbs(string);
    expect(result[0]).to.deep.equal({ path: '', name: '/' });
  });
});
