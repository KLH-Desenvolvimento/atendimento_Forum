/*configurações globais */
/*chamada da rota api */
const API_BASE_URL = 'http://localhost:3001/api';

// Inicialização da aplicação
window.addEventListener("DOMContentLoaded", async () => {
  try {
    
    // Configura telas
    const path = window.location.pathname;
    if (path.includes("Tela-01")) configurarTela01();
    if (path.includes("Tela-03")) configurarTela03();
    if (path.includes("Tela-04")) configurarTela04();
    if (path.includes("Tela-05")) configurarTela05();
    if (path.includes("Tela-06")) await configurarTela06();
  } catch (e) {
    console.error("Erro na inicialização:", e);
    showError("Erro ao carregar a aplicação. Recarregue a página.");
  }
});

/* ========== FUNÇÕES UTILITÁRIAS ========== */
// Função para chamadas à API
async function fetchAPI(endpoint, method = 'GET', data = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro na requisição');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro na chamada API:', error);
    throw error;
  }
}

/*funções para data e hora */
function dataAtual() {
  const data = new Date();
  return `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}/${data.getFullYear()}`;
}

function horaAtual() {
  const agora = new Date();
  return `${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`;
}


/*Caixa de erro personalizada */
function showError(message) {
  const errorElement = document.getElementById('error-message') || createErrorMessageElement();
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  setTimeout(() => errorElement.style.display = 'none', 5000);
}

/*cria uma mensagem de erro */
function createErrorMessageElement() {
  const div = document.createElement('div');
  div.id = 'error-message';
  div.style = 'position: fixed; top: 20px; right: 20px; padding: 15px; background: #ff4444; color: white; border-radius: 5px; display: none; z-index: 1000;';
  document.body.appendChild(div);
  return div;
}



/* ========== CONFIGURAÇÃO DAS TELAS ========== */

/* Tela 01 */
function configurarTela01() {
  // Configuração inicial da tela 01
}

function operação(botao) {

  sessionStorage.setItem('currentOperation', botao.textContent);
  window.location.href = "./Telas/Tela-03.html";
}

/* Tela 03 */
function configurarTela03() {
  const form = document.getElementById("meuForm");
  if (!form) return;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome")?.value.trim() || "";
    const cpf = document.getElementById("cpf")?.value.trim() || "";

    try {
      // Validação básica
      if (!nome || !cpf) {
        throw new Error("Nome e CPF são obrigatórios");
      }
      
      sessionStorage.setItem('nome', nome);
      sessionStorage.setItem('cpf', cpf);
      
      window.location.href = "./Tela-04.html"; 
    } catch (error) {
      showError(error.message);
    }
  });
}

/* Tela 04 */
function configurarTela04() {
  // Configura elementos da tela 04
}

function texto_lado(idDoSpan) {
  const valor = document.getElementById(idDoSpan)?.textContent || "";
  sessionStorage.setItem('servico', valor); // Armazena com a chave correta
  window.location.href = "./Tela-05.html";
  
}

/* Tela 05*/
function configurarTela05() {
  
  // Configura os botões de horário
  const botoesHorario = document.querySelectorAll(".btn_horario");
  botoesHorario.forEach(btn => btn.addEventListener("click", selecionarHorario));

  // Configura os checkboxes de intimação (popup)
  const checkboxList = document.querySelectorAll('.caixa');
  checkboxList.forEach(cb => {
    cb.addEventListener('change', () => limitarCheckbox(cb));
  });

  // Configura o botão de enviar
  const enviarBtn = document.getElementById("btn-enviar");
  if (enviarBtn) {
    enviarBtn.addEventListener("click", capturarInformacoes);
  }


}

// Variáveis para armazenar as seleções
let horarioSelecionado = "";
let textoIntimacao = "";

function selecionarHorario(event) {
  // Remove a seleção anterior (visual)
  document.querySelectorAll('.linha_horario').forEach(el => {
    el.classList.remove('selecionado');
  });

  // Adiciona classe de seleção visual
  event.target.closest('.linha_horario').classList.add('selecionado');

  // Captura o texto completo do horário
  const textoCompleto = event.target.previousElementSibling?.innerText || "";
  
  // Extrai apenas o horário (última parte após o '-')
  horarioSelecionado = textoCompleto.split('-').pop().trim();
  
  // Ativa o popup/dropdown (se necessário)
  document.getElementById('Drop-ddow')?.classList.add('active');
}

function limitarCheckbox(clicado) {
  const checkboxes = document.querySelectorAll('.caixa');
  checkboxes.forEach(cb => {
    if (cb !== clicado) cb.checked = false;
  });
  
  // Captura o texto da intimação selecionada
  if (clicado.checked) {
    textoIntimacao = clicado.previousElementSibling?.innerText || "";
  } else {
    textoIntimacao = "";
  }
}

async function capturarInformacoes() {
  try {
    if (!horarioSelecionado) throw new Error("Selecione um horário");
    if (!textoIntimacao) throw new Error("Selecione pelo menos uma intimação");

    // Armazena tudo no sessionStorage com chaves consistentes
    sessionStorage.setItem('horario', horarioSelecionado);
    sessionStorage.setItem('intimacao', textoIntimacao);

    window.location.href = "./Tela-06.html";
  } catch (error) {
    showError(error.message);
  }
}

async function configurarTela06() {
  // Preenche os dados na tela com fallback para sessionStorage
  document.getElementById("idDoSpan").textContent = sessionStorage.getItem("servico") || "Não informado";
  document.getElementById("nome").textContent = sessionStorage.getItem("nome") || "Não informado";
  document.getElementById("cpf").textContent = sessionStorage.getItem("cpf") || "Não informado";
  document.getElementById("tipo-1").textContent = sessionStorage.getItem("currentOperation") || "Não informado";
  document.getElementById("linha-padrão").textContent = sessionStorage.getItem("horario") || "Não informado";
  document.getElementById("drop").textContent = sessionStorage.getItem("intimacao") || "Não informado";
  document.getElementById("data").textContent = dataAtual();
  document.getElementById("hora").textContent = horaAtual();

}

async function enviarRegistro() {
  /*retorna para evitar recurção */


  const registro = {
    nome: sessionStorage.getItem("nome") || "Não informado",
    cpf: sessionStorage.getItem("cpf") || "Não informado",
    servico: sessionStorage.getItem("servico") || "Não informado",
    intimacao: sessionStorage.getItem("intimacao") || "Não informado",
    horaSessao: sessionStorage.getItem("horario") || "Não informado",
    data: dataAtual(),
    hora: horaAtual()
  };

  console.log(registro)

  try {
    const response = await fetch(`${API_BASE_URL}/registros`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registro)
    });
    console.log(response);
    if (!response.ok) throw new Error('Erro ao registrar');
    
    const data = await response.json();
    console.log('Sucesso:', data);
    
    /* */

    sessionStorage.clear();
    window.location.href = "../index.html";

  } catch (error) {
    console.error("Erro:", error);
    showError("Falha ao enviar: " + error.message);
  }

}

/* Finalização com som */
function tocarEAbrir() {
  const audio = document.getElementById("audioClique");
  if (audio) {
    audio.play();
    audio.onended = () => window.location.href = "../index.html";
  } else {
    window.location.href = "../index.html";
  }
}

