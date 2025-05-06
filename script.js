// TEXTO ANIMADO
var typed = new Typed(".multiple-text", {
    strings: ["Web", "Criativo"],
    typeSpeed: 100,   // Velocidade de digitação (em milissegundos)
    backSpeed: 100,   // Velocidade de apagamento
    backDelay: 1000,  // Atraso antes de começar a apagar o texto
    loop: true        // Continuar o loop da animação
});


// MEU FORMULARIO

 // Aqui estamos adicionando um evento para quando o formulário for enviado
    document.getElementById('meuformulario').addEventListener('submit', function(event) {
    // Previne o envio do formulário se as validações falharem
    event.preventDefault();

    // Obtém os valores dos campos
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;

    // Validação do email
    if (!email.endsWith('@gmail.com')) {
        alert('Por favor, insira um email válido que termine com @gmail.com');
        return; // Para o código aqui se a validação falhar
    }

    // Validação do telefone (exemplo: 11 dígitos)
    const telefoneRegex = /^[0-9]{11}$/; // Aceita somente 11 dígitos numéricos
    if (!telefoneRegex.test(telefone)) {
        alert('Por favor, insira um telefone válido com 11 dígitos.');
        return; // Para o código aqui se a validação falhar
    }

    // Aqui você pode adicionar a lógica para enviar os dados
    // Simulação de envio de e-mail
    console.log(`Dados enviados: Nome: ${document.getElementById('nome').value}, Email: ${email}, Telefone: ${telefone}`);

    // Exibe a mensagem de sucesso
    const mensagem = document.getElementById('mensagem');
    mensagem.style.display = 'block'; // Mostra a mensagem
    const carregamento = document.querySelector('.carregamento');
    carregamento.style.width = '100%'; // Começa o carregamento

    // Define um tempo para esconder a mensagem após o carregamento
    setTimeout(() => {
        mensagem.style.display = 'none'; // Esconde a mensagem depois de 3 segundos
    }, 3000); // 3000ms = 3 segundos
});
