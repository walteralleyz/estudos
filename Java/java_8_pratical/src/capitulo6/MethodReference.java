package capitulo6;

import capitulo2.Usuario;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class MethodReference {
    public static void main(String[] args) {
        List<Usuario> usuarios = new ArrayList<>();

        usuarios.add(new Usuario("Walter", 190));
        usuarios.add(new Usuario("Edahn", 120));
        usuarios.add(new Usuario("Rafael", 120));
        usuarios.add(new Usuario("Lucas", 180));
        usuarios.add(new Usuario("Felipe", 150));

        Usuario walter = usuarios.get(0);

        // é possivel passar um method reference como referencia para uma variável
        // e invocar essa variável (se for Runnable)
        Runnable bloco = walter::setModerador;
        bloco.run();

        // novamente usando method reference mas com encadeamento de funções
        usuarios.sort(Comparator.comparing(Usuario::getNome).thenComparingInt(Usuario::getPontos));
        usuarios.forEach(System.out::println);
    }
}
