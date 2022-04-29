const express = require('express');
const fileUpload = require('express-fileupload');
const pinataSDK = require('@pinata/sdk');
const fs = require('fs');

const secrets = require('./secrets');
const constants = require('./constants')
const alchemyWrappers = require('./alchemy_calls');

const app = express();
const port = 8080;
app.use(fileUpload())
const pinata = pinataSDK(secrets.PINATA_API.key, secrets.PINATA_API.secret);

app.listen(port, () => {
    console.log('Starting up Backend on port 8080');
});

app.get('/view', (req, res) => {
    alchemyWrappers.view_nft_metadata('4');
    return res.send('got\'em');
});

app.get('/test', (req, res) => {
    alchemyWrappers.mint('testMintNou');
    return res.send({'hello': 'world'})
});

app.get('/testPinata', (req, res) => {
    pinata.testAuthentication().then((result) => {
        //handle successful authentication here
        console.log(result);
    }).catch((err) => {
        //handle error here
        console.log(err);
    });

    return res.send('nice');
});

app.post('/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({
            "error": "No file was uploaded"
        });
    }

    const file = req.files.file;
    const path = __dirname + "/uploads/" + new Date().getTime() + file.name;

    file.mv(path, (err) => {
        if (err) {
        return res.status(500).send(err);
        }
        return res.send({ status: "success", path: path });
    });
});

app.get('/pinJson', (req, res) => {
    const body = {
        lorem: 'ipsum'
    }

    const options = {
        pinataMetadata: {
            name: 'test.json'
        }
    }

    pinata.pinJSONToIPFS(body, options).then((result) => {
        console.log(result);
        res.send('all gucci');
    }).catch((err) => {
        console.log(err);
        res.status(500).send(err);
    });
});

app.get('/pinFile', (req, res) => {
    const readableStreamForFile = fs.createReadStream('./uploads/1651183001594current.txt')
    const options = {
        pinataMetadata: {
            name: '1651183001594current.txt'
        }
    }

    pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
        console.log(result);
        res.send('all gucci');
    }).catch((err) => {
        console.log(err);
        res.status(500).send(err);
    });
});
