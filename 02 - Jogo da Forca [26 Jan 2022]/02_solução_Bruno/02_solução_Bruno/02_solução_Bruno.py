import random

def main():
    #inicio
    input("Bem-vindo ao jogo da forca. Aperte enter pra continuar")
    #função de aleatorizar uma palavra
    palavra = carrega_palavra()
    #função de amazenar inicialmente a quantidade de letras da palavra numa lista e mostrar
    acertadas = mostrar(palavra)
    jogadas = 0
    usadas = []
    forca = False
    acertou = False
    erros = 0

    print(palavra)
    print(acertadas)
    while(not forca and not acertou): #o jogo continua enquanto não ganha e nem enforca
        #pedindo uma letra
        chute = pede_letra()
        if (len(chute) != 1 or chute in usadas or not str.isalpha(chute)): #evitar letra repetida e chutes que não sejam letras
            print("faça um chute válido!")
        
        else:
            if (chute in palavra):#acertou
                acerto_palavra(chute, acertadas, palavra)
                faltando = str(acertadas.count('_'))
                print('Ainda faltam acertar {} letras'.format(faltando))
                
                if (faltando == "0"):#vitória
                    print("PARABÉNS!! Você encontrou todas as letras formando a palavra '{}'".format(palavra.upper()))
            else:#errou
                erros += 1
                faltando = str(acertadas.count('_'))
                print(acertadas)
                print('Ainda faltam acertar {} letras'.format(faltando))
                print('Você ainda tem {} tentativas'.format(7-erros))
                desenha_forca(erros)
            usadas.append(chute)

        forca = erros == 7
        jogadas += 1
        acertou = "_" not in acertadas
        print("letras usadas:",usadas)
        print(acertadas)

    if (acertou):
        vitoria()
    else:
        derrota(palavra)

    print("Fim do jogo")


def carrega_palavra(): 
    palavras = []
    with open("palavras.txt", "r", encoding = "utf-8") as arquivo:    
        for linha in arquivo:
            linha = linha.strip()
            palavras.append(linha)
    numero = random.randrange(0, len(palavras))
    palavra = palavras[numero].upper()
    return palavra
    

def mostrar(palavra):
    return ["_" for letra in palavra]

def pede_letra():
    chute = input("Qual letra? ")
    chute = chute.strip().upper()
    return chute

def acerto_palavra(chute, letras_acertadas, palavra_secreta):
    index = 0
    for letra in palavra_secreta:#avalia cada caracter da palavra um por um
        if (chute == letra):
            letras_acertadas[index] = letra #quando verdadeiro, atribui letra na posição index
        index += 1

def vitoria():
    print("Parabéns, você ganhou!")

def derrota(palavra):
    print("Você foi enforcado!")
    print("A palavra era {}".format(palavra))

def desenha_forca(erros):
    print("  _______     ")
    print(" |/      |    ")

    if(erros == 1):
        print(" |      (_)   ")
        print(" |            ")
        print(" |            ")
        print(" |            ")

    if(erros == 2):
        print(" |      (_)   ")
        print(" |      \     ")
        print(" |            ")
        print(" |            ")

    if(erros == 3):
        print(" |      (_)   ")
        print(" |      \|    ")
        print(" |            ")
        print(" |            ")

    if(erros == 4):
        print(" |      (_)   ")
        print(" |      \|/   ")
        print(" |            ")
        print(" |            ")

    if(erros == 5):
        print(" |      (_)   ")
        print(" |      \|/   ")
        print(" |       |    ")
        print(" |            ")

    if(erros == 6):
        print(" |      (_)   ")
        print(" |      \|/   ")
        print(" |       |    ")
        print(" |      /     ")

    if (erros == 7):
        print(" |      (_)   ")
        print(" |      \|/   ")
        print(" |       |    ")
        print(" |      / \   ")

    print(" |            ")
    print("_|___         ")
    print()


if __name__ == '__main__':
    main()

