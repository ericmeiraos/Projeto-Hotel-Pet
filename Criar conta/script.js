// Seleciona todos os itens de menu
const menuItems = document.querySelectorAll('aside ul li');

// Adiciona evento de clique a cada item do menu
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove a classe 'active' de todos os itens
        menuItems.forEach(el => el.classList.remove('active'));
        
        // Adiciona a classe 'active' ao item clicado
        item.classList.add('active');
    });
});


// JavaScript para permitir que usuario insira uma imagem
document.querySelector('input[type="file"]').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.width = 100; 
    img.height = 100; 

    const previewDiv = document.querySelector('form div'); 
    previewDiv.innerHTML = ''; 
    previewDiv.appendChild(img); 
});

//JavaScript para exibir e ocultar submenus       
document.addEventListener('DOMContentLoaded', function() {
const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
item.addEventListener('click', function(event) {
    // Fecha todos os submenus
    document.querySelectorAll('.submenu').forEach(submenu => {
        submenu.style.display = 'none';
    });

    // Abre o submenu correspondente ao item clicado
    const submenu = this.querySelector('.submenu');
    if (submenu) {
        submenu.style.display = 'block';
    }

    // Impede a propagação do clique para evitar o fechamento imediato
    event.stopPropagation();
});
});

// Fecha os submenus ao clicar fora deles
document.addEventListener('click', function() {
document.querySelectorAll('.submenu').forEach(submenu => {
    submenu.style.display = 'none';
});
});
});
//----------------------------------------
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
  
    // Função para reiniciar os scripts após carregar novo conteúdo
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
  