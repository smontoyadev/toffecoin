const Block = require("./src/block");
const Blockchain = require("./src/blockchain");

const blockchain = new Blockchain();

// Prueba de minado de bloques y creación de blockchain

for(let i = 0; i < 10; i++){
    const block = blockchain.addBlock(`ToffeeBlock ${i}`)
    console.log(block.printBlock());
}