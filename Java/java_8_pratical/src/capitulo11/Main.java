package capitulo11;

import java.math.BigDecimal;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.util.Arrays.asList;

public class Main {
    public static void main(String[] args) {
        Customer paulo = new Customer("Paulo Silveira");
        Customer rodrigo = new Customer("Rodrigo Turini");
        Customer guilherme = new Customer("Guilherme Silveira");
        Customer adriano = new Customer("Adriano Almeida");

        Product bach = new Product("Bach Completo", Paths.get("/music/bach.mp3"), new BigDecimal(100));
        Product pode = new Product("Poderosas", Paths.get("/music/poderosas.mp3"), new BigDecimal(90));
        Product beat = new Product("Beleza Ame", Paths.get("beauty.mov"), new BigDecimal(150));

        LocalDateTime today = LocalDateTime.now();
        LocalDateTime yesterday = today.minusDays(1);
        LocalDateTime lastMonth = today.minusMonths(1);

        Payment payment = new Payment(asList(bach, pode), today, paulo);
        Payment payment1 = new Payment(asList(beat, bach), yesterday, rodrigo);
        Payment payment2 = new Payment(asList(beat, bach), today, adriano);
        Payment payment3 = new Payment(asList(beat, pode, bach), lastMonth, guilherme);

        List<Payment> payments = asList(payment, payment1, payment2, payment3);

        Stream<Payment> paymentStream = payments.stream()
            .sorted(Comparator.comparing(Payment::getDate));

        paymentStream.forEach(System.out::println);

        Optional<BigDecimal> payment1Total = payment1.getProducts().stream()
            .map(Product::getPrice)
            .reduce(BigDecimal::add);

        System.out.println(payment1Total.orElse(new BigDecimal(0)));

        Stream<BigDecimal> prices = payments.stream()
            .flatMap(p -> p.getProducts().stream().map(Product::getPrice));

        System.out.println(prices.reduce(BigDecimal.ZERO, BigDecimal::add));

        Map<Product, Long> topProducts = payments.stream()
            .flatMap(p -> p.getProducts().stream())
            .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        topProducts.entrySet()
            .stream().max(Map.Entry.comparingByValue())
            .ifPresent(System.out::println);
    }
}
