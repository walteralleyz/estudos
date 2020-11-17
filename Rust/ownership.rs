fn main() {
    let mut s = String::from("hello");

    // deep copy (copies data from heap, where string is allocated)
    let s2 = s.clone();
    s = String::from("s string");

    // invalidating the a string
    let a = String::from("a string");
    let b = a;

    println!("{} {}", s2, s);
    println!("{}", b);

    // a wont compile
    // println!("{}", a);

    // integers is put inside the stack, cause the length is known
    let x = 5;
    let y = x; // theres no diff between deep and shallow here

    let x = x * 2;

    println!("{} {}", x, y);

    // s's value moves into the function...
    // ... and so is no longer valid here    
    takes_ownership(s);

    // x would move into the function,
    // but i32 is Copy, so it’s okay to still
    // use x afterward
    makes_copy(x);
}

fn takes_ownership(some_string: String) {
    println!("{}", some_string);
}

fn makes_copy(some_integer: i32) {
    println!("{}", some_integer);
}
