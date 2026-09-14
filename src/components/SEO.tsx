import React, { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  image?: string;
  imageAlt?: string;
  type?: string;
  noIndex?: boolean;
  structuredData?: object | object[];
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = "Nexovate is a practitioner-led applied learning platform helping students discover practical skills, build real production software systems, and shape what's next.",
  canonical = "https://nexovate.org.in/",
  image = "https://nexovate.org.in/brand-creator.jpg",
  imageAlt = "Nexovate — Learn. Build. Make It Real.",
  type = "website",
  noIndex = false,
  structuredData,
}) => {
  useEffect(() => {
    // 1. Document Title
    document.title = title;

    // 2. Helper for Meta Tags
    const setMetaTag = (attrName: "name" | "property", attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Standard Meta
    setMetaTag("name", "description", description);
    setMetaTag(
      "name",
      "robots",
      noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large"
    );

    // Canonical Link (Only for indexable pages)
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!noIndex && canonical) {
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", canonical);
    } else if (canonicalLink && noIndex) {
      canonicalLink.remove();
    }

    // OpenGraph Meta
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", canonical);
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:image", image);
    setMetaTag("property", "og:image:alt", imageAlt);
    setMetaTag("property", "og:site_name", "Nexovate");
    setMetaTag("property", "og:locale", "en_IN");

    // Twitter Card Meta
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", image);
    setMetaTag("name", "twitter:image:alt", imageAlt);

    // Page-level Structured Data Injection (if provided)
    const scriptId = "page-structured-data";
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (structuredData) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = scriptId;
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, canonical, image, imageAlt, type, structuredData]);

  return null;
};

export default SEO;

