import { showError } from './config.js';

export function configurarTela04() {
  try {
    // Seleciona todos os botões de operação
    const botoesOperacao = document.querySelectorAll('.btn_operacao');
    
    // Adiciona event listener a cada botão
    botoesOperacao.forEach(botao => {
      botao.addEventListener('click', (event) => {
        // Previne comportamento padrão (útil caso o botão seja submit)
        event.preventDefault();
        
        // Obtém o ID do span alvo a partir do atributo data-target
        const targetId = botao.getAttribute('data-target');
        
        // Chama a função de processamento
        processarSelecao(targetId);
      });
    });
    
  } catch (error) {
    console.error('Erro na configuração da Tela 04:', error);
    showError('Erro ao carregar as opções. Recarregue a página.');
  }
}

function processarSelecao(targetId) {
  try {
    // Validação básica
    if (!targetId) {
      throw new Error('Nenhuma opção selecionada');
    }
    
    // Obtém o elemento span pelo ID
    const elementoTexto = document.getElementById(targetId);
    
    // Verifica se o elemento existe
    if (!elementoTexto) {
      throw new Error('Opção não encontrada');
    }
    
    // Obtém o texto considerando a estrutura especial do terceiro item
    let texto;
    if (targetId === 'texto_3') {
      const parte1 = elementoTexto.querySelector('.deslo-T4-1')?.textContent || '';
      const parte2 = elementoTexto.querySelector('.deslo-T4-2')?.textContent || '';
      texto = `${parte1} ${parte2}`.trim();
    } else {
      texto = elementoTexto.textContent.trim();
    }
    
    // Armazena no sessionStorage
    sessionStorage.setItem('servico', texto);
    
    // Redireciona para a próxima tela
    window.location.href = "./Tela-05.html";
    
  } catch (error) {
    console.error('Erro ao processar seleção:', error);
    showError(error.message);
  }
}