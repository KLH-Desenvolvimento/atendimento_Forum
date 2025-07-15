import { configurarTela01 } from './tela01.js';
import { configurarTela03 } from './tela03.js';
import { configurarTela04 } from './tela04.js';
import { configurarTela05 } from './tela05.js';
import { configurarTela06 } from './tela06.js';
import { configurarTela07 } from './tela07.js';
import { configurarTela08 } from './tela08.js';

// Inicialização da aplicação
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const path = window.location.pathname;
    if (path.includes("index")) configurarTela01();
    if (path.includes("Tela-03")) configurarTela03();
    if (path.includes("Tela-04")) configurarTela04();
    if (path.includes("Tela-05")) configurarTela05();
    if (path.includes("Tela-06")) configurarTela06();
    if (path.includes("Tela-07")) configurarTela07();
    if (path.includes("Tela-08")) configurarTela08();
  } catch (e) {
    console.error("Erro na inicialização:", e);
    showError("Erro ao carregar a aplicação. Recarregue a página.");
  }
});
