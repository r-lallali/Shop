"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ChevronLeft, MapPin, Plus } from "lucide-react";

export default function AddressesPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=/account/addresses");
        }
    }, [status, router]);

    if (status === "loading" || !session) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p style={{ fontSize: "14px", color: "#6b7280", letterSpacing: "0.05em", textTransform: "uppercase" }}>Chargement...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black flex justify-center">
            <div className="w-full" style={{ maxWidth: "1000px", padding: "0 24px", paddingTop: "60px", paddingBottom: "100px" }}>

                {/* Header Section */}
                <div style={{ paddingBottom: "32px", marginBottom: "48px", borderBottom: "1px solid #e5e7eb" }}>
                    <button
                        onClick={() => router.push("/account")}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "12px",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            color: "#6b7280",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            marginBottom: "24px",
                            padding: 0,
                            transition: "color 0.3s"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.color = "#000"}
                        onMouseOut={(e) => e.currentTarget.style.color = "#6b7280"}
                    >
                        <ChevronLeft size={14} />
                        Retour au compte
                    </button>

                    <h1 style={{ fontSize: "28px", fontWeight: 300, letterSpacing: "0.03em", textTransform: "uppercase" }}>
                        Mes Adresses
                    </h1>
                </div>

                {/* Addresses List */}
                <div className="flex flex-col gap-6">
                    {/* Default Address Card */}
                    <div style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "32px", position: "relative" }}>
                        <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", marginBottom: "20px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <MapPin size={18} color="#1a1a2e" strokeWidth={1.5} />
                                <h2 style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                                    Adresse par défaut
                                </h2>
                            </div>
                            <span style={{ fontSize: "10px", backgroundColor: "#f3f4f6", padding: "4px 8px", borderRadius: "100px", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", color: "#374151" }}>
                                Principale
                            </span>
                        </div>

                        <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#374151", margin: 0 }}>
                            {session.user?.name}<br />
                            66 Avenue Jean Jaurès<br />
                            94200 Ivry sur Seine<br />
                            France
                        </p>

                        <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid #f3f4f6", display: "flex", gap: "16px" }}>
                            <button style={{ fontSize: "13px", color: "#000", textDecoration: "underline", textUnderlineOffset: "4px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                                Modifier
                            </button>
                            <button style={{ fontSize: "13px", color: "#dc2626", textDecoration: "underline", textUnderlineOffset: "4px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                                Supprimer
                            </button>
                        </div>
                    </div>

                    {/* Add New Address Button */}
                    <button
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            border: "1px dashed #d1d5db",
                            borderRadius: "12px",
                            padding: "32px",
                            backgroundColor: "#fafafa",
                            cursor: "pointer",
                            transition: "all 0.3s",
                            width: "100%"
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.borderColor = "#000";
                            e.currentTarget.style.backgroundColor = "#fff";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.borderColor = "#d1d5db";
                            e.currentTarget.style.backgroundColor = "#fafafa";
                        }}
                    >
                        <Plus size={18} color="#6b7280" strokeWidth={1.5} />
                        <span style={{ fontSize: "14px", fontWeight: 500, color: "#374151" }}>Ajouter une nouvelle adresse</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
