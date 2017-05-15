'use strict'

let filter = null;

const articlesService = (function () {
  function compareDate(firstArticle, secondArticle) {
    return (secondArticle.createdAt - firstArticle.createdAt);
  }

  function getArticles(skip, top, filterConfig) {
    skip = skip || 0;
    top = top || 5;
      return new Promise((resolve, reject) => {
          const req = new XMLHttpRequest();
          req.open('PUT', '/article/getArticles');
          req.setRequestHeader('content-type', 'application/json');
          req.onload = () => {
              if (req.status === 200) {
                  resolve(JSON.parse(req.responseText, (key, value) => {
                      if (key === 'createdAt') return new Date(value);
                      return value;
                  }));
              }
          };
          req.onerror = () => reject(new Error("getArticles crashed."));
          req.send(JSON.stringify({skip, top, filterConfig}));
      });
  }


  function getArticle(id) {
      return new Promise((resolve, reject) => {
          const req = new XMLHttpRequest();
          req.open('GET', '/article/' + id);
          req.onload = () => {
              if (req.status === 200) {
                  resolve(JSON.parse(req.responseText));
              }
          };
          req.onerror = () => reject(new Error("getArticle crashed."));
          req.send();
      });
  }

  function validateArticle(article) {
    if (article.id && article.createdAt && article.author &&
            article.content && article.title &&
            typeof article.id === 'string' && typeof article.createdAt === 'object' &&
            typeof article.author === 'string' &&
            typeof article.content === 'string' && typeof article.title === 'string' &&
            article.title.length > 0 && article.title.length <= 100 &&
            article.content.length > 0 && article.author.length > 0) { return true; }
    return false;
  }

  function addArticle(article) {
      return new Promise((resolve, reject) => {
          const req = new XMLHttpRequest();
          req.open('POST', '/article/add');
          req.setRequestHeader('content-type', 'application/json');
          req.onload = () => req.status === 200 ? resolve() : reject();
          req.onerror = () => reject(new Error("authorization crashed."));
          req.send(JSON.stringify(article));
      });
  }
  function removeArticle(id) {
      return new Promise((resolve, reject) => {
          const req = new XMLHttpRequest();
          req.open('DELETE', '/article/' + id);
          req.onload = () => req.status === 200 ? resolve() : reject();
          req.onerror = () => reject(new Error("authorization crashed."));
          req.send();
      });
  }
  function editArticle(article) {
      return new Promise((resolve, reject) => {
          const req = new XMLHttpRequest();
          req.open('PATCH', '/article/edit');
          req.setRequestHeader('content-type', 'application/json');
          req.onload = () => req.status === 200 ? resolve() : reject();
          req.onerror = () => reject(new Error("authorization crashed."));
          req.send(JSON.stringify(article));
      });
  }
    function getAllArticles() {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open('GET', '/article/all');
            req.onload = () => {
                if (req.status === 200) {
                    resolve(JSON.parse(req.responseText, (key, value) => {
                        if (key === 'createdAt') return new Date(value);
                        return value;
                    }));
                }
            };
            req.onerror = () => reject(new Error("getAllArticles crashed."));
            req.send();
        });
    }


  return {
    compareDate,
    getArticles,
    getAllArticles,
    getArticle,
    validateArticle,
    addArticle,
    editArticle,
    removeArticle,
  };
}());

const articlesTool = (function () {
  let articleTemplate;
  let articleListNode;

  function initialize() {
    articleTemplate = document.getElementById('template-article-list-item');
    articleListNode = document.querySelector('.content');
  }

  function removeArticlesFromDOM() {
    articleListNode.innerHTML = '';
  }

  function insertArticlesToDOM(articles) {
      const articlesNodes = articles.map(article => renderArticle(article));
      articlesNodes.forEach((node) => articleListNode.appendChild(node));
  }
  function formatDateToString(date) {
      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${
          date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
  function renderArticle(article) {
    const template = articleTemplate;
    template.content.querySelector('.article-list-item').dataset.id = article.id;
    template.content.querySelector('.article-list-item-title').textContent = article.title;
    template.content.querySelector('.article-list-item-summary').textContent = article.summary;
    template.content.querySelector('.article-list-item-author').textContent = article.author;
    template.content.querySelector('.article-list-item-date').textContent = formatDateToString(article.createdAt);
    return template.content.querySelector('.article-list-item').cloneNode(true);
  }



  return {
    initialize,
    renderArticle,
    formatDateToString,
    insertArticlesToDOM,
    removeArticlesFromDOM,
  };
}());

let amountLoadedArticles = 0;

let filterLength = 0;

function checkShowMoreBtn() {
    if (amountLoadedArticles > filterLength) {
        document.getElementById('active').style.display = 'none';
        return false;
    }else {
        document.getElementById('active').style.display = 'block';
        return true;
    }
}

function showNews(filterConfig) {
    amountLoadedArticles += 5;
    filter = filterConfig || null;
    articlesTool.initialize();
    articlesService.getArticles(0, amountLoadedArticles, filter).then(
        articles => {
            filterLength = articles.length;
            checkShowMoreBtn();
            articlesTool.removeArticlesFromDOM();
            articlesTool.insertArticlesToDOM(articles);
        });
}

function showMore() {
    if (checkShowMoreBtn()) {
        showNews();
        event.preventDefault();
    }
}
function mainPageOnLoad() {
  mainPage();
  document.getElementById('footer-date').textContent = articlesTool.formatDateToString(new Date());
}
document.addEventListener('DOMContentLoaded', mainPageOnLoad);
