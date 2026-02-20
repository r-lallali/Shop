"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
    { name: "NEW", slug: "new", image: "/images/hero-new.jpg" },
    { name: "ACCESSOIRES", slug: "accessoires", image: "/images/beanie-black.png" },
    { name: "TOPS", slug: "tops", image: "/images/category-tops-new.png" },
    { name: "PANTS", slug: "pants", image: "/images/category-pants-new.png" },
];

export default function CategoryGrid() {
    return (
        <section style={{ padding: "4px 0" }}>
            <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: 4 }}>
                {categories.map((category, index) => (
                    <motion.div
                        key={category.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                    >
                        <Link
                            href={`/collections/${category.slug}`}
                            className="group relative block overflow-hidden"
                            style={{ aspectRatio: "3/4" }}
                        >
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/30 transition-colors duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3
                                    className="text-white uppercase"
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 400,
                                        letterSpacing: "0.2em",
                                    }}
                                >
                                    {category.name}
                                </h3>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
