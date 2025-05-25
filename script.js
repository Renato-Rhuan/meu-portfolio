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

  // Validação simples
  if (!nome || !email || !telefone || !descricao) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

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

  mensagem.style.display = 'block';
  barra.style.animation = 'mover 1.5s infinite ease-in-out';

  fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, telefone, descricao })
  })
  .then(res => res.json())
  .then(data => {
    if (data.message.includes('sucesso')) {
      setTimeout(() => {
        mensagem.style.display = 'none';
        barra.style.animation = 'none';
        document.getElementById('meuformulario').reset();
      }, 3000);
    } else {
      alert('Erro: ' + data.message);
      mensagem.style.display = 'none';
      barra.style.animation = 'none';
    }
  })
  .catch(() => {
    alert('Erro na requisição. Tente novamente mais tarde.');
    mensagem.style.display = 'none';
    barra.style.animation = 'none';
  });
});


