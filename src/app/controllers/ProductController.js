const Product = require('../models/Product')
const { mutipleMongooseToObject } = require('../../util/mongooes')

class ProductController {

    //[GET] //products/:slug
    show(req, res, next) {
        // Hàm định dạng thời gian theo định dạng YYYY-MM-DD HH:mm:ss
        function formatDate(date) {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');
            const seconds = String(d.getSeconds()).padStart(2, '0');

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }

        Product.findOne({ slug: req.params.slug })
            .lean()
            // .then((product) => {
            //     product.productionDate = moment(product.productionDate).format('MMMM Do YYYY, h:mm:ss a');
            //     res.render('products/show', { product });
            // })
            .then(product => {
                if (product) {
                    const formattedProduct = {
                        name: product.name,
                        description: product.description,
                        image: product.image,
                        expirationDate: formatDate(product.expirationDate), // Định dạng thời gian
                        productionDate: formatDate(product.productionDate) // Định dạng thời gian
                    };
                    // res.json(formattedProduct);
                    res.render('products/show', { formattedProduct });
                } else {
                    res.status(404).json({ message: 'No books found' });
                }
            })
            .catch(next);
    }


    //[GET] //products/create
    create(req, res, next) {
        res.render('products/create');
        // res.send('CREATE PRODUCTS!!')
    }

    //[POST] //products/store  (xu li luu du lieu)
    store(req, res, next) {
        const formData = req.body;
        const product = new Product(formData);
        product.save()
            // .lean()
            .then(() => res.redirect('/me/stored/products'))
            .catch(next);

        // res.send('SAVE PRODUCTS!!');
        // res.json(req.body);
    }

    //[GET] //products/:id/edit
    edit(req, res, next) {
        Product.findById(req.params.id)
            .lean()
            .then((product) => {
                res.render('products/edit', { product });
            })
            .catch(next);
    }

    //[PUT] //products/:id
    update(req, res, next) {
        // res.json(req.body)
        Product.updateOne({ _id: req.params.id }, req.body)
            .lean()
            .then(() => res.redirect('/me/stored/products'))
            .catch(next);
    }

    //[GET] //products/:id/import
    import(req, res, next) {
        Product.findById(req.params.id)
            .lean()
            .then((product) => {
                res.render('products/import', { product });
            })
            .catch(next);
    }

    //[PUT] //products/:id/import
    updateImport(req, res, next) {
        //res.json(req.body)
        //req.body.count = req.body.countImport + req.body.count;
        const x = parseInt(req.body.countImport, 10);
        const y = parseInt(req.body.count, 10);
        const z = x + y;
        req.body.count = z;
        req.body.countImport = 0;

        Product.updateOne({ _id: req.params.id }, req.body)
            .lean()
            .then(() => res.redirect('/me/stored/products'))
            .catch(next);
    }

    //[GET] //products/:id/export
    export(req, res, next) {
        Product.findById(req.params.id)
            .lean()
            .then((product) => {
                res.render('products/export', { product });
            })
            .catch(next);
    }

    //[PUT] //products/:id/export
    updateExport(req, res, next) {
        // res.json(req.body)
        const a = parseInt(req.body.countExport, 10);
        const b = parseInt(req.body.count, 10);
        const d = parseInt(req.body.countExportTotal, 10);
        console.log(d);
        if (a > b) {
            res.json({ message: "Action is invalid!" });
        } else {
            const c = b - a;
            req.body.count = c;
            req.body.countExportTotal = d + a;
            req.body.countExport = 0;

            console.log(req.body.countExportTotal);

            Product.updateOne({ _id: req.params.id }, req.body)
                .lean()
                .then(() => res.redirect('/me/stored/products'))
                .catch(next);
        }

    }

    //[DELETE] //products/:id
    destroy(req, res, next) {
        //Soft Delete
        Product.delete({ _id: req.params.id })
            .lean()
            .then(() => res.redirect('back')) //Khi thành công thì thực thi
            .catch(next);
    }

    //[DELETE] //products/:id/force
    forceDestroy(req, res, next) {
        // Xóa thật ở trong DB
        Product.deleteOne({ _id: req.params.id })
            .lean()
            .then(() => res.redirect('back')) //Khi thành công thì thực thi
            .catch(next);
    }

    //[PATCH] //products/:id/restore
    restore(req, res, next) {
        Product.restore({ _id: req.params.id })
            .lean()
            .then(() => res.redirect('back')) //Khi thành công thì thực thi
            .catch(next);
    }

    //[POST] //products/handle-form-action
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'deleted':
                Product.delete({ _id: { $in: req.body.productIds } })
                    .lean()
                    .then(() => res.redirect('back')) //Khi thành công thì thực thi
                    .catch(next);
                break;
            case 'delete-all':
                Product.deleteOne({ _id: { $in: req.body.productIds } })
                    .lean()
                    .then(() => res.redirect('back')) //Khi thành công thì thực thi
                    .catch(next);
                break;
            case 'restore-all':
                Product.restore({ _id: { $in: req.body.productIds } })
                    .lean()
                    .then(() => res.redirect('back')) //Khi thành công thì thực thi
                    .catch(next);
                break;
            case 'sort-by-count':
                // res.send(req.body.productIds[0]);
                let productIds = req.body.productIds;
                // res.send(productIds);
                productIds.filter(function (element) {
                    return console.log(element.count);
                });
                // Product.findById(req.body.productIds[0])
                //     .lean()
                //     .then(() => res.send(req.body))
                //     .catch(next);
                break;
            case 'sort-by-export-count-total':

                break;
            default:
                res.json({ message: "Action is invalid!" });

        }
    }
}

module.exports = new ProductController;