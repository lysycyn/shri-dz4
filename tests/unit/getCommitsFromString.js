/* eslint-disable func-names */
/* eslint-disable no-undef */
const { expect, assert } = require('chai');
const { getCommitsFromString } = require('../../utils/helpers');

describe('Функция utils/helpers/getCommitsFromString', () => {
  let result;
  const string = 'fbb2920|2018-03-27|Sergey Lysycyn|new dir\nd6b87e2|2018-03-26|Sergey Lysycyn|commit dir\nb4fec98|2018-03-25|Sergey Lysycyn|feat-test-branch commit\n3c7f10e|2018-03-25|Sergey Lysycyn|second commit *\n1d08cae|2018-03-25|Sergey Lysycyn|first commit'; //eslint-disable-line

  it('Должна возвращать массив объектов', () => {
    result = getCommitsFromString(string);
    expect(result).to.be.a('array');
    result.map((branch) => {
      expect(branch).to.be.a('object');
    });
  });

  it('Каждый объект имеет 4 поля - hash, date, author, message', () => {
    result = getCommitsFromString(string);
    result.map((commit) => {
      expect(Object.keys(commit).length).to.equal(4);
      assert.hasAllKeys(commit, ['hash', 'date', 'author', 'message']);
    });
  });

  it('Поле hash не должен содержать символа *', () => {
    result = getCommitsFromString(string);
    result.map((commit) => {
      expect(commit.hash).to.not.include('*');
    });
  });
});
