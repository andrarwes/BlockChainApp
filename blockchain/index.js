const Block = require('./block');

class Blockchain{

    constructor(){
        this.chain = [Block.genesis()];
    }

    addBlock(data){
/*version1
        const lastBlock = [this.chain.length -1];//provides the info from the previous block
        const block = Block.mineBlock(lastBlock, data);
*/
//version2
        const block = Block.mineBlock(this.chain[this.chain.length -1], data);
        this.chain.push(block);//adds to the chain(which is an array) the new block

        return block;
    }

    isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
        for (let i=1; i<chain.length; i++) {
          const block = chain[i];
          const lastBlock = chain[i-1];
          if (
            block.lastHash !== lastBlock.hash ||
            block.hash !== Block.blockHash(block)
          ) {
            return false;
          }
        }
        return true;
      }

      replaceChain(newChain){
          if(newChain.length <= this.chain.length){
              console.log('Received chain is not longer than the current chain');
              return;
          }
          else if(!this.isValidChain(newChain)){
              console.log('The received chain is not valid');
              return;
          }

          console.log('Replacing blockchain with the new chain.');
          this.chain = newChain;
      }


}

module.exports = Blockchain;