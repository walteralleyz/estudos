package capitulo7;

import capitulo2.Usuario;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class StreamsAndCollectors {
    public static void main(String[] args) {
        List<Usuario> usuarios = new ArrayList<>();

        usuarios.add(new Usuario("Walter", 120));
        usuarios.add(new Usuario("Rafael", 150));
        usuarios.add(new Usuario("Edahn", 180));
        usuarios.add(new Usuario("Lucas", 90));
        usuarios.add(new Usuario("Felipe", 70));

        usuarios.sort(Comparator.comparing(Usuario::getPontos).reversed());
        usuarios.subList(0, 5).forEach(Usuario::setModerador);

        System.out.println("Todos");
        usuarios.forEach(System.out::println);

        // transformamos uma lista em uma stream
        // com a interface stream podemos utilizar funções de filtro, mapeamento, redução e muito mais
        Stream<Usuario> usuarioStream = usuarios.stream();
        usuarioStream = usuarioStream.filter(u -> u.getPontos() > 100);

        System.out.println("Maior que 100");
        usuarioStream.forEach(System.out::println);

        // collectors

        // os coletores retornam os dados da stream para um tipo especifico de empacotamento (listas, mapas)
        List<Usuario> menorQue100 = usuarios.stream().filter(u -> u.getPontos() < 100).collect(Collectors.toList());

        System.out.println("Menor que 100");
        menorQue100.forEach(System.out::println);

        List<Integer> pontos = usuarios.stream().map(Usuario::getPontos).collect(Collectors.toList());

        System.out.println("Pontos");
        pontos.forEach(System.out::println);

        // para evitar valores nulos, usamos as funções condicionais
        // orElse indica que se não há valor retornado, o valor parâmetro se torna default
        double media = usuarios.stream().mapToInt(Usuario::getPontos).average().orElse(0.0);

        System.out.println("media:" + media);
    }
}
