// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.sol";

contract Reputation is LSP8IdentifiableDigitalAsset {
    constructor()
        LSP8IdentifiableDigitalAsset(
            "dLinkedIn - Reputations",
            "DLIR",
            msg.sender,
            4
        )
    {}

    /// **************************
    /// ***** USER FUNCTIONS *****
    /// **************************

    function create() external {
        _mint(msg.sender, bytes32(uint256(uint160(msg.sender))), true, "0x");
    }

    /// ***********************************
    /// ***** EXTERNAL VIEW FUNCTIONS *****
    /// ***********************************

    /// ******************************
    /// ***** INTERNAL FUNCTIONS *****
    /// ******************************
}
