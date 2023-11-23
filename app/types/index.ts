export type Profile = {
  name: string | undefined;
  description: string | undefined;
  avatar: string | undefined;
  links: ProfileLink[] | undefined;
};

export type ProfileLink = {
  title: string;
  url: string;
};

export type Statement = {
  author: string;
  time: number;
  skill: number;
  evaluation: number;
  extraData: string;
};

export type StatementExtraData = {
  comment: string;
};

export type Conversation = {
  accountOne: string;
  accountTwo: string;
  time: number;
};

export type Message = {
  author: string;
  time: number;
  extraData: string;
};

export type MessageExtraData = {
  message: string;
};

export type Reputation = {
  skill: number;
  evaluation: number;
  statements: number;
};
