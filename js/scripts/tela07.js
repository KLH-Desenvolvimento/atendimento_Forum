import { fetchAPI, showError } from './config.js';

// Variável para armazenar os registros
let ultimosRegistros = [];

export async function configurarTela07() {
  try {
    // Carrega os últimos registros
    await chamarRegistro();
    
    // Configura o botão de chamada
    const botao = document.getElementById("btn_fila");
    if (botao) {
      botao.addEventListener("click", handleChamada);
    }

  } catch (error) {
    console.error("Erro na configuração da Tela 07:", error);
    mostrarErroNasLinhas(error.message);
  }
}

async function chamarRegistro() {
  try {
    const hora = sessionStorage.getItem("horaChamada");
    console.log(hora);
    const response = await fetchAPI('chamada', 'POST', { horaSessao: hora });
    console.log(response);
    
    if (!response) {
      throw new Error('Dados inválidos recebidos da API');
    }
    
    ultimosRegistros = response;
    preencherTabela(ultimosRegistros);
    
  } catch (error) {
    console.error("Erro ao carregar registros:", error);
    mostrarErroNasLinhas(error.message);
    throw error;
  }
}

function preencherTabela(registros) {
  for (let i = 0; i < 6; i++) {
    const registro = registros[i] || {};
    
    document.getElementById(`nome${i}`).textContent = registro.nome || "Não informado";
    document.getElementById(`intima${i}`).textContent = registro.intimacao || "Não informado";
    document.getElementById(`cpf${i}`).textContent = registro.cpf || "Não informado";
    document.getElementById(`sessao${i}`).textContent = registro.horaSessao || "Não informado";
  }
}

async function handleChamada(event) {
  event.preventDefault();
  
  try {
 
    
    // Marca que a tela08 precisa atualizar
    sessionStorage.setItem('atualizarChamadas', sessionStorage.getItem("horaSessao"));

    
  } catch (error) {
    console.error("Erro ao processar chamada:", error);
    showError("Falha ao criar chamada: " + error.message);
  }
}

async function criarChamada() {
  const chamadas = [];
  
  for (let i = 0; i < 6; i++) {
    if (ultimosRegistros[i]) {
      const chamada = {
        nome: document.getElementById(`nome${i}`).textContent,
        cpf: document.getElementById(`cpf${i}`).textContent,
        intimacao: document.getElementById(`intima${i}`).textContent,
        horaSessao: document.getElementById(`sessao${i}`).textContent,
        horaChamada: new Date().toLocaleTimeString()
      };
      chamadas.push(chamada);
    }
  }
  
  if (chamadas.length === 0) {
    throw new Error('Nenhum registro disponível para chamada');
  }

  // Envia as chamadas para a API
  const response = await fetchAPI('chamadas', 'POST', chamadas);
  return response;
}

function mostrarErroNasLinhas(mensagem) {
  for (let i = 0; i < 6; i++) {
    document.getElementById(`nome${i}`).textContent = "Erro";
    document.getElementById(`intima${i}`).textContent = "Erro";
    document.getElementById(`cpf${i}`).textContent = "Erro";
    document.getElementById(`sessao${i}`).textContent = "Erro";
  }
  showError(mensagem);
}