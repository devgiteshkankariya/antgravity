@echo off
echo ===================================================
echo   CREATE DESKTOP SHORTCUT: ARCHITECTURE QUEST
echo ===================================================
echo.

set "DESKTOP_DIR=%USERPROFILE%\Desktop"
set "TARGET_BAT=d:\antgravity\launch-visible.bat"

echo Set oWS = WScript.CreateObject("WScript.Shell") > "%TEMP%\CreateDeskShortcut.vbs"
echo sLinkFile = "%DESKTOP_DIR%\Architecture Quest.lnk" >> "%TEMP%\CreateDeskShortcut.vbs"
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%TEMP%\CreateDeskShortcut.vbs"
echo oLink.TargetPath = "%TARGET_BAT%" >> "%TEMP%\CreateDeskShortcut.vbs"
echo oLink.WorkingDirectory = "d:\antgravity" >> "%TEMP%\CreateDeskShortcut.vbs"
echo oLink.Description = "Launch Architecture Quest" >> "%TEMP%\CreateDeskShortcut.vbs"
echo oLink.Save >> "%TEMP%\CreateDeskShortcut.vbs"

cscript /nologo "%TEMP%\CreateDeskShortcut.vbs"
del "%TEMP%\CreateDeskShortcut.vbs"

echo [SUCCESS] Shortcut created on your Desktop!
echo.
pause
