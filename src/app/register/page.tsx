"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Une erreur est survenue.");
                setLoading(false);
                return;
            }

            // Auto-login after registration
            const result = await signIn("credentials", {
                email: form.email,
                password: form.password,
                redirect: false,
            });

            if (result?.error) {
                router.push("/login");
            } else {
                router.push("/account");
                router.refresh();
            }
        } catch {
            setError("Une erreur est survenue.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-black">
            <div className="flex justify-center" style={{ padding: "0 24px" }}>
                <div className="w-full" style={{ maxWidth: "440px", paddingTop: "80px", paddingBottom: "80px" }}>

                    {/* Title */}
                    <h1 style={{ fontSize: "36px", fontWeight: 300, letterSpacing: "0.03em", marginBottom: "48px", textAlign: "center" }}>
                        Créer un compte
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
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Prénom"
                                required
                                value={form.firstName}
                                onChange={handleChange}
                                style={{
                                    width: "100%",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "10px",
                                    padding: "16px",
                                    fontSize: "14px",
                                    outline: "none",
                                    backgroundColor: "transparent",
                                }}
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Nom"
                                required
                                value={form.lastName}
                                onChange={handleChange}
                                style={{
                                    width: "100%",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "10px",
                                    padding: "16px",
                                    fontSize: "14px",
                                    outline: "none",
                                    backgroundColor: "transparent",
                                }}
                            />
                        </div>

                        <input
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            required
                            value={form.email}
                            onChange={handleChange}
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
                            name="password"
                            placeholder="Mot de passe"
                            required
                            minLength={6}
                            value={form.password}
                            onChange={handleChange}
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
                            {loading ? "Création..." : "Créer mon compte"}
                        </button>
                    </form>

                    <div style={{ textAlign: "center", marginTop: "32px" }}>
                        <Link
                            href="/login"
                            style={{
                                fontSize: "14px",
                                color: "#6b7280",
                                textDecoration: "underline",
                                textUnderlineOffset: "4px",
                            }}
                        >
                            Déjà un compte ? Se connecter
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
