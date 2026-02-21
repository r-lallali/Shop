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
        <div className="space-y-4">
            {orders.map((order) => (
                <div key={order.id} className="border border-gray-100 rounded-md p-5 sm:p-6 hover:border-black transition-colors mb-4">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-5">
                        <div>
                            <p className="text-xs sm:text-sm font-medium tracking-wider uppercase mb-1">
                                Commande #{order.id.slice(-8).toUpperCase()}
                            </p>
                            <p className="text-xs text-gray-500">
                                {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                            </p>
                        </div>
                        <div className="sm:text-right">
                            <p className="text-sm font-medium">{order.total.toFixed(2)} €</p>
                            <p className="text-xs text-gray-500 mt-1">{order.items.length} article(s)</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-2 text-xs font-medium px-2 py-1 bg-gray-50 rounded text-gray-700">
                            {order.status === 'PENDING' ? 'En attente' :
                                order.status === 'CONFIRMED' ? 'Confirmée' :
                                    order.status === 'SHIPPED' ? 'Expédiée' : 'Livrée'}
                        </div>
                        <Link
                            href={`/orders/${order.id}`}
                            className="text-xs tracking-wider underline underline-offset-4 hover:text-gray-500 transition-colors"
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

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        {/* Title */}
                        <h1 style={{
                            fontSize: "42px",
                            fontWeight: 300,
                            letterSpacing: "0.02em",
                            marginBottom: "24px",
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
