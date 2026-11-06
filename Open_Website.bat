@echo off
title Shanmukha Cricket Academy Local Server
echo ===================================================
echo   Starting Shanmukha Cricket Academy...
echo ===================================================
echo.
echo Launching server and opening website in 4 seconds...
start "" powershell -WindowStyle Hidden -Command "Start-Sleep -Seconds 4; Start-Process 'http://localhost:3000'"
npm run dev
