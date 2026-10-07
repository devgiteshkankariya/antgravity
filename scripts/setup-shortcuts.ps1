$startupFolder = [System.Environment]::GetFolderPath([System.Environment+SpecialFolder]::Startup)
$desktopFolder = [System.Environment]::GetFolderPath([System.Environment+SpecialFolder]::Desktop)

$wshShell = New-Object -ComObject WScript.Shell

# 1. Startup Shortcut (Auto-start on Windows boot)
$startupShortcutPath = Join-Path $startupFolder "Architecture Quest.lnk"
$startupShortcut = $wshShell.CreateShortcut($startupShortcutPath)
$startupShortcut.TargetPath = "d:\antgravity\launch-silent.vbs"
$startupShortcut.WorkingDirectory = "d:\antgravity"
$startupShortcut.Description = "Auto-start Architecture Quest"
$startupShortcut.Save()

# 2. Desktop Shortcut (One-click launch anytime)
$desktopShortcutPath = Join-Path $desktopFolder "Architecture Quest.lnk"
$desktopShortcut = $wshShell.CreateShortcut($desktopShortcutPath)
$desktopShortcut.TargetPath = "d:\antgravity\launch-visible.bat"
$desktopShortcut.WorkingDirectory = "d:\antgravity"
$desktopShortcut.Description = "Launch Architecture Quest"
$desktopShortcut.Save()

Write-Output "Startup shortcut created: $(Test-Path $startupShortcutPath)"
Write-Output "Desktop shortcut created: $(Test-Path $desktopShortcutPath)"
