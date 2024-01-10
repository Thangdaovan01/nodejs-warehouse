const Product = require('../models/Product')
const { mutipleMongooseToObject } = require('../../util/mongooes')

class MeController {
    //[GET] /me/stored/products
    storedProducts(req, res, next) {
        // res.render('me/stored-products')

        Promise.all([Product.find({}), Product.countDocumentsWithDeleted({ deleted: true })])
            // .lean()
            .then(([products, deletedCount]) => {
                res.render('me/stored-products', { products: mutipleMongooseToObject(products), deletedCount });
            })
            .catch(next);

        // Product.countDocumentsWithDeleted({ deleted: true })
        //     .lean()
        //     .then((deletedCount) => {
        //         console.log(deletedCount);
        //     })
        //     .catch(next);

        // Product.find({})
        //     .lean()
        //     .then((products) => {
        //         res.render('me/stored-products', { products });
        //     })
        //     .catch(next);

    }

    //[GET] /me/trash/products
    trashProducts(req, res, next) {
        // res.render('me/stored-products')
        Product.findWithDeleted({ deleted: true })
            .lean()
            .then((products) => {
                res.render('me/trash-products', { products });
            })
            .catch(next);

    }

}

module.exports = new MeController;