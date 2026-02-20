import { getProductBySlugFromDB, getProductsByCategoryFromDB } from "@/lib/data.server";
import { notFound } from "next/navigation";
import ProductClient from "./ProductClient";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = await getProductBySlugFromDB(slug);

    if (!product) {
        notFound();
    }

    // Get related products from the same category
    const allInCategory = await getProductsByCategoryFromDB(product.categorySlug);
    const related = allInCategory
        .filter((p) => p.id !== product.id)
        .slice(0, 3);

    return <ProductClient product={product} related={related} />;
}
