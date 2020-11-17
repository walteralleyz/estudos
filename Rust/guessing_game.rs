use std::io; // entrada padrão de dados
use std::cmp::Ordering; // padrão de comparação, muito semelhante a assembly
use rand::Rng; // dependencia para criar numeros randomicos

fn main() {
    println!("Guess the number!");
    let secret_number = rand::thread_rng().gen_range(1, 101);

	// o loop não possui condição
    loop {
        println!("Please input your guess:");

		// toda variável é imutável, por padrão
		// utilizamos o alterador mut, para torna-la mutável
        let mut guess = String::new();

		// read_line retorna um enumerador chamado Result
		// esse Result retorna Ok ou Err para erros
        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line"); // tratamento de erro

		// toda variável pode receber um tipo
		// como definimos guess como string, aqui estamos
		// transformando guess no tipo int32 e ignorando NaNs
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

		// use o match para encontrar um padrão por meio do Result
		// cmp é usado para comparar assim como o == em outras linguagens
		// cmp recebe um argumento que é a referência de uma variável
		// o simbolo & captura uma referência
        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => {
                println!("You win!");
                break;
            },
        }
    }

    println!("The secret number is {}", secret_number);
}
