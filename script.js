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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    const telefoneRegex = /^[0-9]{11}$/;
    if (!telefoneRegex.test(telefone)) {
        alert('Por favor, insira um telefone válido com 11 dígitos.');
        return;
    }

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
        if (data.includes('sucesso')) {
            const mensagem = document.getElementById('mensagem');
            mensagem.style.display = 'block';
            const carregamento = document.querySelector('.carregamento');
            carregamento.style.width = '100%';

            setTimeout(() => {
                mensagem.style.display = 'none';
                carregamento.style.width = '0%';
            }, 3000);

            document.getElementById('meuformulario').reset();
        } else {
            alert('Erro ao enviar: ' + data);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao enviar o formulário. Tente novamente mais tarde.');
    });
});
