package capitulo5;

import capitulo2.Usuario;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class SortUsuario {
    public static void main(String[] args) {
        List<Usuario> usuarios = new ArrayList<>();

        usuarios.add(new Usuario("Walter", 120));
        usuarios.add(new Usuario("Guilherme", 190));
        usuarios.add(new Usuario("Rafael", 120));

        // é possivel utilizar uma referência do método no lugar do lambda
        // aqui estamos fazendo uma comparação e chamando o método getNome
        // da classe Usuario
        // Nosso parametro de comparação sera os nomes
        usuarios.sort(Comparator.comparing(Usuario::getNome));

        usuarios.forEach(u -> System.out.println(u.getNome()));
    }
}
