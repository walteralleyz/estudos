package capitulo3;

// A interface funcional é necessária para que possamos aplicar o lambda.
// Para que a interface seja funcional ela deve possuir apenas um método abstrato
// mas nada impede que você adicione métodos default
@FunctionalInterface
interface Validador<T> {
    boolean valido(String valor);
}

public class ValidaCEPLambda {
    public static void main(String[] args) {
        // aplicação da interface funcional no formato lambda
        Validador<String> CEP = valor -> valor.matches("[0-9]{5}-[0-9]{3}");
        System.out.println(CEP.valido("88340-416"));
    }
}
