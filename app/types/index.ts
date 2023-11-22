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
