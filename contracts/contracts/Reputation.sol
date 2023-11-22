// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.sol";

/**
 * @notice A contract that stores account reputations.
 */
contract Reputation is LSP8IdentifiableDigitalAsset {
    struct Statement {
        address author;
        uint time;
        uint skill;
        uint evaluation;
        string extraData;
    }

    mapping(bytes32 => Statement[]) _statements;

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

    function postStatement(
        address account,
        uint skill,
        uint evaluation,
        string memory extraData
    ) external {
        bytes32 tokenId = _accountToBytes32(account);
        _existsOrError(tokenId);
        _statements[tokenId].push(
            Statement(msg.sender, block.timestamp, skill, evaluation, extraData)
        );
    }

    /// ***********************************
    /// ***** EXTERNAL VIEW FUNCTIONS *****
    /// ***********************************

    function getStatements(
        address account
    ) external view returns (Statement[] memory) {
        bytes32 tokenId = _accountToBytes32(account);
        return _statements[tokenId];
    }

    /// ******************************
    /// ***** INTERNAL FUNCTIONS *****
    /// ******************************

    function _accountToBytes32(
        address account
    ) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(account)));
    }
}
