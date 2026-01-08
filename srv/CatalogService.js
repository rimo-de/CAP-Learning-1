const cds = require('@sap/cds');

class CatalogService extends cds.ApplicationService {

    init() {
        const { Books } = this.entities;
        this.after(['READ'], Books, this.grantDiscount);

        this.on('submitOrder', this.reduceStock);

        return super.init()
    }

    grantDiscount(results) {
        for (let b of results) {
            if (b.stock > 200) {
                b.title += ' -- 11% Discount';
            }
        }
    }

    reduceStock(req) {
        const { Books } = this.entities;
        const { book, quantity } = req.data;

        if (quantity < 1) {
            return req.error('This quantity must be at least 1.');
        }

        let stock = 10;
        return { stock };
    }
}

module.exports = CatalogService;