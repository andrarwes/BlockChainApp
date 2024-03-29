const ChainUtil = require('../chain-util');
const {INITIAL_BALANCE} = require('../config');

class Wallet{
    
    constructor(){
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');//returns a public key contained in the keyPair obj
    }

    toString(){
        return ` Wallet -
        publicKey: ${this.publicKey.toString()}
        balance  : ${this.balance}
        }`
    }
    
    sign(dataHash) {
        return this.keyPair.sign(dataHash);
      }
    
}

module.exports = Wallet;