package com.dio;

import java.util.Scanner;

public class Hash {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        char[] alphabet = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};
        Hash h = new Hash();

        int cases = Integer.parseInt(scan.nextLine());

        for(int i = 0; i < cases; i++) {
            int lines = Integer.parseInt(scan.nextLine());
            int total = 0;

            for(int j = 0; j < lines; j++) {
                char[] word = scan.nextLine().toCharArray();
                total += h.hashier(word, alphabet, j);
            }

            System.out.println(total);
        }
    }

    public int hashier(char[] word, char[] alphabet, int line) {
        int total = 0;

        for(int i = 0; i < word.length; i++) {
            for(int j = 0; j < alphabet.length; j++) {
                if(word[i] == alphabet[j]) {
                    total += j + i + line;
                }
            }
        }

        return total;
    }
}
