//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

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
    address public buyer;

    constructor(address _nftAdd, address payable _seller, address _inspector, address _lender) {
        nftAddress = _nftAdd;
        seller = _seller;
        inspector = _inspector;
        lender = _lender;
    }
}
