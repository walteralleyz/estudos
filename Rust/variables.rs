fn main() {
    // when we use the same variable name, with the keyword let
    // we're recriating the variable and give it a new value
    let x = 5;
    println!("The value of x is: {}", x);

    let x = x + 1;
    let x = x * 2;

    println!("The value of x is: {}", x);

    let float_x: f32 = 3.0; // float number

    println!("This is a float: {}", float_x);

    let spaces = "    ";
    let spaces = spaces.len();

    println!("How many spaces? {}", spaces);

    // the mut keyword let us change the value, but never the type
    // if we try to assign a string to a number variable, itll give us an error
    let mut z = 32;
    z = z + 1;

    println!("The value of z is: {}", z);

    const Y: u32 = 32_000;
    println!("The value of Y will never change: {}", Y);

    // maths operations
    let _sum = 5 + 10;
    let _diff = 95.5 - 4.3;
    let _prod = 4 * 30;
    let _quot = 56.7 / 32.2;
    let _remd = 43 % 5;

    // booleans
    let _f: bool = false;

    // tuples
    let tup: (i32, f64, u8) = (500, 5.4, 1);
    let (t_a, _t_b, _t_c) = tup;

    println!("The value of t_a is: {}", t_a);

    let one: u8 = tup.2;

    println!("The last tuple value is: {}", one);

    // arrays lives in stack not heap
    let arr: [u8; 5] = [1, 2, 3, 4, 5];
    println!("The first element of array is: {}", arr[0]);
}
