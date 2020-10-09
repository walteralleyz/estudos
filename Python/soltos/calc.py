# -*- coding: utf-8 -*-

submenu = ["Binário","Hexadecimal","Octal"]
cmenu = ["Decimal","Hexadecimal","Octal","Decimal","Binário","Octal","Decimal","Binário","Hexadecimal"]
prtro = [2, 8, 16]
novaf = []
numeros = []
b = []
            
def decod(num, opt):
	dissolve = int("%s" % (num), prtro[opt])
	novaf.append(dissolve)

def codn(num, opt):
	if opt == 1:
		return ("{:0b}".format(num))
	elif opt == 2:
		return ("{:0x}".format(num))
	elif opt == 3:
		return ("{:0o}".format(num))

while True:
	print("1. Converter Decimal")
	for v, conv in enumerate(submenu):
		print("{}. Converter {}".format(v+2, conv))
	print("0. Sair")
	user_choose = int(input("> "))
	if user_choose == 0:
		break
	else:
		if user_choose == 1:
			for e, x in enumerate(submenu):
				print("{}. Decimal para {}".format(e+1, x))
			user_opera = int(input("> "))
			numero = int(input("Digite o Decimal:\n"))
			print("Resultado: {}\n".format(codn(numero, user_opera)))
			a = numero
			while a > 0:
				a = a//prtro[user_opera-1]
				d = a
				b.append(d)
			print("Número {} dividido por {}".format(numero, prtro[user_opera-1]))
			print("Divisão:\nse final for ímpar = 1\nse final for par = 0")
			for x in b:
				print("Divisão por: {}\n{}\n".format(prtro[user_opera-1], x))
			
		if user_choose == 2:
			for e, x in enumerate(cmenu[:3]):
				print("{}. {} para {}".format(e+1, submenu[0], x))
			user_escolhe = int(input("> "))
			numero = int(input("Digite o {}:\n".format(submenu[0])))
			decod(numero, user_choose-2)
			if user_escolhe == 1:
				print("Resultado: {}\n".format(novaf[-1]))
			else:
				print("Resultado: {}\n".format(codn(novaf[-1], user_escolhe)))

		if user_choose == 3:
			for e, x in enumerate(cmenu[3:6]):
				print("{}. {} para {}".format(e+1, submenu[1], x))
			user_escolhe = int(input("> "))
			numero = input("Digite o {}:\n".format(submenu[1]))
			decod(numero, user_choose-1)
			if user_escolhe == 1:
				print("Resultado: {}\n".format(novaf[-1]))
			else:
				if user_escolhe == 2:
					print("Resultado: {}\n".format(codn(novaf[-1], user_escolhe-1)))
				elif user_escolhe == 3:
					print("Resultado: {}\n".format(codn(novaf[-1], user_escolhe)))
				else:
					print("Erro, opção inválida")

		if user_choose == 4:
			for e, x in enumerate(cmenu[6:]):
				print("{}. {} para {}".format(e+1, submenu[2], x))
			user_escolhe = int(input("> "))
			numero = int(input("Digite o {}:\n".format(submenu[2])))
			decod(numero, user_choose-3)
			if user_escolhe == 1:
				print("Resultado: {}\n".format(novaf[-1]))
			else:
				if user_escolhe == 2:
					print("Resultado: {}\n".format(codn(novaf[-1], user_escolhe-1)))
				elif user_escolhe == 3:
					print("Resultado: {}\n".format(codn(novaf[-1], user_escolhe-1)))
				else:
					print("Erro, opção inválida")

		
	
