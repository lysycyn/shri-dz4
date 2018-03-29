/* eslint-disable func-names */
/* eslint-disable no-undef */
const assert = require('assert');

describe('Отображение содержимого файла', () => {
  beforeEach(function test() {
    return this.browser
      .url('/')
      .click('.branches-list__item')
      .click('.commits-list__item')
      .click('.tree__item[href$=\'file\']');
  });

  it('Проверка title страницы отображения файла', function () {
    return this.browser
      .title()
      .then((title) => {
        assert.equal(title.value, 'File');
      });
  });

  it('Отображение хлебных крошек', function () {
    return this.browser
      .isExisting('.breadcrumbs')
      .then((e) => {
        assert.equal(e, true);
      });
  });

  it('Отображение содержимого файла', function () {
    return this.browser
      .isExisting('.file-content')
      .then((e) => {
        assert.equal(e, true);
      });
  });

  it('Переход на предыдущую страницу с помощью хлебных крошек', function () {
    return this.browser
      .click('.breadcrumbs__link:nth-last-child(2)')
      .title()
      .then((title) => {
        assert.equal(title.value, 'Tree');
      });
  });
});
