import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatSatoshis(sats: number): string {
    return sats.toLocaleString();
}

export function formatBTC(btc: number): string {
    return btc.toFixed(8);
}

export function shortenHash(hash: string, startChars: number = 8, endChars: number = 8): string {
    if (hash.length <= startChars + endChars) return hash;
    return `${hash.slice(0, startChars)}...${hash.slice(-endChars)}`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        return false;
    }
}
