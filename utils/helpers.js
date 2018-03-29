/**
 * Получить имя файла из полного пути
 * @param {string} file
 * @returns {string}
 */
const getFileNameFromPath = file => file.indexOf('/') !== -1 ? file.split('/').splice(-1)[0] : file; //eslint-disable-line

/**
 * Получить список всех веток
 * Возвращается массив строк с именами веток вида feat/test-feature
 * @param {string} data
 * @returns {array[string]}
 */
const getBranchesFromString = data =>
  data.split('\n').slice(0, -1)
    .map(branch => branch.toString().replace('*', '').trim());

/**
 * Получить список коммитов в выбранной ветки
 * Возвращается массив объектов, содержащих информацию о ноде:
 * - hash коммита
 * - дата
 * - автор
 * - сообщение коммита
 * @param {string} data
 * @returns {array[{hash, data, author, message}]}
 */
const getCommitsFromString = data =>
  data.split('\n').map((commit) => {
    const commitSplit = commit.split('|');
    return {
      hash: commitSplit[0].replace('*', '').trim(),
      date: commitSplit[1],
      author: commitSplit[2],
      message: commitSplit[3],
    };
  });

/**
 * Получить список файлов и директорий в выбранной директории
 * Возвращается массив объектов, содержащих информацию о ноде:
 * - тип(файл, директория)
 * - полный путь
 * - имя
 * @param {string} data
 * @returns {array[{type,path,name}]}
 */
const getTreeFromString = data =>
  data.split('\n').slice(0, -1).map((row) => {
    const rowSplit = row.split(/[\s+,\t+]/);

    return {
      type: rowSplit[1],
      path: rowSplit[3],
      name: getFileNameFromPath(rowSplit[3]),
    };
  });

/**
 * Получить список ссылок на поддериктории (хлебные крошки)
 * Возвращает список строк(ссылок), каждая последующая дополнена предыдущей
 * @param {string} data
 * @returns {[string]}
 */
const getBreadcrumbs = (path) => {
  const breadcrumbs = [];
  breadcrumbs.push({
    path: '',
    name: '/',
  });
  let breadcrumb = '';
  path.toString().split('/').map((part) => {
    breadcrumb += part;
    breadcrumbs.push({
      path: encodeURIComponent(breadcrumb),
      name: part,
    });
    breadcrumb += '/';
  });
  return breadcrumbs;
};

module.exports = {
  getFileNameFromPath,
  getBranchesFromString,
  getCommitsFromString,
  getTreeFromString,
  getBreadcrumbs,
};
