// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.sol";

/**
 * @notice A contract that stores account reputations.
 */
contract Chat {
    struct Conversation {
        address accountOne;
        address accountTwo;
        uint time;
    }

    struct Message {
        address author;
        uint time;
        string extraData;
    }

    uint256 private _nextConversationId = 0;
    mapping(address account => uint[] conversationId) _conversationIds;
    mapping(uint conversationId => Conversation) _conversations;
    mapping(uint conversationId => Message[]) _messages;

    /// **************************
    /// ***** USER FUNCTIONS *****
    /// **************************

    function postMessage(address recepient, string memory extraData) external {
        uint conversationId = _findOrCreateConversation(msg.sender, recepient);
        _messages[conversationId].push(
            Message(msg.sender, block.timestamp, extraData)
        );
    }

    /// ***********************************
    /// ***** EXTERNAL VIEW FUNCTIONS *****
    /// ***********************************

    function getNextConversationId() external view returns (uint) {
        return _nextConversationId;
    }

    function getConversationIds() external view returns (uint[] memory) {
        return _conversationIds[msg.sender];
    }

    function getConversation(
        uint conversationIds
    ) external view returns (Conversation memory) {
        return _conversations[conversationIds];
    }

    function getMessages(
        uint conversationId
    ) external view returns (Message[] memory) {
        return _messages[conversationId];
    }

    /// ******************************
    /// ***** INTERNAL FUNCTIONS *****
    /// ******************************

    function _findOrCreateConversation(
        address accountOne,
        address accountTwo
    ) internal returns (uint) {
        // Find conversation
        for (uint256 i = 0; i < _nextConversationId; i++) {
            if (
                (_conversations[i].accountOne == accountOne &&
                    _conversations[i].accountTwo == accountTwo) ||
                (_conversations[i].accountOne == accountTwo &&
                    _conversations[i].accountTwo == accountOne)
            ) {
                return i;
            }
        }
        // Create conversation
        uint _conversationId = _nextConversationId++;
        _conversations[_conversationId] = Conversation(
            accountOne,
            accountTwo,
            block.timestamp
        );
        _conversationIds[accountOne].push(_conversationId);
        _conversationIds[accountTwo].push(_conversationId);
        return _conversationId;
    }
}
