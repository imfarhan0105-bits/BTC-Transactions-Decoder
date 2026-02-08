# Sample Transactions

Here are some transactions you can use to test the decoder. Just copy the hex and paste it into the app.

## Transaction 1: Simple legacy P2PKH

A basic transaction with 1 input and 2 outputs. Nothing fancy, good for testing.

```
0100000001c997a5e56e104102fa209c6a852dd90660a20b2d9c352423edce25857fcd3704000000004847304402204e45e16932b8af514961a1d3a1a25fdf3f4f7732e9d624c6c61548ab5fb8cd410220181522ec8eca07de4860a4acdd12909d831cc56cbbac4622082221a8768d1d0901ffffffff0200ca9a3b00000000434104ae1a62fe09c5f51b13905f07f06b99a2f7159b2225f374cd378d71302fa28414e7aab37397f554a7df5f142c21c1b7303b8a0626f1baded5c72a704f7e6cd84cac00286bee0000000043410411db93e1dcdb8a016b49840f8c53bc1eb68a382e97b1482ecad7b148a6909a5cb2e0eaddfb84ccf9744464f82e160bfa9b8b64f9d4c03f999b8643f656b412a3ac00000000
```

- Version 1
- 1 input, 2 outputs
- Legacy format (not SegWit)


## Transaction 2: The Genesis Block coinbase

This is the very first Bitcoin transaction ever created. It's from the Genesis Block and includes Satoshi's famous message about bank bailouts.

```
01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000
```

Note: Coinbase transactions are special - the "previous txid" is all zeros, and the scriptSig contains arbitrary data (in this case, the newspaper headline).


## Transaction 3: Multiple inputs

This one has 2 inputs being consolidated into a single output. Good for testing how the decoder handles multiple inputs.

```
0100000002c997a5e56e104102fa209c6a852dd90660a20b2d9c352423edce25857fcd3704000000004847304402204e45e16932b8af514961a1d3a1a25fdf3f4f7732e9d624c6c61548ab5fb8cd410220181522ec8eca07de4860a4acdd12909d831cc56cbbac4622082221a8768d1d0901ffffffffd3c7e3c7b3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3000000004A493046022100f93bb0e7d8db7bd46e40132d1f8242026e045f03a0efe71bbb8e3f475e970d790221009337cd7f1f929f00cc6ff01f03729b069a7c21b59b1736ddfee5db5946c5da8c01ffffffff0100ca9a3b00000000434104ae1a62fe09c5f51b13905f07f06b99a2f7159b2225f374cd378d71302fa28414e7aab37397f554a7df5f142c21c1b7303b8a0626f1baded5c72a704f7e6cd84cac00000000
```


## Getting real transactions

If you want to try real transactions from the blockchain:

1. Go to blockchain.com or blockchair.com
2. Find any transaction
3. Look for a "Raw Hex" or "Raw Transaction" option
4. Copy that hex string

Most legacy transactions will work. SegWit transactions are detected but some parts might not display correctly yet.


## What to look for

When you decode a transaction, you should see:

- **TXID** - the hash that identifies this transaction
- **Version** - usually 1 or 2
- **Locktime** - usually 0
- **Inputs** - which previous outputs are being spent
- **Outputs** - where the bitcoin is going

Each input shows the previous transaction it's spending from, and the scriptSig (the unlocking script). Each output shows the value and the scriptPubKey (the locking script).


## Testing error handling

Want to see what happens with bad input? Try:

- Random text: `hello world`
- Invalid hex: `0100zzzz`
- Truncated transaction: `01000000` (starts like a transaction but incomplete)

The decoder should give you a helpful error message instead of crashing.
