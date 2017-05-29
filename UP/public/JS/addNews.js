'use strict'

function addPost() {
    isAuthorized().then(
        name =>{
          const newArticle = {};
          newArticle.author = name;
          console.log(newArticle.author);
          newArticle.title = document.getElementById('news-title').value;
          newArticle.content = document.getElementById('news-text').value;
          newArticle.summary = document.getElementById('news-description').value;
          newArticle.createdAt = new Date();
          if (articlesService.validateArticle(newArticle)) {
            articlesService.addArticle(newArticle).then(ready => mainPage());
          }
        });
}
