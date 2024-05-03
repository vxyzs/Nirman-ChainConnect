// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Test is ERC20, Ownable, ERC20Capped{

    constructor() ERC20("TestToken4","TT4") ERC20Capped(10 ** 24) Ownable(msg.sender){
        _mint(msg.sender,100);
        approve(msg.sender,100);
    }

    function  _update(address from,address to,uint256 value) internal override(ERC20,ERC20Capped)  {
        super._update(from, to, value);
    }

    uint256 public exchangeRate;
    function getExchangeRate() public view returns (uint256){
        return exchangeRate;
    }
    function setExchangeRate(uint256 _exchangeRate) public{
        require(msg.sender==owner(),"You cant set the exchange rate");
        exchangeRate = _exchangeRate;
    }

    uint256 public tokensAvailableForMint;
    function getTokensAvailableForMint() public view returns (uint256){
        return tokensAvailableForMint;
    }
    function setTokensAvailableForMint(uint256 _tokensAvailableForMint) public{
        require(msg.sender==owner(),"You cant set the tokens available for minting");
        tokensAvailableForMint = _tokensAvailableForMint;
    }

    struct Advertisement {
        address advertiser;
        address influencer;
        uint256 tokenAmount;
        uint8 status; // 0: pending, 1: accepted, 2: verified
    }

    mapping(uint256 => Advertisement) public advertisements;
    uint256 public nextAdvertisementId;

    struct AddressIdPair{
        address advertiser;
        uint256 adId;
    }
    mapping(address => AddressIdPair[]) public AddressIdPairs;
    function getAdvertiserForAUsers() public view returns (AddressIdPair memory){
        return AddressIdPairs[msg.sender][0];
    }

    event AdvertisementRequested(uint256 advertisementId, address advertiser, address influencer, uint256 tokenAmount);
    event AdvertisementAccepted(uint256 advertisementId);
    event AdvertisementVerified(uint256 advertisementId);

    function requestAdvertisement(address influencer, uint256 tokenAmount) public {
        require(tokenAmount > 0, "Token amount must be greater than 0");
        require(influencer != address(0), "Influencer address cannot be zero");

        advertisements[nextAdvertisementId] = Advertisement(msg.sender, influencer, tokenAmount, 0);
        emit AdvertisementRequested(nextAdvertisementId, msg.sender, influencer, tokenAmount);
        AddressIdPairs[influencer].push(AddressIdPair(msg.sender,nextAdvertisementId));
        nextAdvertisementId++;
    }

    function acceptAdvertisement(uint256 advertisementId) public {
        Advertisement storage ad = advertisements[advertisementId];
        require(ad.influencer == msg.sender, "Only the influencer can accept the advertisement");
        require(ad.status == 0, "Advertisement has already been accepted or verified");

        ad.status = 1;
        emit AdvertisementAccepted(advertisementId);
    }

    function verifyAdvertisement(uint256 advertisementId) public {
        Advertisement storage ad = advertisements[advertisementId];
        require(ad.advertiser == msg.sender, "Only the advertiser can verify the advertisement");
        require(ad.status == 1, "Advertisement must be accepted before verification");

        ad.status = 2;
        transfer(ad.influencer, ad.tokenAmount);
        emit AdvertisementVerified(advertisementId);
    }

    function buyTokens(uint count) external payable {
        require(count > 0, "Count must be greater than 0");
        uint tokensToBuy = count * exchangeRate;
        require(msg.value >= tokensToBuy, "Insufficient Ether sent");
        require(balanceOf(owner())>count,"Tokens are not available");
        _transfer(owner(), msg.sender, tokensToBuy);

        emit TokensBought(msg.sender, tokensToBuy);

        if (msg.value > tokensToBuy) {
            payable(msg.sender).transfer(msg.value - tokensToBuy);
        }
    }

    event TokensBought(address buyer, uint256 amount);

    function sellTokens(uint count) external {
        require(count > 0, "Count must be greater than 0");
        uint tokensToSell = getTokensAvailableForMint();
        require(balanceOf(msg.sender) >= tokensToSell, "Insufficient tokens");

        uint etherToTransfer = tokensToSell / (exchangeRate);

        require(address(this).balance >= etherToTransfer, "Contract does not have enough Ether");

        _transfer(msg.sender, owner(), tokensToSell);
        payable(msg.sender).transfer(etherToTransfer);

        emit TokensSold(msg.sender, tokensToSell, etherToTransfer);
    }

    event TokensSold(address seller, uint256 amount, uint256 etherReceived);

}