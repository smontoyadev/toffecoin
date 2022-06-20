const { SHA256 } = require("crypto-js");

class Block {
    constructor(blockIndex, blockCreation, blockTx, blockPreviousHash){
        this.blockIndex = blockIndex;
        this.blockCreation = blockCreation;
        this.blockTx = blockTx;
        this.blockPreviousHash = blockPreviousHash;
        this.hash = this.getHash();
    }

    getHash(){
        return SHA256(this.blockPreviousHash + this.blockCreation + JSON.stringify(this.blockTx))
    }
}

module.exports = Block;