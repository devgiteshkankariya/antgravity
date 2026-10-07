Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c cd /d d:\antgravity && npm run dev -- --open", 0, False
