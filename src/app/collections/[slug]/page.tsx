import { getProductsByCategoryFromDB, getAllCategoriesFromDB } from "@/lib/data.server";
import CollectionClient from "./CollectionClient";

export default async function CollectionPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const [products, categories] = await Promise.all([
        getProductsByCategoryFromDB(slug),
        getAllCategoriesFromDB(),
    ]);
    const category = categories.find((c) => c.slug === slug);

    return (
        <CollectionClient
            products={products}
            categoryName={category?.name || slug.toUpperCase()}
            categoryDescription={category?.description || ""}
        />
    );
}
