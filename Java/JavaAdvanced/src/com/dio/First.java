    package com.dio;

    import java.util.Arrays;
    import java.util.function.BiPredicate;
    import java.util.function.UnaryOperator;

    @FunctionalInterface
    interface Funcao {
        String gerar(String valor);
    }

    public class First {
        public static void main(String[] args) {
            // unario
    //        UnaryOperator<Integer> calcularOValorVezesTres = valor -> valor * 3;
    //        int valor = 10;
    //
    //        System.out.println("O resultado é ::" + calcularOValorVezesTres.apply(valor));

            // funcional
    //        int[] valores = {1, 2, 3, 4};
    //
    //        Arrays.stream(valores)
    //                .filter(numero -> numero % 2 == 0)
    //                .map(numero -> numero * 2)
    //                .forEach(numero -> System.out.println(numero));

            // funcao pura
//            BiPredicate<Integer, Integer> verificarSeEMaior =
//                    (parametro, valorComparacao) -> parametro > valorComparacao;
//
//            System.out.println(verificarSeEMaior.test(13, 12));
//            System.out.println(verificarSeEMaior.test(10, 15));

            Funcao funcao = valor -> valor + " Walter";

            System.out.println(funcao.gerar("Programador"));
        }
    }
