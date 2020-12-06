package com.dio;

import java.util.*;

public class StackGame {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        StackGame sg = new StackGame();

        while(true) {
            int n = Integer.parseInt(scan.nextLine());
            List<String[]> temp = new ArrayList<>();

            Stack<Integer> a = new Stack<>();
            Stack<Integer> b = new Stack<>();
            Stack<Integer> c = new Stack<>();

            if(n == 0)
                break;

            for(int i = 0; i < n; i++) {
                String[] inp = scan.nextLine().split(" ");

                temp.add(inp);
            }

            for(int i = temp.size() - 1; i >= 0; i--) {
                a.push(Integer.parseInt(temp.get(i)[0]));
                b.push(Integer.parseInt(temp.get(i)[1]));
                c.push(Integer.parseInt(temp.get(i)[2]));
            }

            if(sg.verify(a, b, c))
                System.out.println("1");
            else
                System.out.println("0");
        }
    }

    public boolean verify(Stack<Integer> a, Stack<Integer> b, Stack<Integer> c) {
        while(true) {
            if(!a.empty() && a.peek() % 3 == 0 && a.pop() % 3 == 0)
                continue;

            if(!b.empty() && b.peek() % 3 == 0 && b.pop() % 3 == 0)
                continue;

            if(!c.empty() && c.peek() % 3 == 0 && c.pop() % 3 == 0)
                continue;

            if(!a.empty() && !b.empty() && (a.peek() + b.peek()) % 3 == 0
                    && (a.pop() + b.pop()) % 3 == 0)
                continue;

            if(!a.empty() && !c.empty() && (a.peek() + c.peek()) % 3 == 0
                    && (a.pop() + c.pop()) % 3 == 0)
                continue;

            if(!b.empty() && !c.empty() && (b.peek() + c.peek()) % 3 == 0
                    && (b.pop() + c.pop()) % 3 == 0)
                continue;

            if(!a.empty() && !b.empty() && !c.empty() &&
                    (a.peek() + b.peek() + c.peek()) % 3 == 0
                    && (a.pop() + b.pop() + c.pop()) % 3 == 0)
                continue;

            break;
        }

        return a.empty() && b.empty() && c.empty();
    }
}