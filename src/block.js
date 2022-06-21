const { SHA256 } = require("crypto-js");

class Block {
    constructor(blockIndex, blockCreation, blockTx, blockPreviousHash){
        this.blockIndex = blockIndex; // La posición del bloque en la cadena
        this.blockCreation = blockCreation; // timestamp
        this.blockTx = blockTx; // Transacciones y data
        this.blockPreviousHash = blockPreviousHash; // Hash del bloque anterior para poder conectarlos
        this.hash = this.getHash(); // Convierte toda la info del bloque en un hash
        this.nonce = nonce; // El número usado para el PoW
       // this.merkleRoot = this.getMerkleRoot(); *** Método pendiente *** Investigar como implementar el árbol Merkle
    }

    getHash(){
        return SHA256(this.blockPreviousHash + this.blockCreation + JSON.stringify(this.blockTx))
    }

    getMerkleRoot(){
        
    }


}

module.exports = Block;