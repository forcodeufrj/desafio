
with open('matrix.bat','w') as f:
    f.write('@echo off\n')
    f.write('color 02\n')
    f.write('mode 1000\n\n')
    f.write(':start \n')
    f.write(f"echo {'%random%' * 20}\n")
    f.write('goto start')

