import { chamadaService } from './service.js';

export async function configurarTela08() {
  // Escuta quando a Tela07 envia a hora (via botão "Chamar")
  chamadaService.channel.addEventListener('message', async (event) => {
    if (event.data.type === 'ATUALIZAR_HORA') {
      const dados = await chamadaService.carregarChamadas(event.data.hora);
      preencherTabela(dados); // Exibe na Tela08
    }
  });

  // Carrega dados se já houver hora definida (ex: ao recarregar a página)
  if (chamadaService.horaChamada) {
    const dados = await chamadaService.carregarChamadas();
    preencherTabela(dados);
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

window.addEventListener('load', () => {
  // Re-inscreve nos observáveis quando a página é carregada
  chamadaService.chamadas$.subscribe(chamadas => {
    console.log("Atualização recebida na Tela08:", chamadas);
    preencherTabela(chamadas);
  });
  
  // Se já houver hora definida, carrega os dados
  if (chamadaService.horaSubject.getValue()) {
    chamadaService.carregarChamadas();
  }
});