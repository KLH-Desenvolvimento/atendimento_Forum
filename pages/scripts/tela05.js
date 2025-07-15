import { showError } from './config.js';

// Gerenciamento de estado
const state = {
  horarioSelecionado: null,
  intimacaoSelecionada: null
};

export function configurarTela05() {
  try {
    configurarBotoesHorario();
    configurarCheckboxes();
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
      
      // Mostra o dropdown de intimação
      document.getElementById('Drop-ddow').classList.add('active');
    });
  });
}

function configurarCheckboxes() {
  const checkboxes = document.querySelectorAll('.caixa');
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        // Desmarca os outros checkboxes
        checkboxes.forEach(cb => {
          if (cb !== e.target) cb.checked = false;
        });
        
        // Armazena a intimação selecionada
        const intimacaoElement = e.target.previousElementSibling;
        state.intimacaoSelecionada = intimacaoElement.dataset.intimacao;
      } else {
        state.intimacaoSelecionada = null;
      }
    });
  });
}

function configurarBotaoConfirmar() {
  const btnConfirmar = document.getElementById('btn-confirmar');
  
  btnConfirmar.addEventListener('click', () => {
    try {
      validarSelecoes();
      armazenarDados();
      redirecionarParaProximaTela();
    } catch (error) {
      showError(error.message);
    }
  });
}

function validarSelecoes() {
  if (!state.horarioSelecionado) {
    throw new Error('Por favor, selecione um horário');
  }
  
  if (!state.intimacaoSelecionada) {
    throw new Error('Por favor, selecione um tipo de intimação');
  }
}

function armazenarDados() {
  sessionStorage.setItem('horario', state.horarioSelecionado);
  sessionStorage.setItem('intimacao', state.intimacaoSelecionada);
}

function redirecionarParaProximaTela() {
  window.location.href = './Tela-06.html';
}