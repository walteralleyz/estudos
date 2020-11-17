use std::io::{Write, BufReader, BufRead, Error};
use std::io;
use std::fs::File;
use std::fmt;

struct User {
    name: String,
    age: u8,
    email: String,
    city: String,
    country: String,
    postal_code: u32,
}

impl fmt::Display for User {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, 
        "
        ******User******
        name: {}
        age: {}
        city: {}
        country: {}
        email: {}
        postal code: {}
        ****************
        "
        , self.name, self.age, self.city, self.country, self.email, self.postal_code)
    }
}

fn main() {
    loop {
        let option: u8 = get_menu_option();

        match option {
            0 => break println!("Ending..."),
            1 => {
                let user = build_user();
                write_file(user);
            }
            _ => continue,
        }
    }
}

fn get_menu_option() -> u8 {
    let mut option: String = String::new();

    println!("
    ===========================
    |***********MENU**********|
    | 1 - New user            |
    | 2 - Bring All users     |
    | 3 - Bring by id         |
    | 4 - Update user         |
    | 5 - Delete user         |
    | 0 - Quit                |
    ===========================
    Option: 
    ");

    io::stdin()
    .read_line(&mut option)
    .expect("Failed to read input!");

    let option: u8 = match option.trim().parse() {
        Ok(num) => num,
        Err(_) => 0,
    };

    option
}

fn get_input(field: &str) -> String {
    println!("Insert the value for {}", field);

    let mut value = String::new();

    io::stdin()
    .read_line(&mut value)
    .expect("Failed to read input");

    value
}

fn build_user() -> User {
    let mut user = User {
        name: "".to_string(),
        email: "".to_string(),
        age: 0,
        city: "".to_string(),
        country: "".to_string(),
        postal_code: 0
    };

    user.name = get_input("name");
    user.email = get_input("email");
    user.city = get_input("city");
    user.country = get_input("country");

    user.postal_code = match get_input("postal code").trim().parse() {
        Ok(num) => num,
        Err(_) => 0,
    };

    user.age = match get_input("age").trim().parse() {
        Ok(num) => num,
        Err(_) => 0,
    };

    user
}

fn write_file(user: User) -> Result<(), Error> {
    let path = "users.txt";
    let mut output = File::create(path)?;
    writeln!(output, "{}", user.to_string())?;

    Ok(())
}