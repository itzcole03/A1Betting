@echo off
echo 🚀 Starting A1Betting Ultimate Platform...
echo.

echo 📊 Starting Backend Server...
cd backend
start "A1Betting Backend" cmd /k "python main.py"
cd ..

echo ⏳ Waiting for backend to initialize...
timeout /t 5 /nobreak > nul

echo 🎨 Starting Frontend Development Server...
cd frontend
start "A1Betting Frontend" cmd /k "npm run dev"
cd ..

echo.
echo ✅ A1Betting Platform is starting up!
echo 📱 Frontend: http://localhost:5173
echo 🔧 Backend: http://localhost:8000
echo 📚 API Docs: http://localhost:8000/docs
echo.
echo Press any key to exit...
pause > nul@echo off
echo 🚀 Starting A1Betting Ultimate Platform...
echo.

echo 📊 Starting Backend Server...
cd backend
start "A1Betting Backend" cmd /k "python main.py"
cd ..

echo ⏳ Waiting for backend to initialize...
timeout /t 5 /nobreak > nul

echo 🎨 Starting Frontend Development Server...
cd frontend
start "A1Betting Frontend" cmd /k "npm run dev"
cd ..

echo.
echo ✅ A1Betting Platform is starting up!
echo 📱 Frontend: http://localhost:5173
echo 🔧 Backend: http://localhost:8000
echo 📚 API Docs: http://localhost:8000/docs
echo.
echo Press any key to exit...
pause > nul
