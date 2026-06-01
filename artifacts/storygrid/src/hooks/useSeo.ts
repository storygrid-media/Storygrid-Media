import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  canonicalUrl?: string;
}

export function useSeo({ title, description, canonicalUrl }: SeoProps) {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // 3. Update Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    const currentUrl = canonicalUrl || window.location.href;
    canonical.setAttribute("href", currentUrl);

    // Helper to query/create and set meta tags
    const updateMetaTag = (nameOrProperty: string, content: string, isProperty = true) => {
      const attributeName = isProperty ? "property" : "name";
      let tag = document.querySelector(`meta[${attributeName}="${nameOrProperty}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attributeName, nameOrProperty);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    // 4. Update OpenGraph Tags
    updateMetaTag("og:title", title);
    updateMetaTag("og:description", description);
    updateMetaTag("og:url", currentUrl);

    // 5. Update Twitter Tags
    updateMetaTag("twitter:title", title, false);
    updateMetaTag("twitter:description", description, false);

  }, [title, description, canonicalUrl]);
}
