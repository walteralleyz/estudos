# -*- coding: utf-8 -*-
# Menu para ligar todas classes e dados do programa
# Menu contém opções para cadastro e visualização dos dados dos clientes

import dbopr
import sqlite3
import os



def menu():
    os.system("clear")
    print('''
    +-------------------------------------+
    |1. Cadastrar Cliente                 |
    |2. Buscar dados                      |
    |3. Realizar exclusão de cadastro     |
    |4. Incluir Registro Bancário         |
    |5. Histórico de operações            |
    |6. Visualizar lista de clientes      |
    |0. Sair SysBankData - Sistemas       |
    +-------------------------------------+
    ''')

    func_opt = int(input("> "))
    
    func_choose = func_opt

    if func_choose == 1:
        os.system("clear")
        dbopr.option1()

    elif func_choose == 2:
        os.system("clear")
        dbopr.option2()

    elif func_choose == 3:
        os.system("clear")
        dbopr.option3()

    elif func_choose == 4:
        os.system("clear")
        dbopr.option4()

    elif func_choose == 5:
        os.system("clear")
        dbopr.option5()

    elif func_choose == 6:
        os.system("clear")
        dbopr.option6()

    else:
        exit()

    return func_choose

# Inicio

while True:
    menu()