import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FaqBanner from "@/components/home/FaqBanner";
import { getFeaturedProductsFromDB } from "@/lib/data.server";

export default async function Home() {
  const featuredProducts = await getFeaturedProductsFromDB();

  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FaqBanner />
      <FeaturedProducts products={featuredProducts} />
    </>
  );
}
