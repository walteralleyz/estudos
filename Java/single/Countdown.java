import java.time.LocalDateTime;
import java.util.Scanner;

import javax.swing.tree.TreePath;

public class Countdown {
    public static void main(String[] args) {
        Scanner reader = new Scanner(System.in);

        byte userHour;
        byte userMinute;

        System.out.println("Vamos configurar seu alarme");

        System.out.print("Hora: ");
        userHour = reader.nextByte();

        System.out.print("Minuto: ");
        userMinute = reader.nextByte();

        System.out.println("Tempo ate despertar:");
        while(!isCountEnd(userHour, userMinute)) {}

        System.out.println("Acorde!!!");
        
    }

    public static boolean isCountEnd(byte hour, byte minute) {
        LocalDateTime dateTime = LocalDateTime.now();

        byte sysHour = (byte) dateTime.getHour();
        byte sysMinute = (byte) dateTime.getMinute();

        int diffHour = hour - sysHour;
        int diffMinute = minute - sysMinute;
        int diffSecond = 60 - dateTime.getSecond();

        try {
            Thread.sleep(1000);
            System.out.println(diffHour + " " + diffMinute + " " + diffSecond);
        } catch (InterruptedException e) {
            System.out.println("Interrompido");
        }

        if(sysHour <= hour) {
            if(sysMinute < minute) {
                return false;
            } else {
                return true;
            }
        }

        return true;
    }
}