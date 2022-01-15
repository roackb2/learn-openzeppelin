const { expect } = require('chai')

describe('Box', function () {
  before(async function () {
    this.Box = await ethers.getContractFactory('Box')
  })

  beforeEach(async function () {
    this.box = await this.Box.deploy()
    await this.box.deployed()
  })

  it("'retrieve' returns the value stored in the box", async function () {
    await this.box.store(42)
    const stored = await this.box.retrieve()
    expect(stored.toString()).to.equal('42')
  })
})