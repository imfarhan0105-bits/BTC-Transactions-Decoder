/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0b0f1a",
                card: "rgba(30, 41, 59, 0.5)", // semi-transparent for glassmorphism
                neon: {
                    cyan: "#00f0ff",
                    purple: "#bf00ff",
                }
            },
            fontFamily: {
                mono: ['"Fira Code"', 'monospace'], // Suggest Fira Code or fallback
            },
        },
    },
    plugins: [],
}
