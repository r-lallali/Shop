"use client";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white text-black">
            <div className="flex justify-center" style={{ padding: "0 24px" }}>
                <div className="w-full" style={{ maxWidth: "720px", paddingTop: "80px", paddingBottom: "80px" }}>

                    {/* Title */}
                    <h1 style={{ fontSize: "52px", fontWeight: 300, letterSpacing: "0.03em", marginBottom: "48px" }}>
                        CONTACT
                    </h1>

                    {/* Subtitle */}
                    <div style={{ textAlign: "center", marginBottom: "32px" }}>
                        <h2 style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.05em" }}>
                            Contactez-nous
                        </h2>
                    </div>

                    {/* Description */}
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.8, letterSpacing: "0.03em", maxWidth: "480px", margin: "0 auto" }}>
                            Besoin de changer de taille ? Une erreur dans votre commande ?
                            Ou simplement une question sur un produit ? N&apos;hésitez pas
                            à nous écrire, nous vous guiderons dans les démarches à suivre :)
                        </p>
                    </div>

                    {/* Email */}
                    <p style={{ fontSize: "18px", fontWeight: 500, letterSpacing: "0.03em", marginBottom: "40px" }}>
                        ralys.lallali@icloud.com
                    </p>

                    {/* Form */}
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                            <input
                                type="text"
                                placeholder="Nom"
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
                                type="email"
                                placeholder="E-mail *"
                                required
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
                            type="tel"
                            placeholder="Numéro de téléphone"
                            style={{
                                width: "100%",
                                border: "1px solid #e5e7eb",
                                borderRadius: "10px",
                                padding: "16px",
                                fontSize: "14px",
                                outline: "none",
                                backgroundColor: "transparent",
                                marginBottom: "20px",
                            }}
                        />

                        <textarea
                            rows={6}
                            placeholder="Commentaire"
                            style={{
                                width: "100%",
                                border: "1px solid #e5e7eb",
                                borderRadius: "10px",
                                padding: "16px",
                                fontSize: "14px",
                                outline: "none",
                                backgroundColor: "transparent",
                                resize: "none",
                                marginBottom: "28px",
                            }}
                        />

                        <button
                            type="submit"
                            style={{
                                width: "100%",
                                padding: "18px 0",
                                fontSize: "15px",
                                fontWeight: 500,
                                letterSpacing: "0.03em",
                                borderRadius: "12px",
                                border: "none",
                                cursor: "pointer",
                                backgroundColor: "#1a1a2e",
                                color: "white",
                                transition: "all 0.3s",
                            }}
                        >
                            Envoyer
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
