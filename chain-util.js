const EC = require('elliptic').ec;
const SHA256 = require ('crypto-js/sha256');
const ec = new EC('secp256k1');//elliptic curve to implement the public key cryptography
const { v1: uuidv1 } = require('uuid');//generates an unique id for the transaction

class ChainUtil{

    static genKeyPair(){
        return ec.genKeyPair();
    }

    static id(){
        return uuidv1();
    }

    static hash(data) {
        return SHA256(JSON.stringify(data)).toString();
      }
}

module.exports = ChainUtil;