const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Product = new Schema({
    name: { type: String, default: 'hahaha', maxLength: 255 },
    description: { type: String, default: 'No description' },
    slug: { type: String, slug: 'name' },
    price: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
    countImport: { type: Number, default: 0 },
    countExport: { type: Number, default: 0 },
    countExportTotal: { type: Number, default: 0 },
    productionDate: { type: Date },
    expirationDate: { type: Date },
    image: { type: String, default: 'https://www.giaoxugiaohovietnam.com/ThaiBinh/ThuChinh/ThuChinh-07112014%20(24).JPG' },
}, {
    timestamps: true,
});

//Add plugin
mongoose.plugin(slug);
Product.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('Product', Product);
