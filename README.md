### What's this

A repo as my journey learning Solidity and OpenZeppelin. It consists of some small contracts, which are probably not related to each other, but serve as individual deliverables for different learning objectives.

You could most likely find these contracts on [Solidity](https://docs.soliditylang.org/en/v0.8.11/solidity-by-example.html) or [OpenZeppelin](https://docs.openzeppelin.com/learn/developing-smart-contracts). Head there if you want to give it a try on your own.

Currently, following contracts are included:

- Box.sol: A minimal contract that just store a number and allow retrieval.
- Coin.sol: A contract that issues new crypto currency and allow minting and transferring between accounts.
- auctions/SimpleAuction.sol: An open auction that allow everyone to bid, and the highest wins the bid. Bidders could withdraw after auction ends if they are not the winner.
- auctions/BlindAuctions.sol: A blind auction allow participants to place blinded bids with real one or false ones. The deposit with real blinded bid must be at least claimed value. Deposit of false ones could be any value. False bid is a manner to confuse other participants and hide the real bid. After bidding time and at the reveal stage, if a participant honestly reveal all his/her bids, deposit of false bids will be returned, and amount claimed in the real blinded bid will be actually placed. After auction ended, participants could withdraw amount of deposit that is overbid, and beneficiary receives the highest bid.