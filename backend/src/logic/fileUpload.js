const pinataSDK = require('@pinata/sdk');
const fs = require('fs');

const secrets = require('../../secrets');

const pinata = pinataSDK(secrets.PINATA_API.key, secrets.PINATA_API.secret);

function pinToPinata(path) {
    const options = {
        pinataMetadata: {
            name: (new Date()).getTime().toString()
        }
    }

    console.log(path);
    const fileStream = fs.createReadStream(path);
    return pinata.pinFileToIPFS(fileStream, options);
};

const pin = (req, res) => {
    if (req.files === null || req.files == undefined) {
        return res.status(400).json({
            "error": "No file was uploaded"
        });
    }

    const file = req.files.file;
    const path = __dirname + "/uploads/" + file.name;
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
        }
    });

    pinToPinata(path).then((result) => {
        console.log(result);
        return res.status(200).send(result);
    }).catch((error) => {
        console.log(error);
        return res.status(500).send(error);
    })
};

module.exports = {
    pin: pin
};
