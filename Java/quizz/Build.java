import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;
import java.io.File;
import java.io.FileNotFoundException;

public class Build {
    private ArrayList<String> perguntas = new ArrayList<>();
    private ArrayList<String> respostas = new ArrayList<>();

    public void getFileAndSpread(String filePath) throws FileNotFoundException {
        File file = new File(filePath);
        StringBuilder pergunta = new StringBuilder();
        
        try (Scanner reader = new Scanner(file)) {
            while(reader.hasNext()) {
                String line = reader.nextLine();

                if(!line.equals(">> begin")) {
                    if(line.equals(">> end")) {
                        this.fillQuizzArray(pergunta);
                        pergunta = new StringBuilder();
                    } else {
                        pergunta.append(line + "\n");
                    }
                }
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public void fillQuizzArray(StringBuilder question) {
        String[] splittedQuestion = question.toString().split("resposta: ");

        this.perguntas.add(splittedQuestion[0]);
        this.respostas.add(splittedQuestion[1]);
    }

    public List<String> getArrayRespostas() {
        return this.respostas;
    }

    public List<String> getArrayPerguntas() {
        return this.perguntas;
    }
}