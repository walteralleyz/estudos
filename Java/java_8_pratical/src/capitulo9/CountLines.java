package capitulo9;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class CountLines {
    public static void main(String[] args) throws IOException {
        Map<Path, Long> linesPerFile = new HashMap<>();

        List<Long> linesList = Files.list(Paths.get("./src/capitulo8"))
            .filter(p -> p.toString().endsWith(".java"))
            .map(p -> lines(p).count())
            .collect(Collectors.toList());

        Files.list(Paths.get("./src/capitulo8"))
            .filter(p -> p.toString().endsWith(".java"))
            .forEach(p -> linesPerFile.put(p, lines(p).count()));

        System.out.println(linesList);

        System.out.println("Imperative map lines:");
        System.out.println(linesPerFile);

        System.out.println("Short map lines:");

        // estamos buscando o caminho do arquivo java e o tamanho (em linhas) do seu conteudo
        // perceba que no caso do coletor para map (toMap) é necessario apontar
        // qual sera a chave e qual sera o valor
        Map<Path, Long> linesConcise =
            Files.list(Paths.get("./src/capitulo8"))
                .filter(p-> p.toString().endsWith(".java"))
                .collect(Collectors.toMap(
                    p -> p,
                    p -> lines(p).count()
                ));

        System.out.println(linesConcise);
    }

    static Stream<String> lines(Path p) {
        try {
            return Files.lines(p);
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }
}
