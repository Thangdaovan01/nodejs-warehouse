const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController')

router.get('/create', productController.create);
router.post('/store', productController.store); //luu du lieu moi create
router.post('/handle-form-action', productController.handleFormAction);
router.get('/:id/edit', productController.edit);
router.put('/:id', productController.update); //khi submit form chinh sua
router.get('/:id/import', productController.import);
router.put('/:id/import', productController.updateImport);
router.get('/:id/export', productController.export);
router.put('/:id/export', productController.updateExport);
router.patch('/:id/restore', productController.restore); //khi khoi phuc khoa hoc
router.delete('/:id', productController.destroy); //khi delete khóa học
router.delete('/:id/force', productController.forceDestroy); //khi delete vinh vien khóa học

router.get('/:slug', productController.show);
module.exports = router;