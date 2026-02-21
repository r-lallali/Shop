import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        const addresses = await prisma.address.findMany({
            where: { userId: session.user.id },
            orderBy: [
                { isDefault: 'desc' },
                { createdAt: 'desc' },
            ],
        });

        return NextResponse.json({ addresses });
    } catch (error) {
        console.error("GET /api/user/addresses error:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        const body = await req.json();
        const { firstName, lastName, address, city, zipCode, country, phone, isDefault } = body;

        if (!firstName || !lastName || !address || !city || !zipCode || !phone) {
            return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
        }

        // Check if user already has addresses
        const existingCount = await prisma.address.count({
            where: { userId: session.user.id },
        });

        const shouldBeDefault = isDefault || existingCount === 0;

        // If this one should be default, unset others
        if (shouldBeDefault && existingCount > 0) {
            await prisma.address.updateMany({
                where: { userId: session.user.id, isDefault: true },
                data: { isDefault: false },
            });
        }

        const newAddress = await prisma.address.create({
            data: {
                userId: session.user.id,
                firstName,
                lastName,
                address,
                city,
                zipCode,
                country: country || "France",
                phone,
                isDefault: shouldBeDefault,
            },
        });

        return NextResponse.json({ address: newAddress });
    } catch (error) {
        console.error("POST /api/user/addresses error:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
