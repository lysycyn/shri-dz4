/* eslint-disable func-names */
/* eslint-disable no-undef */
const { expect } = require('chai');
const { getFileNameFromPath } = require('../../utils/helpers');

describe('Функция utils/helpers/getFileNameFromPath', () => {
  let result;
  const path = '/dir/AnotherDir/dir2/file.txt';

  it('Должна возвращать строку', () => {
    result = getFileNameFromPath(path);
    expect(result).to.be.a('string');
  });

  it('Должна возвращать последнее имя после /', () => {
    result = getFileNameFromPath(path);
    expect(result).to.equal('file.txt');
  });

  it('Должна не возвращать символ /', () => {
    result = getFileNameFromPath(path);
    expect(result).to.not.include('/');
  });
});
