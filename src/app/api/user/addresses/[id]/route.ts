import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();
        const { firstName, lastName, address, city, zipCode, country, phone, isDefault } = body;

        // Verify ownership
        const existingAddress = await prisma.address.findUnique({
            where: { id },
        });

        if (!existingAddress || existingAddress.userId !== session.user.id) {
            return NextResponse.json({ error: "Adresse introuvable" }, { status: 404 });
        }

        // If setting as default, unset others first
        if (isDefault && !existingAddress.isDefault) {
            await prisma.address.updateMany({
                where: { userId: session.user.id, isDefault: true, id: { not: id } },
                data: { isDefault: false },
            });
        }

        const updatedAddress = await prisma.address.update({
            where: { id },
            data: {
                firstName,
                lastName,
                address,
                city,
                zipCode,
                country,
                phone,
                isDefault: isDefault || existingAddress.isDefault, // Prevent unsetting default directly without setting another
            },
        });

        return NextResponse.json({ address: updatedAddress });
    } catch (error) {
        console.error("PUT /api/user/addresses/[id] error:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        const { id } = await params;

        // Verify ownership
        const existingAddress = await prisma.address.findUnique({
            where: { id },
        });

        if (!existingAddress || existingAddress.userId !== session.user.id) {
            return NextResponse.json({ error: "Adresse introuvable" }, { status: 404 });
        }

        await prisma.address.delete({
            where: { id },
        });

        // If we deleted the default address, make the most recent remaining one default
        if (existingAddress.isDefault) {
            const nextAddress = await prisma.address.findFirst({
                where: { userId: session.user.id },
                orderBy: { createdAt: 'desc' },
            });

            if (nextAddress) {
                await prisma.address.update({
                    where: { id: nextAddress.id },
                    data: { isDefault: true },
                });
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE /api/user/addresses/[id] error:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
