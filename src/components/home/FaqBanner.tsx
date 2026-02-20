"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FaqBanner() {
    return (
        <section className="relative w-full overflow-hidden" style={{ height: "60vh", minHeight: 400 }}>
            {/* Background image */}
            <Image
                src="/images/faq-new.png"
                alt="RALYS Lifestyle"
                fill
                className="object-cover object-center"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content — centered */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-white uppercase"
                    style={{
                        fontSize: "clamp(1.5rem, 4vw, 3rem)",
                        fontWeight: 300,
                        letterSpacing: "0.12em",
                        marginBottom: 12,
                    }}
                >
                    Des questions ?
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="text-white/60 uppercase"
                    style={{
                        fontSize: 13,
                        letterSpacing: "0.2em",
                        fontWeight: 300,
                        marginBottom: 32,
                    }}
                >
                    Retrouvez toutes les réponses ici
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <Link
                        href="/faq"
                        className="inline-flex items-center text-white uppercase hover:bg-white hover:text-black transition-all duration-500"
                        style={{
                            border: "1px solid rgba(255,255,255,0.8)",
                            padding: "14px 40px",
                            fontSize: 12,
                            letterSpacing: "0.2em",
                            fontWeight: 400,
                        }}
                    >
                        F.A.Q. →
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
