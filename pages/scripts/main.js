import { autenticacao } from '../pageEntrada/scripts/01-autenticacao.js';
import { servico } from '../pageEntrada/scripts/02-servico.js';
import { seletorHorario } from '../pageEntrada/scripts/03-seletorHorario.js';
import { impressao } from '../pageEntrada/scripts/04-impressao.js';
import { configurarTela07 } from '../pageOp/scripts/operacao.js';
import { configurarTela08 } from '../pageChamada/scripts/telaChamada.js';

// Inicialização da aplicação
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const path = window.location.pathname;
    if (path.includes("index")) configurarTela01();
    if (path.includes("01-autenticacao")) autenticacao();
    if (path.includes("02-servico")) servico();
    if (path.includes("03-seletorHorario")) seletorHorario();
    if (path.includes("04-impressao")) impressao();
    if (path.includes("operacao")) configurarTela07();
    if (path.includes("telaChamada")) configurarTela08();
  } catch (e) {
    console.error("Erro na inicialização:", e);
    showError("Erro ao carregar a aplicação. Recarregue a página.");
  }
});
