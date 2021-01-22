package capitulo8;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

public class NIOFiles {
    public static void main(String[] args) throws IOException {
        // com o pacote nio ficou mais facil consultar e manipular arquivos
        // a funçao list de Files recolhe uma lista de arquivos de um caminho
        Files.list(Paths.get(".")).forEach(System.out::println);

        Files.list(Paths.get("./src/capitulo8"))
            .filter(p -> p.toString().endsWith(".java"))
            .forEach(System.out::println);

        // estamos capturando uma lista de arquivos, filtrando para encontrando
        // apenas terminados em .java
        // com a função flatmap nos achatamos todos os arrays excepcionais
        Files.list(Paths.get("./src/capitulo8"))
            .filter(p -> p.toString().endsWith(".java"))
            .flatMap(NIOFiles::lines)
            .forEach(System.out::println);
    }

    static Stream<String> lines(Path p) {
        try {
            return Files.lines(p);
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }
}
