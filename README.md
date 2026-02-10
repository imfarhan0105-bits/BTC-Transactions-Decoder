# Bitcoin Transaction Decoder - Full Documentation

This is a web-based tool for decoding raw Bitcoin transactions. You paste in a hex string, and it shows you everything that's packed inside: the version, inputs, outputs, scripts, witness data (if it's SegWit), and computes the TXID.

I built this as a way to better understand how Bitcoin transactions are structured at the byte level. The backend is written in Python using FastAPI, and the frontend is React with TypeScript. No external Bitcoin libraries - the parser is written from scratch.

## The stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion (for animations), and Lucide for icons.

**Backend:** FastAPI serving a single `/decode` endpoint. It takes raw hex, runs it through the parser, and returns structured JSON.

The UI has a dark theme with some glassmorphism effects - nothing too fancy, but it looks decent and makes the data easy to read.

## Getting it running

### What you need
- Node.js 18 or newer
- Python 3.8 or newer
- npm and pip

### Backend setup

From the project root:

```bash
pip install fastapi uvicorn
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be at http://localhost:8000. You can hit `GET /` to check if it's running.

### Frontend setup

```bash
cd frontend
npm install
npm run dev
```

This starts the dev server at http://localhost:5173.

## How to use it

1. Start both servers (backend first, then frontend)
2. Go to http://localhost:5173
3. Paste a raw transaction hex into the text area
4. Click "Decode Transaction"
5. Explore the results - inputs and outputs are in collapsible sections

### Sample transaction

This is a simple legacy transaction with 1 input and 2 outputs:

```
0100000001c997a5e56e104102fa209c6a852dd90660a20b2d9c352423edce25857fcd3704000000004847304402204e45e16932b8af514961a1d3a1a25fdf3f4f7732e9d624c6c61548ab5fb8cd410220181522ec8eca07de4860a4acdd12909d831cc56cbbac4622082221a8768d1d0901ffffffff0200ca9a3b00000000434104ae1a62fe09c5f51b13905f07f06b99a2f7159b2225f374cd378d71302fa28414e7aab37397f554a7df5f142c21c1b7303b8a0626f1baded5c72a704f7e6cd84cac00286bee0000000043410411db93e1dcdb8a016b49840f8c53bc1eb68a382e97b1482ecad7b148a6909a5cb2e0eaddfb84ccf9744464f82e160bfa9b8b64f9d4c03f999b8643f656b412a3ac00000000
```

## Project structure

```
bitcoin_tx_decoder/
├── api/
│   └── main.py                     # For setting up Vercel
├── frontend/
│   └── src/
│       ├── api/client.ts           # Talks to the backend
│       ├── components/             # All the React components
│       ├── lib/utils.ts            # Helpers (formatting, clipboard, etc.)
│       ├── types/transaction.ts    # TypeScript interfaces
│       └── App.tsx                 # Main app component
│
├── backend/
│   └── main.py                     # FastAPI app
│
└── tx_decoder/
    ├── transaction.py              # Parses the raw bytes
    └── script.py                   # Decodes Bitcoin script
```

## The API

### POST /decode

Send a JSON body with the raw transaction:

```json
{
  "raw_tx": "0100000001..."
}
```

You'll get back something like:

```json
{
  "txid": "abc123...",
  "version": 1,
  "locktime": 0,
  "size": 226,
  "vsize": 226,
  "is_segwit": false,
  "inputs": [...],
  "outputs": [...]
}
```

If the hex is invalid or the transaction is malformed, you'll get an error response with details.

### GET /

Just returns a simple message to confirm the server is up.

## About the design

I went with a dark theme because that's what feels right for a crypto tool. I gave it a glassmorphism look with the help of some design maker softwares.

Animations here are handled by Framer Motion.

The font is Inter, loaded from Google Fonts.

## Building for production

```bash
cd frontend
npm run build
```

Output goes to `frontend/dist/`. You'd serve that with nginx or whatever, and have the FastAPI backend running separately.

## Why I built this
I have been working on Bitcoins for quite sometime now.
I wanted to understand Bitcoin transactions at a deeper level than just "send X BTC to address Y". This project forced me to read the protocol documentation and figure out how serialization works, how scripts are encoded, how SegWit changes the structure, etc.

It's also a decent portfolio piece that shows I can build a full-stack app with modern tools.

## Things I might add later

- Fee calculation (sum of inputs minus sum of outputs)
- Better SegWit support (currently it detects SegWit but doesn't fully parse witness data)
- Export to JSON button
- Light mode 

## More info

To read about the whole project in detail please read [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md).

For more test transactions, please see [SAMPLE_TRANSACTIONS.md](./SAMPLE_TRANSACTIONS.md).

## License

MIT - do whatever you want with it.
