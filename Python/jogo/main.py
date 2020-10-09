#-*- coding: utf-8 -*-

import sys
import time
import pygame

from pygame.mixer import Sound


width = 640
height = 480
cor_azul = (0, 35, 14) # fundo da aplicação
cor_branca = (255, 255, 255)


class Cena:
    def __init__(self):
        "Iniciacao"
        self.proximaCena = False
        self.jogando = True
    
    def ler_eventos(self, eventos):
        "Le a lista de todos os eventos"
        pass

    def atualizar(self):
        "Calculos e logica"
        pass

    def implementa(self, janela):
        "Implementa os objetos na janela"
        pass

    def muda_cena(self, cena):
        "Seleciona a nova cena"
        self.proximaCena = cena

class Diretora:
    def __init__(self, titulo = "", res= (width, height)):
        pygame.init()
        self.janela = pygame.display.set_mode(res)
        pygame.display.set_caption(titulo)
        self.relogio = pygame.time.Clock()
        self.cena = None
        self.cenas = {}

    def executar(self, cena_inicial, fps = 60):
        self.cena = self.cenas[cena_inicial]
        self.som = pygame.mixer.Sound('../audio/SuperMarioBros.ogg')
        self.som.play()
        jogando = True
        while jogando:
            
            self.relogio.tick(fps)
            eventos = pygame.event.get()
            for evento in eventos:
                if evento.type == pygame.QUIT:
                    jogando = False

            self.cena.ler_eventos(eventos)
            self.cena.atualizar()
            self.cena.implementa(self.janela)

            self.escolherCena(self.cena.proximaCena)

            if jogando:
                jogando = self.cena.jogando

            pygame.display.flip()

        time.sleep(3)

    def escolherCena(self, proximaCena):
        if proximaCena:
            if proximaCena not in self.cenas:
                self.adicionarCena(proximaCena)
            self.cena = self.cenas[proximaCena]

    def adicionarCena(self, cena):
        cenaClass = 'Cena'+cena
        cenaObj = globals()[cenaClass]
        self.cenas[cena] = cenaObj();

class CenaNivel1(Cena):
    def __init__(self):
        Cena.__init__(self)
        self.bola = Bola()
        self.jogador = Gamer()
        self.muro = Muro(45)

        self.pontos = 0
        self.vidas = 3
        self.wait_action = True

        pygame.key.set_repeat(30)

    def ler_eventos(self, eventos):
        for evento in eventos:
            if evento.type == pygame.KEYDOWN:
                self.jogador.update(evento)
                if self.wait_action == True and evento.key == pygame.K_SPACE:
                    self.wait_action = False
                    if self.bola.rect.centerx < width / 2:
                        self.bola.speed = [3, -3]
                    else:
                        self.bola.speed = [-3, -3]
    
    def atualizar(self):
        if self.wait_action == False:
            self.bola.update()
        else:
            self.bola.rect.midbottom = self.jogador.rect.midtop

        if pygame.sprite.collide_rect(self.bola, self.jogador):
            self.bola.speed[1] = -self.bola.speed[1]

        lista = pygame.sprite.spritecollide(self.bola, self.muro, False)
        if lista:
            piso = lista[0]
            cx = self.bola.rect.centerx
            if cx < piso.rect.left or cx > piso.rect.right:
                self.bola.speed[0] = -self.bola.speed[0]
            else:
                self.bola.speed[1] = -self.bola.speed[1]
            self.muro.remove(piso)
            self.pontos += 10

        if self.bola.rect.top > height:
            self.vidas -= 1
            self.wait_action = True
        
        if self.vidas <= 0:
            self.muda_cena("FimdeJogo")

    def implementa(self, janela):
        janela.fill(cor_azul)
        self.mostrar_pontos(janela)
        self.mostrar_vidas(janela)
        
        janela.blit(self.bola.image, self.bola.rect)
        janela.blit(self.jogador.image, self.jogador.rect)
        self.muro.draw(janela)

    def mostrar_pontos(self, janela):
        fonte = pygame.font.SysFont('Consolas', 20)
        texto = fonte.render(str(self.pontos).zfill(5), True, cor_branca)
        texto_rect = texto.get_rect()
        texto_rect.topleft = [0, 0]
        janela.blit(texto, texto_rect)

    def mostrar_vidas(self, janela):
        fonte = pygame.font.SysFont('Consolas', 20)
        concatena = "Vidas: " + str(self.vidas).zfill(2)
        texto = fonte.render(concatena, True, cor_branca)
        texto_rect = texto.get_rect()
        texto_rect.topright = [width, 0]
        janela.blit(texto, texto_rect)

class CenaFimdeJogo(Cena):
    def atualizar(self):
        self.jogando = False

    def implementa(self, janela):
        fonte = pygame.font.SysFont('Arial', 50)
        texto = fonte.render('FIM DE JOGO', True, cor_branca)
        texto_rect = texto.get_rect()
        texto_rect.center = [width/2, height/2]
        janela.blit(texto, texto_rect)
        


class Bola(pygame.sprite.Sprite):
    def __init__(self):
        pygame.sprite.Sprite.__init__(self)
        self.image = pygame.image.load('../images/png_bola.png')
        self.rect = self.image.get_rect()
        self.rect.centerx = width/2
        self.rect.centery = height/2
        self.speed = [3, 3]

    def update(self):
        if self.rect.top <= 0:
            self.speed[1] = -self.speed[1]
        elif self.rect.right >= width or self.rect.left <= 0:
            self.speed[0] = -self.speed[0]
        self.rect.move_ip(self.speed)

class Gamer(pygame.sprite.Sprite):
    def __init__(self):
        pygame.sprite.Sprite.__init__(self)
        self.image = pygame.image.load('../images/mario.Png')
        self.rect = self.image.get_rect()
        self.rect.midbottom = (width/2, height-20)
        self.speed = [0, 0]

    def update(self, evento):
        if evento.key == pygame.K_LEFT and self.rect.left > 0:
            self.speed = [-5, 0]
        elif evento.key == pygame.K_RIGHT and self.rect.right < width:
            self.speed = [5, 0]
        else:
            self.speed = [0, 0]
        self.rect.move_ip(self.speed)

class Piso(pygame.sprite.Sprite):
    def __init__(self, posicao):
        pygame.sprite.Sprite.__init__(self)
        self.image = pygame.image.load('../images/muro.png')
        self.rect = self.image.get_rect()
        self.rect.topleft = posicao

class Muro(pygame.sprite.Group):
    def __init__(self, qntpisos):
        pygame.sprite.Group.__init__(self)

        pos_x = 0
        pos_y = 20

        for i in range(qntpisos):
            piso = Piso((pos_x, pos_y))
            self.add(piso)

            pos_x += piso.rect.width
            if pos_x >= width:
                pos_x = 0
                pos_y = piso.rect.height

diretora = Diretora('Mario BlockBreak', (width, height))
diretora.adicionarCena('Nivel1')
diretora.executar('Nivel1')    
