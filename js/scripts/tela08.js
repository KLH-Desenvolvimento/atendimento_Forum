import { fetchAPI, showError } from './config.js';

// Variável para armazenar as chamadas
let chamadasAtuais = [];

async function verificarAtualizacoes() {
  if (sessionStorage.getItem('atualizarChamadas') != null) {
    sessionStorage.removeItem('atualizarChamadas');
    try {
      const hora = sessionStorage.getItem("horaChamada");
      await pegarChamada(hora);
    } catch (error) {
      console.error("Erro ao atualizar chamadas:", error);
      mostrarErroNasLinhas(error.message);
    }
  }
}

export async function pegarChamada(hora) {
  try {
    console.log("chamada iniciada");
    const horaChamada = hora || sessionStorage.getItem("horaChamada");
    console.log(horaChamada);
    const response = await fetchAPI('chamada', 'POST', { horaSessao: horaChamada });
    
    if (!response) {
      throw new Error('Dados inválidos recebidos da API');
    }
    
    chamadasAtuais = response;
    preencherTabela(chamadasAtuais);
    return chamadasAtuais;
    
  } catch (error) {
    console.error("Erro ao carregar chamadas:", error);
    throw error;
  }
}

function preencherTabela(chamadas) {
  // Limpa a tabela primeiro
  for (let i = 1; i <= 6; i++) {
    document.getElementById(`Nome${i}`).textContent = "";
    document.getElementById(`Intima${i}`).textContent = "";
    document.getElementById(`Cpf${i}`).textContent = "";
    document.getElementById(`Sessao${i}`).textContent = "";
  }

  // Preenche com os novos dados
  for (let i = 0; i < Math.min(chamadas.length, 6); i++) {
    const chamada = chamadas[i];
    
    document.getElementById(`Nome${i+1}`).textContent = chamada.nome || "Não informado";
    document.getElementById(`Intima${i+1}`).textContent = chamada.intimacao || "Não informado";
    document.getElementById(`Cpf${i+1}`).textContent = chamada.cpf || "Não informado";
    document.getElementById(`Sessao${i+1}`).textContent = chamada.horaSessao || "Não informado";
  }
}

function mostrarErroNasLinhas(mensagem) {
  for (let i = 1; i <= 6; i++) {
    document.getElementById(`Nome${i}`).textContent = "Erro";
    document.getElementById(`Intima${i}`).textContent = "Erro";
    document.getElementById(`Cpf${i}`).textContent = "Erro";
    document.getElementById(`Sessao${i}`).textContent = "Erro";
  }
  showError(mensagem);
}