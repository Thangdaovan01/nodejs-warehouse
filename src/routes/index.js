const meRouter = require('./me');
const productsRouter = require('./products');
const siteRouter = require('./site');

function route(app) {

    // app.get('/products', (req, res) => {  res.render('products'); });
    app.use('/products', productsRouter);
    app.use('/me', meRouter);

    app.use('/', siteRouter);

}

module.exports = route;