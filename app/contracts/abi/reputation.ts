export const reputationContractAbi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ERC725Y_DataKeysValuesEmptyArray",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC725Y_DataKeysValuesLengthMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC725Y_MsgValueDisallowed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "storedData",
        type: "bytes",
      },
    ],
    name: "InvalidExtensionAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "InvalidFunctionSelector",
    type: "error",
  },
  {
    inputs: [],
    name: "LSP4TokenNameNotEditable",
    type: "error",
  },
  {
    inputs: [],
    name: "LSP4TokenSymbolNotEditable",
    type: "error",
  },
  {
    inputs: [],
    name: "LSP8CannotSendToAddressZero",
    type: "error",
  },
  {
    inputs: [],
    name: "LSP8CannotSendToSelf",
    type: "error",
  },
  {
    inputs: [],
    name: "LSP8CannotUseAddressZeroAsOperator",
    type: "error",
  },
  {
    inputs: [],
    name: "LSP8InvalidTransferBatch",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
    ],
    name: "LSP8NonExistentTokenId",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
    ],
    name: "LSP8NonExistingOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "LSP8NotTokenOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenOwner",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "LSP8NotTokenOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenReceiver",
        type: "address",
      },
    ],
    name: "LSP8NotifyTokenReceiverContractMissingLSP1Interface",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenReceiver",
        type: "address",
      },
    ],
    name: "LSP8NotifyTokenReceiverIsEOA",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
    ],
    name: "LSP8OperatorAlreadyAuthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "LSP8TokenContractCannotHoldValue",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
    ],
    name: "LSP8TokenIdAlreadyMinted",
    type: "error",
  },
  {
    inputs: [],
    name: "LSP8TokenIdTypeNotEditable",
    type: "error",
  },
  {
    inputs: [],
    name: "LSP8TokenOwnerCannotBeOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "functionSelector",
        type: "bytes4",
      },
    ],
    name: "NoExtensionFoundForFunctionSelector",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "callerAddress",
        type: "address",
      },
    ],
    name: "OwnableCallerNotTheOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnableCannotSetZeroAddressAsOwner",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "operatorNotificationData",
        type: "bytes",
      },
    ],
    name: "AuthorizedOperator",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "dataKey",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "dataValue",
        type: "bytes",
      },
    ],
    name: "DataChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "notified",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "operatorNotificationData",
        type: "bytes",
      },
    ],
    name: "RevokedOperator",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "force",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "operatorNotificationData",
        type: "bytes",
      },
    ],
    name: "authorizeOperator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenOwner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "create",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "dataKey",
        type: "bytes32",
      },
    ],
    name: "getData",
    outputs: [
      {
        internalType: "bytes",
        name: "dataValue",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "dataKeys",
        type: "bytes32[]",
      },
    ],
    name: "getDataBatch",
    outputs: [
      {
        internalType: "bytes[]",
        name: "dataValues",
        type: "bytes[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
    ],
    name: "getOperatorsOf",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getStatements",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "author",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "time",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "skill",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "evaluation",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "extraData",
            type: "string",
          },
        ],
        internalType: "struct Reputation.Statement[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
    ],
    name: "isOperatorFor",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "skill",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "evaluation",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "extraData",
        type: "string",
      },
    ],
    name: "postStatement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "notify",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "operatorNotificationData",
        type: "bytes",
      },
    ],
    name: "revokeOperator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "dataKey",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "dataValue",
        type: "bytes",
      },
    ],
    name: "setData",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "dataKeys",
        type: "bytes32[]",
      },
      {
        internalType: "bytes[]",
        name: "dataValues",
        type: "bytes[]",
      },
    ],
    name: "setDataBatch",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenOwner",
        type: "address",
      },
    ],
    name: "tokenIdsOf",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
    ],
    name: "tokenOwnerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "tokenId",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "force",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "transfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "from",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "to",
        type: "address[]",
      },
      {
        internalType: "bytes32[]",
        name: "tokenId",
        type: "bytes32[]",
      },
      {
        internalType: "bool[]",
        name: "force",
        type: "bool[]",
      },
      {
        internalType: "bytes[]",
        name: "data",
        type: "bytes[]",
      },
    ],
    name: "transferBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;
