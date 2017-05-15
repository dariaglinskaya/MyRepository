'use strict'
let newArticle = null;

function fillEditNewsPage(element) {
    articlesService.getArticle(element.dataset.id).then(
        article => {
            newArticle = article;
            document.getElementById("edit-news-title").value = article.title;
            document.getElementById("edit-news-content").value = article.content;
            document.getElementById("edit-news-summary").value = article.summary;
        },
        error => console.log("fillEditPage crashed.")
    );
}
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
}
