import "server-only";
import { prisma } from "./db";
import type { Product, Category } from "./data";

// ─── Server-only Database Queries ───
// These functions can only be used in Server Components, API routes, or Server Actions.

export async function getProductBySlugFromDB(slug: string): Promise<Product | null> {
    const p = await prisma.product.findUnique({
        where: { slug },
        include: { category: true },
    });
    if (!p) return null;
    return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        images: p.images,
        sizes: p.sizes,
        colors: p.colors,
        category: p.category.name,
        categorySlug: p.category.slug,
        featured: p.featured,
    };
}

export async function getProductsByCategoryFromDB(categorySlug: string): Promise<Product[]> {
    let where = {};
    if (categorySlug === "new") {
        where = { featured: true };
    } else if (categorySlug !== "all") {
        where = { category: { slug: categorySlug } };
    }

    const products = await prisma.product.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: "desc" },
    });

    return products.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        images: p.images,
        sizes: p.sizes,
        colors: p.colors,
        category: p.category.name,
        categorySlug: p.category.slug,
        featured: p.featured,
    }));
}

export async function getFeaturedProductsFromDB(): Promise<Product[]> {
    return getProductsByCategoryFromDB("new");
}

export async function getAllCategoriesFromDB(): Promise<Category[]> {
    const cats = await prisma.category.findMany();
    return cats.map((c) => ({
        name: c.name,
        slug: c.slug,
        image: c.image,
        description: c.description,
    }));
}

export async function getAllProductsFromDB(): Promise<Product[]> {
    return getProductsByCategoryFromDB("all");
}
