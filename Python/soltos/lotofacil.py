par = 0
part = []
impar = 0


def verifica(x, y, dic):
    beta = dic[str(x)][0]
    if x==y:
        dic.update({str(x):[beta+1]})
        if x % 2 == 0:
            global par
            par += 1
        else:
            global impar
            impar += 1


total = {}
tnum = []
resultados = [
    [1, 3, 4, 5, 8, 9, 10, 12, 14, 15, 18, 19, 21, 22, 25],
    [1, 2, 3, 4, 7, 11, 13, 14, 16, 17, 20, 21, 22, 23, 25],
    [1, 2, 3, 5, 6, 7, 8, 9, 12, 16, 17, 20, 21, 23, 25],
    [4, 5, 6, 8, 11, 12, 14, 16, 17, 18, 20, 21, 23, 24, 25],
    [1, 2, 3, 4, 8, 10, 11, 13, 16, 18, 20, 22, 23, 24, 25],
    [1, 2, 5, 6, 8, 9, 10, 12, 13, 14, 17, 20, 21, 24, 25],
    [1, 2, 4, 5, 8, 10, 12, 13, 15, 17, 18, 21, 22, 23, 24],
    [2, 4, 5, 6, 7, 8, 11, 13, 15, 16, 17, 18, 20, 24, 25],
    [1, 2, 3, 5, 6, 7, 9, 11, 12, 13, 16, 17, 21, 22, 23],
    [1, 2, 3, 5, 8, 10, 11, 13, 14, 17, 18, 20, 21, 22, 25]
    ]

for i in range(1, 26):
    total.update({str(i): [0]})
    tnum.append(i)


for prlista in tnum:
    for seglista in range(len(resultados)):
        for terlista in resultados[seglista]:
            verifica(terlista, prlista, total)

print("Resultados da Lotofacil:\n")

print("{} números pares e {} números ímpares".format(par, impar))
for conta in range(10):
    part.append(list(filter(lambda x: x%2 == 0, resultados[conta])))
    print("jogo n {}: {} pares e {} impares".format(conta+1, len(part[conta]), 15 - (len(part[conta]))))