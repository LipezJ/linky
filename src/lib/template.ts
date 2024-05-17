import templates from '@/lib/resources/templates.json'
import type { 
  TemplateList, 
  NestedTemplate, 
  Template 
} from '@/lib/types/templates.types';

export class Templates {

  static list: TemplateList
  static icons = {
    default: "fa-solid fa-globe",
    instagram: "fa-brands fa-instagram",
    linkedin: "fa-brands fa-linkedin",
    facebook: "fa-brands fa-facebook",
    github: "fa-brands fa-github",
    tiktok: "fa-brands fa-tiktok",
    x: "fa-brands fa-x-twitter"
  }
  static links = {
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/in/",
    facebook: "https://facebook.com/",
    github: "https://github.com/",
    tiktok: "https://tiktok.com/",
    x: "https://twitter.com/"
  }

  static {
    Templates.list = templates;
  }

  static getTemplate(name: string): Template {

    const template = this.list[name];

    if (this.isNested(template)) {
      const nested = this.getTemplate(template.template);
      return {
        ...nested,
        ...template
      };
    } else {
      return template;  
    }
  }

  static getSocialsIcons(name: string) {
    const icon = this.icons[name as keyof typeof this.icons];
    return icon ?? this.icons.default;
  }

  static isNested(template: Template | NestedTemplate): template is NestedTemplate {
    return (template as NestedTemplate).template !== undefined;
  }

  static getSocialsLink(name: string, username: string) {
    const link = this.links[name as keyof typeof this.links];
    return link ? `${link}${username}` : "";
  }
}