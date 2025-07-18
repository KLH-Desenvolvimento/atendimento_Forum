

export function servico() {
  
}

export function texto_lado(idDoSpan) {
  const valor = document.getElementById(idDoSpan)?.textContent || "";
  sessionStorage.setItem('servico', valor); // Armazena com a chave correta
  window.location.href = "../html/03-seletorHorario.html";
  
}