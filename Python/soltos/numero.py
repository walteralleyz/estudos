#-*- coding-unicode -*-


import numpy as np
import pandas as pd

def menu():
    print(("="*35))
    print("1. Inserir informações no boletim,\n2. Importar CSV (arquivo do Excel),\n3. Salvar projeto")
    print(("="*35))

def cabecalho():
    print("="*80)
    print("\033[1;3;1m"+"{} - {}".format(newdata[0],newdata[1]).ljust(30)+"BOLETIM".ljust(40)+"\033[0;0m")
    print("="*80)

dados = input("Digite o seu primeiro nome e e-mail (separados por espaços):\n").lower()
newdata = dados.split()
nota_final = []
notaint = []
listamat = []
resumo = []

menu()
user_opt = int(input("Digite a opção:\n"))
if user_opt == 2 or user_opt == 3:
    print("Em fase beta, no momento")
elif user_opt == 1:
    while True:
        materia = input("\nDigite as iniciais da matéria ou ""'fim'"" para finalizar\nEx.: Fundamentos e Arquitetura de Computadores = FAC\nAlgoritmos = ALG\n:").upper()    
        if materia == "FIM":
            break
        else:
            listamat.append(materia)
            for x in range(len(listamat)):
                print("Matéria ""'{}'"" na posição {} da memória, registrada\n".format(listamat[x], x))
    for x in range(len(listamat)):
        
    for x in range(len(listamat)):
        while True:
            notas = input("Insira as notas da matéria ""'{}'"", e para finalizar \ndigite ""'fim'"":\n".format(listamat[x]))
            if notas == "fim":
                break
            else:
                notaint.append(float(notas))
    cabecalho()
    indice = []
    
    linhas = int(len(notaint)/len(listamat))
    novaarr = np.array(notaint)
    newarray = novaarr.reshape(len(listamat), linhas)
    
    for x in range(linhas):
        indice.append(x)
        
    foralista = "M1".split()
    foranew = list(foralista*2)
    
    
    dentro = listamat
    fora = foranew
    hier_index = list(zip(fora, dentro))
    hier_index = pd.MultiIndex.from_tuples(hier_index)
    boletim = pd.DataFrame((newarray), index=hier_index, columns='MAPA PROVA'.split())
    print(boletim)
