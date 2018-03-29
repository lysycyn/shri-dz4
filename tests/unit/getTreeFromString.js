/* eslint-disable func-names */
/* eslint-disable no-undef */
const { expect, assert } = require('chai');
const { getTreeFromString } = require('../../utils/helpers');

describe('Функция utils/helpers/getTreeFromString', () => {
  let result;
  const string = '040000 tree 1f987bfa24b571fec0432956439131b2eeea1af4	dir\n100644 blob cee7a927c5faac63f55c4b2e12582e4aa2fabc17	file.txt\n100644 blob 1f0e4850edacda35747e8089b9bdcd2395592177	file2.txt\n100644 blob 1f0e4850edacda35747e8089b9bdcd2395592177	file4.txt'; //eslint-disable-line

  it('Должна возвращать массив объектов', () => {
    result = getTreeFromString(string);
    expect(result).to.be.a('array');
    result.map((branch) => {
      expect(branch).to.be.a('object');
    });
  });

  it('Каждый объект имеет 3 поля - type, path, name', () => {
    result = getTreeFromString(string);
    result.map((node) => {
      expect(Object.keys(node).length).to.equal(3);
      assert.hasAllKeys(node, ['type', 'path', 'name']);
    });
  });

  it('Поле name не должен содержать символа /', () => {
    result = getTreeFromString(string);
    result.map((commit) => {
      expect(commit.name).to.not.include('/');
    });
  });
});
