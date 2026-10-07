@echo off
echo ===================================================
echo   ENABLE AUTOSTART: ARCHITECTURE QUEST
echo ===================================================
echo.
echo Setting up Architecture Quest to auto-start on Windows startup...

set "STARTUP_DIR=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "TARGET_VBS=d:\antgravity\launch-silent.vbs"

echo Set oWS = WScript.CreateObject("WScript.Shell") > "%TEMP%\CreateStartupShortcut.vbs"
echo sLinkFile = "%STARTUP_DIR%\Architecture Quest.lnk" >> "%TEMP%\CreateStartupShortcut.vbs"
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%TEMP%\CreateStartupShortcut.vbs"
echo oLink.TargetPath = "%TARGET_VBS%" >> "%TEMP%\CreateStartupShortcut.vbs"
echo oLink.WorkingDirectory = "d:\antgravity" >> "%TEMP%\CreateStartupShortcut.vbs"
echo oLink.Description = "Auto-start Architecture Quest" >> "%TEMP%\CreateStartupShortcut.vbs"
echo oLink.Save >> "%TEMP%\CreateStartupShortcut.vbs"

cscript /nologo "%TEMP%\CreateStartupShortcut.vbs"
del "%TEMP%\CreateStartupShortcut.vbs"

echo.
echo [SUCCESS] Architecture Quest will now automatically start and open in your browser whenever your system turns on!
echo.
pause
