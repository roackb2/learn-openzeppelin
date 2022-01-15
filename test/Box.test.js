const { expect } = require('chai')
const {
  BN, expectEvent, expectRevert
} = require('@openzeppelin/test-helpers')

const Box = artifacts.require('Box')

contract('Box', function([owner, other]) {
  // BN stands for big number
  const value = new BN('42')

  beforeEach(async function () {
    this.box = await Box.new({ from: owner })
  })

  it("'retrieve' returns the value stored in the box", async function () {
    await this.box.store(value, { from: owner })
    const stored = await this.box.retrieve()

    expect(stored.toString()).to.be.bignumber.equal(value)
  })

  it("'store' emits an event", async function () {
    const receipt = await this.box.store(value, { from: owner })

    expectEvent(receipt, 'ValueChanged', { value })
  })

  it("non owner cannot store a value", async function () {
    await expectRevert(
      this.box.store(value, { from: other }),
      'Ownable: caller is not the owner'
    )
  })
})
