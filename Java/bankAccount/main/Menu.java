package main;

import java.util.Scanner;

import user.User;

public final class Menu {
    private Scanner input = new Scanner(System.in);

    public void present() {
        System.out.print(
            "************Bank************\n" +
            "|--------------------------|\n" +
            "|    cadastro de pessoas   |\n" +
            "|--------------------------|\n" +
            "| 0 - Cadastrar            |\n" +
            "| 1 - Consultar            |\n" +
            "| 2 - Apagar               |\n" +
            "| 3 - Atualizar            |\n" +
            "| 4 - Buscar por ID        |\n" +
            "| 5 - Sair                 |\n" +
            "****************************\n" +
            "|: "
        );
    }

    public void start() {
        byte opt;
        User user = new User(this.input);

        do {
            this.present();
            opt = this.input.nextByte();

            switch (opt) {
                case 0:
                    user.create();
                    break;
    
                case 1:
                    user.readAll();
                    break;
    
                case 2:
                    user.deleteOne();
                    break;
    
                case 3:
                    user.updateOne();
                    break;
    
                case 4:
                    user.readOne();
                    break;
    
                default:
                    System.out.println("Saindo");
                    this.input.close();
                    System.exit(0);
            }

            System.out.print("Digite 0 para retornar ao menu, ou 5 para sair: ");
            opt = this.input.nextByte();
        } while (opt != 5);
    }
}