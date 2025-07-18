import { showError } from '../../scripts/config.js';

export function autenticacao() {
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
      
      window.location.href = "../html/02-servico.html"; 
    } catch (error) {
      showError(error.message);
    }
  });
}
