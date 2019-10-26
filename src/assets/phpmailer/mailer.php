<?php

## Serverska validacija
if (isset($_POST["SenderName"], $_POST["SenderEmail"], $_POST["SenderMessage"]) && filter_var($_POST["SenderEmail"], FILTER_VALIDATE_EMAIL)) {

    ## Uključivanje PHPMailer klase
    require 'PHPMailerAutoload.php';

    ## Dodeljivanje vrednosti u promenljive
    $SenderName    = stripslashes($_POST["SenderName"]);
    $SenderEmail   = stripslashes($_POST["SenderEmail"]);
    $SenderMessage = stripslashes(nl2br($_POST["SenderMessage"]));

    // Definisanje poruke tela
    $body = "
<p>Poruku šalje: $SenderName ($SenderEmail)</p>
<p>$SenderMessage</p>
";

    if ( ! empty($_POST['Sender'])) {
        $body .= "<hr>";
        foreach ($_POST['Sender'] as $key => $value) {
            $value = stripslashes(nl2br($value));
            $key = str_replace("_", " ", $key);
            $body .= "<p>$key: $value</p>";
        }
    }

    ## Pokretanje i podešavanje PHPMailer-a
    include 'class.phpmailer.php' ;
    include 'class.smtp.php';
    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->SMTPAuth   = true;
    $mail->WordWrap   = 50;
    $mail->Port = $mail_port;
    $mail->isHTML(true);

    ## SMTP podaci
    // Uglavnom treba da se promene podaci ispisani VELIKIM SLOVIMA
    $mail->Host     = $mail_host; // SMTP Server
    $mail->Username = $mail_username; // SMTP username
    $mail->Password = $mail_password; // SMTP password

    ## Email podaci
    $mail->From     = $mail_username; // noreply@
    $mail->FromName = $SenderName; // Ime pošiljaoca (korisnika)
    $mail->addReplyTo($SenderEmail, $SenderName); // E-mail pošiljaoca

    $mail->addAddress($to_email, $SenderName); // Adresa klijenta ili tvoja adresa

    ## Poruka
    $mail->Subject = $subject;           // Naslov maila
    // Izgled i sadržaj poruke. Koristi HTML
    $mail->Body = $body;

    ## Slanje poruke i provera greške
    if ($mail->send()) {
        echo 1;
        exit;
    } else {
        $status = 'error';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
        exit; // Ukoliko se email ne šalje, ova naredba će nam prikazati grešku
    }
}