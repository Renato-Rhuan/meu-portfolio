<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = trim(addslashes($_POST['nome']));
    $email = trim(addslashes($_POST['email']));
    $telefone = trim(addslashes($_POST['telefone']));
    $descricao = trim(addslashes($_POST['descricao']));

    if (empty($nome) || empty($email) || empty($telefone) || empty($descricao)) {
        echo "Por favor, preencha todos os campos.";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Email inválido.";
        exit;
    }

    $para = "renatoclahs12@gmail.com";
    $assunto = "Fale comigo - Portfolio";
    $corpo = "Nome: $nome\nEmail: $email\nTelefone: $telefone\nDescrição: $descricao";

    $cabeca = "From: renatoclahs12@gmail.com\r\n";
    $cabeca .= "Reply-To: $email\r\n";
    $cabeca .= "X-Mailer: PHP/" . phpversion();

    if (mail($para, $assunto, $corpo, $cabeca)) {
        echo "sucesso";
    } else {
        echo "erro";
    }
}
?>

