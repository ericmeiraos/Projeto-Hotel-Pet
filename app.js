
//transição de páginas
document.addEventListener('DOMContentLoaded', () => {
  const head = document.head;

  // Função para carregar o conteúdo via AJAX com efeito suave
  const loadPage = (url) => {
    const content = document.querySelector('main'); // Seleciona o conteúdo principal

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
          content.style.transition = ''; // Remove a transição para evitar conflito ao substituir
          content.innerHTML = new DOMParser().parseFromString(html, 'text/html').querySelector('main').innerHTML;
          reinitializeScripts(); 

          // Aplica o fade-in após o carregamento
          setTimeout(() => {
            content.style.transition = 'opacity 0.5s ease';
            content.style.opacity = '1'; 
          }, 50); 
        })
        .catch(error => console.error(error));
    }, 500); // Tempo do fade-out
  };

  // Função para re-inicializar os scripts após o carregamento do conteúdo
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

//-----------------------------------
document.querySelector("button[type='submit']").addEventListener("click", (e) => {
  e.preventDefault(); 

  // Captura os valores dos campos de filtro
  const idValue = document.querySelector("#id").value.toLowerCase();
  const periodoInicioValue = document.querySelector("#data_inicio").value;
  const periodoFimValue = document.querySelector("#data_fim").value;
  const proprietarioValue = document.querySelector("#proprietario").value.toLowerCase();
  const totalMinValue = document.querySelector("#total_min").value.replace("R$", "").trim();
  const totalMaxValue = document.querySelector("#total_max").value.replace("R$", "").trim();
  const statusValue = document.querySelector("#status").value.toLowerCase();
  const petValue = document.querySelector("#pet").value.toLowerCase();

  // Seleciona todas as linhas do corpo da tabela
  const rows = document.querySelectorAll("tbody tr");

  // Itera sobre as linhas da tabela
  rows.forEach((row) => {
    const idText = row.children[1].textContent.toLowerCase(); 
    const petText = row.children[2].textContent.toLowerCase(); 
    const chegadaText = row.children[3].textContent; 
    const partidaText = row.children[4].textContent; 
    const statusText = row.children[5].textContent.toLowerCase(); 
    const totalText = row.children[6].textContent.replace("R$", "").trim(); 

    // Verifica cada campo
    const matchesId = !idValue || idText.includes(idValue);
    const matchesPet = !petValue || petText.includes(petValue);
    const matchesStatus = !statusValue || statusText.includes(statusValue);
    const matchesProprietario = !proprietarioValue || row.textContent.toLowerCase().includes(proprietarioValue);
    const matchesPeriodo = (!periodoInicioValue || new Date(chegadaText) >= new Date(periodoInicioValue)) &&
                           (!periodoFimValue || new Date(partidaText) <= new Date(periodoFimValue));
    const matchesTotal = (!totalMinValue || parseFloat(totalText) >= parseFloat(totalMinValue)) &&
                         (!totalMaxValue || parseFloat(totalText) <= parseFloat(totalMaxValue));

    // Exibe ou oculta a linha
    if (matchesId && matchesPet && matchesStatus && matchesProprietario && matchesPeriodo && matchesTotal) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});

// Evento para o botão Limpar
document.querySelector("button[type='reset']").addEventListener("click", (e) => {
  e.preventDefault();

  // Limpa os campos do formulário
  document.querySelector("form").reset();

  // Seleciona todas as linhas do corpo da tabela
  const rows = document.querySelectorAll("tbody tr");

  // Exibe todas as linhas novamente
  rows.forEach((row) => {
    row.style.display = "";
  });
});

//-----------------------------------
document.querySelector("button[type='submit']").addEventListener("click", (e) => {
  e.preventDefault(); 

  // Captura os valores dos campos de filtro
  const idValue = document.querySelector("input[placeholder='ID']").value.toLowerCase();
  const emailValue = document.querySelector("input[placeholder='Email']").value.toLowerCase();
  const nomeValue = document.querySelector("input[placeholder='Nome']").value.toLowerCase();
  const dataInicioValue = document.querySelector("#data_inicio").value;
  const statusValue = document.querySelector("select").value.trim().toLowerCase();
  const funcaoValue = document.querySelector("select:nth-of-type(2)").value.toLowerCase();

  // Seleciona todas as linhas do corpo da tabela
  const rows = document.querySelectorAll("tbody tr");

  // Itera sobre as linhas da tabela
  rows.forEach((row) => {
    const idText = row.children[0].textContent.toLowerCase(); 
    const emailText = row.children[2].textContent.toLowerCase(); 
    const nomeText = row.children[3].textContent.toLowerCase(); 
    const funcaoText = row.children[4].textContent.toLowerCase(); 
    const statusText = row.children[5].textContent.toLowerCase(); 
    const criadoEmText = row.children[6].textContent; 

    // Verifica cada campo
    const matchesId = !idValue || idText.includes(idValue);
    const matchesEmail = !emailValue || emailText.includes(emailValue);
    const matchesNome = !nomeValue || nomeText.includes(nomeValue);
    const matchesData = !dataInicioValue || new Date(criadoEmText) >= new Date(dataInicioValue);
    const matchesStatus = !statusValue || statusText === statusValue; 
    const matchesFuncao = !funcaoValue || funcaoText.includes(funcaoValue);

    // Exibe ou oculta a linha
    if (matchesId && matchesEmail && matchesNome && matchesData && matchesStatus && matchesFuncao) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});

// Evento para o botão Limpar
document.querySelector("button[type='reset']").addEventListener("click", (e) => {
  e.preventDefault();

  // Limpa os campos do formulário
  document.querySelector("form").reset();

  // Exibe todas as linhas novamente
  const rows = document.querySelectorAll("tbody tr");
  rows.forEach((row) => {
    row.style.display = "";
  });
});


//13212312313
document.querySelector("form#searchForm").addEventListener("submit", (e) => {
    e.preventDefault(); 

    // Captura os valores dos filtros
    const idValue = document.querySelector("#idPet").value.trim().toLowerCase();
    const nomeValue = document.querySelector("#nomePet").value.trim().toLowerCase();
    const tipoValue = document.querySelector("#tipoPet").value.trim().toLowerCase();
    const tamanhoValue = document.querySelector("#tamanhoPet").value.trim().toLowerCase();

    // Seleciona todas as linhas da tabela
    const rows = document.querySelectorAll("tbody tr");

    rows.forEach((row) => {
        const idText = row.children[0].textContent.toLowerCase();
        const nomeText = row.children[1].textContent.toLowerCase();
        const tipoText = row.children[2].textContent.toLowerCase();
        const tamanhoText = row.children[4].textContent.toLowerCase();

        // Verifica se a linha corresponde aos filtros
        const matchesId = !idValue || idText.includes(idValue);
        const matchesNome = !nomeValue || nomeText.includes(nomeValue);
        const matchesTipo = !tipoValue || tipoText === tipoValue;
        const matchesTamanho = !tamanhoValue || tamanhoText === tamanhoValue;

        // Exibe ou oculta a linha
        if (matchesId && matchesNome && matchesTipo && matchesTamanho) {
            row.style.display = ""; 
        } else {
            row.style.display = "none"; 
        }
    });
});

// Botão Limpar
document.querySelector("button[type='reset']").addEventListener("click", (e) => {
    // Exibe todas as linhas ao limpar os filtros
    const rows = document.querySelectorAll("tbody tr");
    rows.forEach((row) => {
        row.style.display = ""; 
    });
});
function pesquisarPets() {
  const id = document.getElementById('ID').value.trim().toLowerCase();
  const nome = document.getElementById('Nome-do-pet').value.trim().toLowerCase();
  const raca = document.getElementById('racaPet').value.toLowerCase();
  const tamanho = document.getElementById('tamanho').value.toLowerCase();
  
  const tabela = document.getElementById('tabelaPets').getElementsByTagName('tbody')[0];
  const linhas = tabela.getElementsByTagName('tr');

  for (let i = 0; i < linhas.length; i++) {
      const colunaId = linhas[i].getElementsByTagName('td')[1].innerText.toLowerCase();
      const colunaNome = linhas[i].getElementsByTagName('td')[2].innerText.toLowerCase();
      const colunaTipo = linhas[i].getElementsByTagName('td')[3].innerText.toLowerCase();
      const colunaRaca = linhas[i].getElementsByTagName('td')[4].innerText.toLowerCase();
      const colunaTamanho = linhas[i].getElementsByTagName('td')[5].innerText.toLowerCase();

      if (
          (id === '' || colunaId.includes(id)) &&
          (nome === '' || colunaNome.includes(nome)) &&
          (raca === '' || colunaTipo.includes(raca)) &&
          (tamanho === '' || colunaTamanho.includes(tamanho))
      ) {
          linhas[i].style.display = '';
      } else {
          linhas[i].style.display = 'none';
      }
  }
}

