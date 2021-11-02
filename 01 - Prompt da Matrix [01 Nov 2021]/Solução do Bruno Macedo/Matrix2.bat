@echo off  
color 2
setlocal enabledelayedexpansion  
set "string=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#$*富有的繁荣艾非"  
set lines=1  
set chars=1
:start
for /l %%A in (1,1,%lines%) do (  
    set "result="  
    for /L %%i in (1,1,%chars%) do call :addchar
    )  
    echo %result% %random% %result% %random% %result% %random% %result% %random% %result% %random% %result% %random% %result% %random% %result% %random% %result% %random% %result% %random% %result% %random% %result% %random% %result%%random% %result% %random% %result%%random% %result% %random% %result%
goto start
:addchar  
set /a x=%random% %% 70
set result=%result%!string:~%x%,1!  
goto :eof  

:end  