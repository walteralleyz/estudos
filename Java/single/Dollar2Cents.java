import java.util.Scanner;

public class Dollar2Cents {
    public static void main(String[] args) {
        Scanner reader = new Scanner(System.in);

        float value = 1;

        while(value != 0) {
            System.out.print("Input Dollar: ");
            value = reader.nextFloat();

            int result = (int)(value * 100);

            System.out.println(result + " cents");
        }
    }
}