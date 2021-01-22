package capitulo10;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.time.temporal.ChronoUnit;
import java.util.Locale;

public class Datas {
    public static void main(String[] args) {
        /*
            Com toda certeza essa é a minha API favorita.
            Assim como o autor do livro, eu tinha uma dificuldade absurda
            em decorar todos os comandos da API Calendar
            (que também tinha substituido a API date).
            Essa nova API localdate é totalmente explicativa, então leie
            e se delicie.
         */

        LocalDate mesQueVem = LocalDate.now().plusMonths(1);
        System.out.println(mesQueVem);

        LocalDateTime proximaHora = LocalDateTime.now().plusHours(1);
        System.out.println(proximaHora);

        ZonedDateTime zonead = LocalDateTime.now().atZone(ZoneId.of("America/Sao_Paulo"));
        System.out.println(zonead);

        LocalDate aniversario = LocalDate.of(1996, 01, 26);
        System.out.println(aniversario);

        LocalDateTime passado = LocalDateTime.now().withYear(2002);
        System.out.println(passado.getYear());

        LocalDate hoje = LocalDate.now();
        System.out.println(hoje.isBefore(hoje.plusDays(1)));

        ZonedDateTime tokyo = ZonedDateTime.of(
            2002, 01, 01, 3, 20, 20, 0,
            ZoneId.of("Asia/Tokyo"));

        ZonedDateTime saoPaulo = ZonedDateTime.of(
            2002, 01, 01, 3, 20, 20, 0,
            ZoneId.of("America/Sao_Paulo"));

        System.out.println(tokyo.isEqual(saoPaulo));

        System.out.println("hoje é dia: " + MonthDay.now().getDayOfMonth());

        YearMonth ym = YearMonth.from(LocalDate.now());
        System.out.println(ym.getMonth() + " " + ym.getYear());

        System.out.println(LocalDate.of(2004, Month.APRIL, 25));

        Locale pt = new Locale("pt");
        System.out.println(Month.DECEMBER.getDisplayName(TextStyle.FULL, pt));

        String resultado = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        System.out.println(resultado);

        try {
            LocalDate dataInvalida = LocalDate.of(2014, Month.FEBRUARY, 30);
            System.out.println(dataInvalida);
        } catch (DateTimeException e) {
            System.out.println("Data invalida!");
        }

        try {
            LocalTime horaInvalida = LocalTime.of(25, 0);
            System.out.println(horaInvalida);
        } catch (DateTimeException e) {
            System.out.println("Hora invalida!");
        }

        long diffDias = ChronoUnit.DAYS.between(hoje, passado);
        System.out.println(diffDias);

        long diffMes = ChronoUnit.MONTHS.between(hoje, passado);
        System.out.println(diffMes);

        long diffAnos = ChronoUnit.YEARS.between(hoje, passado);
        System.out.println(diffAnos);

        Period period = Period.between(hoje.withYear(2002).withMonth(04), hoje);
        System.out.printf("%s anos, %s meses e %s dias\n", period.getYears(), period.getMonths(), period.getDays());
    }
}
