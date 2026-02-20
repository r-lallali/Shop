"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden" style={{ height: "85vh", minHeight: 500 }}>
            {/* Background image — couple photo */}
            <Image
                src="/images/hero-new.jpg"
                alt="RALYS Collection Urban Ghost"
                fill
                className="object-cover object-center"
                priority
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

            {/* Content — bottom-left aligned like Le Club Apparel */}
            <div
                className="absolute inset-0 flex flex-col justify-end"
                style={{ padding: "0 50px 60px" }}
            >
                {/* Collection tag */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-white/70 uppercase"
                    style={{ fontSize: 12, letterSpacing: "0.3em", fontWeight: 300, marginBottom: 12 }}
                >
                    Early Spring 2026
                </motion.p>

                {/* Main title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-white uppercase"
                    style={{
                        fontSize: "clamp(2.5rem, 6vw, 5rem)",
                        fontWeight: 300,
                        letterSpacing: "0.08em",
                        lineHeight: 1.1,
                        marginBottom: 10,
                    }}
                >
                    New Season Drop
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="text-white/60 uppercase"
                    style={{ fontSize: 13, letterSpacing: "0.2em", fontWeight: 300, marginBottom: 28 }}
                >
                    10% Off · Limited Time
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                >
                    <Link
                        href="/collections/all"
                        className="inline-flex items-center gap-2 text-white uppercase hover:bg-white hover:text-black transition-all duration-500"
                        style={{
                            border: "1px solid rgba(255,255,255,0.8)",
                            padding: "14px 32px",
                            fontSize: 12,
                            letterSpacing: "0.2em",
                            fontWeight: 400,
                        }}
                    >
                        Enter →
                    </Link>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown size={20} strokeWidth={1} className="text-white/50" />
                </motion.div>
            </motion.div>
        </section>
    );
}
