import contentData from "@/content/content.json";
import faqData from "@/content/faq.json";
import { SiteContent, FAQItem } from "./types";

export function getSiteContent(): SiteContent {
  return contentData as unknown as SiteContent;
}

export function getFaqs(): FAQItem[] {
  return (faqData as { faqs: FAQItem[] }).faqs;
}

export function getFaqsByCategory(category: string): FAQItem[] {
  const faqs = getFaqs();
  if (category === "All") return faqs;
  return faqs.filter((f) => f.category.toLowerCase() === category.toLowerCase());
}

export function getVariantById(id: string) {
  const content = getSiteContent();
  return content.variants.find((v) => v.id === id);
}
