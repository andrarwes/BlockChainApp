const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain', ()=>{
    let bc, bc2;

    beforeEach(()=>{
        bc = new Blockchain();//creates a new instance for every test 
        bc2 = new Blockchain();
    });


//tests if the first block is the genesis one
it('starts with genesis Block', ()=>{
expect(bc.chain[0]).toEqual(Block.genesis());
});

//tests if a new block is added to the chain correctly
it('adds a new Block', ()=>{
const data = 'foo';//dummy data
bc.addBlock(data);

expect(bc.chain[bc.chain.length-1].data).toEqual(data);//checks if data from last block is the same with the one added to the new block
});

it('validates a valid chain', () => {
	bc2.addBlock('foo');
	expect(bc.isValidChain(bc2.chain)).toBe(true);
});

it('invalidates a chain with a corrupt genesis block', () => {
	bc2.chain[0].data = 'Bad data';
  expect(bc.isValidChain(bc2.chain)).toBe(false);
});

it('invalidates a corrupt chain', () => {
  bc2.addBlock('foo');
  bc2.chain[1].data = 'Not foo';
  expect(bc.isValidChain(bc2.chain)).toBe(false);
});

it('replaces the chain with a valid chain', ()=>{
bc2.addBlock('goo');
bc.replaceChain(bc2.chain);

expect(bc.chain).toEqual(bc2.chain);
});

it('it does not replace chain with one of less than or not equal to length', ()=>{
    bc.addBlock('foo');
    bc.replaceChain(bc2.chain);

    expect(bc.chain).not.toEqual(bc2.chain);
})

});