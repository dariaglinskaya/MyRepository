'use strict'

function renderViewPage(element) {
  viewNewsPage();
  articlesService.getArticle(element.dataset.id).then(
      article => {
          document.getElementById('view-news-title').textContent = article.title;
          document.getElementById('view-news-content').textContent = article.content;
          document.getElementById('view-news-summary').textContent = article.summary;
          document.getElementById('view-news-meta').textContent = `${article.author}, ${
              articlesTool.formatDateToString(new Date(article.createdAt))
              }`;
          document.getElementById('view-edit-btn').dataset.id = article._id;
          document.getElementById('view-delete-btn').dataset.id = article._id;
          const username = localStorage.getItem('username');
          if (username) {
              document.getElementById('view-edit-btn').style.display = 'inline-block';
              document.getElementById('view-delete-btn').style.display = 'inline-block';
          } else {
              document.getElementById('view-edit-btn').style.display = 'none';
              document.getElementById('view-delete-btn').style.display = 'none';
          }
      }
);
}
function deletePost(element) {
    articlesService.removeArticle(element.dataset.id).then(ready => {mainPage(); event.preventDefault();});
}

function editPost(element) {
    editNewsPage();
    fillEditNewsPage(element);
}

