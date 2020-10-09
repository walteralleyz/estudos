package database;

import java.sql.SQLException;

public final class DBManager extends DB {
    public DBManager(String name) {
        super(name);

        this.openDatabase();
        this.createTable();
    }

    public void createUser(String name, int age, float salary) {
        String sql = "INSERT INTO user(name,age,salary) VALUES(?,?,?)";

        try {
            this.preparedStatement = this.c.prepareStatement(sql);

            this.preparedStatement.setString(1, name);
            this.preparedStatement.setInt(2, age);
            this.preparedStatement.setFloat(3, salary);

            this.preparedStatement.executeUpdate();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        this.closeDB();
    }

    public void updateUser(int id, String name, int age, float salary) {
        String sql = "UPDATE user SET name = ?," +
        "age = ?," +
        "salary = ?" +
        "WHERE id = ?";

        try {
            this.preparedStatement = this.c.prepareStatement(sql);

            this.preparedStatement.setString(1, name);
            this.preparedStatement.setInt(2, age);
            this.preparedStatement.setFloat(3, salary);
            this.preparedStatement.setInt(4, id);

            this.preparedStatement.executeUpdate();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        this.closeDB();
    }

    public void deleteOneUser(int id) {
        String sql = "DELETE FROM user WHERE id = ?";

        try {
            this.preparedStatement = this.c.prepareStatement(sql);
            this.preparedStatement.setInt(1, id);
            this.preparedStatement.executeUpdate();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        this.closeDB();
    }

    public void getAllUser() {
        try {
            String sql = "SELECT id, name, age, salary FROM user";
            this.resultSet = this.statement.executeQuery(sql);

            while(this.resultSet.next()) {
                System.out.println(
                    "-".repeat(12) + "\n" +
                    "Id: " + this.resultSet.getInt("id") + "\n" +
                    "Nome: " + this.resultSet.getString("name") + "\n" +
                    "Idade: " + this.resultSet.getInt("age") + "\n" +
                    "Salario: " + this.resultSet.getFloat("salary") + "\n" +
                    "-".repeat(12)
                );
            }
        } catch (SQLException e) {
            System.out.println("\n|A tabela esta vazia!\n");
        }

        this.closeDB();
    }

    public void getOneUser(int id) {
        String sql = "SELECT id, name, age, salary FROM user WHERE id = ?";

        try {
            this.preparedStatement = this.c.prepareStatement(sql);

            this.preparedStatement.setInt(1, id);
            this.resultSet = this.preparedStatement.executeQuery();

            if(this.resultSet.next()) {
                System.out.println("\nUsuario encontrado:");
                System.out.println(
                    "-".repeat(12) + "\n" +
                    "Id: " + this.resultSet.getInt("id") + "\n" +
                    "Nome: " + this.resultSet.getString("name") + "\n" +
                    "Idade: " + this.resultSet.getInt("age") + "\n" +
                    "Salario: " + this.resultSet.getFloat("salary") + "\n" +
                    "-".repeat(12) + "\n"
                );
            } else {
                System.out.println("\n|Usuário não encontrado!\n");
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        this.closeDB();
    }
}