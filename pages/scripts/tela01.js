import { showError } from './config.js';

export function configurarTela01() {

}

function operacao(botao) {
  sessionStorage.setItem('currentOperation', botao.textContent);
  window.location.href = "../../Telas/Tela-03.html";
}
