const qr = require('./logic/generateQR');
const contract = require('./logic/contractInteraction');

function initRoutes(app) {
    app.get('/generateQR', qr.generateQR);
    app.get('/view', contract.view);
    app.get('/save', contract.save);
};

module.exports = {
    initRoutes: initRoutes
}
