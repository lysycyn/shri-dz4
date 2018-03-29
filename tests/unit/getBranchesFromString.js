/* eslint-disable func-names */
/* eslint-disable no-undef */
const { expect } = require('chai');
const { getBranchesFromString } = require('../../utils/helpers');

describe('Функция utils/helpers/getBranchesFromString', () => {
  let result;
  const string = 'master \n * feat/test-branch \n feat-test-branch \n';

  it('Должна возвращать массив строк', () => {
    result = getBranchesFromString(string);
    expect(result).to.be.a('array');
    result.map((branch) => {
      expect(branch).to.be.a('string');
    });
  });

  it('Должна возвращать строки без символа *', () => {
    result = getBranchesFromString(string);
    result.map((branch) => {
      expect(branch).to.not.include('*');
    });
  });

  it('Должна возвращать не пустые строки', () => {
    result = getBranchesFromString(string);
    result.map((branch) => {
      expect(branch).to.not.equal('');
    });
  });
});
