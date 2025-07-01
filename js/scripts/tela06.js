import { dataAtual, horaAtual, showError, fetchAPI } from './config.js';

export async function configurarTela06() {
  // Preenche os dados na tela
  document.getElementById("idDoSpan").textContent = sessionStorage.getItem("servico") || "Não informado";
  document.getElementById("nome").textContent = sessionStorage.getItem("nome") || "Não informado";
  document.getElementById("cpf").textContent = sessionStorage.getItem("cpf") || "Não informado";
  document.getElementById("tipo-1").textContent = sessionStorage.getItem("currentOperation") || "Não informado";
  document.getElementById("linha-padrão").textContent = sessionStorage.getItem("horario") || "Não informado";
  document.getElementById("drop").textContent = sessionStorage.getItem("intimacao") || "Não informado";
  document.getElementById("data").textContent = dataAtual();
  document.getElementById("hora").textContent = horaAtual();

  const botao = document.getElementById("btn_gerador");  
  botao.addEventListener("click", function(e) {
    e.preventDefault();
    enviarRegistro();
  });
}

export async function enviarRegistro() {
  const registro = {
    nome: sessionStorage.getItem("nome") || "Não informado",
    cpf: sessionStorage.getItem("cpf") || "Não informado",
    servico: sessionStorage.getItem("servico") || "Não informado",
    intimacao: sessionStorage.getItem("intimacao") || "Não informado",
    horaSessao: sessionStorage.getItem("horario") || "Não informado",
    data: dataAtual()
  };

  try {
    console.log('Enviando registro:', registro);
    const response = await fetchAPI('registros', 'POST', registro);
    
    console.log('Resposta da API:', response);
    if (response.id) {
      sessionStorage.clear();
      window.location.href = "../../index.html";
    } else {
      throw new Error(response.message || 'Erro ao enviar registro');
    }
  } catch (error) {
    console.error("Erro ao enviar registro:", error);
    showError("Falha ao enviar: " + error.message);
  }
}
