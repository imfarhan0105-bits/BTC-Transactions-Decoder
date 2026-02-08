import type { DecodeRequest, DecodedTransaction } from '../types/transaction';

const API_BASE_URL = 'http://localhost:8000';

export class ApiError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ApiError';
    }
}

export async function decodeTransaction(rawTx: string): Promise<DecodedTransaction> {
    try {
        const response = await fetch(`${API_BASE_URL}/decode`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ raw_tx: rawTx } as DecodeRequest),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new ApiError(response.status, error.detail || 'Failed to decode transaction');
        }

        const data: DecodedTransaction = await response.json();
        return data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(0, error instanceof Error ? error.message : 'Network error');
    }
}

export async function checkApiHealth(): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/`);
        return response.ok;
    } catch {
        return false;
    }
}
