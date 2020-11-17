fn main() {
    another_function(5);

    // statements do not return values, expressions do
    // example of expression
    let y = {
        let x = 3;
        x + 1
    };

    // example of statement
    let _z = 1;

    println!("The value of y is: {}", y);
    println!("The value of ten() is: {}", ten());
    println!("10 + 1 = {}", plus_one(10));
}

fn another_function(x: u32) {
    println!("The value of x is: {}", x);
}

fn ten() -> u8 {
    10
}

fn plus_one(x: i32) -> i32 {
    x + 1
}
