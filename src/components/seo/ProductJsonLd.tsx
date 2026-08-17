import React from "react";
import { ProductVariantItem } from "@/lib/content/types";

interface ProductJsonLdProps {
  product: ProductVariantItem;
}

const PRICE_BY_COLLECTION: Record<string, string> = {
  "Alder Series": "189.00",
  "HOPP Series": "189.00",
  "Signature Botanicals": "219.00",
  "Fruit Splash": "169.00",
  "Classic Soda": "189.00",
  default: "189.00",
};

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const baseUrl = "https://hayatiworld.com";
  const price = PRICE_BY_COLLECTION[product.collection ?? "default"] ?? PRICE_BY_COLLECTION.default;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [`${baseUrl}${product.media.canImage}`],
    description: product.description,
    sku: product.id,
    mpn: `HYT-${product.id.toUpperCase()}`,
    brand: {
      "@type": "Brand",
      name: "Hayati",
    },
    category: `Food & Beverage > Beverages > ${product.collection ?? "Functional Drinks"}`,
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/products/${product.id}`,
      priceCurrency: "INR",
      price: price,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      seller: {
        "@type": "Organization",
        name: "Hayati World",
      },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Flavor Profile",
        value: product.flavorProfile,
      },
      ...product.tastingNotes.map((note) => ({
        "@type": "PropertyValue",
        name: "Feature Claim",
        value: note,
      })),
      ...product.nutrition.map((nut) => ({
        "@type": "PropertyValue",
        name: `Nutrition: ${nut.label}`,
        value: nut.value,
      })),
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.collection ?? "Flavors",
        item: `${baseUrl}/#variants`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${baseUrl}/products/${product.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
