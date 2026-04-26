@echo off
REM start-all.bat — start all services using Windows Terminal (wt) if available,
REM otherwise open individual cmd windows.
setlocal

set "ROOT=%~dp0"

if exist "%LOCALAPPDATA%\Microsoft\WindowsApps\wt.exe" (
	wt new-tab --title "rabbitMQ"     cmd /k "cd /d "%ROOT%rabbitMQ" && docker compose up --build" ^
	   ; new-tab --title "user-service"  cmd /k "cd /d "%ROOT%user-service" && docker compose up --build" ^
	   ; new-tab --title "mail-service"  cmd /k "cd /d "%ROOT%mail-service" && docker compose up --build" ^
	   ; new-tab --title "task-service"  cmd /k "cd /d "%ROOT%task-service" && docker compose up --build" ^
	   ; new-tab --title "api-gateway"   cmd /k "cd /d "%ROOT%api-gateway" && docker compose up --build" ^
	   ; new-tab --title "gui"           cmd /k "cd /d "%ROOT%gui" && docker compose up --build" ^
	   ; new-tab --title "monitoring"    cmd /k "cd /d "%ROOT%monitoring" && docker compose up --build"
) else (
	start "rabbitMQ"     cmd /k "cd /d "%ROOT%rabbitMQ" && docker compose up --build"
	start "user-service"  cmd /k "cd /d "%ROOT%user-service" && docker compose up --build"
	start "mail-service"  cmd /k "cd /d "%ROOT%mail-service" && docker compose up --build"
	start "task-service"  cmd /k "cd /d "%ROOT%task-service" && docker compose up --build"
	start "api-gateway"   cmd /k "cd /d "%ROOT%api-gateway" && docker compose up --build"
	start "gui"           cmd /k "cd /d "%ROOT%gui" && docker compose up --build"
	start "monitoring"    cmd /k "cd /d "%ROOT%monitoring" && docker compose up --build"
)

endlocal
exit /b 0
