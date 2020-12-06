package com.dio;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.Scanner;
import java.util.Collections;

public class Blog {
    List<Character> chr = new ArrayList<>();
    List<String>  words = new ArrayList<>();
    Map<String, Integer> repeats = new HashMap<>();

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        Blog blog = new Blog();

        while(true) {
            String[] row = scan.nextLine().split(" ");
            StringBuilder newRow = new StringBuilder();

            if(row.length == 1 && row[0].equals("."))
                break;

            blog.checkRepeated(row);
            blog.abbrWord(row);

            for(int i = 0; i < row.length; i++) {
                if (blog.words.contains(row[i])) {
                    int index = blog.words.indexOf(row[i]);

                    row[i] = blog.chr.get(index) + ".";
                }

                newRow.append(row[i]).append(" ");
            }

            Collections.sort(blog.chr);
            Collections.sort(blog.words);

            System.out.println(newRow.toString().trim());
            System.out.println(blog.chr.size());

            for(int i = 0; i < blog.chr.size(); i++) {
                System.out.printf("%c. = %s%n", blog.chr.get(i), blog.words.get(i));
            }

            blog.chr.clear();
            blog.words.clear();
            blog.repeats.clear();
        }
    }

    public void checkRepeated(String[] row) {
        for(String word : row) {
            int count = repeats.get(word) != null ? repeats.get(word) + 1 : 1;

            repeats.put(word, count);
        }
    }

    public void abbrWord(String[] row) {
        for(String word : row) {
            if(word.length() > 2) {
                if(!chr.contains(word.charAt(0))) {
                    chr.add(word.charAt(0));
                    words.add(word);
                }
                else {
                    for(String w : words) {
                        if(w.startsWith(word.charAt(0) + "")) {
                            int xW = repeats.get(w) * (w.length() - 2);
                            int xWord = repeats.get(word) * (word.length() - 2);

                            if(xW < xWord) {
                                int index = words.indexOf(w);
                                words.set(index, word);
                            }
                        }
                    }
                }
            }
        }
    }
}