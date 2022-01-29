// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BlindAuction {
  struct Bid  {
    bytes32 blindedBid;
    uint deposit;
  }

  address payable public beneficiary;
  uint256 public revealEnd;
  uint256 public biddingEnd;
  bool public ended;

  mapping(address => Bid[]) public bids;

  address public highestBidder;
  uint256 public highestBid;

  mapping(address => uint) pendingReturns;

  event AuctionEnded(address winner, uint256 highestBid);

  /// The function has been called too early.
  /// Try again at `time`
  error TooEarly(uint256 time);
  /// The function has been called too late.
  /// It cannot be called after `time`
  error TooLate(uint256 time);
  /// The auction has already ended.
  error AuctionAlreadyEnded();

  modifier onlyBefore(uint256 time) {
    if (block.timestamp >= time) revert TooLate(time);
    _;
  }

  modifier onlyAfter(uint256 time) {
    if (block.timestamp <= time) revert TooEarly(time);
    _;
  }

  constructor(
    uint256 biddingEndTime,
    uint256 revealEndTime,
    address payable beneficiaryAddress
  ) {
    beneficiary = beneficiaryAddress;
    biddingEnd = block.timestamp + biddingEndTime;
    revealEnd = biddingEnd + revealEndTime;
  }

  function placeBid(address bidder, uint value) internal returns (bool success) {
    if (value <= highestBid) {
      return false;
    }
    if (highestBidder != address(0)) {
      // Refund the previous highest bid.
      pendingReturns[highestBidder] = highestBid;
    }
    highestBidder = bidder;
    highestBid = value;
    return true;
  }

  /// Place a blineded bid with `blindedBid` = keccak256(abi.encodePacked(value, fake, secret)).
  /// The sent Ether is only refunded if the bid is correctly revealed at the revealing phase.
  /// A bid is regarded as valid if the amount of Ether sent along with the bid is at least `value` and `fake` is false.
  /// Sending any amount with `fake` set to true is a way to hide the real bid.
  /// An address could place multiple bids. 
  function bid(bytes32 blindedBid)
    public
    payable
    onlyBefore(biddingEnd)
  {
    bids[msg.sender].push(Bid({
      blindedBid: blindedBid,
      deposit: msg.value
    }));
  }

  function reveal(
    uint[] calldata values,
    bool[] calldata fakes,
    bytes32[] calldata secrets
  )
    external
    onlyAfter(biddingEnd)
    onlyBefore(revealEnd)
  {
    uint length = bids[msg.sender].length;
    require(values.length == length);
    require(fakes.length == length);
    require(secrets.length == length);
    uint refund = 0;
    for (uint i = 0; i < length; i++) {
      Bid storage bidToCheck = bids[msg.sender][i];
      (uint value, bool fake, bytes32 secret) = (values[i], fakes[i], secrets[i]);
      if (bidToCheck.blindedBid != keccak256(abi.encodePacked(value, fake, secret))) {
        // Bid was not actually revealed.
        // Do not refund deposit.
        continue;
      }
      refund += bidToCheck.deposit;
      if (!fake && bidToCheck.deposit >= value) {
        // If successfully placing the bid,
        // the bidding value should be deduced from refund value.
        if(placeBid(msg.sender, value)) {
          refund -= value;
        }
      }
      // Make it impossible to reclaim the bid.
      bidToCheck.blindedBid = bytes32(0);
    }
    payable(msg.sender).transfer(refund);
  }

  // Withdraw a bid that was overbid.
  function withdraw() external {
    uint amount = pendingReturns[msg.sender];
    if (amount > 0) {
      // NOTE: Always mutate state before interaction to
      // prevent from double entrance.
      pendingReturns[msg.sender] = 0;

      payable(msg.sender).transfer(amount);
    }
  }

  // End the auction and send the highest bid
  // to the beneficiary
  function auctionEnd()
    public
    onlyAfter(revealEnd)
  {
    if (ended) revert AuctionAlreadyEnded();
    emit AuctionEnded(highestBidder, highestBid);
    ended = true;
    beneficiary.transfer(highestBid);
  }
}