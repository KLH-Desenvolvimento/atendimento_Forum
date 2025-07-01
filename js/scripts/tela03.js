import { showError } from './config.js';

export function configurarTela03() {
  const form = document.getElementById("meuForm");
  if (!form) return;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome")?.value.trim() || "";
    const cpf = document.getElementById("cpf")?.value.trim() || "";

    try {
      if (!nome || !cpf) {
        throw new Error("Nome e CPF são obrigatórios");
      }
      
      sessionStorage.setItem('nome', nome);
      sessionStorage.setItem('cpf', cpf);
      
      window.location.href = "./Tela-04.html"; 
    } catch (error) {
      showError(error.message);
    }
  });
}
