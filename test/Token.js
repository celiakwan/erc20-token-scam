const { expect } = require('chai');

describe('Token', () => {
    const totalSupply = ethers.BigNumber.from(100000000000);
    let token;

    before(async () => {
        const Token = await ethers.getContractFactory('Token');
        token = await Token.deploy(totalSupply);
    });

    it('Smart contract is deployed with correct values', async () => {
        const name = await token.name.call();
        const symbol = await token.symbol.call();
        const supply = await token.totalSupply.call();

        expect(name).to.equal('Toxic');
        expect(symbol).to.equal('TOX');
        expect(supply.toString()).to.equal(totalSupply.toString());
    });
});