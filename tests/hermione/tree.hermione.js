/* eslint-disable func-names */
/* eslint-disable no-undef */
const assert = require('assert');

describe('Cтраница дерева файлов коммитов', () => {
  beforeEach(function test() {
    return this.browser
      .url('/')
      .click('.branches-list__item')
      .click('.commits-list__item');
  });

  it('Проверка title страницы отображения дерева', function () {
    return this.browser
      .title()
      .then((title) => {
        assert.equal(title.value, 'Tree');
      });
  });

  it('Отображение списка файлов и директорий', function () {
    return this.browser
      .isExisting('.tree')
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

  it('Переход на страницу отображения содержимого файла', function () {
    return this.browser
      .click('.tree__item[href$=\'?file\']')
      .title()
      .then((title) => {
        assert.equal(title.value, 'File');
      });
  });
});
