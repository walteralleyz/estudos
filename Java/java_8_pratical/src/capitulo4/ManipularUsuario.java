package capitulo4;

import capitulo2.Usuario;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;

public class ManipularUsuario {
    public static void main(String[] args) {
        Usuario user1 = new Usuario("Paulo Silveira", 150);
        Usuario user2 = new Usuario("Rodrigo Turini", 120);
        Usuario user3 = new Usuario("Guilherme Silveira", 190);

        List<Usuario> usuarios = new ArrayList<>();

        usuarios.add(user1);
        usuarios.add(user2);
        usuarios.add(user3);

        Consumer<Usuario> mostraMensagem = u -> System.out.println("antes de imprimir os nomes");
        Consumer<Usuario> imprimeNome = u -> System.out.println(u.getNome());

        // é possivel aninhar statements como mostra o código abaixo
        // mostraMensagem vai executar primeiro e logo em seguida imprimeNome
        // é muito importante implementar o tipo Consumer, se tentar executar isso direto no lambda
        // o compilador pode reclamar
        usuarios.forEach(mostraMensagem.andThen(imprimeNome));
        usuarios.removeIf(u -> u.getPontos() > 160);
        usuarios.forEach(u -> System.out.println(u.getNome()));
    }
}
