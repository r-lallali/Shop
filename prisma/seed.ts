import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as any);

async function main() {
    console.log("🌱 Seeding database...");

    // ─── Categories ───
    const catAll = await prisma.category.upsert({
        where: { slug: "all" },
        update: {},
        create: {
            name: "ALL",
            slug: "all",
            image: "/images/hero-new.jpg",
            description: "",
        },
    });

    const catNew = await prisma.category.upsert({
        where: { slug: "new" },
        update: {},
        create: {
            name: "NEW",
            slug: "new",
            image: "/images/product-hoodie-black.png",
            description: "",
        },
    });

    const catTops = await prisma.category.upsert({
        where: { slug: "tops" },
        update: {},
        create: {
            name: "TOPS",
            slug: "tops",
            image: "/images/category-tops-new.png",
            description: "",
        },
    });

    const catPants = await prisma.category.upsert({
        where: { slug: "pants" },
        update: {},
        create: {
            name: "PANTS",
            slug: "pants",
            image: "/images/category-pants-new.png",
            description: "",
        },
    });

    const catAccessoires = await prisma.category.upsert({
        where: { slug: "accessoires" },
        update: {},
        create: {
            name: "ACCESSOIRES",
            slug: "accessoires",
            image: "/images/hero-new.jpg",
            description: "",
        },
    });

    console.log("✅ Categories created");

    // ─── Products ───
    const productsData = [
        {
            name: "OVERSIZED TEE — BLACK",
            slug: "oversized-tee-black",
            description:
                "T-shirt oversized en coton premium 300gsm. Coupe ample et décontractée. Fabriqué au Portugal avec des matériaux de qualité supérieure.",
            price: 45,
            images: ["/images/category-tops.png"],
            sizes: ["S", "M", "L", "XL"],
            colors: ["Noir"],
            featured: true,
            stock: 50,
            categoryId: catTops.id,
        },
        {
            name: "OVERSIZED TEE — WHITE",
            slug: "oversized-tee-white",
            description:
                "T-shirt oversized en coton premium 300gsm. Coupe ample et décontractée. Teint dans un blanc éclatant. Fabriqué au Portugal.",
            price: 45,
            images: ["/images/product-tshirt-white.png"],
            sizes: ["S", "M", "L", "XL"],
            colors: ["Blanc"],
            featured: true,
            stock: 50,
            categoryId: catTops.id,
        },
        {
            name: "ESSENTIAL HOODIE — BLACK",
            slug: "essential-hoodie-black",
            description:
                "Hoodie oversize en coton brossé 400gsm. Capuche doublée, poche kangourou et finitions côtelées. Le basique ultime.",
            price: 85,
            images: ["/images/product-hoodie-black.png"],
            sizes: ["S", "M", "L", "XL"],
            colors: ["Noir"],
            featured: true,
            stock: 30,
            categoryId: catTops.id,
        },
        {
            name: "CARGO PANTS — CHARCOAL",
            slug: "cargo-pants-charcoal",
            description:
                "Pantalon cargo en toile résistante. Poches latérales à rabat, taille ajustable et coupe droite. Teinte charcoal intemporelle.",
            price: 75,
            images: ["/images/category-pants.png"],
            sizes: ["S", "M", "L", "XL"],
            colors: ["Charcoal"],
            featured: true,
            stock: 40,
            categoryId: catPants.id,
        },
        {
            name: "ESSENTIAL SHORTS — GRAY",
            slug: "essential-shorts-gray",
            description:
                "Short en coton éponge premium. Taille élastiquée avec cordon, poches latérales. Confort absolu.",
            price: 55,
            images: ["/images/product-shorts-gray.png"],
            sizes: ["S", "M", "L", "XL"],
            colors: ["Gris"],
            featured: true,
            stock: 45,
            categoryId: catPants.id,
        },
        {
            name: "SIGNATURE PANTS",
            slug: "signature-pants",
            description:
                "Nouveau pantalon signature avec une coupe ample et un drapé impeccable. Parfaitement coupé pour le mouvement.",
            price: 80,
            images: ["/images/pant1.jpg", "/images/pant1a.jpg"],
            sizes: ["S", "M", "L", "XL"],
            colors: ["Noir"],
            featured: true,
            stock: 25,
            categoryId: catPants.id,
        },
        {
            name: "OVERSIZED TEE — BLACK V2",
            slug: "oversized-tee-black-v2",
            description:
                "T-shirt oversized nouvelle édition. Coton premium 320gsm, col renforcé et logo brodé ton sur ton.",
            price: 50,
            images: ["/images/category-tops.png"],
            sizes: ["S", "M", "L", "XL"],
            colors: ["Noir"],
            featured: false,
            stock: 35,
            categoryId: catTops.id,
        },
        {
            name: "THERMAL HANDS BEANIE",
            slug: "thermal-hands-beanie",
            description:
                "Bonnet en maille côtelée avec motif thermique imprimé. Parfait pour l'hiver, chaud et confortable.",
            price: 35,
            images: ["/images/beanie-hands.jpg"],
            sizes: ["TU"],
            colors: ["Multicolore"],
            featured: false,
            stock: 60,
            categoryId: catAccessoires.id,
        },
        {
            name: "SWIRL BEANIE — BLACK",
            slug: "swirl-beanie-black",
            description:
                "Bonnet avec motif tourbillon texturé. Maille dense pour une silhouette structurée. Design exclusif.",
            price: 35,
            images: ["/images/beanie-black.png"],
            sizes: ["TU"],
            colors: ["Noir"],
            featured: false,
            stock: 55,
            categoryId: catAccessoires.id,
        },
        {
            name: "SWIRL BEANIE — TEAL",
            slug: "swirl-beanie-teal",
            description:
                "Bonnet avec motif tourbillon texturé en bleu canard. Maille dense, coupe ajustée, signature de la nouvelle collection.",
            price: 35,
            images: ["/images/beanie-teal.png"],
            sizes: ["TU"],
            colors: ["Teal"],
            featured: true,
            stock: 50,
            categoryId: catAccessoires.id,
        },
    ];

    for (const product of productsData) {
        await prisma.product.upsert({
            where: { slug: product.slug },
            update: {},
            create: product,
        });
    }

    console.log(`✅ ${productsData.length} products created`);
    console.log("🎉 Seeding complete!");

    await prisma.$disconnect();
}

main().catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
});
