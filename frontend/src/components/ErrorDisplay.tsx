import { motion } from 'framer-motion';
import { AlertCircle, XCircle } from 'lucide-react';

interface ErrorDisplayProps {
    message: string;
    onDismiss?: () => void;
}

export function ErrorDisplay({ message, onDismiss }: ErrorDisplayProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
        >
            <div className="backdrop-blur-xl bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-red-500/20 rounded-lg">
                        <AlertCircle className="w-6 h-6 text-red-400" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-red-300 mb-2">
                            Decoding Error
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            {message}
                        </p>
                        <div className="mt-4 text-xs text-gray-400">
                            <p>Common issues:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>Invalid hex format (only 0-9 and a-f characters allowed)</li>
                                <li>Incomplete transaction data</li>
                                <li>Unsupported transaction type</li>
                                <li>Backend API not running</li>
                            </ul>
                        </div>
                    </div>
                    {onDismiss && (
                        <button
                            onClick={onDismiss}
                            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <XCircle className="w-5 h-5 text-gray-400" />
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
