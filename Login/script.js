const images = [
    "./../img/img1.jpg", 
    "./../img/img2.jpg", 
    "./../img/img3.jpg"]; 
let currentImageIndex = 0;
const carouselImage = document.getElementById("carousel-image");

function changeImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  console.log(currentImageIndex);
  carouselImage.src = images[currentImageIndex];
}

setInterval(changeImage, 3000); 

// Alternar exibição da senha
const togglePassword = document.querySelector('.toggle-password');
const passwordInput = document.querySelector('.password-container input');

togglePassword.addEventListener('click', () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.textContent = "🙈";
  } else {
    passwordInput.type = "password";
    togglePassword.textContent = "👁️";
  }
});
document.getElementById("google-login").addEventListener("click", () => {
    alert("Redirecionando para login com Google...");
  });
  
  document.getElementById("facebook-login").addEventListener("click", () => {
    alert("Redirecionando para login com Facebook...");
  });
  
//----------------------------------------------------------------------------------------
//transição de páginas
document.addEventListener('DOMContentLoaded', () => {
  const head = document.head;

  // Função para carregar o conteúdo via AJAX com efeito suave
  const loadPage = (url) => {
    const content = document.querySelector('main'); 

    // Aplica o fade-out antes de carregar o conteúdo
    content.style.transition = 'opacity 0.5s ease'; 
    content.style.opacity = '0';
    setTimeout(() => {
      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error('Erro ao carregar a página');
          return response.text();
        })
        .then(html => {
          content.style.transition = ''; 
          content.innerHTML = new DOMParser().parseFromString(html, 'text/html').querySelector('main').innerHTML;
          reinitializeScripts(); 

          // Aplica o fade-in após o carregamento
          setTimeout(() => {
            content.style.transition = 'opacity 0.5s ease';
            content.style.opacity = '1'; 
          }, 50); 
        })
        .catch(error => console.error(error));
    }, 500); 
  };

  // Função para reexecutar os scripts após carregar novo conteúdo
  const reinitializeScripts = () => {
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      newScript.src = script.src || null;
      newScript.textContent = script.textContent;
      script.replaceWith(newScript);
    });
  };

  // Adiciona evento de clique aos botões de navegação
  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-page]');
    if (target) {
      event.preventDefault(); 
      const page = target.getAttribute('data-page');
      loadPage(page); 
    }
  });

  // Carrega uma página inicial 
  //loadPage('tela1/index.html');
});


  document.getElementById("login-button").addEventListener("click", function () {
    const page = this.getAttribute("data-page"); 
    if (page) {
      window.location.href = page; 
    }
  });
