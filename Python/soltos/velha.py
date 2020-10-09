import random
import numpy as np

listanp = [0,1,2,3,4,5,6,7,8]
possibl = list(np.array(listanp))
player = 0
machine = 0
winp = 0

def velha():
    print("-"*34)
    print("|","|".rjust(10),"|".rjust(10),"|".rjust(10))
    print("{}".format(possibl[0]).center(11),"{}".format(possibl[1]).center(10),"{}".format(possibl[2]).center(10))
    print("|","|".rjust(10),"|".rjust(10),"|".rjust(10))
    print("-"*34)
    print("|","|".rjust(10),"|".rjust(10),"|".rjust(10))
    print("{}".format(possibl[3]).center(11),"{}".format(possibl[4]).center(10),"{}".format(possibl[5]).center(10))
    print("|","|".rjust(10),"|".rjust(10),"|".rjust(10))
    print("-"*34)
    print("|","|".rjust(10),"|".rjust(10),"|".rjust(10))
    print("{}".format(possibl[6]).center(11),"{}".format(possibl[7]).center(10),"{}".format(possibl[8]).center(10))
    print("|","|".rjust(10),"|".rjust(10),"|".rjust(10))
    print("-"*34)

def maquina():
    posy = random.randint(0,8)
    posx = posy+1
    posxy = posy-1
    if possibl[posy] == player:
       if posx > 0 and posx < 9:
          possibl[posx] = machine
          if possibl[posx] == player:
             possibl[posxy-1] = machine
    elif possibl[posy] == machine:
       if posx > 0 and posx < 9:
          possibl[posx] = machine
          if possibl[posx] == player:
             possibl[posxy-1] = machine
    else:
       possibl[posy] = machine

def placar(jogador):
    print("{} foi o vencedor".format(jogador))
    
escolhe_symbol = input("Escolha seu simbolo (x ou o):").lower()
if escolhe_symbol == "x":
    player = "x"
    machine = "o"
elif escolhe_symbol == "o":
    player = "o"
    machine = "x"
else:
    print("Apenas X e O aceitos.")
    exit()
    
while True:
    print("\033[1;3m"+"\nDigite a posição que deseja marcar"+"\033[0;0m")
    velha()
    pos_h = int(input(">.. "))
    if possibl[pos_h] == machine or pos_h == player:
       print("CASA PREENCHIDA\nTente outra...")
   
    else:
       possibl[pos_h] = player
       maquina()
       if possibl[0] == player and possibl[1] == player and possibl[2] == player:
                print("Vitória do {}".format(possibl[0]))
                break
       if possibl[3] == player and possibl[4] == player and possibl[5] == player:
                print("Vitória do {}".format(possibl[0]))
                break
       if possibl[6] == player and possibl[7] == player and possibl[8] == player:
                print("Vitória do {}".format(possibl[0]))
                break
       if possibl[0] == player and possibl[1] == player and possibl[2] == player:
                print("Vitória do {}".format(possibl[0]))
                break
   

