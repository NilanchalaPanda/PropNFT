//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// Communicating with the RealEstate Contract -
interface IERC721 {
    function transferFrom(
        address _from,
        address _to,
        uint256 _id
    ) external;
}

contract Escrow {
    address public lender;
    address public inspector;
    address payable public seller;
    address public nftAddress;

    modifier onlySeller() {
        require(msg.sender == seller, "Only seller can call this method");
        _;
    }

    // [LEDT SIDE PART] uint == id of prop in RealEstate
    mapping(uint256 => bool) public isListed;
    mapping(uint256 => uint256) public purchasePrice;
    mapping(uint256 => uint256) public escrowAmount;
    mapping(uint256 => address) public buyer;

    constructor(address _nftAdd, address payable _seller, address _inspector, address _lender) {
        nftAddress = _nftAdd;
        seller = _seller;
        inspector = _inspector;
        lender = _lender;
    }

    function listProperties(uint256 _nftID, address _buyer, uint256 _purchasePrice, uint256 _escrowAmount) public payable onlySeller {
        // Transfer NFT from seller --> contract.
        IERC721(nftAddress).transferFrom(
            msg.sender,
            address(this),
            _nftID
        );

        // Updating the mapping array -
        isListed[_nftID] = true;
        purchasePrice[_nftID] = _purchasePrice;
        escrowAmount[_nftID] = _escrowAmount;
        buyer[_nftID] = _buyer;
    }
}
