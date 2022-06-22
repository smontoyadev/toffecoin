const { SHA256 } = require("crypto-js");
const MINE_RATE = 1000;
difficulty = 0;

class Block {
    constructor(timestamp, blockIndex = 1, blockTx, blockPreviousHash, nonce, difficulty){
        this.timestamp = timestamp; // timestamp
        this.blockIndex = blockIndex; // La posición del bloque en la cadena
        this.blockTx = blockTx; // Transacciones y data
        this.blockPreviousHash = blockPreviousHash; // Hash del bloque anterior para poder conectarlos
        this.blockHash = Block.getHash(this); // Convierte toda la info del bloque en un hash
        this.nonce = nonce; // El número usado para el PoW
        //this.merkleRoot = this.getMerkleRoot(); //*** Método pendiente *** Investigar como implementar el árbol Merkle
        this.difficulty = difficulty; // Acá se definirá la dificultad que requiere crear el bloque (Número de 0000 iniciales en el hash) *** Pendiente crear método
    }

    // Método para obtener el hash del bloque (this)
    static getHash(block){
        return SHA256(block.timestamp, block.blockIndex.toString(), JSON.stringify(block.blockTx), block.blockPreviousHash, block.nonce, block.difficulty).toString();
    }


    // Creación del bloque génesis, lo hago estático para poder acceder sin necesidad de crear una instancia nueva, 
    // No tengo que crear un bloque para llamar este método, lo llamo directo desde la clase
    static get genesis() {
        const timestamp = new Date().getTime();

        return new this (
            timestamp, // Timestamp
            0, // Id del génesis
            'Génesis', // Tx pero solo le pasaré esta info por el momento
            'Génesis', // Undefined por que no tiene bloque previo
            'Génesis', // Hash inicial
            0, // Nonce inventado
            3, // La dificultad inicial fue de 3 ceros al inicio del hash
        )
    }

    // Método para minar nuevos bloques, también lo hago estático para solo invocarlo desde la clase sin necesidad de una nueva instancia
   static mine() {
    
  }

    printBlock(){
        const {timestamp, blockIndex, blockTx, blockPreviousHash, blockHash, nonce, difficulty} = this; //Básicamente estoy sacando toda la info del bloque
        return `Toffeecoin Block - 
        Time: ${timestamp}
        Index: ${blockIndex}
        Hash: ${blockHash}
        Transactions: ${blockTx}
        Previous Hash: ${blockPreviousHash}
        Nonce: ${nonce}
        Difficulty: ${difficulty}
        -----------------------------------
        `
    }


}

module.exports = Block;


// Pruebas rápidas de creación de bloque y de su hash
blockTest = new Block(Block.genesis);
console.log(JSON.stringify(blockTest,null,2));