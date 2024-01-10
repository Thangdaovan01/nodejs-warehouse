const Product = require('../models/Product')
const { mutipleMongooseToObject } = require('../../util/mongooes')

class SiteController {

    // //[GET] /
    // home(req, res) {
    //     Product.find({})
    //         .lean()
    //         .then((products) => {
    //             res.render("home", { products });
    //         })
    //         .catch((error) => {
    //             next(error);
    //         });
    // }

    //[GET] /:page
    home(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;

        if (page) {
            //Get page
            var skipNumber = (page - 1) * limit
            Product.find({})
                .skip(skipNumber)
                .limit(limit)
                .lean()
                .then((products) => {
                    res.render("home", { products });
                })
                .catch((error) => {
                    next(error);
                });
        } else {
            //Get all
            Product.find({})
                .lean()
                .then((products) => {
                    res.render("home", { products });
                })
                .catch((error) => {
                    next(error);
                });
        }
        const countProducts = () => {
            return Product.countDocuments().exec();
        };
        // console.log(countProducts);

        const getProducts = () => {
            return Product.find()
                .limit(limit)
                .skip((page - 1) * limit)
                .lean()
                .exec();
        };

        Promise.all([countProducts(), getProducts()])
            .then(([totalCount, products]) => {
                const totalPages = Math.ceil(totalCount / limit);
                // res.json({
                //     totalProducts: totalCount,
                //     totalPages: totalPages,
                //     currentPage: page,
                //     products: products
                // });
                res.render("home", { products, totalPages, currentPage: page });
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            });
    }

    //[GET] //search
    search(req, res, next) {
        const query = req.body.searchText;

        Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, // Tìm theo tiêu đề, không phân biệt hoa thường
                { description: { $regex: query, $options: 'i' } }, // Tìm theo tác giả, không phân biệt hoa thường
            ]
        })
            .lean()
            .then((products) => {
                res.render("home", { products });
            })
            .catch((error) => {
                next(error);
            });

        // res.json(query);
    }

}

module.exports = new SiteController;