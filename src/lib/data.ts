export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    images: string[];
    sizes: string[];
    colors: string[];
    category: string;
    categorySlug: string;
    featured: boolean;
}

export interface Category {
    name: string;
    slug: string;
    image: string;
    description: string;
}

export const categories: Category[] = [
    {
        name: "ALL",
        slug: "all",
        image: "/images/hero-new.jpg",
        description: "",
    },
    {
        name: "NEW",
        slug: "new",
        image: "/images/product-hoodie-black.png",
        description: "",
    },
    {
        name: "TOPS",
        slug: "tops",
        image: "/images/category-tops-new.png",
        description: "",
    },
    {
        name: "PANTS",
        slug: "pants",
        image: "/images/category-pants-new.png",
        description: "",
    },
];

export const products: Product[] = [
    {
        id: "1",
        name: "OVERSIZED TEE — BLACK",
        slug: "oversized-tee-black",
        description:
            "T-shirt oversized en coton premium 300gsm. Coupe ample et décontractée. Fabriqué au Portugal avec des matériaux de qualité supérieure.",
        price: 45,
        images: ["/images/category-tops.png"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Noir"],
        category: "TOPS",
        categorySlug: "tops",
        featured: true,
    },
    {
        id: "2",
        name: "OVERSIZED TEE — WHITE",
        slug: "oversized-tee-white",
        description:
            "T-shirt oversized en coton premium 300gsm. Coupe ample et décontractée. Teint dans un blanc éclatant. Fabriqué au Portugal.",
        price: 45,
        images: ["/images/product-tshirt-white.png"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Blanc"],
        category: "TOPS",
        categorySlug: "tops",
        featured: true,
    },
    {
        id: "3",
        name: "ESSENTIAL HOODIE — BLACK",
        slug: "essential-hoodie-black",
        description:
            "Hoodie oversize en coton brossé 400gsm. Capuche doublée, poche kangourou et finitions côtelées. Le basique ultime.",
        price: 85,
        images: ["/images/product-hoodie-black.png"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Noir"],
        category: "TOPS",
        categorySlug: "tops",
        featured: true,
    },
    {
        id: "4",
        name: "CARGO PANTS — CHARCOAL",
        slug: "cargo-pants-charcoal",
        description:
            "Pantalon cargo en toile résistante. Poches latérales à rabat, taille ajustable et coupe droite. Teinte charcoal intemporelle.",
        price: 75,
        images: ["/images/category-pants.png"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Charcoal"],
        category: "PANTS",
        categorySlug: "pants",
        featured: true,
    },
    {
        id: "5",
        name: "ESSENTIAL SHORTS — GRAY",
        slug: "essential-shorts-gray",
        description:
            "Short en coton éponge premium. Taille élastiquée avec cordon, poches latérales. Confort absolu.",
        price: 55,
        images: ["/images/product-shorts-gray.png"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Gris"],
        category: "PANTS",
        categorySlug: "pants",
        featured: true,
    },
    {
        id: "5b",
        name: "SIGNATURE PANTS",
        slug: "signature-pants",
        description:
            "Nouveau pantalon signature avec une coupe ample et un drapé impeccable. Parfaitement coupé pour le mouvement.",
        price: 80,
        images: ["/images/pant1.jpg", "/images/pant1a.jpg"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Noir"],
        category: "PANTS",
        categorySlug: "pants",
        featured: true,
    },
    {
        id: "6",
        name: "OVERSIZED TEE — BLACK V2",
        slug: "oversized-tee-black-v2",
        description:
            "T-shirt oversized nouvelle édition. Coton premium 320gsm, col renforcé et logo brodé ton sur ton.",
        price: 50,
        images: ["/images/category-tops.png"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Noir"],
        category: "TOPS",
        categorySlug: "tops",
        featured: false,
    },
    {
        id: "7",
        name: "THERMAL HANDS BEANIE",
        slug: "thermal-hands-beanie",
        description:
            "Bonnet en maille côtelée avec motif thermique imprimé. Parfait pour l'hiver, chaud et confortable.",
        price: 35,
        images: ["/images/beanie-hands.jpg"],
        sizes: ["TU"],
        colors: ["Multicolore"],
        category: "ACCESSOIRES",
        categorySlug: "accessoires",
        featured: false,
    },
    {
        id: "8",
        name: "SWIRL BEANIE — BLACK",
        slug: "swirl-beanie-black",
        description:
            "Bonnet avec motif tourbillon texturé. Maille dense pour une silhouette structurée. Design exclusif.",
        price: 35,
        images: ["/images/beanie-black.png"],
        sizes: ["TU"],
        colors: ["Noir"],
        category: "ACCESSOIRES",
        categorySlug: "accessoires",
        featured: false,
    },
    {
        id: "9",
        name: "SWIRL BEANIE — TEAL",
        slug: "swirl-beanie-teal",
        description:
            "Bonnet avec motif tourbillon texturé en bleu canard. Maille dense, coupe ajustée, signature de la nouvelle collection.",
        price: 35,
        images: ["/images/beanie-teal.png"],
        sizes: ["TU"],
        colors: ["Teal"],
        category: "ACCESSOIRES",
        categorySlug: "accessoires",
        featured: true,
    },
];

export function getProductBySlug(slug: string): Product | undefined {
    return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
    if (categorySlug === "all") return products;
    if (categorySlug === "new")
        return products.filter((p) => p.featured);
    return products.filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
    return products.filter((p) => p.featured);
}
