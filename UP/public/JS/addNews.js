'use strict'

let newsCounter = 100;
function addPost() {
  let newArticle = {};
  newArticle.author = localStorage.getItem('username');
  newArticle.title = document.getElementById('news-title').value;
  newArticle.content = document.getElementById('news-text').value;
  newArticle.summary = document.getElementById('news-description').value;
  newArticle.createdAt = new Date();
  newArticle.id = newArticle.author + (String)(newArticle.createdAt.getDate()) + (String)(newArticle.createdAt.getMilliseconds()) + (String)(newArticle.createdAt.getSeconds());
  if (articlesService.validateArticle(newArticle)) {
      articlesService.addArticle(newArticle).then(ready => mainPage());
  }
}
