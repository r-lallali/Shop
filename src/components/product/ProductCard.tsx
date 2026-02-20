"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/data";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/products/${product.slug}`} className="group block">
            <div className="relative aspect-square overflow-hidden bg-surface mb-3">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
            </div>
            <div className="space-y-1 text-center mt-4">
                <h3 className="text-xs tracking-[0.1em] uppercase font-light group-hover:opacity-60 transition-opacity">
                    {product.name}
                </h3>
                <p className="text-xs tracking-wider text-muted">
                    €{product.price.toFixed(2)} EUR
                </p>
            </div>
        </Link>
    );
}
