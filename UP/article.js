const express = require('express');
const bodyParser = require('body-parser');
const articleService = require('./httpRequests');
const router = express.Router();
router.use(bodyParser.json({limit: '50mb'}));
router.use(bodyParser.urlencoded({extended: true}));

router.put('/getArticles', articleService.getArticles);
router.get('/all', articleService.allArticles);
router.get('/:_id', articleService.getArticle);
router.post('/add', articleService.addArticle);
router.delete('/:_id', articleService.removeArticle);
router.patch('/edit', articleService.editArticle);

module.exports = router;