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
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
let slides = Array.from(document.querySelectorAll(".img-port"));
const indicatorsContainer = document.getElementById("indicators");

let index = 0; // começa no primeiro slide
let isTransitioning = false;

// Criar indicadores
indicatorsContainer.innerHTML = "";
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.dataset.index = i;
  dot.addEventListener("click", (e) => showSlide(+e.target.dataset.index));
  indicatorsContainer.appendChild(dot);
});
const dots = indicatorsContainer.querySelectorAll("span");

// Atualiza classe ativa
function updateActive() {
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));
  slides[index].classList.add("active");
  dots[index].classList.add("active");
}

// Mostra slide específico
function showSlide(i) {
  if (isTransitioning) return;
  isTransitioning = true;

  index = i;
  // Mantém index dentro do intervalo
  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;

  const offset = -(index * (slides[0].offsetWidth + 30));
  carousel.style.transition = "transform 0.5s ease-in-out";
  carousel.style.transform = `translateX(${offset}px)`;

  updateActive();
  // Permite novo clique após a transição
  setTimeout(() => isTransitioning = false, 500);
}

// Botões
nextBtn.addEventListener("click", () => showSlide(index + 1));
prevBtn.addEventListener("click", () => showSlide(index - 1));

// Auto-play a cada 5s
let autoPlay = setInterval(() => showSlide(index + 1), 5000);

// Reinicia auto-play se o usuário interagir
[prevBtn, nextBtn, ...dots].forEach(el => {
  el.addEventListener("click", () => {
    clearInterval(autoPlay);
    autoPlay = setInterval(() => showSlide(index + 1), 5000);
  });
});

// Atualiza posição se redimensionar
window.addEventListener("resize", () => {
  const offset = -(index * (slides[0].offsetWidth + 30));
  carousel.style.transition = "none";
  carousel.style.transform = `translateX(${offset}px)`;
});

// Inicializa
showSlide(index);


