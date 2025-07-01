import { showError } from './config.js';

// Gerenciamento de estado
const state = {
  horarioSelecionado: null
};

export function configurarChamada() {
  try {
    configurarBotoesHorario();
    configurarBotaoConfirmar();
  } catch (error) {
    console.error('Erro na configuração da Tela 05:', error);
    showError('Erro ao carregar a tela. Recarregue a página.');
  }
}

function configurarBotoesHorario() {
  const linhasHorario = document.querySelectorAll('.linha_horario');
  
  linhasHorario.forEach(linha => {
    const botao = linha.querySelector('.btn_horario');
    
    botao.addEventListener('click', () => {
      // Remove seleção anterior
      linhasHorario.forEach(l => l.classList.remove('selecionado'));
      
      // Adiciona seleção atual
      linha.classList.add('selecionado');
      
      // Armazena o horário selecionado
      state.horarioSelecionado = linha.dataset.horario;
    });
  });
}

function configurarBotaoConfirmar() {
  const btnConfirmar = document.getElementById('btn-confirmar');
  
  btnConfirmar.addEventListener('click', () => {
    try {
      validarSelecao();
      armazenarDados();
      redirecionarParaProximaTela();
    } catch (error) {
      showError(error.message);
    }
  });
}

function validarSelecao() {
  if (!state.horarioSelecionado) {
    throw new Error('Por favor, selecione um horário');
  }
}

function armazenarDados() {
  sessionStorage.setItem('horaChamada', state.horarioSelecionado);
  console.log(sessionStorage.getItem("horaChamada"))
}

function redirecionarParaProximaTela() {
  window.location.href = '../../Telas/Tela-07.html';
}