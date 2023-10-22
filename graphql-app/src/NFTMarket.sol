// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct NFTListing {
    uint256 price;
    address seller;
}

contract NFTMarket is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    using SafeMath for uint256;
    Counters.Counter private _tokenIds;
    mapping(uint256 => NFTListing) private _listings; 

    // if tokenURI is not an empty string => an NFT was created
    // if price is not 0 => an NFT was listed
    // if price is 0 && tokenURI is an empty string => NFT was transferred(bought or canceled)
    event NFTTransfer(uint256 tokenID, address from, address to, string tokenURI, uint256 price);

    constructor() ERC721("Mckurz NFTs", "MCKURZ") {

    }

    // createNFT
    function createNFT(string calldata tokenURI) public {
        _tokenIds.increment();
        uint256 currentID = _tokenIds.current();
        _safeMint(msg.sender, currentID);
        _setTokenURI(currentID, tokenURI);
        emit NFTTransfer(currentID, address(0), msg.sender, tokenURI, 0);
    }

    // ListNFT
    function listNFT(uint256 tokenID, uint256 price) public {
        require(price > 0, "NFTMarket: price must be greater than 0");
        approve(address(this), tokenID);
        transferFrom(msg.sender, address(this), tokenID);
        _listings[tokenID] = NFTListing(price, msg.sender);
        emit NFTTransfer(tokenID, msg.sender, address(this), "", price);
    }

    // BuyNFT
    function buyNFT(uint256 tokenID) public payable {
        NFTListing memory listing = _listings[tokenID];
        require(listing.price > 0, "NFTMarket: nft not listed for sale");
        require(msg.value == listing.price, "NFTMarket: incorrect price");
        ERC721(address(this)).transferFrom(address(this), msg.sender, tokenID);
        clearListing(tokenID);
        payable(listing.seller).transfer(listing.price.mul(95).div(100));
        emit NFTTransfer(tokenID,address(this), msg.sender, "", 0);
    }
    
    // Cancel listing
    function cancelListing(uint256 tokenID) public {
        NFTListing memory listing = _listings[tokenID];
        require(listing.price > 0, "NFTMarket: nft not listed for sale");
        require(listing.seller == msg.sender, "NFTMarket: you are not the owner");
        ERC721(address(this)).transferFrom(address(this), msg.sender, tokenID);
        clearListing(tokenID);
        emit NFTTransfer(tokenID, address(this), msg.sender, "", 0);
    }

    function withdrawFunds() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "NFTMarket: balance is zero");
        payable(owner()).transfer(balance);
    }

    function clearListing(uint256 tokenID) private {
        _listings[tokenID].price = 0;
        _listings[tokenID].seller = address(0);
    }

}

// Verified: https://goerli.etherscan.io/address/0xCe93f1CE699408B2004072A6C188CeDd66AC9823#code