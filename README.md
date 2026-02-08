# Bitcoin Transaction Decoder

A web app that lets you paste a raw Bitcoin transaction (in hex) and see exactly what's inside it - inputs, outputs, scripts, the works.

I built this as a way to better understand how Bitcoin transactions are structured at the byte level. The backend is written in Python using FastAPI, and the frontend is React with TypeScript. No external Bitcoin libraries - the parser is written from scratch.

## Running it locally

You'll need Node.js 18+ and Python 3.8+.

**Backend:**
```bash
pip install -r requirements.txt
uvicorn backend.main:app --reload --port 8000
```

**Frontend** (in a separate terminal):
```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Try it out

Here's a transaction you can paste to test:

```
0100000001c997a5e56e104102fa209c6a852dd90660a20b2d9c352423edce25857fcd3704000000004847304402204e45e16932b8af514961a1d3a1a25fdf3f4f7732e9d624c6c61548ab5fb8cd410220181522ec8eca07de4860a4acdd12909d831cc56cbbac4622082221a8768d1d0901ffffffff0200ca9a3b00000000434104ae1a62fe09c5f51b13905f07f06b99a2f7159b2225f374cd378d71302fa28414e7aab37397f554a7df5f142c21c1b7303b8a0626f1baded5c72a704f7e6cd84cac00286bee0000000043410411db93e1dcdb8a016b49840f8c53bc1eb68a382e97b1482ecad7b148a6909a5cb2e0eaddfb84ccf9744464f82e160bfa9b8b64f9d4c03f999b8643f656b412a3ac00000000
```

## What you'll see

The decoder shows you:
- The TXID (computed by double-SHA256 hashing the raw transaction)
- Version and locktime fields
- Each input with its previous txid, output index, and scriptSig
- Each output with the value (in BTC and satoshis) and scriptPubKey
- Whether it's a SegWit transaction

## Project layout

```
bitcoin_tx_decoder/
├── backend/main.py      # FastAPI server with /decode endpoint
├── frontend/src/        # React app
├── tx_decoder/          # The actual parsing logic
└── requirements.txt
```

## More info

To read about the whole project in detail please read - [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)

See [README_FULL.md](./README_FULL.md) for detailed documentation, or [SAMPLE_TRANSACTIONS.md](./SAMPLE_TRANSACTIONS.md) for more test transactions.

