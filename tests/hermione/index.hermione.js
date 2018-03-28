/* eslint-disable func-names */
/* eslint-disable no-undef */
const assert = require('assert');

describe('Главная страница', () => {
  beforeEach(function test() {
    return this.browser
      .url('/');
  });

  it('Проверка title главной страницы', function () {
    return this.browser
      .title()
      .then((title) => {
        assert.equal(title.value, 'Branches');
      });
  });

  it('Отображение списка веток', function () {
    return this.browser
      .isExisting('.branches-list')
      .then((e) => {
        assert.equal(e, true);
      });
  });

  it('Переход на страницу комитов ветки', function () {
    return this.browser
      .click('.branches-list__item')
      .title()
      .then((title) => {
        assert.equal(title.value, 'Commits');
      });
  });
});
