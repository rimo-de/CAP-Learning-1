const cds = require('@sap/cds');
const { SELECT, INSERT, UPSERT, UPDATE, DELETE } = cds.ql;

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

    async reduceStock(req) {
        const { Books } = this.entities;
        const { book, quantity } = req.data;

        if (quantity < 1) {
            return req.error('This quantity must be at least 1.');
        }

        const exists = await SELECT.one.from(Books).where({ ID: book }).columns('ID');
        if (!exists) return req.error(404, `Book with ID ${book} does not exist`);

        const affected = await UPDATE(Books).where({ ID: book, stock: { '>=': quantity } }).with({ stock: { '-=': quantity } });

        if (affected === 0) return req.error(409, 'Not enough stock.');

        const { stock } = await SELECT.one.from(Books).where({ ID: book }).columns('stock');
        return { stock };
    }
}

module.exports = CatalogService;

