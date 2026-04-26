@echo off
REM stop-all.bat — stop all services using Windows Terminal (wt) if available,
REM otherwise open individual cmd windows.
setlocal

set "ROOT=%~dp0"

if exist "%LOCALAPPDATA%\Microsoft\WindowsApps\wt.exe" (
    wt new-tab --title "rabbitMQ"     cmd /k "cd /d "%ROOT%rabbitMQ" && docker compose down -v" ^
       ; new-tab --title "user-service"  cmd /k "cd /d "%ROOT%user-service" && docker compose down -v" ^
       ; new-tab --title "mail-service"  cmd /k "cd /d "%ROOT%mail-service" && docker compose down -v" ^
       ; new-tab --title "task-service"  cmd /k "cd /d "%ROOT%task-service" && docker compose down -v" ^
       ; new-tab --title "api-gateway"   cmd /k "cd /d "%ROOT%api-gateway" && docker compose down -v" ^
       ; new-tab --title "gui"           cmd /k "cd /d "%ROOT%gui" && docker compose down -v" ^
       ; new-tab --title "monitoring"    cmd /k "cd /d "%ROOT%monitoring" && docker compose down"
) else (
    start "rabbitMQ"     cmd /k "cd /d "%ROOT%rabbitMQ" && docker compose down -v"
    start "user-service"  cmd /k "cd /d "%ROOT%user-service" && docker compose down -v"
    start "mail-service"  cmd /k "cd /d "%ROOT%mail-service" && docker compose down -v"
    start "task-service"  cmd /k "cd /d "%ROOT%task-service" && docker compose down -v"
    start "api-gateway"   cmd /k "cd /d "%ROOT%api-gateway" && docker compose down -v"
    start "gui"           cmd /k "cd /d "%ROOT%gui" && docker compose down -v"
    start "monitoring"    cmd /k "cd /d "%ROOT%monitoring" && docker compose down"
)

endlocal
exit /b 0
