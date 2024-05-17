import type { Addons, Link, Socials } from "@/db/types/aggregator.types";
import { useEffect, useState } from "preact/hooks";

export function useAddons(addons: Addons) {
  const [state, setState] = useState(addons);

  const updateBio = (bio: string) => {
    setState(prev => ({
      ...prev,
      bio
    }));
  }

  const updateSocials = (socials: Partial<Socials>) => {
    setState(prev => ({
      ...prev,
      socials: {
        ...prev.socials,
        ...socials
      }
    }));
  }

  const updateTemplate = (template: string) => {
    setState(prev => ({
      ...prev,
      template
    }));
  }

  useEffect(() => {
    const body = JSON.stringify(state);
    if (body === JSON.stringify(addons)) return;

    fetch("/api/aggregator/addons", { body, method: "POST" })
  }, [state]);

  return {
    addons: state,
    updateBio,
    updateSocials,
    updateTemplate
  }
}

export function useLinks(links: Link[]) {
  const [state, setState] = useState(links);

  const addLink = (newLink: Link) => {
    if (newLink.link && !newLink.link.startsWith("http")) {
      newLink.link = `https://${newLink.link}`;
    }

    setState(prev => [...prev, newLink]);
  }

  const removeLink = (link: Link) => {
    const newLinks = state.filter(l => l.link !== link.link && l.text !== link.text);
    setState(newLinks);
  }

  const updateLink = (oldLink: Link, newLink: Link) => {
    const newLinks = state.map(link => {
      if (link.link === oldLink.link && link.text === oldLink.text) {
        return newLink;
      }
      return link;
    });
    setState(newLinks);
  }

  useEffect(() => {
    const body = JSON.stringify(state);
    if (body === JSON.stringify(links)) return;

    fetch("/api/aggregator/links", { body, method: "POST" });
  }, [state]);

  return {
    links: state,
    addLink,
    updateLink,
    removeLink
  }
}