"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Email ou mot de passe incorrect.");
            setLoading(false);
        } else {
            router.push("/account");
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen bg-white text-black">
            <div className="flex justify-center" style={{ padding: "0 24px" }}>
                <div className="w-full" style={{ maxWidth: "440px", paddingTop: "80px", paddingBottom: "80px" }}>

                    {/* Title */}
                    <h1 style={{ fontSize: "36px", fontWeight: 300, letterSpacing: "0.03em", marginBottom: "48px", textAlign: "center" }}>
                        Connexion
                    </h1>

                    {error && (
                        <div style={{
                            backgroundColor: "#fef2f2",
                            border: "1px solid #fecaca",
                            color: "#dc2626",
                            padding: "12px 16px",
                            borderRadius: "10px",
                            fontSize: "14px",
                            marginBottom: "24px",
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="E-mail"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: "100%",
                                border: "1px solid #e5e7eb",
                                borderRadius: "10px",
                                padding: "16px",
                                fontSize: "14px",
                                outline: "none",
                                backgroundColor: "transparent",
                                marginBottom: "16px",
                            }}
                        />

                        <input
                            type="password"
                            placeholder="Mot de passe"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: "100%",
                                border: "1px solid #e5e7eb",
                                borderRadius: "10px",
                                padding: "16px",
                                fontSize: "14px",
                                outline: "none",
                                backgroundColor: "transparent",
                                marginBottom: "28px",
                            }}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: "100%",
                                padding: "18px 0",
                                fontSize: "15px",
                                fontWeight: 500,
                                letterSpacing: "0.03em",
                                border: "none",
                                cursor: loading ? "not-allowed" : "pointer",
                                backgroundColor: loading ? "#e5e7eb" : "#000000",
                                color: loading ? "#9ca3af" : "white",
                                transition: "all 0.3s",
                            }}
                        >
                            {loading ? "Connexion..." : "Se connecter"}
                        </button>
                    </form>

                    <div style={{ textAlign: "center", marginTop: "32px" }}>
                        <Link
                            href="/register"
                            style={{
                                fontSize: "14px",
                                color: "#6b7280",
                                textDecoration: "underline",
                                textUnderlineOffset: "4px",
                            }}
                        >
                            Créer un compte
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
