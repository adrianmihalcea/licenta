const { createAlchemyWeb3 } = require('@alch/alchemy-web3');

const secrets = require('../../secrets');
const documentContractJSON = require('../../artifacts/DocumentStorage.json');

const web3 = createAlchemyWeb3(secrets.ALCHEMY_API_URL);
const documentStorage = new web3.eth.Contract(documentContractJSON.abi, secrets.ETH_KEYS.CONTRACT);
const allowed = ['issuer', 'issuerAddress', 'issueDate', 'documentType', 'issuedTo', 'link'];

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
    console.log('View for id:' + id); // debug
    
    if (id == null) {
        return res.status(400).json({
            'error': 'No id provided.'
        });
    }

    const response = await documentStorage.methods.getDocumentById(id).call();
    const JSONresponse = mapViewArrayToObject(response);

    console.log(JSONresponse); // debug
    return res.status(200).send(JSONresponse);
};

const save = async (req, res) => {
    console.log('Saving document:'); // debug
    const nonce = await web3.eth.getTransactionCount(secrets.ETH_KEYS.PUBLIC, 'latest');

    const tx = {
        'from': secrets.ETH_KEYS.PUBLIC,
        'to': secrets.ETH_KEYS.CONTRACT,
        'nonce': nonce,
        'gas': 500000,
        'maxPriorityFeePerGas': 2999999987,
        'data': documentStorage.methods.saveDocument("test123", "upb", "azi", "mp3", "Adrian", "google.com").encodeABI()
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, secrets.ETH_KEYS.PRIVATE);
    const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`); // debug
    res.status(200).send();
}

module.exports = {
    view: view,
    save: save
}