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
