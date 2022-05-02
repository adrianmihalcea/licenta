const qr = require('qrcode');

const generateQR = (req, res) => {    
    const link = req.query['link'];
    console.log('Generating QR for link:' + link); // debug

    if (link == null) {
        return res.status(400).json({
            'error': 'No link provided.'
        });
    }
   
    qr.toDataURL(link, (err, src) => {
        if (err) {
            return res.status(500).json({
                'error': 'QR generation error.'
            });
        }

        console.log(src); // debug
        res.status(200).json({
            'photo': src
        });
    })
};

module.exports = {
    generateQR: generateQR
}
