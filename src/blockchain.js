const Block = require("./block");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis];
  }

  // Método para añadir un nuevo bloque a la blockchain
  addBlock(data) {
    const previousBlock = this.chain[this.chain.length - 1];
    const block = Block.mine(previousBlock, data);
    this.chain.push(block);
    return block;
  }
}

module.exports = Blockchain;