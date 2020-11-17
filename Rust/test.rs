fn main() {
    let mut s = String::from("hello");

    let r1 = &s;
    let r2 = &s;

    println!("{} {}", r1, r2);
    
    let r3 = &mut s;

    r3.push_str(", world!");

    println!("{}", r3);

    let _reference_to_nothing = not_dangle();

    let word = String::from("walter alleyz");
    let slice = first_word(&word);

    println!("{}", slice);
}

// we cant return a reference from within a scope
// cause the processor will deallocate it when the scope over.
// fn dangle() -> &String {
//     let s = String::from("hello");

//     &s
// }

fn not_dangle() -> String {
    let s = String::from("hello");

    s
}

fn first_word(s: &String) -> &str {
    let bytes = s.as_bytes();

    for (index, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..index];
        }
    }

    &s[..]
}