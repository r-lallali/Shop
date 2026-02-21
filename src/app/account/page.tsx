"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, Package } from "lucide-react";
import Link from "next/link";

function OrderList() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch("/api/user/orders");
                if (!res.ok) throw new Error("Erreur de chargement");
                const data = await res.json();
                setOrders(data.orders);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <p className="text-sm text-gray-500">Chargement de vos commandes...</p>;
    if (error) return <p className="text-sm text-red-500">{error}</p>;

    if (orders.length === 0) {
        return (
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
                Vous n&apos;avez encore passé aucune commande.
            </p>
        );
    }

    return (
        <div style={{ paddingBottom: "24px" }}>
            {orders.map((order, index) => (
                <div
                    key={order.id}
                    style={{
                        paddingBottom: "32px",
                        marginBottom: index !== orders.length - 1 ? "32px" : "0",
                        borderBottom: index !== orders.length - 1 ? "1px solid #e5e7eb" : "none"
                    }}
                >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start" style={{ paddingBottom: "24px" }}>
                        <div>
                            <p style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", paddingBottom: "8px" }}>
                                Commande #{order.id.slice(-8).toUpperCase()}
                            </p>
                            <p style={{ fontSize: "12px", color: "#6b7280" }}>
                                {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                            </p>
                        </div>
                        <div className="sm:text-right pt-4 sm:pt-0">
                            <p style={{ fontSize: "14px", fontWeight: 500, paddingBottom: "8px" }}>{order.total.toFixed(2)} €</p>
                            <p style={{ fontSize: "12px", color: "#6b7280" }}>{order.items.length} article(s)</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between" style={{ paddingTop: "24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", fontWeight: 500, padding: "8px 12px", backgroundColor: "#f9fafb", borderRadius: "6px", color: "#374151" }}>
                            {order.status === 'PENDING' ? 'En attente' :
                                order.status === 'CONFIRMED' ? 'Confirmée' :
                                    order.status === 'SHIPPED' ? 'Expédiée' : 'Livrée'}
                        </div>
                        <Link
                            href={`/orders/${order.id}`}
                            style={{ fontSize: "12px", letterSpacing: "0.05em", textDecoration: "underline", textUnderlineOffset: "4px", color: "black", transition: "opacity 0.2s" }}
                            className="hover:opacity-60"
                        >
                            VOIR LES DÉTAILS
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function AccountPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [addresses, setAddresses] = useState<any[]>([]);
    const [loadingAddresses, setLoadingAddresses] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    useEffect(() => {
        if (status === "authenticated") {
            fetch("/api/user/addresses")
                .then(res => res.json())
                .then(data => {
                    if (data.addresses) setAddresses(data.addresses);
                })
                .catch(err => console.error(err))
                .finally(() => setLoadingAddresses(false));
        }
    }, [status]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p style={{ fontSize: "14px", color: "#9ca3af" }}>Chargement...</p>
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="min-h-screen bg-white text-black flex justify-center">
            <div className="w-full" style={{ maxWidth: "1000px", padding: "0 24px", paddingTop: "60px", paddingBottom: "100px" }}>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6" style={{ paddingBottom: "64px" }}>
                    {/* Title */}
                    <h1 style={{
                        fontSize: "42px",
                        fontWeight: 300,
                        letterSpacing: "0.02em",
                    }}>
                        Compte
                    </h1>

                    {/* User + Logout */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <User size={18} strokeWidth={1.5} />
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "14px",
                                textDecoration: "underline",
                                textUnderlineOffset: "4px",
                                color: "black",
                                padding: 0,
                            }}
                        >
                            Déconnexion
                        </button>
                    </div>
                </div>

                {/* Two columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left — Orders */}
                    <div>
                        <h2 style={{
                            fontSize: "18px",
                            fontWeight: 600,
                            letterSpacing: "0.02em",
                            marginBottom: "20px",
                        }}>
                            Historique des commandes
                        </h2>
                        <OrderList />
                    </div>

                    {/* Right — Account Details */}
                    <div>
                        <h2 style={{
                            fontSize: "18px",
                            fontWeight: 600,
                            letterSpacing: "0.02em",
                            marginBottom: "20px",
                        }}>
                            Détails du compte
                        </h2>
                        {loadingAddresses ? (
                            <p style={{ fontSize: "14px", color: "#6b7280" }}>Chargement des informations...</p>
                        ) : (
                            <>
                                <p style={{ fontSize: "14px", color: "#374151", marginBottom: "4px" }}>
                                    {session.user?.name}
                                </p>
                                <p style={{ fontSize: "14px", color: "#374151", marginBottom: "4px" }}>
                                    {session.user?.email}
                                </p>
                                <p style={{ fontSize: "14px", color: "#374151", marginBottom: "16px" }}>
                                    {addresses.find(a => a.isDefault)?.country || addresses[0]?.country || "France"}
                                </p>
                            </>
                        )}
                        <Link
                            href="/account/addresses"
                            style={{
                                display: "inline-block",
                                fontSize: "14px",
                                textDecoration: "underline",
                                textUnderlineOffset: "4px",
                                color: "black",
                                marginTop: "8px",
                            }}
                        >
                            {loadingAddresses ? "Voir les adresses" : `Voir les adresses (${addresses.length})`}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
