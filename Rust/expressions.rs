fn main() {
    let number: u8 = 3;

    if number < 5 {
        println!("condition was true");
    } else {
        println!("condition was falsy");
    }

    let condition: bool = true;

    let num: u8 = if condition { 5 } else { 6 };

    println!("The value of num is: {}", num);

    let mut count = 0;

    loop {
        if count > 3 {
            break;
        }

        println!("looping again!");
        count = count + 1;
    }

    let new_val = loop {
        if count == 10 {
            break count * 2;
        }

        count = count + 1;
    };

    println!("{}", new_val);

    let arr: [u8; 5] = [10, 20, 30, 40, 50];

    for element in arr.iter() {
        println!("The value is: {}", element);
    }

    for nums in (1..4).rev() {
        println!("{}!", nums);
    }
}
