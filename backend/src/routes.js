const qr = require('./logic/generateQR');
const contract = require('./logic/contractInteraction');
const fileUpload = require('./logic/fileUpload');

function initRoutes(app, jsonParser) {
    app.get('/generateQR', qr.generateQR);
    app.get('/view', contract.view);
    app.post('/save', jsonParser, contract.save);
    app.post('/pin', fileUpload.pin);
};

module.exports = {
    initRoutes: initRoutes
}
