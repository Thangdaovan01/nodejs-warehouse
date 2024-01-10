module.exports = {
    mutipleMongooseToObject: function (mongooes) {
        return mongooes.map(mongooe => mongooe.toObject());
    },
    mongooseToObject: function (mongooe) {
        return mongooe ? mongooe.toObject() : mongooe;
    }
}
