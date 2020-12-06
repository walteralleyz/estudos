package com.dio;

import java.util.Scanner;

public class Combine {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);

        int casos = Integer.parseInt(scan.nextLine());

        for(int i = 1; i <= casos; i++) {

            StringBuilder sb = new StringBuilder();
            String[] palavras = scan.nextLine().split(" ");

            int maxSize = Math.max(
                    palavras[0].length(),
                    palavras[1].length());

            for(int j = 0; j < maxSize; j++) {

                if(j < palavras[0].length()) {
                    sb.append(palavras[0].charAt(j));
                }

                if(j < palavras[1].length()) {
                    sb.append(palavras[1].charAt(j));
                }
            }

            //Mostra o resultado
            System.out.println(sb.toString());
        }
    }
}