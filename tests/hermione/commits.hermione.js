/* eslint-disable func-names */
/* eslint-disable no-undef */
const assert = require('assert');

describe('Cтраница коммитов', () => {
  beforeEach(function test() {
    return this.browser
      .url('/')
      .click('.branches-list__item');
  });

  it('Проверка title страницы комитов', function () {
    return this.browser
      .title()
      .then((title) => {
        assert.equal(title.value, 'Commits');
      });
  });

  it('Отображение списка комитов', function () {
    return this.browser
      .isExisting('.commits-list')
      .then((e) => {
        assert.equal(e, true);
      });
  });
  it('Отображение хлебных крошек', function () {
    return this.browser
      .isExisting('.breadcrumbs')
      .then((e) => {
        assert.equal(e, true);
      });
  });

  it('Переход на страницу отображения дерева файлов комита', function () {
    return this.browser
      .click('.commits-list__item')
      .title()
      .then((title) => {
        assert.equal(title.value, 'Tree');
      });
  });
});
