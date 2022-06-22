const { SHA256 } = require("crypto-js");
const MINE_RATE = 1000;
difficulty = 0;

class Block {
    constructor(timestamp, blockIndex, blockTx, blockPreviousHash, blockHash, nonce, difficulty){
        this.timestamp = timestamp; // timestamp
        this.blockIndex = blockIndex; // La posición del bloque en la cadena
        this.blockTx = blockTx; // Transacciones y data
        this.blockPreviousHash = blockPreviousHash; // Hash del bloque anterior para poder conectarlos
        this.blockHash = blockHash // this.getHash(); // Convierte toda la info del bloque en un hash
        this.nonce = nonce; // El número usado para el PoW
        //this.merkleRoot = this.getMerkleRoot(); //*** Método pendiente *** Investigar como implementar el árbol Merkle
        this.difficulty = difficulty; // Acá se definirá la dificultad que requiere crear el bloque (Número de 0000 iniciales en el hash) *** Pendiente crear método
    }

    // Método para obtener un hash, lo implementaré dentro de otro método más adelante
    getHash(){
        // Método modificado, *** revisar github
    }


    // Creación del bloque génesis, lo hago estático para poder acceder sin necesidad de crear una instancia nueva, 
    // No tengo que crear un bloque para llamar este método, lo llamo directo desde la clase
    static get genesis() {
        const timestamp = new Date().getTime();

        return new this (
            timestamp, // Timestamp
            0, // Id del génesis
            'Génesis', // Tx pero solo le pasaré esta info por el momento
            'Undefined', // Undefined por que no tiene bloque previo
            'Hash Génesis', // Hash inicial
            0, // Nonce inventado
            3, // La dificultad inicial fue de 3 ceros al inicio del hash
        )
    }

    // Método para minar nuevos bloques, también lo hago estático para solo invocarlo desde la clase sin necesidad de una nueva instancia
   static mine(previousBlock, blockTx) {
    const { blockHash: blockPreviousHash } = previousBlock;
    let { difficulty } = previousBlock;
    let blockHash;
    let blockIndex = 0;
    let timestamp;
    let nonce = 0;

    do {
      timestamp = Date.now();
      nonce += 1;
      blockIndex += 1;
      difficulty =
        previousBlock.time + MINE_RATE > timestamp ? difficulty + 1 : difficulty - 1;
        blockHash = SHA256(timestamp, blockIndex, blockTx, blockPreviousHash, nonce, difficulty).toString();
    } while (blockHash.substring(0, difficulty) !== "0".repeat(difficulty));

    return new this(timestamp, blockIndex, blockTx, blockPreviousHash, blockHash, nonce, difficulty);
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

    computeMerkleRoot() {
        let treeList = this.generateMerkleTreeRoot();
        return treeList[treeList.length-1];
    }

    // Implementación del árbol de merkle, construida a base de ejemplos (Fue lo que más me costó entender)
    getMerkleRoot(){ 
        let tree = [];
        let transactionCount = this.blockTransactions.length;
 
        for (var i=0; i<transactionCount; i++) { tree.push(this.blockTransactions[i].hash); } let levelOffset = 0; for (let levelSize = transactionCount; levelSize > 1; levelSize = (levelSize + 1) / 2) {          
            for (let left = 0; left < levelSize; left += 2) {            
                let right = Math.min(left + 1, levelSize - 1);
                let tleft = tree[levelOffset + left];
                let tright = tree[levelOffset + right];
                tree.push(hash(tleft + tright));
            }            
            levelOffset += levelSize;
        }
 
        return tree;

    }


}

module.exports = Block;


// Pruebas rápidas de creación de bloque y de su hash
// blockTest = new Block(0,0,0,0);
// console.log(JSON.stringify(blockTest,null,2));