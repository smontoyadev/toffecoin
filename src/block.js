const { SHA256 } = require("crypto-js");

class Block {
    constructor(blockIndex, blockCreation, blockTx, blockPreviousHash){
        this.blockCreation = blockCreation; // timestamp
        this.blockIndex = blockIndex; // La posición del bloque en la cadena
        this.blockTx = blockTx; // Transacciones y data
        this.blockPreviousHash = blockPreviousHash; // Hash del bloque anterior para poder conectarlos
        this.hash = this.getHash(); // Convierte toda la info del bloque en un hash
        //this.nonce = nonce; // El número usado para el PoW
        //this.merkleRoot = this.getMerkleRoot(); *** Método pendiente *** Investigar como implementar el árbol Merkle
        //this.difficulty = difficulty; // Acá se definirá la dificultad que requiere crear el bloque (Número de 0000 iniciales en el hash) *** Pendiente crear método
    }

    getHash(){
        return SHA256(this.blockPreviousHash + this.blockCreation + JSON.stringify(this.blockTx)).toString();
    }

    

    // Creación del bloque génesis, lo hago estático para poder acceder sin necesidad de crear una instancia nueva, 
    // No tengo que crear un bloque para llamar este método, lo llamo directo desde la clase
    static get genesis() {
        const blockCreation = new Date().getTime();

        return new this (
            blockCreation, // Timestamp
            0, // Id del génesis
            'Génesis', // Tx pero solo le pasaré esta info por el momento
            'Undefined', // Undefined por que no tiene bloque previo
            'Hash Génesis', // Hash inicial
            0, // Nonce inventado
            3, // Dígamos que la dificultad inicial fue de 3 ceros al inicio del hash
        )
    }

    getMerkleRoot(){

    }


}

module.exports = Block;


// Pruebas rápidas de creación de bloque y de su hash
// blockTest = new Block(0,0,0,0);
// console.log(JSON.stringify(blockTest,null,2));