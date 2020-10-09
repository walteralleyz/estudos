package database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.PreparedStatement;

public abstract class DB {
    private String name;
    private String url;

    protected Connection c = null;
    protected Statement statement = null;
    protected ResultSet resultSet = null;
    protected PreparedStatement preparedStatement = null;

    public DB() {
        this("test");
    }

    public DB(String databaseName) {
        this.name = databaseName;
        this.url = "jdbc:sqlite:" + name + ".db";

        System.out.println(">>> Iniciando Base de dados <<<");
    }

    public void openDatabase() {
        try {
            this.c = DriverManager.getConnection(this.url);
            this.statement = this.c.createStatement();

            System.out.println(">>> Base de dados conectado <<<");
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    public void createTable() {
        try {
            String sql = "CREATE TABLE user" +
            "(id INTEGER PRIMARY KEY AUTOINCREMENT," +
            "name TEXT NOT NULL," +
            "age INTEGER NOT NULL," +
            "salary FLOAT NOT NULL)";

            this.statement.executeUpdate(sql);
            System.out.println(">>> Tabela criada <<<");

        } catch (SQLException e) {
            System.out.println(">>> Tabela conectada <<<");
        }
    }

    public void closeDB() {
        try {
            if (this.c != null) {
                this.c.close();

                System.out.println(">>> Base de dados desconectado <<<");
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
}