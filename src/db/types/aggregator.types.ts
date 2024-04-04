interface Links {
  text: string;
  link: string | undefined;
}

interface Socials {
  instagram: string | undefined;
  linkedin: string | undefined;
  facebook: string | undefined;
  github: string | undefined;
  tiktok: string | undefined;
  x: string | undefined;
}

export interface AggregatorData {
  user_name: string;
  avatar_url: string | null;
  links: Links[]
  addons: {
    template: string | undefined;
    bio: string;
    socials: Socials
  }
}