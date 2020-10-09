import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner reader = new Scanner(System.in);
        short num1, num2, opt;

        System.out.print("1 Numero: ");
        num1 = reader.nextShort();

        System.out.print("2 Numero: ");
        num2 = reader.nextShort();

        System.out.println(
        "Escolha a operação:\n" +
        "1 - soma\n" +
        "2 - subtração\n" +
        "3 - multiplacação\n" +
        "4 - divisão\n");

        opt = reader.nextShort();

        reader.close();

        System.out.print("Resultado: ");

        switch(opt) {
            case 1:
            System.out.println(num1 + num2);
            break;

            case 2:
            System.out.println(num1 - num2);
            break;

            case 3:
            System.out.println(num1 * num2);
            break;

            case 4:
            System.out.println(num1 / num2);
            break;


            default:
            System.out.println("Operação inválida!");
        }
    }
}