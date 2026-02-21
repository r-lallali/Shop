import { NextResponse } from 'next/server';
import { products } from '@/lib/data';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json(products.map(p => ({ ...p, image: p.images[0] })));
    }

    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);

    // Calculate score for each product based on matches
    const scoredProducts = products.map(product => {
        let score = 0;
        const name = product.name.toLowerCase();
        const description = product.description.toLowerCase();
        const category = product.category.toLowerCase();

        searchTerms.forEach(term => {
            // Check if term matches start of a word
            const startsWithRegex = new RegExp(`\\b${term}`, 'i');
            const exactRegex = new RegExp(`\\b${term}\\b`, 'i');

            // Name matches
            if (exactRegex.test(name)) score += 10;
            else if (startsWithRegex.test(name)) score += 5;
            else if (term.length > 2 && name.includes(term)) score += 2;

            // Category matches
            if (exactRegex.test(category)) score += 4;
            else if (startsWithRegex.test(category)) score += 3;

            // Description matches (only if term is meaningful enough)
            if (term.length >= 3) {
                if (exactRegex.test(description)) score += 2;
                else if (description.includes(term)) score += 1;
            }
        });

        return { product, score };
    });

    // Filter out products with 0 score (no match) and sort by score descending
    const filteredProducts = scoredProducts
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(item => item.product);

    const mappedProducts = filteredProducts.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        image: p.images[0]
    }));

    return NextResponse.json(mappedProducts);
}
