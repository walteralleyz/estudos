#[derive(Debug)]
struct Rectangle {
    width: i32,
    height: i32
}

fn main() {
    struct User {
        username: String,
        email: String,
        sign_in_count: u64,
        active: bool,
    }

    struct Color(i32, i32, i32); // tuple struct

    let user1 = User {
        email: String::from("walteralleyz@gmail.com"),
        username: String::from("walteralleyz"),
        active: true,
        sign_in_count: 1,
    };

    let black = Color(0, 0, 0);

    println!("{}", user1.email);

    let rect = Rectangle {
        width: 30,
        height: 50,
    };

    println!("{:?}", rect);
    println!("the area of rectangle is {}", rect.area());
}

impl Rectangle {
    fn area(&self) -> i32 {
        self.width * self.height
    }
}