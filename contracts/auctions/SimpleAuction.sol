// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleAuction {
  address payable public beneficiary;
  // Seconds since Epoch of time that auction ends.
  uint public auctionEndTime;

  // Current state of the auction.
  address public highestBidder;
  uint public highestBid;

  // Allow bidders to withdraw previous bid.
  mapping(address => uint) pendingReturns;

  // Set to true and disallow any change after auction ends.
  bool ended;

  event HighestBidIncreased(address bidder, uint amount);
  event AuctionEnds(address winner, uint amount);

  // NOTE: Tripple slash comments will show
  // when user is asked to confirm the transaction
  // or when error is displayed.

  /// The auction has already ended.
  error AuctionAlreadyEnded();
  /// There is already a higher or equal bid.
  error BidNotHighEnough(uint highestBid);
  /// The auction is not yet ended.
  error AuctionNotYetEnded();
  /// The function auctionEnd has already been called.
  error AuctionEndAlreadyCalled();

  //// Create a simple auction starting from creation time
  /// and ends after `biddingTime` seconds on behalf of the
  /// `beneficiaryAddress` as the beneficiary address.
  constructor(
    uint biddingtTime,
    address payable beneficiaryAddress
  ) {
    beneficiary = beneficiaryAddress;
    auctionEndTime = block.timestamp + biddingtTime;
  }

  function bid() external payable {
    if (block.timestamp > auctionEndTime)
      revert AuctionAlreadyEnded();

    if (msg.value <= highestBid)
      revert BidNotHighEnough(highestBid);

    if (highestBid != 0) {
      // NOTE: Do not send money back using
      // `highestBidder.send(highestBid)` since this
      // might execute untrusted contract.
      pendingReturns[msg.sender] += msg.value;
    }
    highestBidder = msg.sender;
    highestBid = msg.value;
    emit HighestBidIncreased(highestBidder, highestBid);
  }

  function withdraw() external returns (bool) {
    uint amount = pendingReturns[msg.sender];
    if (amount > 0) {
      // NOTE: Important to set to zero here to prevent
      // double entrance before the `send` returns.
      pendingReturns[msg.sender] = 0;

      if(!payable(msg.sender).send(amount)) {
        // NOTE: No need to throw error here, just reset amount owing.
        pendingReturns[msg.sender] = amount;
        return false;
      }
    }
    return true;
  }

  function auctionEnd() external {
    // 1. Check conditions first
    if (block.timestamp < auctionEndTime)
      revert AuctionNotYetEnded();
    if (ended)
      revert AuctionEndAlreadyCalled();

    // 2. Effects and mutate state
    ended = true;
    emit AuctionEnds(highestBidder, highestBid);

    // 3. Interactions
    beneficiary.transfer(highestBid);
  }
}