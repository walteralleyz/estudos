package user;

import java.util.Scanner;

import database.DBManager;

public final class User {
    Scanner reader;

    public User(Scanner input) {
        this.reader = input;
    }

    public void create() {
        DBManager manager = new DBManager("bank");

        String name;
        int age;
        float salary;

        System.out.print("|Nome: ");
        name = this.reader.next();

        System.out.print("|Idade: ");
        age = this.reader.nextInt();

        System.out.print("|Salario: ");
        salary = this.reader.nextFloat();

        manager.createUser(name, age, salary);
    }

    public void readAll() {
        DBManager manager = new DBManager("bank");

        manager.getAllUser();
    }

    public void readOne() {
        DBManager manager = new DBManager("bank");
        int id;

        System.out.print("|id: ");
        id = this.reader.nextInt();

        manager.getOneUser(id);
    }

    public void updateOne() {
        DBManager manager = new DBManager("bank");

        String name;
        int age;
        int id;
        float salary;

        System.out.print("|id: ");
        id = this.reader.nextInt();

        System.out.print("|Nome: ");
        name = this.reader.next();

        System.out.print("|Idade: ");
        age = this.reader.nextInt();

        System.out.print("|Salario: ");
        salary = this.reader.nextFloat();

        manager.updateUser(id, name, age, salary);
    }

    public void deleteOne() {
        DBManager manager = new DBManager("bank");
        int id;

        System.out.print("|id: ");
        id = this.reader.nextInt();

        manager.deleteOneUser(id);
    }
}