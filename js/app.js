// Configurações globais
const API_BASE_URL = 'http://localhost:3001/api'; // Altere para sua URL de produção

// Estado global da aplicação
const appState = {
  usuario: null,
  convocacoes: [],
  currentOperation: null
};

// Inicialização da aplicação
window.addEventListener("DOMContentLoaded", async () => {
  try {
    // Restaura estado da sessão
    await restoreSessionState();
    
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

function dataAtual() {
  const data = new Date();
  return `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}/${data.getFullYear()}`;
}

function horaAtual() {
  const agora = new Date();
  return `${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`;
}

function showError(message) {
  const errorElement = document.getElementById('error-message') || createErrorMessageElement();
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  setTimeout(() => errorElement.style.display = 'none', 5000);
}

function createErrorMessageElement() {
  const div = document.createElement('div');
  div.id = 'error-message';
  div.style = 'position: fixed; top: 20px; right: 20px; padding: 15px; background: #ff4444; color: white; border-radius: 5px; display: none; z-index: 1000;';
  document.body.appendChild(div);
  return div;
}

async function restoreSessionState() {
  const savedUser = sessionStorage.getItem('usuario');
  if (savedUser) {
    appState.usuario = JSON.parse(savedUser);
  }
}

/* ========== CONFIGURAÇÃO DAS TELAS ========== */

/* Tela 01 */
function configurarTela01() {
  // Configuração inicial da tela 01
}

function operação(botao) {
  appState.currentOperation = botao.textContent;
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

      // Verifica se usuário já existe
      
      // Atualiza estado
      appState.usuario = { nome, cpf };
      sessionStorage.setItem('usuario', JSON.stringify(appState.usuario));
      
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
  appState.selectedOption = valor;
  sessionStorage.setItem('selectedOption', valor);
  window.location.href = "./Tela-05.html";
}

/* Tela 05 */
function configurarTela05() {
  const botoes = document.querySelectorAll(".btn-acionar");
  botoes.forEach(btn => btn.addEventListener("click", Acionar));

  const checkboxList = document.querySelectorAll('.caixa');
  checkboxList.forEach(cb => {
    cb.addEventListener('change', () => limitarCheckbox(cb));
  });

  const enviarBtn = document.getElementById("btn-enviar");
  if (enviarBtn) {
    enviarBtn.addEventListener("click", capturarInformacoes);
  }
}

let textoCapturado = "";

function Acionar(event) {
  const texto = event.target.previousElementSibling?.innerText || "";
  textoCapturado = texto;
  document.getElementById('Drop-ddow')?.classList.add('active');
}

function limitarCheckbox(clicado) {
  const checkboxes = document.querySelectorAll('.caixa');
  checkboxes.forEach(cb => {
    if (cb !== clicado) cb.checked = false;
  });
}

async function capturarInformacoes() {
  try {
    const selecionados = [];
    document.querySelectorAll('.caixa').forEach(checkbox => {
      if (checkbox.checked) {
        const texto = checkbox.previousElementSibling?.innerText || "";
        selecionados.push(texto);
      }
    });

    if (selecionados.length === 0) {
      throw new Error("Selecione pelo menos uma opção");
    }

    appState.convocacoes = selecionados;
    appState.textoSelecionado = textoCapturado;
    
    sessionStorage.setItem('convocacoes', JSON.stringify(selecionados));
    sessionStorage.setItem('textoSelecionado', textoCapturado);
    
    window.location.href = "./Tela-06.html";
  } catch (error) {
    showError(error.message);
  }
}

async function configurarTela06() {
  const span = document.getElementById("idDoSpan");
  if (!span) return;

  // Preenche os dados na tela
  document.getElementById("idDoSpan").textContent = appState.selectedOption || "Não informado";
  document.getElementById("nome").textContent = appState.usuario?.nome || "Não informado";
  document.getElementById("cpf").textContent = appState.usuario?.cpf || "Não informado";
  document.getElementById("tipo-1").textContent = appState.currentOperation || "Não informado";
  document.getElementById("linha-padrão").textContent = appState.textoSelecionado || "Não informado";
  document.getElementById("drop").textContent = appState.convocacoes?.join(", ") || "Não informado";
  document.getElementById("data").textContent = dataAtual();
  document.getElementById("hora").textContent = horaAtual();

  // Adicione um botão de confirmação explícito
  const confirmarBtn = document.createElement('button');
  confirmarBtn.textContent = 'Confirmar e Finalizar';
  confirmarBtn.className = 'btn-confirmar';
  confirmarBtn.addEventListener('click', async () => {
    await enviarRegistro();
  });
  
  const container = document.getElementById('container-botoes') || document.body;
  container.appendChild(confirmarBtn);
}

async function enviarRegistro() {
  const registro = {
    nome: appState.usuario?.nome || sessionStorage.getItem("nome") || "Não informado",
    cpf: appState.usuario?.cpf || sessionStorage.getItem("cpf") || "Não informado",
    tipo_operacao: appState.currentOperation || sessionStorage.getItem("tipo-1") || "Não informado",
    opcao_selecionada: appState.selectedOption || sessionStorage.getItem("idDoSpan") || "Não informado",
    texto_adicional: appState.textoSelecionado || sessionStorage.getItem("texto") || "Não informado",
    convocacoes: appState.convocacoes?.join(", ") || sessionStorage.getItem("convocacoesSelecionadas") || "Não informado"
  };

  try {
    const response = await fetch(`${API_BASE_URL}/registros`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registro)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Erro ao registrar entrada');
    }

    console.log('Registro salvo com sucesso:', data);
    sessionStorage.clear();
    appState.usuario = null;
    appState.convocacoes = [];
    appState.currentOperation = null;
    
    // Agora sim chama a função para tocar e redirecionar
    tocarEAbrir();
    
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao registrar: " + error.message);
  }
}

/* Finalização com som */
function tocarEAbrir() {
  const audio = document.getElementById("audioClique");
  if (audio) {
    audio.play();
    audio.onended = () => {
      sessionStorage.clear();
      window.location.href = "../index.html";
    };
  } else {
    sessionStorage.clear();
    window.location.href = "../index.html";
  }
}