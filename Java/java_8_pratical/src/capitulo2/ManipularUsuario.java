package capitulo2;

import java.util.Arrays;
import java.util.List;

public class ManipularUsuario {
    public static void main(String[] args) {
        // criamos tres usuarios com nomes e pontuações
        Usuario user1 = new Usuario("Paulo Silveira", 150);
        Usuario user2 = new Usuario("Rodrigo Turini", 120);
        Usuario user3 = new Usuario("Guilherme Silveira", 190);

        List<Usuario> usuarios = Arrays.asList(user1, user2, user3);

        // iterador para verificar cada elemento da lista
        // de acordo com a documentacao isso é apenas um syntatic sugar do for (E e : el)
        usuarios.forEach(u -> System.out.println(u.getNome()));
    }
}
