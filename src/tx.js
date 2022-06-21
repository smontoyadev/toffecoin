//Clase para crear transacciones, en realidad puede ser cualquier tipo de data

const { SHA256 } = require("crypto-js");

class Transaction{
    constructor(transactionId, inputAccount, outputAccount, amount, metadata, timestamp){
        this.transactionId = transactionId; // Identificador de la transferencia
        this.inputAccount = inputAccount; // Emisor
        this.outputAccount = outputAccount; // Receptor
        this.amount = amount; // Monto de la transferencia
        this.metadata = metadata; // Mensajes adicionales en la transacción
        this.timestamp = timestamp; 
        this.hash = this.getTransactionHash(); // Cada transacción debe tener su hash, y con esto lo calculo
    }

    // Método para convertir toda la info de la transacción en un nuevo hash
    getTransactionHash(){
        return SHA256(this.transactionId + this.inputAccount + this.outputAccount + this.amount + this.metadata + this.timestamp).toString();
    }
}

module.exports = Transaction;