

window.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (path.includes("Tela-01")) configurarTela01();
  if (path.includes("Tela-03")) configurarTela03();
  if (path.includes("Tela-04")) configurarTela04();
  if (path.includes("Tela-05")) configurarTela05();
  if (path.includes("Tela-06")) configurarTela06();
});

/* Utilitários */
function dataAtual() {
  const data = new Date();
  return `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}/${data.getFullYear()}`;
}

function horaAtual() {
  const agora = new Date();
  return `${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`;
}

/* Tela 01 */
function configurarTela01() {
  
}
function operação(botao) {
  sessionStorage.setItem("tipo-1", botao.textContent);
  window.location.href = "./Telas/Tela-03.html";
}

/* Tela 03 */
function configurarTela03() {
  const form = document.getElementById("meuForm");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome")?.value || "";
    const cpf = document.getElementById("cpf")?.value || "";

    sessionStorage.setItem("nome", nome);
    sessionStorage.setItem("cpf", cpf);

    window.location.href = "./Tela.-04.html"; 
  });
}

/* Tela 04 */
function configurarTela04() {
  // HTML deve chamar: onclick="texto_lado('id')"
}
function texto_lado(idDoSpan) {
  const valor = document.getElementById(idDoSpan)?.textContent || "";
  sessionStorage.setItem("idDoSpan", valor);
  window.location.href = "./Tela-05.html";
}

/* Tela 05 */
function configurarTela05() {
  const botoes = document.querySelectorAll(".btn-acionar");
  botoes.forEach(btn => btn.addEventListener("click", Acionar));

  const checkboxList = document.querySelectorAll('.caixa');
  checkboxList.forEach(cb => {
    cb.addEventListener('change', () => limitarCheckbox(cb));
  });

  const enviarBtn = document.getElementById("btn-enviar");
  if (enviarBtn) {
    enviarBtn.addEventListener("click", capturarInformacoes);
  }
}

let textoCapturado = "";

function Acionar(event) {
  const texto = event.target.previousElementSibling?.innerText || "";
  textoCapturado = texto;
  document.getElementById('Drop-ddow')?.classList.add('active');
}

function limitarCheckbox(clicado) {
  const checkboxes = document.querySelectorAll('.caixa');
  checkboxes.forEach(cb => {
    if (cb !== clicado) cb.checked = false;
  });
}

function capturarInformacoes() {
  const selecionados = [];
  document.querySelectorAll('.caixa').forEach(checkbox => {
    if (checkbox.checked) {
      const texto = checkbox.previousElementSibling?.innerText || "";
      selecionados.push(texto);
    }
  });

  sessionStorage.setItem('convocacoesSelecionadas', selecionados.join(", "));
  sessionStorage.setItem('texto', textoCapturado);
  window.location.href = "./Tela-06.html";
}

/* Tela 06 */
function configurarTela06() {
  const span = document.getElementById("idDoSpan");
  if (!span) return;

  document.getElementById("idDoSpan").textContent = sessionStorage.getItem("idDoSpan") || "Não informado";
  document.getElementById("nome").textContent = sessionStorage.getItem("nome") || "Não informado";
  document.getElementById("cpf").textContent = sessionStorage.getItem("cpf") || "Não informado";
  document.getElementById("tipo-1").textContent = sessionStorage.getItem("tipo-1") || "Não informado";
  document.getElementById("linha-padrão").textContent = sessionStorage.getItem("texto") || "Não informado";
  document.getElementById("drop").textContent = sessionStorage.getItem("convocacoesSelecionadas") || "Não informado";
  document.getElementById("data").innerHTML = dataAtual();
  document.getElementById("hora").innerHTML = horaAtual();
}

/* Finalização com som */
function tocarEAbrir() {
  const audio = document.getElementById("audioClique");
  if (audio) {
    audio.play();
    audio.onended = () => window.location.href = "../index.html";
  } else {
    window.location.href = "../index.html";
  }

   
}

