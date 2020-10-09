# -*- coding:utf-8 -*-

# Projeto simples criado com intuito de guardar as notas
# do curso de Engenharia de Software
# Da Universidade Cesumar à Distância

import os
import numpy as np
import pandas as pd
import time

modl = ['51', '51', '51', '52', '52', '52', '53', '53', '53', '54', '54', '54']
qmat = []
modu = []
qperg = []
naluno = []
nmal = []


class Menu:
    def __init__(self):
        self.opt = ('''
        ####################
        |1. CRIAR BOLETIM  |
        |2. LER BOLETIM    |
        |3. Sair           |
        ####################
        ''')
        self.choose = 0


class Modulo:
    def __init__(self):
        self.modelo = [['{}'.format(modl[timer.tm_mon-2])]*(materia.materias)]


class Materia:
    def __init__(self):
        self.nome = ''
        self.materias = ''
        self.atividades = []


def classmate(self):
    aluno_quest = int(input('Quantidade de matérias à registrar: '))
    materia.materias = aluno_quest


def lmat(self):
    for i in range(materia.materias):
        print('Digite apenas a sigla da matéria: ')
        mat_alu = input('Matéria {} - '.format(i+1)).upper()
        qmat.append(mat_alu)
    materia.nome = qmat[:]


def pergunta(self):
    perg_mat = int(input('Quantidade de Atividades da matéria: '))
    for i in range(perg_mat):
        qperg.append('Atividade{}'.format(i+1))
    qperg.append('MAPA')
    qperg.append('PROVA')
    materia.atividades = qperg[:]


def notas():
    for beta in range(len(qmat)):
        for alpha in range(len(qperg)):
            print('Nota para...')
            usn = float(input('{}, de {}: '.format(qperg[alpha], qmat[beta])))
            naluno.append(usn)


def cabecalho():
    print('\n')
    print('='*(((len(qperg)+len(qmat))*10)-5))
    print('|' + ('{} Boletim'.format(nmal[0])).center(35))
    print('='*(((len(qperg)+len(qmat))*10)-5))


def apresenta():
    aluno = input('Digite seu nome: ').upper()
    nmal.append(aluno)
    print("ATENÇÃO, SE VOCÊ AINDA NÃO CONHECE\nA NOTA COLOQUE 0 NO LUGAR!\n")


def total():
	nal = np.array(naluno)
	nal = nal.reshape(len(qmat), (len(nal))//len(qmat))
	for indice in range(len(nal)):
		soma = nal[indice].sum()
		modu.append("{}".format(soma))


def bolet():
	mode = modu
	mater = materia.nome
	md_mt = list(zip(mode, mater))
	md_mt = pd.MultiIndex.from_tuples(md_mt)
	boletim = pd.DataFrame(np.array(naluno).reshape((len(mater)), (len(qperg))), index=md_mt, columns=materia.atividades)
	boletim.to_csv('{}.csv'.format(nmal[0]))
	boletim.index.names = ["TOTAL", "Matérias"]
	print(boletim)
	print('Salvo em {}, como {}.csv'.format(os.getcwd(), nmal[0]))
	nmal.pop(-1)

def zera():
	while len(qmat) > 0:
		modu.pop(-1)
		qmat.pop(-1)
	while len(qperg) > 0:
		qperg.pop(-1)
	while len(naluno) > 0:
		naluno.pop(-1)
	
	print("Listas zeradas...")


while True:
	table = Menu()
	print(table.opt)
	user_entry = int(input(':'))
	table.choose = user_entry
	if table.choose == 3:
		exit()
	elif table.choose == 1:
		materia = Materia()
		classmate(materia)
		lmat(materia)
		pergunta(materia)
		notas()
		total()
		timer = time.localtime()
		apresenta()
		cabecalho()
		bolet()
		zera()
	elif table.choose == 2:
		user_entry = input('Digite o nome do arquivo sem a extensão: ')
		arquivo = pd.read_csv('{}.csv'.format(user_entry))
		print(arquivo)
	else:
		print('Opção Inválida')
		exit()
