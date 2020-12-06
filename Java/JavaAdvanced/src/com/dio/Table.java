package com.dio;

import java.util.*;

public class Table {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        Table t = new Table();

        String[] op = scan.nextLine().split(" ");

        int n = Integer.parseInt(op[0]);
        int q = Integer.parseInt(op[1]);

        int[][] matrix = new int[n][n];

        for(int i = 0; i < q; i++) {
            String[] input = scan.nextLine().split(" ");

            switch (input[0]) {
                case "1":
                    t.fillRow(matrix, input[1], input[2]);
                    break;

                case "2":
                    t.fillCol(matrix, input[1], input[2]);
                    break;

                case "3":
                    t.mostFrequentRow(matrix, input[1]);
                    break;

                case "4":
                    t.mostFrequentCol(matrix, input[1]);
                    break;

                default:
                    break;
            }
        }

        scan.close();
    }

    public void fillRow(int[][] matrix, String row, String num) {
        int n = matrix.length;
        int x = Integer.parseInt(row);

        for(int i = 0; i < n; i++) {
            matrix[x - 1][i] = Integer.parseInt(num);
        }
    }

    public void fillCol(int[][] matrix, String col, String num) {
        int n = matrix.length;
        int y = Integer.parseInt(col);

        for(int i = 0; i < n; i++) {
            matrix[i][y - 1] = Integer.parseInt(num);
        }
    }

    public void mostFrequentRow(int[][] matrix, String row) {
        Map<Integer, Num> freq = new HashMap<>();

        int n = matrix.length;
        int x = Integer.parseInt(row);

        for(int i = 0; i < n; i++) {
            int index = matrix[x - 1][i];
            int count = freq.get(index) != null ? freq.get(index).freq + 1: 1;
            Num num = new Num(index, count);

            freq.put(index, num);
        }

        List<Num> nums = new ArrayList<>(freq.values());
        nums.sort(Comparator.comparing(Num::getFreq).reversed());

        List<Integer> greater = new ArrayList<>();

        for(Num num : nums) {
            if(num.freq < nums.get(0).freq)
                break;


            greater.add(num.value);
        }

        Collections.sort(greater, Comparator.reverseOrder());

        System.out.println(greater.get(0));
    }

    public void mostFrequentCol(int[][] matrix, String col) {
        Map<Integer, Num> freq = new HashMap<>();

        int n = matrix.length;
        int y = Integer.parseInt(col);

        for(int i = 0; i < n; i++) {
            int index = matrix[i][y - 1];
            int count = freq.get(index) != null ? freq.get(index).freq + 1: 1;
            Num num = new Num(index, count);

            freq.put(index, num);
        }

        List<Num> nums = new ArrayList<>(freq.values());
        nums.sort(Comparator.comparing(Num::getFreq).reversed());

        List<Integer> greater = new ArrayList<>();

        for(Num num : nums) {
            if(num.freq < nums.get(0).freq)
                break;


            greater.add(num.value);
        }

        Collections.sort(greater, Comparator.reverseOrder());

        System.out.println(greater.get(0));
    }
}

class Num {
    public int value;
    public int freq;

    public Num(int v, int f) {
        value = v;
        freq = f;
    }

    public int getFreq() {
        return freq;
    }

    public int getValue() {
        return value;
    }

    @Override
    public String toString() {
        return String.format("%d", freq);
    }
}
