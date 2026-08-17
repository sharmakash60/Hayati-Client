import React from "react";
import { getSiteContent } from "@/lib/content/loader";

export function JsonLd() {
  const content = getSiteContent();
  const baseUrl = "https://hayatiworld.com";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: content.brand.legalName,
    alternateName: content.brand.name,
    url: baseUrl,
    logo: `${baseUrl}/logo.webp`,
    description: content.brand.mission,
    email: content.brand.contactEmail,
    telephone: content.brand.contactPhone,
    sameAs: Object.values(content.brand.social).filter(Boolean),
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
  };

  const aggregateProductSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Hayati Premium Functional Hydration & Beverages",
    image: `${baseUrl}/logo.webp`,
    description: content.brand.metaDescription,
    brand: {
      "@type": "Brand",
      name: content.brand.name,
    },
    category: "Food & Beverage > Beverages > Functional Drinks",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: "169.00",
      highPrice: "219.00",
      offerCount: content.variants.length,
      offers: content.variants.map((v) => ({
        "@type": "Offer",
        name: `Hayati ${v.name}`,
        description: v.description,
        availability: v.inStock
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
        price: v.collection === "Signature Botanicals" ? "219.00" : v.collection === "Fruit Splash" ? "169.00" : "189.00",
        priceCurrency: "INR",
        url: `${baseUrl}/products/${v.id}`,
        itemCondition: "https://schema.org/NewCondition",
      })),
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Hayati World",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/#variants`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateProductSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
