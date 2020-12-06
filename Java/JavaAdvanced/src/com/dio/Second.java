package com.dio;

import java.util.Locale;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@FunctionalInterface
interface Calcular {
    int calculo(int a, int b);
}

public class Second {
    public static void main(String[] args) {
        // High order function
//        Calcular soma = (a, b) -> a + b;
//        Calcular mult = (a, b) -> a * b;
//        Calcular divs = (a, b) -> a / b;
//
//        System.out.println(executarCalculo(soma, 5, 8));
//        System.out.println(executarCalculo(mult, 5, 8));
//        System.out.println(executarCalculo(divs, 4, 2));

        // functions
//        Function<String, String> retornarNomeAoContrario = txt -> new StringBuilder(txt).reverse().toString();
//        System.out.println(retornarNomeAoContrario.apply("walter"));

        String[] nomes = {"João", "Alberto", "Walter", "Wagner", "Java"};
        Integer[] numeros = {1, 2, 3, 4, 5};

        imprimirNomesFiltrados(nomes);
        imprimirTodosOsNomes(nomes);
        dobrarOsNumeros(numeros);
    }

//    public static int executarCalculo(Calcular calc, int a, int b) {
//        return calc.calculo(a, b)

    public static void imprimirNomesFiltrados(String... nomes) {
        String nomesParaImprimir = Stream.of(nomes)
                .filter(nome -> nome.toLowerCase(Locale.ROOT).startsWith("a"))
                .collect(Collectors.joining(" "));

        System.out.println(nomesParaImprimir);
    }

    public static void imprimirTodosOsNomes(String... nomes) {
        Stream.of(nomes)
                .forEach(nome -> System.out.println(nome));
    }

    public static void dobrarOsNumeros(Integer... numeros) {
        Stream.of(numeros)
                .forEach(numero -> System.out.println(numero * 2));
    }
}
