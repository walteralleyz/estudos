import java.io.File;
import java.io.FileWriter;
import java.io.BufferedWriter;
import java.util.Scanner;

public class CsvToJson {
    public static void main(String[] args) {
        CsvToJson csvToJson = new CsvToJson();

        csvToJson.conversor("./teste.csv");
    }

    public void conversor(String fileString) {
        String jsonString = "[\n";

        try (Scanner reader = new Scanner(new File(fileString))) {
            while (reader.hasNextLine()) {
                String content = reader.nextLine();

                if (reader.hasNextLine()) {
                    jsonString += "\s\s{\"row\" : \"[" + content + "]\"},\n";
                } else {
                    jsonString += "\s\s{\"row\" : \"[" + content + "]\"}\n";
                }
            }

            jsonString += "]";
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        this.saveJson(jsonString);
    }

    public void saveJson(String jsonString) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("./teste.json"))) {
            writer.write(jsonString);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}