const qr = require('./logic/generateQR');
const contract = require('./logic/contractInteraction');

function initRoutes(app, jsonParser) {
    app.get('/generateQR', qr.generateQR);
    app.get('/view', contract.view);
    app.post('/save', jsonParser, contract.save);
};

module.exports = {
    initRoutes: initRoutes
}
