const articleModel = require('./mongo/db').articleModel;

exports.getLength = (req, res) => res.json(db.articles.count());



exports.removeArticle = (req, res) => {
    articleModel.findByIdAndRemove(req.params._id, err => !err ? res.sendStatus(200) : res.sendStatus(500));
};
exports.addArticle = (req, res) => {
    const article = req.body;
    article.createdAt = new Date();
    article.id = article.author + article.createdAt.getTime();
    new articleModel(article).save(err => !err ? res.sendStatus(200) : res.sendStatus(500));
};

exports.editArticle = (req, res) => {
    const article = req.body;
    article.createdAt = new Date();
    articleModel.findByIdAndUpdate(article._id, article, err => !err ? res.sendStatus(200) : res.sendStatus(500));
};

exports.getArticle = (req, res) => {
    articleModel.findById(req.params._id, (err, article) => {
        res.json(article);
    });
   };

function parseFilter(filterConfig) {
    const filter = {};
    if (filter.author) {
        filter.author = filterConfig.author;
    }
    if (filter.createdAtFrom || filter.createdAtTo) {
        filter.createdAt = {
            createdAtFrom: filter.createdAtFrom,
            createdAtTo: filter.createdAtTo,
        };
    }
    return filter;

}

exports.getArticles = (req, res) => {
    articleModel.find(parseFilter(req.body.filterConfig))
        .sort({createdAt: -1})
        .skip(req.body.skip)
        .limit(req.body.top)
        .exec((err, articles) => !err ? res.json(articles) : res.sendStatus(500));
};


exports.allArticles = (req, res) => {
    articleModel.find((err, articles) => !err ? res.json(articles) : res.sendStatus(500));
};