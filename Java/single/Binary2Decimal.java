import java.util.Scanner;

class Binary2Decimal {
    public static void main(String[] args) {
        System.out.print("Digite o numero decimal: ");
        b2d();
    }

    public static void b2d() {
        Scanner reader = new Scanner(System.in);

        int input = reader.nextInt();
        String result = "";
        
        while(input > 0) {
            if(input % 2 != 0) {
                result += "1";
            } else {
                result += "0";
            }

            input = input / 2;
        }

        result = reverse(result);
        System.out.println(result);
    }

    public static String reverse(String string) {
        String[] charArr = string.split("");
        String reverted = "";

        for(int i = charArr.length-1; i > -1; i--) {
            reverted += charArr[i];
        }

        return reverted;
    }
}