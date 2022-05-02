const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const crypto = require('crypto');

const secrets = require('../../secrets');
const documentContractJSON = require('../../artifacts/DocumentStorage.json');
const constants = require('../constants');

const web3 = createAlchemyWeb3(secrets.ALCHEMY_API_URL);
const documentStorage = new web3.eth.Contract(documentContractJSON.abi, secrets.ETH_KEYS.CONTRACT);
const FIELDS = constants.FIELDS;
const allowed = [FIELDS.ISSUER, FIELDS.ISSUER_ADDRESS, FIELDS.ISSUE_DATE, FIELDS.DOCUMENT_TYPE, FIELDS.ISSUED_TO, FIELDS.LINK];
const required = [FIELDS.ISSUER, FIELDS.ISSUE_DATE, FIELDS.DOCUMENT_TYPE, FIELDS.ISSUED_TO, FIELDS.LINK];

function mapViewArrayToObject(arr) {
    return Object.keys(arr)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
            obj[key] = arr[key];
            return obj;
        }, {});
};

const view = async (req, res) => {
    const id = req.query['id'];
    console.log('View for id: ' + id); // debug
    
    if (id == null) {
        return res.status(400).json({
            'error': 'No id provided.'
        });
    }

    documentStorage.methods.getDocumentById(id).call().then((response) => {
        const JSONresponse = mapViewArrayToObject(response);

        console.log(JSONresponse); // debug
        return res.status(200).send(JSONresponse);
    }).catch((err) => {
        return res.status(500).json({
            'error': 'No document with this id',
            'data': err['data']
        });
    });
};

const validateFields = (o) => {
    return required.every((field) =>
        ((field in o) && (typeof o[field] != 'undefined')));
};

const save = async (req, res) => {
    console.log('Saving document:');
    console.log(req.body); // debug

    if (!validateFields(req.body)) {
        return res.status(400).json({
            'error': 'Incomplete / improper payload.'
        });
    }

    const metadata = req.body;
    const nonce = await web3.eth.getTransactionCount(secrets.ETH_KEYS.PUBLIC, 'latest');
    const hash = crypto.createHash('md5').update(req.body[FIELDS.LINK]).digest('hex');
    console.log('Hash of link: ' + hash); // debug

    const tx = {
        'from': secrets.ETH_KEYS.PUBLIC,
        'to': secrets.ETH_KEYS.CONTRACT,
        'nonce': nonce,
        'gas': 1000000,
        'maxPriorityFeePerGas': 2999999987,
        'data': documentStorage.methods.saveDocument(
            hash, metadata[FIELDS.ISSUER], metadata[FIELDS.ISSUE_DATE],
            metadata[FIELDS.DOCUMENT_TYPE], metadata[FIELDS.ISSUED_TO],
            metadata[FIELDS.LINK])
            .encodeABI()
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, secrets.ETH_KEYS.PRIVATE);
    var sendError;
    var txHash;
    var processError;
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
        if (error) {
            sendError = error;
            console.log('Error sending transaction: ' + error);
        }

        txHash = hash;
    }).catch((error) => {
        console.log('Error processing transaction: ' + error);
        processError = error;
    });

    if (sendError) {
        return res.status(500).json({
            'error': sendError
        });
    }

    if (processError) {
        return res.status(500).json({
            'error': processError
        });s
    }
    
    return res.status(200).json({
        'link_hash': hash,
        'tx_hash': txHash
    });
}

module.exports = {
    view: view,
    save: save
}