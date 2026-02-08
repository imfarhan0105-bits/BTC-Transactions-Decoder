import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function GlassCard({ children, className, delay = 0 }: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className={cn(
                'backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6',
                'shadow-2xl shadow-purple-500/10',
                className
            )}
        >
            {children}
        </motion.div>
    );
}
