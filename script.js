// TEXTO ANIMADO
var typed = new Typed(".multiple-text", {
    strings: ["Web", "Criativo"],
    typeSpeed: 100,   // Velocidade de digitação (em milissegundos)
    backSpeed: 100,   // Velocidade de apagamento
    backDelay: 1000,  // Atraso antes de começar a apagar o texto
    loop: true        // Continuar o loop da animação
});

// MEU FORMULARIO
document.getElementById('meuformulario').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const mensagem = document.getElementById('mensagem');
    const barra = document.querySelector('.carregamento');

    // Validação de e-mail genérica
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    // Validação do telefone (11 dígitos)
    const telefoneRegex = /^[0-9]{11}$/;
    if (!telefoneRegex.test(telefone)) {
        alert('Por favor, insira um telefone válido com 11 dígitos.');
        return;
    }

    // Mostra a mensagem com a barra animada
    mensagem.style.display = 'block';
    barra.style.animation = 'mover 1.5s infinite ease-in-out';

    const dados = new FormData();
    dados.append('nome', nome);
    dados.append('email', email);
    dados.append('telefone', telefone);
    dados.append('descricao', descricao);

    fetch('envia.php', {
        method: 'POST',
        body: dados
    })
    .then(response => response.text())
    .then(data => {
        if (data.toLowerCase().includes('sucesso')) {
            // Aguarda 3s e então oculta a mensagem e reseta tudo
            setTimeout(() => {
                mensagem.style.display = 'none';
                barra.style.animation = 'none'; // Para a animação
                document.getElementById('meuformulario').reset();
            }, 3000);
        } else {
            alert('Erro ao enviar: ' + data);
            mensagem.style.display = 'none';
            barra.style.animation = 'none';
        }
    })
    .catch(error => {
        alert('Erro ao enviar o formulário. Tente novamente mais tarde.');
        mensagem.style.display = 'none';
        barra.style.animation = 'none';
    });
});

