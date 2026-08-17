import { getSiteContent } from "@/lib/content/loader";
import { ProductDetailPage } from "@/components/sections/ProductDetailPage";
import { ProductJsonLd } from "@/components/seo/ProductJsonLd";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const content = getSiteContent();
  return content.variants.map((v) => ({ slug: v.id }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const content = getSiteContent();
  const product = content.variants.find((v) => v.id === slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.tagline} | Hayati`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: `https://hayatiworld.com${product.media.canImage}` }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const content = getSiteContent();
  const product = content.variants.find((v) => v.id === slug);
  if (!product) notFound();

  return (
    <>
      <ProductJsonLd product={product} />
      <ProductDetailPage productId={slug} />
    </>
  );
}
