//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RealEstate is ERC721URIStorage{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Real Estate", "Real") {}
    
    // NEW PROPERTY IS BEING MINTED, that is, PrpertyNFT -> RealEstate
    function mintProprtyItems(string memory tokenURI) public returns(uint256){
        _tokenIds.increment();

        uint256 newItemID = _tokenIds.current();
        _safeMint(msg.sender, newItemID);
        _setTokenURI(newItemID, tokenURI);

        return newItemID;
    }

    function totalSupply() public view returns(uint256) {
        return _tokenIds.current();
    }
}
