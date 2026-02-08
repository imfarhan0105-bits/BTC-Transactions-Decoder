#!/bin/bash

# Development Server Launcher

echo "Starting Bitcoin Transaction Decoder..."
echo ""

# Colors for output
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Start backend
echo -e "${CYAN}Starting FastAPI backend on port 8000...${NC}"
cd "$(dirname "$0")"
python3 -m uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
echo -e "${GREEN}Backend started (PID: $BACKEND_PID)${NC}"
echo ""

# Wait a moment for backend to initialize
sleep 2

# Start frontend
echo -e "${CYAN}Starting Vite frontend on port 5173...${NC}"
cd frontend
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}Frontend started (PID: $FRONTEND_PID)${NC}"
echo ""
# Instructions
echo "----------------------------------------"
echo -e "${GREEN}Both servers are running!${NC}"
echo "----------------------------------------"
echo ""
echo "Backend API:  http://localhost:8000"
echo "Frontend App: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "----------------------------------------"

# Handle Ctrl+C
trap "echo ''; echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT

# Wait for processes
wait
