$taskPidFile = Join-Path $PSScriptRoot '.server-pid'
if (Test-Path -LiteralPath $taskPidFile) {
    $taskServerPid = [int](Get-Content -LiteralPath $taskPidFile)
    $taskProcessInfo = Get-CimInstance Win32_Process -Filter "ProcessId = $taskServerPid" -ErrorAction SilentlyContinue
    if ($taskProcessInfo -and $taskProcessInfo.CommandLine -match 'server\.cjs') { Stop-Process -Id $taskServerPid }
    Remove-Item -LiteralPath $taskPidFile
}
