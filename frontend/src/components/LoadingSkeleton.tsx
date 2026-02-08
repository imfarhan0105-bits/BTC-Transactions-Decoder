"use client";
import { motion } from 'framer-motion';

export function LoadingSkeleton() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 h-48"
                />
            ))}
        </div>
    );
}
