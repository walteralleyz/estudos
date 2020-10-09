import java.io.IOException;
import java.util.List;
import java.util.Scanner;

public class Make {
    private int userLifeLeft = 3;
    private int actualQuestion = 0;

    public void userWrongAnswer() {
        this.userLifeLeft--;
    }

    public void addActualQuestion() {
        this.actualQuestion++;
    }

    public void makeQuestion(List<String> questionList, List<String> answerList) {
        Scanner input = new Scanner(System.in);

        System.out.println("\n" + (this.actualQuestion + 1) + " - Pergunta: ");
        System.out.println(questionList.get(this.actualQuestion));

        System.out.print("Resposta: ");
        String answer = input.nextLine().trim();
        String actualAnswer = answerList.get(this.actualQuestion).trim();

        if(answer.equalsIgnoreCase(actualAnswer)) {
            this.addActualQuestion();
        } else {
            this.userWrongAnswer();
            this.addActualQuestion();
        }
    }

    public int getUserLife() {
        return this.userLifeLeft;
    }

    public int getActualQuestion() {
        return this.actualQuestion;
    }
}