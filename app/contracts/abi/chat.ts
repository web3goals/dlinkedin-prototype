export const chatContractAbi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "conversationIds",
        type: "uint256",
      },
    ],
    name: "getConversation",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "accountOne",
            type: "address",
          },
          {
            internalType: "address",
            name: "accountTwo",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "time",
            type: "uint256",
          },
        ],
        internalType: "struct Chat.Conversation",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getConversationIds",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "conversationId",
        type: "uint256",
      },
    ],
    name: "getMessages",
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
            internalType: "string",
            name: "extraData",
            type: "string",
          },
        ],
        internalType: "struct Chat.Message[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNextConversationId",
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
        name: "recepient",
        type: "address",
      },
      {
        internalType: "string",
        name: "extraData",
        type: "string",
      },
    ],
    name: "postMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
