"use client";

export default function AnnouncementBar() {
    return (
        <div
            className="bg-black text-white overflow-hidden"
            style={{ padding: "10px 0" }}
        >
            <div className="flex items-center justify-center">
                <p
                    className="text-center uppercase"
                    style={{
                        fontSize: 11,
                        fontWeight: 400,
                        letterSpacing: "0.15em",
                    }}
                >
                    Livraison gratuite dès 100€ · Nouvelle collection disponible
                </p>
            </div>
        </div>
    );
}
