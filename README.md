### What's this

A repo as my journey learning Solidity and OpenZeppelin. It consists of some small contracts, which are probably not related to each other, but serve as individual deliverables for different learning objectives.

You could most likely find these contracts on [Solidity](https://docs.soliditylang.org/en/v0.8.11/solidity-by-example.html) or [OpenZeppelin](https://docs.openzeppelin.com/learn/developing-smart-contracts). Head there if you want to give it a try on your own.

Currently, following contracts are included:

- Box.sol: A minimal contract that just store a number and allow retrieval.
- Coin.sol: A contract that issues new crypto currency and allow minting and transferring between accounts.
- auctions/SimpleAuction.sol: An open auction that allow everyone to bid, and the highest wins the bid. Bidders could withdraw after auction ends if they are not the winner.