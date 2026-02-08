# Project Summary
### Made by: Mohd Farhan Akhtar (imfarhan0105-bits)
#### Date of completion: January 2026

I have been working on Bitcoins for quite a few months now.
This document is a technical overview of what I built and how it all fits together. It's mainly for my own reference, but might be useful if you're trying to understand the codebase.

## What this project is

A Bitcoin transaction decoder with a web interface. You give it raw hex, it tells you what's inside. The interesting part is that the parsing is done from scratch, so no bitcoinlib or similar.

## The pieces

### Backend

Just one file: `backend/main.py`. It's a FastAPI app with two endpoints:

- `POST /decode` - takes `{"raw_tx": "hex..."}` and returns the parsed transaction
- `GET /` - health check

The actual parsing happens in `tx_decoder/`, which was already written before I added the web frontend. The backend imports the module and formats the output as JSON.

Error handling covers the basics: invalid hex, transactions that don't parse correctly, that kind of thing.

### Frontend

React + TypeScript, bundled with Vite. The source is in `frontend/src/`.

**Main files:**
- `App.tsx` - the whole app is basically in here. State management, the hero section, decode button, results display.
- `api/client.ts` - a small fetch wrapper for calling the backend
- `types/transaction.ts` - TypeScript types matching what the API returns

**Components:**
I broke out some reusable pieces:
- `Accordion.tsx` - expandable sections for inputs/outputs
- `CopyButton.tsx` - click to copy, shows a checkmark when done
- `FieldRow.tsx` - label + value pairs with optional copy button
- `GlassCard.tsx` - the semi-transparent container style
- `TxOverview.tsx` - the summary card with txid, version, etc.
- `TxInputCard.tsx` and `TxOutputCard.tsx` - details for each input/output
- `ErrorDisplay.tsx` - shows when something goes wrong
- `LoadingSkeleton.tsx` - pulsing placeholder while waiting for the API

**Styling:**
Tailwind CSS for most things. Custom styles in `index.css`. The design is dark mode with glassmorphism effects and some neon-ish accent colors (cyan, purple).

**Animations:**
Framer Motion handles the transitions. Components fade in, accordions expand/collapse smoothly, that sort of thing.

## How to run it

Backend:
```bash
pip install -r requirements.txt
uvicorn backend.main:app --reload --port 8000
```

Frontend (separate terminal):
```bash
cd frontend
npm install
npm run dev
```

Then go to http://localhost:5173.

There's also `start_dev.sh` that runs both at once, but I usually just do it manually.

## File structure

```
bitcoin_tx_decoder/
├── backend/main.py
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── api/client.ts
│   │   ├── components/
│   │   ├── lib/utils.ts
│   │   └── types/transaction.ts
│   ├── package.json
│   └── vite.config.ts
├── tx_decoder/
│   ├── transaction.py
│   └── script.py
├── requirements.txt
└── start_dev.sh
```

## What I learned

Writing the transaction parser was the most educational part. Bitcoin's serialization format is compact but quirky - little-endian for some things, big-endian for others, variable-length integers everywhere.

On the frontend side, I got more comfortable with TypeScript and Framer Motion. The glassmorphism styling took some trial and error to get right.

## Known limitations

- No fee calculation (yet!!)
- The backend doesn't validate signatures (by design - it's a decoder, not a verifier)

## What's next

If I keep working on this:
- Calculate and display the transaction fee
- Add a way to export the decoded JSON
- Maybe a light theme option

But honestly, it does what I need it to do for now.
