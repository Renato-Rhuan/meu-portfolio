// TEXTO ANIMADO
var typed = new Typed(".multiple-text", {
  strings: ["Web", "Criativo"],
  typeSpeed: 100,   // Velocidade de digitação (em milissegundos)
  backSpeed: 100,   // Velocidade de apagamento
  backDelay: 1000,  // Atraso antes de começar a apagar o texto
  loop: true        // Continuar o loop da animação
});

// MEU FORMULARIO
document.getElementById('meuformulario').addEventListener('submit', function (event) {
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



const carousel = document.getElementById("carousel");
let slides = Array.from(document.querySelectorAll(".img-port"));

// Duplicar slides para loop infinito
carousel.innerHTML += carousel.innerHTML;
slides = Array.from(document.querySelectorAll(".img-port"));

const prevBtn = document.createElement("button");
prevBtn.className = "carousel-btn prev";
prevBtn.textContent = "<";
carousel.parentElement.appendChild(prevBtn);

const nextBtn = document.createElement("button");
nextBtn.className = "carousel-btn next";
nextBtn.textContent = ">";
carousel.parentElement.appendChild(nextBtn);

let index = 0;
let isTransitioning = false;

function updateActive() {
  slides.forEach(s => s.classList.remove("active"));
  slides[index % (slides.length / 2)].classList.add("active"); // só ativa a primeira metade
}

function showSlide(i) {
  if (isTransitioning) return;
  isTransitioning = true;

  index = i;

  const offset = -(index * (slides[0].offsetWidth + 30));
  carousel.style.transition = "transform 0.5s ease-in-out";
  carousel.style.transform = `translateX(${offset}px)`;

  updateActive();

  setTimeout(() => {
    // Resetar posição para loop
    if (index >= slides.length / 2) {
      index = index % (slides.length / 2);
      carousel.style.transition = "none";
      carousel.style.transform = `translateX(${-index * (slides[0].offsetWidth + 30)}px)`;
    }
    isTransitioning = false;
  }, 500);
}

// Botões
prevBtn.addEventListener("click", () => showSlide(index - 1));
nextBtn.addEventListener("click", () => showSlide(index + 1));

// Auto-play
let autoPlay = setInterval(() => showSlide(index + 1), 5000);

[prevBtn, nextBtn].forEach(el => {
  el.addEventListener("click", () => {
    clearInterval(autoPlay);
    autoPlay = setInterval(() => showSlide(index + 1), 5000);
  });
});

// Inicializa
showSlide(index);

// Ajusta posição ao redimensionar
window.addEventListener("resize", () => {
  const offset = -(index * (slides[0].offsetWidth + 30));
  carousel.style.transition = "none";
  carousel.style.transform = `translateX(${offset}px)`;
  setTimeout(() => carousel.style.transition = "transform 0.5s ease-in-out", 10);
});

