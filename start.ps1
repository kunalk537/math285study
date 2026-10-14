$taskRoot = $PSScriptRoot
$taskUrl = 'http://localhost:2850'
try { $taskResponse = Invoke-WebRequest "$taskUrl/content.json" -UseBasicParsing -TimeoutSec 2; $taskRunning = $taskResponse.StatusCode -eq 200 } catch { $taskRunning = $false }
if (-not $taskRunning) {
    $taskNode = (Get-Command node -ErrorAction Stop).Source
    $taskProcess = Start-Process -FilePath $taskNode -ArgumentList 'server.cjs' -WorkingDirectory $taskRoot -WindowStyle Hidden -RedirectStandardOutput "$taskRoot/server.log" -RedirectStandardError "$taskRoot/server-error.log" -PassThru
    $taskProcess.Id | Set-Content -LiteralPath "$taskRoot/.server-pid"
    Start-Sleep -Seconds 1
}
Start-Process $taskUrl
