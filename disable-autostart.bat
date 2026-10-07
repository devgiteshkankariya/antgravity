@echo off
echo ===================================================
echo   DISABLE AUTOSTART: ARCHITECTURE QUEST
echo ===================================================
echo.

set "STARTUP_DIR=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
if exist "%STARTUP_DIR%\Architecture Quest.lnk" (
    del "%STARTUP_DIR%\Architecture Quest.lnk"
    echo [SUCCESS] Auto-start on boot has been disabled.
) else (
    echo [INFO] Auto-start shortcut was not found in startup folder.
)

echo.
pause
