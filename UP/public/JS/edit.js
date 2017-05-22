'use strict'
const newArticle = null;

function fillEditNewsPage(element) {
    articlesService.getArticle(element.dataset.id).then(
        article => {
            document.getElementById("edit-news-title").value = article.title;
            document.getElementById("edit-news-content").value = article.content;
            document.getElementById("edit-news-summary").value = article.summary;
            document.getElementById("edit-news-post-button").dataset.id = article._id;
        },
        error => console.log("fillEditPage crashed.")
    );
}/*
function editNews() {
  let article = {};
  article.author = newArticle.author;
  article.title = document.getElementById('edit-news-title').value;
  article.content = document.getElementById('edit-news-content').value;
  article.summary = document.getElementById('edit-news-summary').value;
  article.createdAt = new Date();
  article.id = newArticle.id;
    if (articlesService.validateArticle(article)) {
        articlesService.editArticle(article).then(ready => mainPage());
    }
}*/
function editNews(element) {
    articlesService.getArticle(element.dataset.id).then(
        newArticle => {
            const article = {};
            console.log(element.dataset.id);
            article.author = newArticle.author;
            article.title = document.getElementById('edit-news-title').value;
            article.content = document.getElementById('edit-news-content').value;
            article.summary = document.getElementById('edit-news-summary').value;
            article.createdAt = new Date();
            article._id = document.getElementById("edit-news-post-button").dataset.id;

            console.log(article);
            if (articlesService.validateArticle(article)){
                articlesService.editArticle(article).then(ready => mainPage());
            }
        });
}