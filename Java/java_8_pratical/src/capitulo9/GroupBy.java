package capitulo9;

import capitulo2.Usuario;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.LongStream;

public class GroupBy {
    public static void main(String[] args) {
        List<Usuario> usuarios = new ArrayList<>();

        usuarios.add(new Usuario("Walter", 120));
        usuarios.add(new Usuario("Alfred", 120));
        usuarios.add(new Usuario("Rafael", 100));
        usuarios.add(new Usuario("Gabriel", 250));
        usuarios.add(new Usuario("Romario", 10));

        usuarios.get(0).setModerador();
        usuarios.get(3).setModerador();

        // groupingBy agrupa conjunto de objetos de acordo com uma regra especifica
        // em nosso caso, nossa regra é a pontuação
        Map<Integer, List<Usuario>> pontuacao = usuarios.stream()
            .collect(Collectors.groupingBy(Usuario::getPontos));

        System.out.println(pontuacao);

        // partitionBy é utilizado, em geral, em conjuntos que tenham como chave
        // um booleano
        Map<Boolean, List<Usuario>> moderador = usuarios.stream()
            .collect(Collectors.partitioningBy(Usuario::isModerador));

        System.out.println(moderador);

        // aqui estamos definindo a chave como um booleano e o valor como a soma de pontos
        Map<Boolean, Integer> pontuacaoPorTipo = usuarios.stream()
            .collect(Collectors.partitioningBy(
                Usuario::isModerador,
                Collectors.summingInt(Usuario::getPontos)
            ));

        System.out.println(pontuacaoPorTipo);

        // tambem é possivel unir strings
        String nomes = usuarios.stream()
            .map(Usuario::getNome)
            .collect(Collectors.joining(", "));

        System.out.println(nomes);

        List<Usuario> filtradosOrdenados = usuarios.stream()
            .filter(u -> u.getPontos() > 100)
            .sorted(Comparator.comparing(Usuario::getNome))
            .collect(Collectors.toList());

        System.out.println(filtradosOrdenados);

        List<Usuario> filtradosParalelo = usuarios.parallelStream()
            .filter(u -> u.getPontos() > 100)
            .sorted(Comparator.comparing(Usuario::getNome))
            .collect(Collectors.toList());

        System.out.println(filtradosParalelo);

        long sum = LongStream.range(0, 1_000_000_000)
            .parallel()
            .filter(x -> x % 2 == 0)
            .sum();

        System.out.println(sum);
    }
}
