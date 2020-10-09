# -*- coding: utf-8 -*-

import sqlite3
import time


operat = {}

def option1():

    print("+---------------------------+")

    client_n = input("Nome: ")
    client_i = int(input("Idade: "))
    client_c = input("CPF: ")
    client_s = float(input("Saldo: "))

    print("+---------------------------+")

    conexao = sqlite3.connect("databank.db")
    cursor = conexao.cursor()

    try:
        
        cursor.execute('''
        CREATE table dbc (nome, idade, cpf, saldo)''')

    except:
        print(">>>Tabela já existente...\n<<<Inserindo Dados!")

    finally:
        cursor.execute('''
        INSERT INTO dbc (nome, idade, cpf, saldo)
        VALUES (?, ?, ?, ?)''', (client_n, client_i, client_c, client_s))
        conexao.commit()
        print(">>>Atualizado...")
        conexao.close()


def option2():

    print("+--------------------------+")
    cliente_busca = input("Nome: ")

    conexao = sqlite3.connect("databank.db")
    cursor = conexao.cursor()

    try:
        dtc = (operat[cliente_busca][-1])
        cursor.execute('SELECT nome, idade, cpf, saldo+{} as saldo from dbc where nome == "{}" '.format(dtc, cliente_busca))

    except:
        cursor.execute('SELECT * FROM dbc where nome == "{}" '.format(cliente_busca))

    finally:

        rged = cursor.fetchall()
        conexao.commit()

        if len(rged) > 0:
            print('''
            +-------------+
            |Nome: {}     
            |Idade: {}    
            |CPF: {}      
            |Saldo: {}    
            +-------------+'''.format(rged[0][0], rged[0][1], rged[0][2], rged[0][3]))

        else:
            print(">>>Cliente não registrado")

        time.sleep(7)

        cursor.close()
        conexao.close()


def option3():
    print("+-----------------------------+")
    cliente_busca = input("Nome: ")

    conexao = sqlite3.connect("databank.db")
    cursor = conexao.cursor()
    cursor.execute('DELETE from dbc where nome == "{}" '.format(cliente_busca))

    conexao.commit()
    print(">>Registro apagado")

    time.sleep(3)

    cursor.close()
    conexao.close()


def option4():

    print("+-----------------------------+")

    client_nome = input("Nome: ")
    opr_gasto = float(input("Valor: "))
    opr_descrp = input("Descrição: ")

    print("+-----------------------------+")

    conexao = sqlite3.connect("databank.db")
    cursor = conexao.cursor()

    try:
        cursor.execute('''
        CREATE table opr (nome, operacao)''')

    except:

        print(">>>Tabela Existente...\n<<<Inserindo dados!")

    finally:

        cursor.execute('''
        INSERT INTO opr (nome, operacao)
        VALUES (?, ?)''', (client_nome, opr_descrp))

    conexao.commit()

    operat.update({client_nome : [opr_gasto]})

    cursor.close()
    conexao.close()

def option5():
    print("+-----------------------+")
    client_hist = input("Nome: ")

    conect = sqlite3.connect("databank.db")
    cursor = conect.cursor()
    cursor.execute('SELECT * from opr where nome == "{}" '.format(client_hist))

    rged = cursor.fetchall()

    conect.commit()

    if len(rged) > 0:
        print('''
        +---------------+
        |Nome: {}
        |Operação: {}
        +---------------+'''.format(rged[0][0], rged[0][1]))

    else:
        print(">>>Operação ou cliente inexistente")


    time.sleep(5)

    cursor.close()
    conect.close()


def option6():

    conex = sqlite3.connect("databank.db")
    cursor = conex.cursor()
    cursor.execute('SELECT nome from dbc')
    nrg = cursor.fetchall()

    conex.commit()

    for cont in range(len(nrg)):
        print('''
        +-----------------------+
        |Cliente: {}            
        +-----------------------+'''.format(nrg[cont][0]))
        time.sleep(0.3)

    time.sleep(5)

    cursor.close()
    conex.close()
