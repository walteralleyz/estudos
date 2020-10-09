import java.io.FileNotFoundException;

public class Game {
    public void start() {
        Build builder = new Build();
        Make maker = new Make();

        try {
            builder.getFileAndSpread("./perguntas_e_respostas.txt");
        } catch(FileNotFoundException e) {
            System.out.println(e.getMessage());
        }

        while(maker.getUserLife() > 0 && maker.getActualQuestion() < builder.getArrayPerguntas().size()) {
            maker.makeQuestion(builder.getArrayPerguntas(), builder.getArrayRespostas());

            System.out.println("Chances restantes: " + maker.getUserLife() + "\n");
        }

        if(maker.getUserLife() <= 0) System.out.println("Voce perdeu!");
        else {
            System.out.println(
                "Voce ganhou" + "\n" +
                "score: " + maker.getUserLife()
            );
        }
    }
}