@echo off
title Push Shanmukha Cricket Academy to GitHub
color 0A
cls
echo ========================================================
echo     SHANMUKHA CRICKET ACADEMY - GITHUB SYNC
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/3] Checking Git Status...
git status -s
echo.

set /p REPO_URL="Enter your GitHub Repository URL (or press Enter if already added): "

if not "%REPO_URL%"=="" (
    echo.
    echo Setting Git remote origin to: %REPO_URL%
    git remote remove origin >nul 2>&1
    git remote add origin %REPO_URL%
)

echo.
echo [2/3] Adding files and creating commit if needed...
git add .
git commit -m "Update Shanmukha Cricket Academy website" >nul 2>&1

echo.
echo [3/3] Pushing to GitHub (main branch)...
git branch -M main
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   SUCCESS! Your project is now live on GitHub!
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo   Notice: If authentication was requested, please sign in.
    echo   If you haven't created the repository on GitHub yet,
    echo   please create it first at: https://github.com/new
    echo ========================================================
)

echo.
pause
