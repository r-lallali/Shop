"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { User } from "lucide-react";

export default function AccountPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p style={{ fontSize: "14px", color: "#9ca3af" }}>Chargement...</p>
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="min-h-screen bg-white text-black">
            <div style={{ padding: "0 50px" }}>
                <div style={{ paddingTop: "60px", paddingBottom: "80px" }}>

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
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "60px" }}>
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

                    {/* Two columns */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "80px",
                    }}>
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
                            <p style={{ fontSize: "14px", color: "#6b7280" }}>
                                Vous n&apos;avez encore passé aucune commande.
                            </p>
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
                            <p style={{ fontSize: "14px", color: "#374151", marginBottom: "4px" }}>
                                {session.user?.name}
                            </p>
                            <p style={{ fontSize: "14px", color: "#374151", marginBottom: "4px" }}>
                                {session.user?.email}
                            </p>
                            <p style={{ fontSize: "14px", color: "#374151", marginBottom: "16px" }}>
                                France
                            </p>
                            <button
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
                                Voir les adresses (1)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
