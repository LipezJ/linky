interface Links {
  container: string;
  self: string;
  card: string;
  link: string | undefined;
}

interface Footer {
  self: string;
  text: string;
  link: string;
  toogle_theme: string;
}

interface Container {
  self: string;
  links: Links;
  socials: Links & {
    icon: string;
  };
}

interface Header {
  avatar_container: string;
  avatar: string;
  self: string;
  name: string;
  bio: string;
}

export interface Template {
  super: string;
  header: Header;
  cont: Container;
  footer: Footer;
  background?: string;
}

export interface NestedTemplate {
  template: string;
  super?: string;
  header?: Header;
  cont?: Container;
  footer?: Footer;
  background?: string;
};

export interface TemplateList {
  [key: string]: Template | NestedTemplate;
}