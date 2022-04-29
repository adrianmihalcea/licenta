const { createAlchemyWeb3 } = require('@alch/alchemy-web3');

const secrets = require('./secrets');
const contract = require('./artifacts/MyNFT.json');

const web3 = createAlchemyWeb3(secrets.ALCHEMY_API_URL);
const nftContract = new web3.eth.Contract(contract.abi, secrets.ETH_KEYS.CONTRACT);

async function mint(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(secrets.ETH_KEYS.PUBLIC, 'latest'); //get latest nonce
    
    const tx = {
        'from': secrets.ETH_KEYS.PUBLIC,
        'to': secrets.ETH_KEYS.CONTRACT,
        'nonce': nonce,
        'gas': 500000,
        'maxPriorityFeePerGas': 2999999987,
        'data': nftContract.methods.mintNFT(secrets.ETH_KEYS.PUBLIC, tokenURI, "salut").encodeABI()
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, secrets.ETH_KEYS.PRIVATE);
    const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
    console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
};

async function view_nft_metadata(id) {
    console.log("fetching metadata for a crypto coven NFT...");
    const response = await web3.alchemy.getNftMetadata({
        contractAddress: secrets.ETH_KEYS.OLD_CONTRACT,
        tokenId: id
    })

    console.log(response);
};

module.exports = {
    mint: mint,
    view_nft_metadata: view_nft_metadata
}
