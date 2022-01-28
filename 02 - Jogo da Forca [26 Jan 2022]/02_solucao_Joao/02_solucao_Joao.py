import json
import random
import unidecode
import PySimpleGUI as sg
folder_path="/home/joaovw/Documents/pythonCode/for_code/for_code/hangman/"


#Funções jogo
f=open(folder_path+'words.json')
words = json.load(f)
word = ""
check = {}
chances=0
win = 0
edit = ""
used=""

def start():
    global used, chances, check, words, word, edit
    word = random.choice(words["palavras"])
    check = {}
    chances=7
    win = 0
    edit = unidecode.unidecode(word)
    used=" "
    for i in range(len(word)):
        key = unidecode.unidecode(word)
        check[key[i]]={}
        check[key[i]]["value"]=word[i]
        check[key[i]]["pick"]=0
    print(word)

def blanks():
    val = ""
    key = unidecode.unidecode(word)
    for i in range(len(word)):
        if check[key[i]]["pick"]==0:
            val+="_ "
        else:
            val+=check[key[i]]["value"]+" "
    return val

def input_letter(val, old):
        try:
            letter=val
            if letter.isalpha():
                if letter[0] in old:
                    return -2
                else:
                    return unidecode.unidecode(letter[0].lower())
            else:
                raise
        except:
            return -1

#Incialização jggo
start()

#Incialização GUI
file_list_column = [
    [
        sg.Text("Insira a letra"),
        sg.In(size=(5, 1), enable_events=True, key="-LETTER-"),
        sg.Button('Chutar', bind_return_key=True),
    ],
    [
        sg.Text(blanks(), size=(30, 1), key='-text-')
    ],
    [
        sg.Text('Letras Usadas:', size=(50, 1), key='-old-')
    ],
    [
        sg.Text(' ', size=(50, 1), key='-erro-')
    ],
    [
        sg.Button('Reset')
    ],
]

image_viewer_column = [
    [
        sg.Text('Tentativas: 7', size=(20, 1), key='-try-')
    ],
    [sg.Image(folder_path+'7.png', key="-IMAGE-")],
]

layout = [
    [
        sg.Column(file_list_column),
        sg.VSeperator(),
        sg.Column(image_viewer_column),
    ]
]

window = sg.Window("Jogo da Velha", layout)

#Funções GUI 
def update_window():
    window['-old-'].update("Letras Usadas: "+ used)
    window['-text-'].update(blanks())
    window['-try-'].update("Tentativas: "+str(chances))
    filename = folder_path+str(chances)+".png"
    window["-IMAGE-"].update(filename=filename)
    window['-LETTER-'].update('')
def reset():
    start()
    window['-old-'].update("Letras Usadas: "+ used)
    window['-text-'].update(blanks())
    window['-try-'].update("Tentativas: "+str(chances))
    filename = folder_path+str(chances)+".png"
    window["-IMAGE-"].update(filename=filename)


while True:
    event, values = window.read()
    if len(values['-LETTER-']) > 1:
        window['-LETTER-'].update(values['-LETTER-'][:-1])
    if event == "Exit" or event == sg.WIN_CLOSED:
        break
    if event == 'Reset':
        reset()
    if event == 'Chutar':
        #game
        letter= input_letter(values['-LETTER-'], used)
        if letter == -1:
            window['-erro-'].update("Valor Inválido")
        elif letter == -2:
            window['-erro-'].update("Letra Já Utilizada")
        elif (chances>0 and win==0):
            window['-erro-'].update("")
            used+=letter+" "
            try:
                check[letter]["pick"]=1
            except:
                chances-=1
            if chances>0:
                n = 0
                for i in range(len(edit)):
                    if check[edit[i]]["pick"]!=0:
                        n+=1
                if n == len(word):
                    win = 1
                    window['-erro-'].update("Você ganhou!")
            if chances == 0:
                window['-erro-'].update("Você perdeu! (A palavra era "+word+")")
                
        update_window()



window.close()
