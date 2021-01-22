package capitulo8;

import capitulo2.Usuario;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class MaisStreams {
    public static void main(String[] args) {
        List<Usuario> usuarios = new ArrayList<>();

        usuarios.add(new Usuario("Walter", 120));
        usuarios.add(new Usuario("Edahn", 150));
        usuarios.add(new Usuario("Rafael", 110));
        usuarios.add(new Usuario("Gabriel", 90));
        usuarios.add(new Usuario("Maicon", 50));

        System.out.println("Filtrados");

        // podemos encadear funções dentro de streams
        Stream<Usuario> usuarioStream = usuarios.stream()
            .filter(u -> u.getPontos() > 100)
            .sorted(Comparator.comparing(Usuario::getNome));

        usuarioStream.forEach(System.out::println);

        System.out.println("Ordenados");
        List<Usuario> ordenados = usuarios.stream()
            .sorted(Comparator.comparing(Usuario::getPontos))
            .collect(Collectors.toList());

        ordenados.forEach(System.out::println);

        System.out.println("Optional");

        // a interface optional indica que a coleção pode não ter um valor específico
        Optional<Usuario> maisDe100 = usuarios.stream()
            .filter(u -> u.getPontos() > 100)
            .peek(System.out::println)
            .findAny();

        System.out.println("Sorting");

        Optional<Usuario> sorteado = usuarios.stream()
            .sorted(Comparator.comparing(Usuario::getNome))
            .peek(System.out::println)
            .findAny();

        // assim como sorted, a função max de stream exige um comparador
        Optional<Usuario> maximum = usuarios.stream()
            .max(Comparator.comparing(Usuario::getPontos));

        Usuario max = maximum.orElse(null);

        System.out.println("Max");
        System.out.println(max);

        // para retornar um único valor nós utilizamos a função sum que reduz todo o conjunto
        // a função mapToInt evita que o Java faça autoboxing e unboxing das variáveis
        int total = usuarios.stream()
            .mapToInt(Usuario::getPontos)
            .sum();

        System.out.printf("total %d\n", total);

        boolean hasModerador = usuarios.stream().anyMatch(Usuario::isModerador);

        System.out.printf("Algum moderador? %s\n", hasModerador);

        Stream<Usuario> usuarioStream1 = Stream.of(
            new Usuario("Rafael", 45),
            new Usuario("Gabriel", 90),
            new Usuario("Thomaz", 110),
            new Usuario("Roberto", 200)
        );

        System.out.println(usuarioStream1.findAny());

        // Estamos gerando números aleatórios de forma infinita
        // assim como mapToInt retorna um int, IntStream é uma stream voltada para tipos int
        // novamente isso evita o unboxing de valores do tipo Integer
        Random random = new Random(0);
        IntStream aleatorios = IntStream.generate(random::nextInt);

        List<Integer> list = aleatorios
            .limit(5)
            .boxed()
            .collect(Collectors.toList());

        System.out.println(list);

        IntStream.generate(new Fibonnaci())
            .limit(10)
            .forEach(System.out::println);

        int maiorQue100 = IntStream
            .generate(new Fibonnaci())
            .filter(f -> f > 100)
            .findFirst()
            .orElse(100);

        System.out.println(maiorQue100);
    }
}
