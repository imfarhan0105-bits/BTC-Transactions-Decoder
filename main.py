import argparse
import sys

from tx_decoder.transaction import Transaction

def main():
    parser = argparse.ArgumentParser(description="Bitcoin Transaction Decoder (Educational)")
    parser.add_argument("--hex", type=str, required=True, help="Raw transaction hex string")
    
    args = parser.parse_args()
    
    try:
        raw_hex = args.hex.strip()
        tx = Transaction.parse(raw_hex)
        print(tx)
        
    except Exception as e:
        print("Error decoding transaction:")
        print(e)
        sys.exit(1)

if __name__ == "__main__":
    main()
