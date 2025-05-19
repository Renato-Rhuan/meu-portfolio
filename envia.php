<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = trim($_POST['nome']);
    $email = trim($_POST['email']);
    $telefone = trim($_POST['telefone']);
    $descricao = trim($_POST['descricao']);

    if (empty($nome) || empty($email) || empty($telefone) || empty($descricao)) {
        echo "Por favor, preencha todos os campos.";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Email inválido.";
        exit;
    }

    $to = "renatoclahs12@gmail.com"; 
    $subject = "Formulário de Contato";
    $body = "Nome: $nome\nEmail: $email\nTelefone: $telefone\nDescricao: $descricao";

    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Mensagem enviada com sucesso!";
    } else {
        echo "Falha ao enviar a mensagem.";
    }
}
?>
