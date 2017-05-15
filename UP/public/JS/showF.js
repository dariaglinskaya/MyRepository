'use strict'

function mainPage(filterConfiguration) {
  addUserUI();
  filter = filterConfiguration || null;
  document.getElementById('head').style.display = 'block';
  document.getElementById('wrapper').style.display = 'none';
  document.getElementById('main').style.display = 'block';
  document.getElementById('view-news-page').style.display = 'none';
  document.getElementById('edit-news-page').style.display = 'none';
  showNews(filter);
}
function editNewsPage() {
  addUserUI();
  document.getElementById('head').style.display = 'block';
  document.getElementById('main').style.display = 'none';
  document.getElementById('edit-news-page').style.display = 'block';
  document.getElementById('wrapper').style.display = 'none';
}
function viewNewsPage() {
  addUserUI();
  document.getElementById('head').style.display = 'block';
  document.getElementById('main').style.display = 'none';
  document.getElementById('wrapper').style.display = 'block';
  document.getElementById('view-news-page').style.display = 'block';
  document.getElementById('edit-news-page').style.display = 'none';
  if (username) {
    document.getElementById('view-edit-btn').style.display = 'block';
    document.getElementById('view-delete-btn').style.display = 'block';
  }
}
