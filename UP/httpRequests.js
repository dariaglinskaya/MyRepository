const articleModel = require('./mongo/db').articleModel;

exports.removeArticle = (req, res) => {
    articleModel.findByIdAndRemove(req.params._id, err => !err ? res.sendStatus(200) : res.sendStatus(500));
};
exports.addArticle = (req, res) => {
    const article = req.body;
    article.createdAt = new Date();
    new articleModel(article).save(err => !err ? res.sendStatus(200) : res.sendStatus(500));
};

exports.editArticle = (req, res) => {
    const article = req.body;
    article.createdAt = new Date();
    articleModel.findByIdAndUpdate(article._id, article, err => !err ? res.sendStatus(200) : res.sendStatus(500));
};

exports.getArticle = (req, res) => {
    articleModel.findById(req.params._id, (err, article) => {
        if (!article) {
        res.statusCode = 404;
        res.send({error: 'not found'});
    }
    !err ? res.json(article) : res.sendStatus(500);
});
};

function parseFilter(filterConfig) {
    const filter = {};
    if(filterConfig) {
        if (filterConfig.author) {
            filter.author = filterConfig.author;
        }
        if (filterConfig.createdAtFrom|| filterConfig.createdAtTo ) {
            filter.createdAt = {};
            if (filterConfig.createdAtFrom) {
                filter.createdAt['$gte'] = filterConfig.createdAtFrom;
            }
            if (filterConfig.createdAtTo) {
                filter.createdAt['$lt'] = filterConfig.createdAtTo;
            }
        }
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