import { chamadaService } from '../../scripts/service.js';

export async function configurarTela07() {
  const botaoConfirmar = document.querySelector(".btn_fila");
  if (botaoConfirmar) {
    botaoConfirmar.addEventListener("click", async () => {
      const hora = document.querySelector(".selecionar-interno").value;
      chamadaService.setHora(hora); // Armazena a hora
      const dados = await chamadaService.carregarChamadas(); // Busca dados
      preencherTabela(dados); // Exibe na Tela07
    });
  }

  const botaoChamar = document.getElementById("chamar");
  if (botaoChamar) {
    botaoChamar.addEventListener("click", () => {
      if (!chamadaService.horaChamada) {
        alert("Selecione um horário primeiro!");
        return;
      }
      chamadaService.notificarTela08(); // Dispara a Tela08
    });
  }
}

async function pegarDB() {
  const select = document.querySelector(".selecionar-interno");
  const horaSelecionada = select.value;
  chamadaService.setHora(horaSelecionada); // Dispara evento para a Tela08
}

async function handleChamada(event) {
  event.preventDefault();
  const hora = chamadaService.horaChamada;
  if (!hora) {
    showError('Nenhum horário selecionado');
    return;
  }
  await chamadaService.carregarChamadas(); // Atualiza a Tela08 via BroadcastChannel
}

async function chamarRegistro() {
  try {
    const hora = sessionStorage.getItem("horaChamada");
    console.log("Hora da sessão:", hora);
    
    if (!hora) {
      throw new Error('Nenhum horário selecionado');
    }
    
    const response = await fetchAPI('chamada', 'POST', { horaSessao: hora });
    console.log("Resposta da API:", response);
    
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
    
    document.getElementById(`nome${i}`).textContent = registro.nome || "-";
    document.getElementById(`intima${i}`).textContent = registro.intimacao || "-";
    document.getElementById(`cpf${i}`).textContent = registro.cpf || "-";
    document.getElementById(`sessao${i}`).textContent = registro.horaSessao || "-";
  }
}

/*async function criarChamada() {
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
}*/